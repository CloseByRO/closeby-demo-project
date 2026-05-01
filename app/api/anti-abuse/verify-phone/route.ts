import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'
import { seoPlatformRequest } from '@/lib/services/seoPlatform.js'

const BOOKING_SESSION_COOKIE = 'booking_verify_session'
const BOOKING_SESSION_MAX_AGE_SECONDS = 2 * 60 * 60
const BOOKING_SESSION_HMAC_HEX_RE = /^[0-9a-f]{64}$/i
const CLIENT_SLUG = String(process.env.CLIENT_SLUG ?? '').trim()

function getBookingSessionSecret(): string {
  return String(process.env.BOOKING_VERIFY_SESSION_SECRET ?? process.env.CAL_WEBHOOK_SECRET ?? '').trim()
}

function createBookingSessionValue(phone: string, expiresAtSeconds: number, secret: string): string {
  const payload = `${phone}.${expiresAtSeconds}`
  const signature = createHmac('sha256', secret).update(payload, 'utf8').digest('hex')
  return `${payload}.${signature}`
}

function verifyBookingSessionValue(rawValue: string, secret: string): { valid: boolean; phone?: string } {
  const lastDot = rawValue.lastIndexOf('.')
  if (lastDot <= 0 || lastDot >= rawValue.length - 1) return { valid: false }
  const payload = rawValue.slice(0, lastDot)
  const signatureHex = rawValue.slice(lastDot + 1)
  if (!BOOKING_SESSION_HMAC_HEX_RE.test(signatureHex)) return { valid: false }

  const payloadLastDot = payload.lastIndexOf('.')
  if (payloadLastDot <= 0 || payloadLastDot >= payload.length - 1) return { valid: false }
  const phone = payload.slice(0, payloadLastDot)
  const expiresAtRaw = payload.slice(payloadLastDot + 1)
  const expiresAtSeconds = Number(expiresAtRaw)
  if (!Number.isFinite(expiresAtSeconds)) return { valid: false }
  if (Math.floor(Date.now() / 1000) >= expiresAtSeconds) return { valid: false }

  const expectedHex = createHmac('sha256', secret).update(payload, 'utf8').digest('hex')
  const provided = Buffer.from(signatureHex, 'hex')
  const expected = Buffer.from(expectedHex, 'hex')
  if (provided.length !== expected.length) return { valid: false }
  if (!timingSafeEqual(provided, expected)) return { valid: false }
  return { valid: true, phone }
}

export async function GET() {
  try {
    const secret = getBookingSessionSecret()
    if (!secret) return NextResponse.json({ verified: false }, { status: 200 })

    const cookieStore = await cookies()
    const value = cookieStore.get(BOOKING_SESSION_COOKIE)?.value
    if (!value) return NextResponse.json({ verified: false }, { status: 200 })

    const result = verifyBookingSessionValue(value, secret)
    if (!result.valid) return NextResponse.json({ verified: false }, { status: 200 })
    if (result.phone) {
      const lockResponse = await seoPlatformRequest('/api/internal/firebase/phone-lock-status', {
        method: 'POST',
        body: JSON.stringify({ phone: result.phone, clientSlug: CLIENT_SLUG }),
      })
      const lockData = (await lockResponse.json().catch(() => null)) as { locked?: boolean; createdAt?: string; phone?: string } | null
      if (lockResponse.ok && lockData?.locked) {
        return NextResponse.json({ verified: false, locked: true, createdAt: lockData.createdAt, phone: lockData.phone ?? result.phone }, { status: 200 })
      }
    }

    return NextResponse.json({ verified: true, phone: result.phone }, { status: 200 })
  } catch {
    return NextResponse.json({ verified: false }, { status: 200 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const idToken = typeof body?.idToken === 'string' ? body.idToken : ''
    const phoneRaw = typeof body?.phone === 'string' ? body.phone : ''

    if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
    if (!phoneRaw) return NextResponse.json({ error: 'Missing phone' }, { status: 400 })

    const lockResponse = await seoPlatformRequest('/api/internal/firebase/phone-lock-status', {
      method: 'POST',
      body: JSON.stringify({ phone: phoneRaw, clientSlug: CLIENT_SLUG }),
    })
    const lockData = (await lockResponse.json().catch(() => null)) as { locked?: boolean; createdAt?: string } | null
    if (lockResponse.ok && lockData?.locked) {
      return NextResponse.json({ locked: true, createdAt: lockData.createdAt }, { status: 200 })
    }

    const response = await seoPlatformRequest('/api/internal/firebase/verify-phone', {
      method: 'POST',
      body: JSON.stringify({ idToken, phone: phoneRaw }),
    })
    const data = await response.json().catch(() => null)
    if (!response.ok) {
      return NextResponse.json(
        { verified: false, locked: false, error: data?.error ?? 'Verification failed' },
        { status: response.status },
      )
    }

    const responsePayload = { verified: true, locked: false, phone: data?.phone ?? phoneRaw }
    const responseOut = NextResponse.json(responsePayload)
    const secret = getBookingSessionSecret()
    if (secret) {
      const expiresAtSeconds = Math.floor(Date.now() / 1000) + BOOKING_SESSION_MAX_AGE_SECONDS
      const sessionValue = createBookingSessionValue(responsePayload.phone, expiresAtSeconds, secret)
      responseOut.cookies.set(BOOKING_SESSION_COOKIE, sessionValue, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: BOOKING_SESSION_MAX_AGE_SECONDS,
      })
    }
    return responseOut
  } catch (e) {
    return NextResponse.json(
      { verified: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    )
  }
}
