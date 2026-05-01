import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'
import { verifyCalWebhookSignature, parseCalWebhookPayload, getReviewEmailDelay } from '@/lib/services/calcom'
import { sendConfirmationEmail, sendReminderEmail, sendReviewRequestEmail } from '@/lib/services/resend'
import { extractPhoneFromCalPayload } from '@/lib/antiAbuse/phone.js'
import { seoPlatformRequest } from '@/lib/services/seoPlatform.js'
import { resolveActiveTenantCalSecrets } from '@/lib/integrations/resolveCalSecrets'

// Simple in-memory idempotency (use Redis/KV in production)
const processed = new Set<string>()

const DEBUG_LOG_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DEBUG_LOG_INGEST_URL
    : (process.env.DEBUG_LOG_INGEST_URL ?? 'http://127.0.0.1:7243/ingest/27dfd52d-6f68-4075-94cf-d2f93a4ea8d6')
const DEBUG_SESSION_ID = process.env.DEBUG_LOG_SESSION_ID ?? '351dd2'

function debugLog(payload: Record<string, unknown>) {
  if (!DEBUG_LOG_URL) return
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (DEBUG_SESSION_ID) headers['X-Debug-Session-Id'] = DEBUG_SESSION_ID
  fetch(DEBUG_LOG_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).catch(() => {})
}

const CAL_SESSION_COOKIE = 'cal_session'
const CAL_SESSION_MAX_AGE = 7200
const HMAC_SHA256_HEX_LEN = 64
const HMAC_SHA256_HEX_RE = new RegExp(`^[0-9a-f]{${HMAC_SHA256_HEX_LEN}}$`, 'i')
const hasResend = Boolean(process.env.RESEND_API_KEY)
const CLIENT_SLUG = String(process.env.CLIENT_SLUG ?? '').trim()

function signCalSessionToken(bookingUid: string): string | null {
  const secret = process.env.CAL_WEBHOOK_SECRET
  if (!secret) return null
  const hmacHex = createHmac('sha256', secret).update(bookingUid, 'utf8').digest('hex')
  return `${bookingUid}.${hmacHex}`
}

function verifyCalSessionCookie(cookieValue: string, bookingUid: string): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET
  if (!secret) return false
  const lastDot = cookieValue.lastIndexOf('.')
  if (lastDot <= 0) return false
  const uidFromCookie = cookieValue.slice(0, lastDot)
  const hmacHex = cookieValue.slice(lastDot + 1)
  if (uidFromCookie !== bookingUid) return false
  if (!HMAC_SHA256_HEX_RE.test(hmacHex)) return false
  const expectedHex = createHmac('sha256', secret).update(bookingUid, 'utf8').digest('hex')
  const a = Buffer.from(hmacHex, 'hex')
  const b = Buffer.from(expectedHex, 'hex')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-cal-signature-256')

    let body: unknown
    try {
      body = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const event = parseCalWebhookPayload(body)
    if (!event) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const bookingUid = event.payload.uid
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(CAL_SESSION_COOKIE)?.value
    if (sessionCookie && verifyCalSessionCookie(sessionCookie, bookingUid)) {
      return NextResponse.json({ ok: true, duplicate: true })
    }

    const { webhookSecret, apiKey: calApiKey, tenantSource, resolvedClientSlug } =
      await resolveActiveTenantCalSecrets(body)

    const debugProd = process.env.DEBUG_CAL_WEBHOOK === '1'
    const hasSeoBridge = !!process.env.SEO_DATA_PLATFORM_URL

    // #region agent log
    debugLog({
      sessionId: DEBUG_SESSION_ID,
      runId: 'pre-fix',
      hypothesisId: 'H_entry',
      location: 'app/api/webhooks/cal/route.ts:POST:entry',
      message: 'cal-webhook hit',
      data: {
        hasWebhookSecret: !!webhookSecret,
        hasSeoBridge,
        hasCalApiKey: !!calApiKey,
        tenantSource,
        resolvedClientSlug,
      },
      timestamp: Date.now(),
    })
    // #endregion agent log

    // Verify webhook authenticity (secret chosen after JSON parse so Cal organizer.username can resolve tenant DB row).
    if (webhookSecret) {
      const ok = verifyCalWebhookSignature(rawBody, signature, webhookSecret)
      if (debugProd) {
        console.log('[cal-webhook][dbg] signature', {
          ok,
          hasSignatureHeader: !!signature,
          rawBodyLength: rawBody.length,
          tenantSource,
          resolvedClientSlug,
        })
      }
      // #region agent log
      debugLog({
        sessionId: DEBUG_SESSION_ID,
        runId: 'pre-fix',
        hypothesisId: 'H_sig',
        location: 'app/api/webhooks/cal/route.ts:POST:signature-check',
        message: 'signature verification result',
        data: { ok, hasSignatureHeader: !!signature, rawBodyLength: rawBody.length },
        timestamp: Date.now(),
      })
      // #endregion agent log
      if (!ok) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const { triggerEvent, payload } = event
    const idempotencyKey = `${triggerEvent}:${payload.uid}`

    const payloadAny = payload as unknown as {
      responses?: { attendeePhoneNumber?: string }
      attendees?: Array<{ phoneNumber?: string }>
    }

    if (debugProd) {
      console.log('[cal-webhook][dbg] parsed', {
        triggerEvent,
        uidSuffix: typeof payload?.uid === 'string' ? payload.uid.slice(-6) : null,
        hasResponsesPhone: !!payloadAny.responses?.attendeePhoneNumber,
        hasAttendeePhone: !!payloadAny.attendees?.[0]?.phoneNumber,
        hasSeoBridge,
        hasCalApiKey: !!calApiKey,
      })
    }

    // #region agent log
    debugLog({
      sessionId: DEBUG_SESSION_ID,
        runId: 'pre-fix',
        hypothesisId: 'H_event',
        location: 'app/api/webhooks/cal/route.ts:POST:after-parse',
        message: 'cal-webhook parsed event',
        data: {
          triggerEvent,
          hasUid: !!payload?.uid,
          uidSuffix: typeof payload?.uid === 'string' ? payload.uid.slice(-6) : null,
          hasResponsesPhone: !!payloadAny.responses?.attendeePhoneNumber,
          hasAttendeePhone: !!payloadAny.attendees?.[0]?.phoneNumber,
        },
        timestamp: Date.now(),
    })
    // #endregion agent log

    // Prevent duplicate processing
    if (processed.has(idempotencyKey)) {
      return NextResponse.json({ ok: true, duplicate: true })
    }
    processed.add(idempotencyKey)

    switch (triggerEvent) {
      case 'BOOKING_REQUESTED':
      case 'BOOKING_CREATED':
        if (hasResend) {
          await sendConfirmationEmail(payload)
        }
        const phone = extractPhoneFromCalPayload(payload)
        if (phone && hasSeoBridge) {
          try {
            const lockRecordResponse = await seoPlatformRequest('/api/internal/firebase/phone-lock-record', {
              method: 'POST',
              body: JSON.stringify({
                phone,
                bookingUid: payload.uid,
                clientSlug: CLIENT_SLUG,
                webpage: process.env.NEXT_PUBLIC_SITE_URL ?? 'closeby-demo-project',
              }),
            })
            void lockRecordResponse
          } catch (e) {
            if (debugProd) console.log('[cal-webhook][dbg] phone-lock bridge write failed', { error: e instanceof Error ? e.message : String(e) })
          }
        }
        // Schedule 24h reminder (best-effort in-process timer for local/demo usage).
        const reminderDelayMs = new Date(payload.startTime).getTime() - Date.now() - 24 * 3600 * 1000
        if (reminderDelayMs > 0 && hasResend) {
          setTimeout(() => sendReminderEmail(payload), reminderDelayMs)
        }
        break

      case 'BOOKING_CANCELLED':
        // No review email for cancelled bookings
        break

      case 'BOOKING_REJECTED':
        // Booking was declined/rejected (often by our anti-abuse flow). Do nothing.
        break

      case 'BOOKING_RESCHEDULED':
        if (hasResend) {
          await sendConfirmationEmail(payload)
        }
        break

      default:
        // BOOKING_CONFIRMED or other — schedule review request after session ends (best-effort in-process timer).
        const reviewDelayMs = getReviewEmailDelay(payload.endTime)
        if (reviewDelayMs > 0 && hasResend) {
          setTimeout(() => sendReviewRequestEmail(payload), reviewDelayMs)
        }
    }

    const res = NextResponse.json({ ok: true, event: triggerEvent })
    const calSessionToken = signCalSessionToken(payload.uid)
    if (calSessionToken) {
      res.cookies.set(CAL_SESSION_COOKIE, calSessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: CAL_SESSION_MAX_AGE,
      })
    }
    return res
  } catch (err) {
    console.error('[cal-webhook] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
