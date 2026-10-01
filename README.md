# AnamnesísMed

App web de **anamnese clínica** — monta a História Clínica (HC) a partir de motivos de
consulta, guia AEA (Antecedentes da Enfermidade Atual), manobras e mnemônicas, com
geração de narrativa por IA (Claude) e um assistente de apoio diagnóstico. Auth via
Supabase, billing via Stripe, deploy na Vercel. Bilíngue **PT-BR / ES**.

> Meta: 100 mil usuários até o fim de 2026 — tratar tudo como produto profissional.

## Stack

- **Front-end**: HTML/CSS/JS estático (sem framework), servido pela Vercel.
- **Dados clínicos**: fonte modular em `src/` → build gera os `.js` de produção.
- **Backend**: Vercel Functions em `api/` (Node, CommonJS).
- **Persistência/Auth**: Supabase (Postgres + magic link / Google).
- **IA**: Claude API (`@anthropic-ai/sdk`) — `gerar-hc` (Haiku) e `assistente-dx` (Sonnet).
- **Pagamento**: Stripe (trial 14 dias, plano Estudante US$1,99/mês).

## Mapa dos arquivos

| Caminho | Responsabilidade |
|---|---|
| `anamnesismed-landing.html` | Landing pública (`/`) |
| `anamnesismed-auth.html` | Login (`/login`) |
| `anamnesismed-app.html` | App principal — montagem da HC (`/app`) |
| `anamnesismed-dashboard.html` | Início / Minhas HCs (`/dashboard`) |
| `src/motivos/<id>.js` | **Fonte canônica** de cada motivo (metadados, guia AEA, DDx, traduções) |
| `src/especialidades/<esp>.js` | Ordem + lista de ids de motivos por especialidade |
| `src/ras.js` | Revisão por Aparelhos e Sistemas |
| `anamnesismed-motivos.js`, `anamnesismed-guide-es.js` | **GERADOS** por `scripts/build.js` — não editar à mão |
| `anamnesismed-narrativa.js` | Geradores locais de texto da HC (fallback sem IA) |
| `anamnesismed-pdf.js` | Exportação da HC em PDF |
| `anamnesismed-guide.js` | Builders do painel guia / mnemônicas |
| `supabase-integration.js` | Auth, perfil, salvamento (URL + anon key públicas) |
| `sidebar.js` / `sidebar.css` | Sidebar (componente único) |
| `api/gerar-hc.js` | IA: gera a narrativa da AEA (Claude Haiku) |
| `api/assistente-dx.js` | IA: apoio ao raciocínio diagnóstico (Claude Sonnet, plano pago) |
| `api/create-checkout-session.js`, `api/stripe-webhook.js` | Billing Stripe |
| `api/manter-banco-vivo.js`, `api/reconciliar-assinaturas.js` | Crons diários (`vercel.json`): keepalive + limpeza de dados antigos; reconciliação plano × Stripe. Exigem `CRON_SECRET` (503 sem ele) |
| `api/health.js` | Health check (`/api/health`) |
| `supabase-migrations/` | Migrations SQL versionadas (ver seção abaixo) |
| `instagram-automation/` | Subprojeto de automação de IG — ciclo próprio (**pausado**) |

Detalhe das regras por arquivo em [`CLAUDE.md`](CLAUDE.md).

## Variáveis de ambiente (backend — Vercel)

Nunca commitar valores. Segredos ficam no cofre / painel da Vercel.

| Variável | Usada por | Observação |
|---|---|---|
| `ANTHROPIC_API_KEY` | `gerar-hc`, `assistente-dx` | Chave secreta da Anthropic — só no backend |
| `SUPABASE_URL` | rotas `api/*` | URL do projeto Supabase |
| `SUPABASE_SERVICE_KEY` | rotas `api/*` | `service_role` — **jamais** no front |
| `STRIPE_SECRET_KEY` | checkout / webhook | `sk_live_...` |
| `STRIPE_PRICE_ID` | checkout | `price_...` |
| `STRIPE_WEBHOOK_SECRET` | webhook | Assinatura do webhook Stripe |
| `NEXT_PUBLIC_URL` | checkout | Origem fixa p/ CORS e redirects |

O front usa a **URL + anon key** públicas do Supabase, hardcoded em
`supabase-integration.js` (publicáveis por design).

## Fluxo de desenvolvimento

```bash
npm install                 # deps do backend (@anthropic-ai/sdk, stripe, supabase-js)
node scripts/build.js       # regenera anamnesismed-motivos.js e -guide-es.js a partir de src/
bash scripts/verify.sh      # verificação de integridade (rodar antes de commitar)
npm test                    # testes (node:test — sem rede, sem deps externas)
```

Regras de trabalho (evitam regressões) estão em [`CLAUDE.md`](CLAUDE.md):
commit + push por correção, editar `src/` e rodar o build (nunca editar os `.js` gerados),
`verify.sh` verde antes de commitar.

## Migrations

SQL versionado em `supabase-migrations/` (`AAAA-MM-DD-descricao.sql`), idempotente.
São aplicadas **manualmente** no SQL Editor do Supabase de produção (ação do dono).
Convenção de rollback e registro em `supabase-migrations/README.md`.

## CI / Deploy

- **CI**: `.github/workflows/ci.yml` — `node --check` de todos os `.js`, `npm test` e
  `verify.sh` em cada push/PR na `main`.
- **Deploy**: Vercel (gate humano, ver skill `qa-deploy`). Health check em `/api/health`.
