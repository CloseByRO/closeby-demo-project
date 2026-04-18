<!-- BEGIN:nextjs-agent-rules -->
# CloseBy Demo — Cabinet Psihoterapie

## Instrucțiuni pentru agent
- Când modifici un fișier, nu regenera arhiva ZIP — dai doar fișierul modificat
- Când adaugi o componentă nouă, urmezi structura existentă din folderul corespunzător
- Verifici întotdeauna cu `npx tsc --noEmit` înainte de a declara o modificare completă
- Nu instala pachete noi fără a verifica compatibilitatea cu `@calcom/embed-react` (React 18 peer dep)
- `clientConfig` vine din `@/config/client` (sync: static + env public); UI booking folosește `useMergedClientConfig()` din layout (`getMergedClientConfig()` = DB → env → static)
- Toate prețurile și textele sunt în `config/clients/[slug].ts`, nu în componente
- Split config integrări (best practice):
  - Public/business content rămâne în `config/clients/[slug].ts`
  - Credențiale shared (Resend/QStash/Redis/Supabase service role) rămân doar în env vars
  - Cal.com public values pentru booking embed (`NEXT_PUBLIC_CAL_COM_*`) se setează în env per deployment/client
  - Cal.com secrete per client (API key / webhook secret) trebuie citite din tenant DB (ex. Supabase `client_cal_secrets`) în flow multi-client
  - Migrații / SQL pentru `clients` + `client_cal_secrets`: **doar** în repo-ul `seo-data-platform` (`supabase/` acolo); `supabase db push` se rulează din acel folder, nu din acest proiect
  - Webhook Cal: tenant pentru secrete se poate deduce din `payload.organizer.username` → `clients.cal_com_username` (vezi `WEBHOOK_SKIP_CAL_USERNAME_LOOKUP`); `DEBUG_INTEGRATION_SOURCE=1` pentru log structurat
  - După ce modifici `components/providers/client-config-provider.tsx` (sau alte fișiere listate în **`seo-data-platform/scripting/website/closeby/PARITY.md`**), actualizează copia din acel folder înainte de `template:zip`
- Deploy model: un proiect Vercel per client, același repo, `CLIENT_SLUG` diferit.
- Webhooks Cal.com: `app/api/webhooks/cal/route.ts` (confirmare + reminder 24h + review request).
- Scheduling emailuri: pentru demo se folosește `setTimeout`, dar pentru producție (Vercel serverless) trebuie queue/job scheduling (ex. QStash) ca să supraviețuiască restarturilor.
- Pentru setup operațional (Cal.com/Resend/Vercel/DNS) vezi `README.md`.
- Standard local webhook testing: folosești ngrok pe port 3000 (URL public) pentru a putea primi webhooks Cal.com local. Vezi `README.md` → “Local dev (webhook public via ngrok)”.
- TDD enforcement (medium/high tasks): pentru modificări cu impact pe booking/email/webhooks/SEO/config model/critical path UI, adaugi unit tests (preferabil TDD) și nu marchezi “done” până nu trec: `npx tsc --noEmit`, `npm run lint`, și testele.
<!-- END:nextjs-agent-rules -->
