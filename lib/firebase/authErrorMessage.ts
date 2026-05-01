import { FirebaseError } from 'firebase/app'

/** Maps Firebase Auth `auth/*` codes to short Romanian messages for booking phone verification. */
const AUTH_MESSAGES_RO: Record<string, string> = {
  'auth/invalid-verification-code': 'Codul SMS este greșit. Verifică și încearcă din nou.',
  'auth/invalid-verification-id': 'Sesiunea de verificare nu mai este validă. Solicită un cod nou prin SMS.',
  'auth/code-expired': 'Codul a expirat. Solicită un cod nou prin SMS.',
  'auth/session-expired': 'Sesiunea a expirat. Solicită un cod nou prin SMS.',
  'auth/invalid-phone-number': 'Numărul de telefon nu este valid. Folosește formatul internațional (ex. +40…).',
  'auth/missing-phone-number': 'Lipsește numărul de telefon.',
  'auth/quota-exceeded': 'Limita de SMS pentru acest proiect a fost atinsă. Încearcă mai târziu sau contactează-ne direct.',
  'auth/captcha-check-failed': 'Verificarea de securitate (reCAPTCHA) a eșuat. Reîncarcă pagina și încearcă din nou.',
  'auth/too-many-requests': 'Ai încercat să te conectezi de prea multe ori, revino peste 30 de minute.',
  'auth/network-request-failed': 'Problema de rețea. Verifică conexiunea și încearcă din nou.',
  'auth/unauthorized-domain': 'Acest site nu este autorizat pentru autentificare. Contactează administratorul.',
  'auth/operation-not-allowed': 'Autentificarea prin telefon nu este activată în proiect.',
  'auth/invalid-app-credential': 'Configurația aplicației nu este acceptată. Verifică domeniul autorizat și cheile Firebase.',
  'auth/invalid-api-key': 'Cheie API Firebase nevalidă.',
  'auth/app-not-authorized': 'Aplicația nu este autorizată să folosească Firebase Auth.',
  'auth/internal-error': 'Eroare temporară la server. Încearcă din nou peste câteva minute.',
  'auth/missing-client-identifier': 'Lipsește identificatorul clientului (de ex. domeniu neautorizat sau mediu nepermis).',
  'auth/user-disabled': 'Acest cont a fost dezactivat.',
  'auth/web-storage-unsupported': 'Browserul blochează stocarea necesară pentru autentificare. Dezactivează modul privat sau încearcă alt browser.',
  'auth/popup-blocked': 'Fereastra de verificare a fost blocată. Permite pop-up-uri pentru acest site.',
  'auth/popup-closed-by-user': 'Fereastra de verificare s-a închis înainte de finalizare.',
  'auth/credential-already-in-use': 'Acest număr este deja folosit de un alt cont.',
  'auth/invalid-credential': 'Datele de autentificare nu sunt valide. Solicită un cod nou.',
  // Internal / SMS pipeline (often 503); same string as SDK `code` when shown as auth/error-code:-39
  'auth/error-code:-39':
    'Nu s-a putut trimite SMS-ul (serviciu indisponibil sau restricție temporară). Încearcă mai târziu sau sună direct.',
}

const GENERIC_AUTH_RO =
  'A apărut o problemă la verificarea telefonului. Încearcă din nou sau contactează-ne direct.'

function extractAuthCodeFromMessage(message: string): string | null {
  const inParens = message.match(/\(auth\/[^)]+\)/)
  if (inParens) return inParens[0].slice(1, -1)
  const tail = message.match(/auth\/[\w./:-]+/)
  return tail ? tail[0] : null
}

function getFirebaseAuthErrorCode(error: unknown): string | null {
  if (error instanceof FirebaseError && typeof error.code === 'string') {
    return error.code
  }
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const c = (error as { code: unknown }).code
    if (typeof c === 'string' && c.startsWith('auth/')) return c
  }
  if (error instanceof Error && error.message) {
    return extractAuthCodeFromMessage(error.message)
  }
  return null
}

/**
 * User-facing Romanian message for Firebase Auth errors during phone sign-in / OTP.
 * @param fallbackRo — used when the error is not a known Firebase Auth error
 */
export function formatFirebaseAuthError(error: unknown, fallbackRo: string): string {
  const code = getFirebaseAuthErrorCode(error)
  if (code && AUTH_MESSAGES_RO[code]) {
    return AUTH_MESSAGES_RO[code]
  }
  if (error instanceof Error && /error-code:-39/.test(error.message)) {
    return AUTH_MESSAGES_RO['auth/error-code:-39'] ?? GENERIC_AUTH_RO
  }
  if (code?.startsWith('auth/')) {
    return GENERIC_AUTH_RO
  }
  return fallbackRo
}

/** Backend strings from `/api/anti-abuse/verify-phone` and related proxies (English) → Romanian UI. */
const VERIFY_PHONE_API_MESSAGES_RO: Record<string, string> = {
  'Phone mismatch':
    'Numărul confirmat prin SMS nu coincide cu cel introdus. Folosește același număr sau revino și cere un cod nou.',
  'Phone mismatch for Firebase token':
    'Numărul confirmat prin SMS nu coincide cu cel introdus. Folosește același număr sau revino și cere un cod nou.',
  'Invalid phone': 'Numărul de telefon nu este valid. Folosește formatul internațional (ex. +40…).',
  'Token has no phone_number':
    'Sesiunea de verificare nu conține numărul de telefon. Solicită un cod SMS nou și încearcă din nou.',
  'Phone verification failed':
    'Verificarea telefonului nu s-a putut confirma. Asigură-te că folosești același număr ca la primirea SMS-ului.',
  'Missing idToken': 'Lipsește sesiunea de verificare. Reîncarcă pagina și încearcă din nou.',
  'Missing phone': 'Lipsește numărul de telefon.',
  'Verification failed': 'Verificarea a eșuat.',
  'Lock check failed': 'Nu am putut verifica starea numărului. Încearcă din nou.',
  Unauthorized: 'Acces neautorizat. Reîncarcă pagina și încearcă din nou.',
}

/**
 * Maps known `error` strings returned by anti-abuse verify / phone-lock API routes to Romanian.
 * Unknown strings fall back to `fallbackRo` so raw English server messages are not shown.
 */
export function formatVerifyPhoneApiError(error: string | undefined | null, fallbackRo: string): string {
  if (!error?.trim()) return fallbackRo
  const key = error.trim()
  return VERIFY_PHONE_API_MESSAGES_RO[key] ?? fallbackRo
}
