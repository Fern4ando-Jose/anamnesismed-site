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

### Ações manuais do dono (SQL Editor) — correção de segurança de 2026-10-01

1. Rodar `2026-10-01-uso-atomico-rpc.sql` **antes** do deploy do código novo
   (`/api/gerar-hc` e `/api/assistente-dx` passam a falhar fechado — 503 — se a função não existir;
   exige as migrations `2026-06-14` e `2026-06-28` já aplicadas).
2. Rodar `2026-10-01-profiles-protege-billing.sql`. Sem isso, qualquer usuário logado consegue se
   promover a `pro` direto pelo navegador. O front continua gravando nome/universidade/idioma etc.;
   `plano`, `trial_end` e `stripe_id` só mudam pelo servidor (webhook do Stripe, service_role).
3. Definir `CRON_SECRET` nas envs da Vercel (o `/api/manter-banco-vivo` passou a exigi-lo).

> Confirmar quais já rodaram em produção: `select version, applied_at from public.schema_migrations;`
> Se o backfill de `2026-07-11-schema-migrations` registrar algo que na verdade não rodou,
> rode a forward correspondente (é idempotente) para reconciliar.

## LGPD — retenção, exclusão, consentimento e operadores

> Dados de saúde (história clínica) são **dados pessoais sensíveis** (LGPD art. 5º, II e art. 11).
> Este resumo é um ponto de partida técnico — **não é parecer jurídico**. Itens marcados
> **[DONO]** dependem de decisão/ação do controlador e não estão resolvidos pelo código.

- **Retenção** — Hoje `historias_clinicas` e `pdf_exports` ficam por tempo indeterminado e as tabelas
  de uso (`*_usage`) crescem sem limpeza. **[DONO]** definir prazo de retenção (e fundamentação) e
  documentá-lo na política de privacidade; depois, agendar a limpeza (ex.: `delete ... where
  created_at < now() - interval '...'` via cron/SQL Editor). As tabelas de uso podem ser podadas
  com segurança (`delete from public.gerar_hc_usage where dia < current_date - 90;`, idem
  `ai_assistant_usage`).
- **Exclusão sob pedido (art. 18, VI)** — Todas as tabelas de usuário referenciam `auth.users` com
  `on delete cascade` (`gerar_hc_usage`, `ai_assistant_usage`; conferir `historias_clinicas`,
  `pdf_exports` e `profiles`). Procedimento manual: no painel do Supabase → Authentication →
  Users → excluir o usuário (apaga em cascata); confirmar com `select count(*) from
  public.historias_clinicas where user_id = '<uuid>';` = 0. Cancelar a assinatura no Stripe antes.
  **[DONO]** definir canal (e-mail) e prazo de resposta ao titular; ainda não há botão de
  autoexclusão no app.
- **Consentimento (art. 7º, I / art. 11, I)** — O app registra `profiles.termos_aceitos` (aceite de
  termos). **[DONO]** garantir que o texto de termos/privacidade cite explicitamente: coleta de
  dados de saúde, finalidade, compartilhamento com operadores (Supabase, Vercel, Stripe,
  Anthropic) e transferência internacional; considerar guardar data/versão do aceite.
  Recomendação de produto: o usuário deve inserir **dados anonimizados** (sem nome/CPF do
  paciente) — o `/api/assistente-dx` já assume HC anonimizada pelo front.
- **Operadores / DPA** — O conteúdo da HC é enviado à API da Anthropic (`/api/gerar-hc`,
  `/api/assistente-dx`). **[DONO]** aceitar/arquivar o DPA (Data Processing Addendum) da Anthropic
  e conferir a política de retenção de dados da API (e a opção de zero-data-retention, se
  aplicável ao contrato). Fazer o mesmo com Supabase, Vercel e Stripe, e registrar a base legal
  para a transferência internacional (art. 33).
- **Logs** — As rotas logam só IDs (userId do Supabase), contagem de tokens e status; nunca texto
  de paciente nem `err.message` do SDK. Manter essa regra em qualquer código novo.
