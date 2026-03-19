# CloseBy Demo — Cabinet Psihoterapie

Site Next.js 14 complet funcțional pentru cabinet de psihologie / psihoterapie din București.
Construit ca demo pentru pitchuri comerciale CloseBy Studio.

## Stack

| Layer | Tehnologie |
|-------|-----------|
| Framework | Next.js 14 (App Router, TypeScript strict) |
| Styling | Tailwind CSS cu design tokens custom |
| Booking | Cal.com EU embed (`@calcom/embed-react`) |
| Email | Resend API (confirmare, reminder 24h, review request) |
| Maps | Google Maps Embed (iframe static — gratuit, fără billing) |
| SEO | schema.org LocalBusiness + MedicalBusiness + FAQPage |
| Hosting | Vercel Pro (deploy per client din același repo) |
| Fonts | Cormorant Garamond + DM Sans (next/font, zero CLS) |

## Structură foldere

```
closeby-demo/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, metadata, schema.org
│   ├── page.tsx                  # Home: toate secțiunile
│   ├── sitemap.ts                # Sitemap dinamic
│   ├── robots.ts                 # Robots.txt
│   └── api/
│       ├── webhooks/cal/route.ts # Cal.com → Resend email automation
│       └── contact/route.ts      # Formular contact cu rate limiting
├── components/
│   ├── ui/                       # Atomi: Button, FAQAccordion, CookieBanner
│   ├── layout/                   # Header, Footer, MobileBar
│   ├── sections/                 # Hero, About, Services, Reviews, Booking, FAQ, Location, ProofStrip
│   └── seo/                      # SchemaLocalBusiness, SchemaFAQ, SchemaBreadcrumb
├── config/
│   ├── client.ts                 # Exportă clientConfig bazat pe CLIENT_SLUG env var
│   └── clients/
│       └── demo.ts               # Dr. Ana Ionescu — date complete
├── lib/
│   ├── utils.ts                  # cn(), formatPrice(), formatDuration(), buildCalComUrl()
│   └── services/
│       ├── resend.ts             # sendConfirmationEmail, sendReminderEmail, sendReviewRequestEmail
│       └── calcom.ts             # verifyCalWebhookSignature, parseCalWebhookPayload
└── types/
    ├── client-config.ts          # ClientConfig, Service, FAQ, Review, OpeningHours
    └── calcom.ts                 # CalWebhookPayload, CalBookingData
```

## Setup în 5 minute

### 1. Clonează și instalează

```bash
git clone <repo> closeby-demo
cd closeby-demo
npm install
```

### 2. Configurează variabilele de mediu

```bash
cp .env.local.example .env.local
# Editează .env.local cu cheile tale reale
```

### 3. Rulează local

```bash
npm run dev
# http://localhost:3000
```

### 4. Customizează pentru un client nou

```bash
# Copiază fișierul demo și editează-l
cp config/clients/demo.ts config/clients/client-001.ts
# Editează toate câmpurile în client-001.ts
# Adaugă în config/client.ts: 'client-001': client001Config
```

### 5. Deploy pe Vercel

```bash
# Un proiect Vercel per client
vercel --prod
# Setezi în Vercel Dashboard: CLIENT_SLUG=client-001
```

## Cal.com Setup

1. Creează cont pe **cal.com** (instanța EU: selectezi EU la înregistrare)
2. Creează event types: `consultatie-initiala` (30 min), `sedinta-individuala` (50 min), `terapie-cuplu` (75 min)
3. Settings → Developer → Webhooks → Adaugă `https://[domeniu]/api/webhooks/cal`
4. Copiază webhook secret în `CAL_WEBHOOK_SECRET`
5. Actualizează `calComUsername` în `config/clients/[client].ts`

## Resend Setup

1. Creează cont pe **resend.com**
2. Domains → Add Domain → adaugă domeniu client (ex: `ana-ionescu-psiholog.ro`)
3. Adaugă DNS records DKIM + SPF + DMARC conform instrucțiunilor Resend
4. API Keys → Create → copiază în `RESEND_API_KEY`
5. Verifică deliverability cu **mail-tester.com** (scor țintă: ≥ 9/10)

## Google Maps Embed

Nu necesită billing activat. Generezi URL-ul de embed din Google Maps:
1. Caută adresa pe maps.google.com
2. Share → Embed a map → copiază URL-ul din `src=""`
3. Lipești în `config/clients/[client].ts` → `address.mapsEmbedUrl`

## Adăugare client nou (checklist)

- [ ] Crezi `config/clients/[slug].ts` cu toate câmpurile completate
- [ ] Adaugi în `config/client.ts` maparea slug → config
- [ ] Creezi cont Cal.com EU cu username-ul clientului
- [ ] Configurezi event types în Cal.com
- [ ] Adaugi domeniu în Resend + DNS records
- [ ] Copiezi URL Maps embed pentru adresă
- [ ] Creezi proiect nou în Vercel cu `CLIENT_SLUG=[slug]`
- [ ] Setezi domeniu custom în Vercel
- [ ] Testezi booking end-to-end + emailuri

## Performance țintă

| Metric | Țintă |
|--------|-------|
| PageSpeed Mobile | ≥ 90 |
| LCP | < 2.5s |
| CLS | 0 |
| INP | < 200ms |
| mail-tester.com | ≥ 9/10 |

## GDPR

- Date de programare stocate pe serverele Cal.com EU (Frankfurt)
- Emailuri procesate prin Resend (servere EU disponibile)
- Nu se stochează date clinice sau diagnostice
- Cookie banner cu accept/decline
- DPA semnat cu fiecare client înainte de lansare

---

Construit cu ❤️ de **CloseBy Studio** · București 2026
