export const LOCAL_BOOKING_LOCK_KEY = 'closeby_booking_lock_until_v1'
export const LOCAL_BOOKING_LOCK_OVERRIDE_KEY = 'closeby_booking_lock_override_v1'
export const LOCAL_BOOKING_LOCK_TTL_MS = 24 * 60 * 60 * 1000

export type StorageLike = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export function readLockUntil(storage: StorageLike): number | null {
  const raw = storage.getItem(LOCAL_BOOKING_LOCK_KEY)
  if (!raw) return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  return n
}

export function writeLockUntil(storage: StorageLike, untilMs: number) {
  storage.setItem(LOCAL_BOOKING_LOCK_KEY, String(untilMs))
}

export function readOverrideAllowed(storage: StorageLike): boolean {
  return storage.getItem(LOCAL_BOOKING_LOCK_OVERRIDE_KEY) === '1'
}

export function writeOverrideAllowed(storage: StorageLike, allowed: boolean) {
  if (allowed) storage.setItem(LOCAL_BOOKING_LOCK_OVERRIDE_KEY, '1')
  else storage.removeItem(LOCAL_BOOKING_LOCK_OVERRIDE_KEY)
}

export function isLocallyLocked(nowMs: number, lockUntilMs: number | null, overrideAllowed: boolean): boolean {
  if (overrideAllowed) return false
  if (lockUntilMs === null) return false
  return nowMs < lockUntilMs
}

