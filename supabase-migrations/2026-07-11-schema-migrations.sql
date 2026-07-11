-- Migração: tabela de controle de versão das migrations (schema_migrations)
-- Contexto: as migrations em supabase-migrations/ eram aplicadas à mão no SQL Editor
-- sem nenhum registro de quais já rodaram — impossível saber, olhando o banco, o estado
-- do schema. Esta tabela passa a ser o LOG do que foi aplicado (a fonte da verdade do
-- que rodou em produção), com o par de rollback documentado em supabase-migrations/README.md.
--
-- Aplicar no SQL Editor do Supabase (projeto AnamnesisMed). Idempotente.
-- A partir daqui, ao aplicar qualquer migration nova, registre-a no fim do próprio arquivo:
--   insert into public.schema_migrations (version) values ('AAAA-MM-DD-descricao')
--     on conflict (version) do nothing;

create table if not exists public.schema_migrations (
  version     text primary key,          -- nome do arquivo sem .sql (ex.: 2026-06-28-gerar-hc-usage)
  applied_at  timestamptz not null default now()
);

-- RLS ligado: só a service_role (backend) e o SQL Editor (dono) tocam nisto.
alter table public.schema_migrations enable row level security;

-- Backfill das migrations já aplicadas em produção até 2026-07-11 (todas idempotentes,
-- confirmadas nas pendências). Ajuste applied_at se souber a data exata de cada uma.
insert into public.schema_migrations (version) values
  ('2026-06-08-trigger-criacao-perfil'),
  ('2026-06-14-ai-assistant-usage'),
  ('2026-06-23-rls-profiles-historias'),
  ('2026-06-28-gerar-hc-usage'),
  ('2026-06-28-stripe-events-idempotencia'),
  ('2026-07-11-schema-migrations')
on conflict (version) do nothing;
