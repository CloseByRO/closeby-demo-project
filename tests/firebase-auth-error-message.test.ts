import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { FirebaseError } from 'firebase/app'
import { formatFirebaseAuthError, formatVerifyPhoneApiError } from '../lib/firebase/authErrorMessage'

describe('formatFirebaseAuthError', () => {
  it('maps auth/invalid-verification-code', () => {
    const msg = formatFirebaseAuthError(new FirebaseError('auth/invalid-verification-code', 'x'), 'fallback')
    assert.ok(msg.includes('Codul SMS'))
    assert.notEqual(msg, 'fallback')
  })

  it('parses code from Firebase-style message string', () => {
    const msg = formatFirebaseAuthError(new Error('Firebase: Error (auth/too-many-requests).'), 'fallback')
    assert.equal(msg, 'Ai încercat să te conectezi de prea multe ori, revino peste 30 de minute.')
  })

  it('maps error-code:-39 in message', () => {
    const msg = formatFirebaseAuthError(new Error('Firebase: Error (auth/error-code:-39).'), 'fallback')
    assert.ok(msg.includes('SMS'))
  })

  it('uses fallback when not an auth error', () => {
    assert.equal(formatFirebaseAuthError(new Error('ECONNRESET'), 'fallback'), 'fallback')
  })
})

describe('formatVerifyPhoneApiError', () => {
  it('maps Phone mismatch to Romanian', () => {
    const msg = formatVerifyPhoneApiError('Phone mismatch', 'fallback')
    assert.ok(msg.includes('SMS'))
    assert.notEqual(msg, 'fallback')
  })

  it('maps Phone mismatch for Firebase token', () => {
    const msg = formatVerifyPhoneApiError('Phone mismatch for Firebase token', 'fallback')
    assert.ok(msg.includes('SMS'))
  })

  it('uses fallback for unknown API error string', () => {
    assert.equal(formatVerifyPhoneApiError('Some internal error', 'fallback'), 'fallback')
  })
})
