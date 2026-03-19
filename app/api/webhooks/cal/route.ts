import { type NextRequest, NextResponse } from 'next/server'
import { verifyCalWebhookSignature, parseCalWebhookPayload, getReviewEmailDelay } from '@/lib/services/calcom'
import { sendConfirmationEmail, sendReminderEmail, sendReviewRequestEmail } from '@/lib/services/resend'

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

    const body = JSON.parse(rawBody)
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

    switch (triggerEvent) {
      case 'BOOKING_CREATED':
        await sendConfirmationEmail(payload)
        // Schedule 24h reminder (in production: use a queue like Upstash QStash)
        // For demo: fire-and-forget with setTimeout
        const reminderDelay = new Date(payload.startTime).getTime() - Date.now() - 24 * 3600 * 1000
        if (reminderDelay > 0) {
          setTimeout(() => sendReminderEmail(payload), reminderDelay)
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
        const reviewDelay = getReviewEmailDelay(payload.endTime)
        setTimeout(() => sendReviewRequestEmail(payload), reviewDelay)
    }

    return NextResponse.json({ ok: true, event: triggerEvent })
  } catch (err) {
    console.error('[cal-webhook] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
