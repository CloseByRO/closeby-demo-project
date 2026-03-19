import { type NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import clientConfig from '@/config/client'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("RESEND_API_KEY is not set")
  return new Resend(key)
}

// Simple rate limiting per IP
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 60_000 // 1 request per minute per IP

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    const lastRequest = rateLimitMap.get(ip) ?? 0

    if (Date.now() - lastRequest < RATE_LIMIT_MS) {
      return NextResponse.json({ error: 'Prea multe cereri. Așteptați un minut.' }, { status: 429 })
    }
    rateLimitMap.set(ip, Date.now())

    const { name, email, message, gdprConsent } = await req.json()

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Câmpuri obligatorii lipsă.' }, { status: 400 })
    }
    if (!gdprConsent) {
      return NextResponse.json({ error: 'Consimțământ GDPR necesar.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Adresă de email invalidă.' }, { status: 400 })
    }

    // Send to therapist
    await getResend().emails.send({
      from: `Site Cabinet <noreply@${new URL(clientConfig.website).host}>`,
      to: clientConfig.email,
      replyTo: email,
      subject: `Mesaj nou de la ${name} — Cabinet ${clientConfig.shortName}`,
      html: `
        <h2>Mesaj nou de pe site</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="font-size:12px;color:#999">
          Consimțământ GDPR: Da ·
          Procesat de ${clientConfig.gdpr.dataProcessorName} ·
          Servere ${clientConfig.gdpr.serverLocation}
        </p>
      `,
    })

    // Send confirmation to sender
    await getResend().emails.send({
      from: `${clientConfig.shortName} <noreply@${new URL(clientConfig.website).host}>`,
      to: email,
      subject: `Am primit mesajul tău — ${clientConfig.shortName}`,
      html: `
        <p>Bună ziua, ${name},</p>
        <p>Am primit mesajul tău și voi reveni cu un răspuns în maxim 24 de ore.</p>
        <p>Cu respect,<br>${clientConfig.shortName}</p>
        <p style="font-size:12px;color:#999">
          ${clientConfig.address.street}, ${clientConfig.address.sector}, ${clientConfig.address.city} ·
          ${clientConfig.phoneDisplay}
        </p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Error:', err)
    return NextResponse.json({ error: 'Eroare internă. Vă rugăm să ne contactați telefonic.' }, { status: 500 })
  }
}
