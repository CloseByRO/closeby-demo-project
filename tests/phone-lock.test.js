import test from 'node:test'
import assert from 'node:assert/strict'

import { normalizePhone, extractPhoneFromCalPayload } from '../lib/antiAbuse/phone.js'

test('normalizePhone normalizes 00-prefix to + and strips formatting', () => {
  assert.equal(normalizePhone('  00 40 (765) 265-839 '), '+40765265839')
  assert.equal(normalizePhone('+40 765 265 839'), '+40765265839')
})

test('extractPhoneFromCalPayload prefers responses.attendeePhoneNumber', () => {
  const payload = {
    responses: { attendeePhoneNumber: '+40765265839' },
    attendees: [{ phoneNumber: '+40000000000' }],
  }
  assert.equal(extractPhoneFromCalPayload(payload), '+40765265839')
})

test('extractPhoneFromCalPayload falls back to attendees[0].phoneNumber', () => {
  const payload = {
    attendees: [{ phoneNumber: '00 40 765 265 839' }],
  }
  assert.equal(extractPhoneFromCalPayload(payload), '+40765265839')
})

