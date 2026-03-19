import { Resend } from 'resend'
import type { CalBookingData } from '@/types/calcom'
import clientConfig from '@/config/client'

// Lazy init — avoids build-time crash when RESEND_API_KEY is not set
function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

const FROM = `${clientConfig.shortName} <noreply@${clientConfig.website.replace('https://', '')}>`

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Bucharest',
  })
}

export async function sendConfirmationEmail(booking: CalBookingData) {
  const attendee = booking.attendees[0]
  if (!attendee) throw new Error(`No attendee in booking ${booking.uid}`)
  const dateTime = formatDateTime(booking.startTime)

  await getResend().emails.send({
    from: FROM,
    to: attendee.email,
    subject: `✓ Programarea ta a fost confirmată — ${dateTime}`,
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f4;">
        <div style="background: #4d7a5e; padding: 32px 40px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; font-family: Georgia, serif; font-size: 24px; margin: 0;">
            Programarea ta a fost confirmată ✓
          </h1>
        </div>
        <div style="background: white; padding: 32px 40px; border-radius: 0 0 12px 12px;">
          <p style="color: #3d4a3a; font-size: 16px;">Bună ziua, ${attendee.name},</p>
          <p style="color: #6b7868;">Te așteptăm cu drag. Iată detaliile programării tale:</p>

          <div style="background: #f0f5f2; border-radius: 8px; padding: 20px 24px; margin: 24px 0;">
            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7868;">Data și ora</p>
            <p style="margin: 0; font-size: 18px; font-weight: 500; color: #1a2018;">${dateTime}</p>
          </div>

          <div style="background: #f0f5f2; border-radius: 8px; padding: 20px 24px; margin: 16px 0;">
            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7868;">Locație</p>
            <p style="margin: 0; font-size: 15px; color: #1a2018;">
              ${clientConfig.address.street}, ${clientConfig.address.sector}, ${clientConfig.address.city}
            </p>
          </div>

          <p style="color: #6b7868; font-size: 14px; line-height: 1.6;">
            Dacă nu mai poți ajunge, te rugăm să anulezi cu cel puțin 24 de ore înainte.
          </p>

          <p style="color: #a8b4a5; font-size: 12px; margin-top: 32px; border-top: 1px solid #e4eee8; padding-top: 16px;">
            Date procesate de ${clientConfig.gdpr.dataProcessorName} · Servere ${clientConfig.gdpr.serverLocation} · GDPR compliant
          </p>
        </div>
      </div>
    `,
  })
}

export async function sendReminderEmail(booking: CalBookingData) {
  const attendee = booking.attendees[0]
  if (!attendee) throw new Error(`No attendee in booking ${booking.uid}`)
  const dateTime = formatDateTime(booking.startTime)

  await getResend().emails.send({
    from: FROM,
    to: attendee.email,
    subject: `Mâine te așteptăm — ${dateTime}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #4d7a5e; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">Reminder ședință — mâine</h2>
        </div>
        <div style="background: white; padding: 24px 32px; border-radius: 0 0 12px 12px;">
          <p>Bună ziua, ${attendee.name},</p>
          <p>Îți amintim că mâine ai o ședință programată la <strong>${dateTime}</strong>.</p>
          <p>Te așteptăm la ${clientConfig.address.street}.</p>
          <p style="font-size: 13px; color: #6b7868;">
            Dacă nu mai poți ajunge, te rugăm să ne anunți cât mai curând.
            <a href="tel:${clientConfig.phone}">📞 ${clientConfig.phoneDisplay}</a>
          </p>
        </div>
      </div>
    `,
  })
}

export async function sendReviewRequestEmail(booking: CalBookingData) {
  const attendee = booking.attendees[0]
  if (!attendee) throw new Error(`No attendee in booking ${booking.uid}`)

  await getResend().emails.send({
    from: FROM,
    to: attendee.email,
    subject: `Cum a fost ședința? Lasă-ne o recenzie`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #4d7a5e; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">Mulțumim că ai ales cabinetul nostru 🌿</h2>
        </div>
        <div style="background: white; padding: 24px 32px; border-radius: 0 0 12px 12px;">
          <p>Bună ziua, ${attendee.name},</p>
          <p>Sperăm că ședința de azi ți-a fost de folos. Dacă dorești, poți lăsa o recenzie pe Google — ne ajută enorm și pe alți oameni să ne găsească.</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${clientConfig.integrations.reviewLink}"
               style="background: #4d7a5e; color: white; padding: 14px 28px; border-radius: 100px; text-decoration: none; font-weight: 500; display: inline-block;">
              ★ Lasă o recenzie Google
            </a>
          </div>
          <p style="font-size: 13px; color: #a8b4a5;">
            Recenzia este complet opțională. Nu ești obligat să menționezi detalii clinice — poți lăsa feedback despre programare, cabinet sau profesionalism.
          </p>
        </div>
      </div>
    `,
  })
}
