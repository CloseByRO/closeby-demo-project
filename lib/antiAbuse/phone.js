export function normalizePhone(raw) {
  const trimmed = String(raw ?? '').trim()
  if (!trimmed) return ''

  const cleaned = trimmed.replace(/[^\d+]/g, '')
  if (!cleaned) return ''

  if (cleaned.startsWith('00')) return `+${cleaned.slice(2)}`
  return cleaned
}

export function extractPhoneFromCalPayload(payload) {
  const fromResponses = payload?.responses?.attendeePhoneNumber
  if (typeof fromResponses === 'string' && fromResponses.trim()) return normalizePhone(fromResponses)

  const attendeePhone = payload?.attendees?.[0]?.phoneNumber
  if (typeof attendeePhone === 'string' && attendeePhone.trim()) return normalizePhone(attendeePhone)

  return ''
}

