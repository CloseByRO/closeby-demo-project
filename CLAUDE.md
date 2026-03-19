@AGENTS.md
# CloseBy Demo — Cabinet Psihoterapie

## Stack
- Next.js 15 + React 18 + TypeScript strict
- Tailwind CSS cu design tokens custom (sage, clay, ink, cream)
- Cal.com embed (`@calcom/embed-react`) pentru booking
- Resend API pentru emailuri automate (confirmare, reminder 24h, review request)
- Google Maps iframe embed static (fără billing)
- schema.org LocalBusiness + MedicalBusiness + FAQPage

## Comenzi esențiale
```bash
npm run dev       # localhost:3000
npm run build     # production build
npm run lint      # eslint check
npx tsc --noEmit  # type check fără build
```

## Arhitectura critică
- `config/client.ts` — exportă `clientConfig` bazat pe `CLIENT_SLUG` env var
- `config/clients/demo.ts` — toate datele clientului demo (Dr. Ana Ionescu)
- Adaugi client nou: copiezi `demo.ts` → `client-001.ts`, adaugi în `config/client.ts`
- Deploy per client pe Vercel: același repo, `CLIENT_SLUG` diferit per proiect

## Convenții cod
- Server Components by default — `'use client'` DOAR pentru: FAQAccordion, Header, CookieBanner, BookingSection
- Path aliases: `@/*` → rădăcina proiectului
- Fonturi: Cormorant Garamond (serif, headings) + DM Sans (sans, body)
- `cn()` din `@/lib/utils` pentru className-uri condiționale

## Structura foldere
```
app/              → rute, layout, API routes
components/
  ui/             → Button, FAQAccordion, CookieBanner
  layout/         → Header, Footer, MobileBar
  sections/       → Hero, About, Services, Reviews, Booking, FAQ, Location, ProofStrip
  seo/            → SchemaLocalBusiness, SchemaFAQ, SchemaBreadcrumb
config/           → client.ts + clients/[slug].ts
lib/services/     → resend.ts, calcom.ts
types/            → client-config.ts, calcom.ts
```

## ENV vars necesare
```
CLIENT_SLUG=demo
RESEND_API_KEY=re_xxx
CAL_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza_xxx  # opțional, doar pentru Dynamic Maps
```

## Reguli importante
- Nu adăuga baze de date în Faza 1 (0–3 clienți) — Cal.com stochează programările
- Nu adăuga Zustand/Redux — site static, fără state global
- Nu adăuga dashboard/auth — acestea sunt Faza 3 (10+ clienți)
- Orice componentă nouă: verifici dacă are nevoie de `'use client'` înainte de a-l adăuga
- `npm install` necesită `--legacy-peer-deps` din cauza `@calcom/embed-react` (peer dep pe React 18)

## Context business
Proiect demo pentru pitch comercial CloseBy Studio — agenție digitală locală București.
Nișa: cabinete psihologie / psihoterapie Sector 3. Nu este un produs SaaS, este un template
customizabil per client, deployat separat pe Vercel pentru fiecare client.