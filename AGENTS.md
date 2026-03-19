<!-- BEGIN:nextjs-agent-rules -->
# CloseBy Demo — Cabinet Psihoterapie

## [același conținut ca CLAUDE.md de mai sus]

## Instrucțiuni pentru agent
- Când modifici un fișier, nu regenera arhiva ZIP — dai doar fișierul modificat
- Când adaugi o componentă nouă, urmezi structura existentă din folderul corespunzător
- Verifici întotdeauna cu `npx tsc --noEmit` înainte de a declara o modificare completă
- Nu instala pachete noi fără a verifica compatibilitatea cu `@calcom/embed-react` (React 18 peer dep)
- `clientConfig` vine întotdeauna din `@/config/client` — nu hardcodezi date în componente
- Toate prețurile și textele sunt în `config/clients/[slug].ts`, nu în componente
<!-- END:nextjs-agent-rules -->
