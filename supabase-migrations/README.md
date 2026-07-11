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

> Confirmar quais já rodaram em produção: `select version, applied_at from public.schema_migrations;`
> Se o backfill de `2026-07-11-schema-migrations` registrar algo que na verdade não rodou,
> rode a forward correspondente (é idempotente) para reconciliar.
