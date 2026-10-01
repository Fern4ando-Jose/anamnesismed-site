# Migrations — AnamnesísMed (Supabase)

Migrations de schema do Postgres do Supabase. **Aplicadas manualmente** no SQL Editor do
Supabase de produção (ação do dono) — não há runner automático (o app é estático + Vercel
Functions, sem processo de migração no deploy).

## Convenção

- **Forward**: `AAAA-MM-DD-descricao.sql` na raiz desta pasta. Sempre **idempotente**
  (`create table if not exists`, `create or replace`, `drop ... if exists`) — seguro re-rodar.
- **Rollback**: contraparte em `down/AAAA-MM-DD-descricao.down.sql`, desfazendo a forward
  e removendo o registro de `schema_migrations`.
- **Registro**: a tabela `public.schema_migrations` (criada em
  `2026-07-11-schema-migrations.sql`) é o **log do que foi aplicado** em produção — a
  fonte da verdade do estado do schema. Cada forward nova termina com:
  ```sql
  insert into public.schema_migrations (version) values ('AAAA-MM-DD-descricao')
    on conflict (version) do nothing;
  ```

## Aplicar uma migration

1. Abrir o SQL Editor do Supabase (projeto AnamnesisMed).
2. Colar o conteúdo da forward, rodar, conferir "success".
3. Confirmar o registro: `select * from public.schema_migrations order by applied_at;`

## Reverter (rollback)

1. Rodar o arquivo correspondente em `down/` no SQL Editor.
2. Ler o cabeçalho do `down/` **antes** — alguns rollbacks têm efeito colateral sério
   (fail-closed em `/api/gerar-hc`, reabertura de gap de RLS, quebra de cadastro).

## Estado atual

| Version | Objeto | Rollback |
|---|---|---|
| `2026-06-08-trigger-criacao-perfil` | trigger/função `handle_new_user` | `down/` (⚠️ quebra cadastro) |
| `2026-06-14-ai-assistant-usage` | tabela `ai_assistant_usage` | `down/` |
| `2026-06-23-rls-profiles-historias` | RLS + policies WITH CHECK | `down/` (⚠️ reabre gap) |
| `2026-06-28-gerar-hc-usage` | tabela `gerar_hc_usage` | `down/` (⚠️ fail-closed) |
| `2026-06-28-stripe-events-idempotencia` | tabela `stripe_events` | `down/` |
| `2026-07-11-schema-migrations` | tabela de controle | — (base do log) |
| `2026-10-01-profiles-protege-billing` | policies por operação + trigger que trava `plano`/`trial_end`/`stripe_id` | `down/` (⚠️ reabre escalada de plano) |
| `2026-10-01-uso-atomico-rpc` | função `consumir_cota_ia` (cota diária atômica) | `down/` (⚠️ fail-closed nas rotas de IA) |
| `2026-10-02-devolver-cota-e-search-path` | função `devolver_cota_ia` + `search_path = public, pg_temp` em todas as funções SECURITY DEFINER/triggers | `down/` (⚠️ reabre risco de search_path) |

### Ações manuais do dono (SQL Editor) — correção de segurança de 2026-10-01

1. Rodar `2026-10-01-uso-atomico-rpc.sql` **antes** do deploy do código novo
   (`/api/gerar-hc` e `/api/assistente-dx` passam a falhar fechado — 503 — se a função não existir;
   exige as migrations `2026-06-14` e `2026-06-28` já aplicadas).
2. Rodar `2026-10-01-profiles-protege-billing.sql`. Sem isso, qualquer usuário logado consegue se
   promover a `pro` direto pelo navegador. O front continua gravando nome/universidade/idioma etc.;
   `plano`, `trial_end` e `stripe_id` só mudam pelo servidor (webhook do Stripe, service_role).
3. Definir `CRON_SECRET` nas envs da Vercel (o `/api/manter-banco-vivo` passou a exigi-lo).

### Ação manual do dono — 2026-10-02

4. Rodar `2026-10-02-devolver-cota-e-search-path.sql` (idempotente; exige as migrations de 06-14, 06-28 e
   10-01). Sem ela o código continua funcionando, mas a cota de IA **não é devolvida** quando o modelo falha
   (as rotas só logam `[cota] devolver_cota_ia falhou`). Ela também remove, por segurança, a policy `FOR ALL`
   antiga de `profiles` caso a 2026-06-23 tenha sido re-executada por engano.
5. Conferir com os testes executáveis (cole no SQL Editor; rodam em transação com ROLLBACK, não deixam dados):
   `tests/2026-10-01-profiles-protege-billing.test.sql` e `tests/2026-10-02-cota-rpc.test.sql`.
   Sucesso = aparece a linha `OK ...`; falha = erro `FALHOU: <o que>`. Se o `insert into auth.users` falhar
   no seu projeto (colunas obrigatórias), ajuste só essa linha do teste.
6. Envs na Vercel para as rotas novas: `STRIPE_SECRET_KEY` (já existe; `/api/excluir-conta` cancela a assinatura),
   `SUPABASE_*` e `NEXT_PUBLIC_URL`.

> **Não re-execute migrations antigas** (ex.: `2026-06-23`): não são idempotentes em todas as policies.
> Dentro do repositório, `npm test` aplica todas as migrations em um Postgres temporário (quando há Postgres
> na máquina/CI) e roda os mesmos asserts; sem Postgres o teste é pulado e `test/sql-migrations.test.js` faz a
> verificação estática.

> Confirmar quais já rodaram em produção: `select version, applied_at from public.schema_migrations;`
> Se o backfill de `2026-07-11-schema-migrations` registrar algo que na verdade não rodou,
> rode a forward correspondente (é idempotente) para reconciliar.

## LGPD — retenção, exclusão, exportação, consentimento e operadores

Documento completo: [`docs/lgpd.md`](../docs/lgpd.md). Resumo do que é código e do que é do dono:

- **Exportação** (art. 18, II/V): `GET /api/exportar-dados` (Bearer) — JSON com perfil, HCs e PDFs do próprio usuário.
- **Exclusão** (art. 18, VI): `POST /api/excluir-conta` (Bearer + `{"confirmar": true}`) — cancela a assinatura no
  Stripe, apaga `historias_clinicas`, `pdf_exports`, tabelas de uso, `profiles` e o usuário no Auth; retomável e
  idempotente. Procedimento manual (painel → Authentication → Users) continua possível, mas
  `historias_clinicas.user_id` **não** tem `on delete cascade` — apague as HCs antes, ou use o endpoint.
- **Retenção** — **[DONO]** definir prazo e publicar; limpeza das tabelas de uso sugerida em `docs/lgpd.md`.
- **Consentimento** — `profiles.termos_aceitos` (booleano); **[DONO]** conferir textos de termos/privacidade e
  considerar guardar data/versão do aceite.
- **DPA com a Anthropic — pendência do DONO** (e Supabase, Vercel, Stripe): aceitar/arquivar e registrar a base
  legal da transferência internacional (art. 33).
- **Logs** — só IDs, contagens e códigos de erro; nunca texto de paciente nem `err.message` de SDK/banco.
