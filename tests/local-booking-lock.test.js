import test from 'node:test'
import assert from 'node:assert/strict'

import {
  LOCAL_BOOKING_LOCK_KEY,
  LOCAL_BOOKING_LOCK_OVERRIDE_KEY,
  readLockUntil,
  writeLockUntil,
  readOverrideAllowed,
  writeOverrideAllowed,
  isLocallyLocked,
} from '../lib/antiAbuse/localBookingLock.js'

function makeStorage() {
  /** @type {Record<string, string>} */
  const store = {}
  return {
    store,
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v) },
    removeItem: (k) => { delete store[k] },
  }
}

test('readLockUntil returns null for missing/invalid values', () => {
  const s = makeStorage()
  assert.equal(readLockUntil(s), null)
  s.setItem(LOCAL_BOOKING_LOCK_KEY, 'not-a-number')
  assert.equal(readLockUntil(s), null)
})

test('writeLockUntil stores numeric timestamp', () => {
  const s = makeStorage()
  writeLockUntil(s, 12345)
  assert.equal(s.getItem(LOCAL_BOOKING_LOCK_KEY), '12345')
  assert.equal(readLockUntil(s), 12345)
})

test('override flag read/write works', () => {
  const s = makeStorage()
  assert.equal(readOverrideAllowed(s), false)
  writeOverrideAllowed(s, true)
  assert.equal(s.getItem(LOCAL_BOOKING_LOCK_OVERRIDE_KEY), '1')
  assert.equal(readOverrideAllowed(s), true)
  writeOverrideAllowed(s, false)
  assert.equal(s.getItem(LOCAL_BOOKING_LOCK_OVERRIDE_KEY), null)
  assert.equal(readOverrideAllowed(s), false)
})

test('isLocallyLocked respects override and time', () => {
  const now = 1000
  assert.equal(isLocallyLocked(now, null, false), false)
  assert.equal(isLocallyLocked(now, 2000, false), true)
  assert.equal(isLocallyLocked(now, 500, false), false)
  assert.equal(isLocallyLocked(now, 2000, true), false)
})

