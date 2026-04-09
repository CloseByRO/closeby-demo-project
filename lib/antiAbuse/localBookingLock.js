export const LOCAL_BOOKING_LOCK_KEY = 'closeby_booking_lock_until_v1'
export const LOCAL_BOOKING_LOCK_OVERRIDE_KEY = 'closeby_booking_lock_override_v1'
export const LOCAL_BOOKING_LOCK_TTL_MS = 24 * 60 * 60 * 1000

export function readLockUntil(storage) {
  const raw = storage.getItem(LOCAL_BOOKING_LOCK_KEY)
  if (!raw) return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  return n
}

export function writeLockUntil(storage, untilMs) {
  storage.setItem(LOCAL_BOOKING_LOCK_KEY, String(untilMs))
}

export function readOverrideAllowed(storage) {
  return storage.getItem(LOCAL_BOOKING_LOCK_OVERRIDE_KEY) === '1'
}

export function writeOverrideAllowed(storage, allowed) {
  if (allowed) storage.setItem(LOCAL_BOOKING_LOCK_OVERRIDE_KEY, '1')
  else storage.removeItem(LOCAL_BOOKING_LOCK_OVERRIDE_KEY)
}

export function isLocallyLocked(nowMs, lockUntilMs, overrideAllowed) {
  if (overrideAllowed) return false
  if (lockUntilMs === null) return false
  return nowMs < lockUntilMs
}

