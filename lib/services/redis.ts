import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

type PhoneLockValue = {
  phone: string
  bookingUid: string
  webpage: string
  createdAt: string
}

const PHONE_LOCK_TTL_SECONDS = 24 * 60 * 60

function normalizeToE164(rawPhone: string): string {
  const cleaned = String(rawPhone ?? '').trim().replace(/[^\d+]/g, '')
  if (!cleaned) return ''
  if (cleaned.startsWith('+')) return cleaned
  if (cleaned.startsWith('00')) return `+${cleaned.slice(2)}`
  if (cleaned.startsWith('40') && cleaned.length === 11) return `+${cleaned}`
  if (cleaned.startsWith('0') && cleaned.length === 10) return `+4${cleaned}`
  return ''
}

function getPhoneLockKey(rawPhone: string): string {
  const normalizedPhone = normalizeToE164(rawPhone)
  if (!normalizedPhone) {
    throw new Error('Invalid phone')
  }
  return `phone_lock:${normalizedPhone}`
}

export async function lockPhone(phone: string, bookingUid: string): Promise<void> {
  const normalizedPhone = normalizeToE164(phone)
  if (!normalizedPhone) {
    throw new Error('Invalid phone')
  }
  if (!bookingUid.trim()) {
    throw new Error('Invalid bookingUid')
  }

  const value: PhoneLockValue = {
    phone: normalizedPhone,
    bookingUid: bookingUid.trim(),
    webpage: process.env.NEXT_PUBLIC_SITE_URL ?? '',
    createdAt: new Date().toISOString(),
  }

  await redis.set(getPhoneLockKey(normalizedPhone), value, { ex: PHONE_LOCK_TTL_SECONDS })
}

export async function checkPhoneLock(phone: string): Promise<{ locked: true; createdAt: string } | { locked: false }> {
  const key = getPhoneLockKey(phone)
  const value = await redis.get<PhoneLockValue | null>(key)
  if (!value) {
    return { locked: false }
  }

  return { locked: true, createdAt: value.createdAt }
}
