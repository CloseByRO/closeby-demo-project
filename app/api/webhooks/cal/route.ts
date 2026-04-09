import { type NextRequest, NextResponse } from 'next/server'
import { verifyCalWebhookSignature, parseCalWebhookPayload, getReviewEmailDelay } from '@/lib/services/calcom'
import { sendConfirmationEmail, sendReminderEmail, sendReviewRequestEmail } from '@/lib/services/resend'
import clientConfig from '@/config/client'
import { buildPublicBaseUrl, qstashPublishJSON } from '@/lib/services/qstash'
import { extractPhoneFromCalPayload } from '@/lib/antiAbuse/phone.js'
import { redisSetIfNotExists } from '@/lib/services/upstashRedis'
import { declineCalBookingByUid } from '@/lib/services/calApi'

const WEBHOOK_SECRET = process.env.CAL_WEBHOOK_SECRET ?? ''

// Simple in-memory idempotency (use Redis/KV in production)
const processed = new Set<string>()

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-cal-signature-256')

    // Verify webhook authenticity
    if (WEBHOOK_SECRET && !verifyCalWebhookSignature(rawBody, signature, WEBHOOK_SECRET)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

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

    const { triggerEvent, payload } = event
    const idempotencyKey = `${triggerEvent}:${payload.uid}`

    // Prevent duplicate processing
    if (processed.has(idempotencyKey)) {
      return NextResponse.json({ ok: true, duplicate: true })
    }
    processed.add(idempotencyKey)

    // Durable idempotency (recommended for serverless): only if Upstash is configured.
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const processedKey = `processed:webhook:${idempotencyKey}`
      const firstTime = await redisSetIfNotExists({
        key: processedKey,
        value: { at: new Date().toISOString() },
        ttlSeconds: 48 * 60 * 60,
      })
      if (!firstTime) {
        return NextResponse.json({ ok: true, duplicate: true, durable: true })
      }
    }

    switch (triggerEvent) {
      case 'BOOKING_REQUESTED':
      case 'BOOKING_CREATED':
        // Phone lock (Phase 1): best-effort spam protection; requires Upstash + Cal API key.
        const phone = extractPhoneFromCalPayload(payload)
        if (phone && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
          const lockKey = `lock:phone:${phone}`
          const acquired = await redisSetIfNotExists({
            key: lockKey,
            value: { uid: payload.uid, createdAt: new Date().toISOString() },
            ttlSeconds: 24 * 60 * 60,
          })

          if (!acquired) {
            try {
              if (process.env.CAL_API_KEY) {
                await declineCalBookingByUid({
                  bookingUid: payload.uid,
                  reason: 'Duplicate booking request (phone locked for 24h)',
                })
              } else {
                console.warn('[cal-webhook] Duplicate phone lock but CAL_API_KEY missing; cannot auto-decline', {
                  phone,
                  uid: payload.uid,
                })
              }
            } catch (e) {
              console.error('[cal-webhook] Failed to auto-decline duplicate booking', e)
            }

            // Always ack; do not send emails / schedule jobs for duplicates.
            return NextResponse.json({ ok: true, phoneLocked: true })
          }
        }

        await sendConfirmationEmail(payload)
        // Schedule 24h reminder using QStash (durable scheduling on Vercel)
        const reminderDelayMs = new Date(payload.startTime).getTime() - Date.now() - 24 * 3600 * 1000
        if (reminderDelayMs > 0 && process.env.QSTASH_TOKEN) {
          const baseUrl = buildPublicBaseUrl(clientConfig.website)
          await qstashPublishJSON({
            url: `${baseUrl}/api/jobs/send-reminder`,
            body: payload,
            delayMs: reminderDelayMs,
          })
        } else if (reminderDelayMs > 0) {
          // Fallback (demo/dev): best-effort in-process timer
          setTimeout(() => sendReminderEmail(payload), reminderDelayMs)
        }
        break

      case 'BOOKING_CANCELLED':
        // No review email for cancelled bookings
        break

      case 'BOOKING_RESCHEDULED':
        await sendConfirmationEmail(payload)
        break

      default:
        // BOOKING_CONFIRMED or other — schedule review request after session ends
        const reviewDelayMs = getReviewEmailDelay(payload.endTime)
        if (reviewDelayMs > 0 && process.env.QSTASH_TOKEN) {
          const baseUrl = buildPublicBaseUrl(clientConfig.website)
          await qstashPublishJSON({
            url: `${baseUrl}/api/jobs/send-review-request`,
            body: payload,
            delayMs: reviewDelayMs,
          })
        } else {
          setTimeout(() => sendReviewRequestEmail(payload), reviewDelayMs)
        }
    }

    return NextResponse.json({ ok: true, event: triggerEvent })
  } catch (err) {
    console.error('[cal-webhook] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
