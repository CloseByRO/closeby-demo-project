import { createHmac } from 'crypto'
import type { CalWebhookPayload } from '@/types/calcom'

export function verifyCalWebhookSignature(
  body: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false
  const expected = createHmac('sha256', secret).update(body).digest('hex')
  return signature === expected
}

export function parseCalWebhookPayload(body: unknown): CalWebhookPayload | null {
  try {
    const payload = body as CalWebhookPayload
    if (!payload.triggerEvent || !payload.payload) return null
    return payload
  } catch {
    return null
  }
}

// Schedule review email ~2h after session ends
export function getReviewEmailDelay(endTime: string): number {
  const end = new Date(endTime).getTime()
  const now = Date.now()
  const delay = end + 2 * 60 * 60 * 1000 - now
  return Math.max(delay, 0)
}
