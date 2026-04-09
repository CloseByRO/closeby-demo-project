@AGENTS.md

# Local Growth System - Technical Specs

## Tech Stack
- Frontend: Next.js 15+, Tailwind, TypeScript.
- Backend: Supabase Auth/DB (EU-Central), Resend (Email).
- Booking: Cal.com (EU) embed.
- Infrastructure: Vercel (MVP) -> Hetzner/Coolify (Phase 3).

## Coding Standards
- Prefer Server Components over Client Components.
- Use `shadcn/ui` for rapid UI building.
- File-based routing (App Router).
- Scripts go in `/scripts` (Node.js).

## Workflows
- Build: `npm run build`
- Dev: `npm run dev`
- Tests: Minimal (Critical paths only).