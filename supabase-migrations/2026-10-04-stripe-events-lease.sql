-- Migração: idempotência do webhook com ESTADO e LEASE + revoke explícito nas tabelas de uso/eventos.
-- Contexto (achados A3 e B7):
--  A3) O webhook gravava `event_id` ANTES de processar e o apagava se falhasse; se a própria reversão
--      falhasse (banco fora), o evento ficava "visto" para sempre e o plano não era corrigido. Agora a linha
--      tem `status`: 'processing' (reivindicado; vale como LEASE de 1 minuto — passado esse prazo outra
--      entrega do Stripe pode assumir) e 'done' (só marcado ao FINAL do processamento).
--      Linhas já existentes são tratadas como 'done' (já processadas sob o modelo antigo).
--  B7) `stripe_events`, `ai_assistant_usage` e `gerar_hc_usage` têm RLS sem policy (ninguém do cliente lê),
--      mas dependiam do default do Supabase para os GRANTs. Revoga TUDO de public/anon/authenticated e
--      concede só à service_role — defesa em profundidade, caso o RLS seja desligado por engano.
--
-- Compatibilidade: o código novo tolera a ausência destas colunas (trata duplicado como já processado, sem
-- lease), então a ordem de deploy não quebra nada — mas aplique ANTES para ter o lease.
-- Idempotente. Rollback: down/2026-10-04-stripe-events-lease.down.sql

alter table public.stripe_events add column if not exists status text not null default 'done';
alter table public.stripe_events add column if not exists processing_desde timestamptz not null default now();
-- Linhas novas nascem 'processing' (as antigas ficaram 'done' pelo default da criação da coluna).
alter table public.stripe_events alter column status set default 'processing';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'stripe_events_status_check' and conrelid = 'public.stripe_events'::regclass) then
    alter table public.stripe_events add constraint stripe_events_status_check check (status in ('processing', 'done'));
  end if;
end $$;

create index if not exists idx_stripe_events_received_at on public.stripe_events (received_at);

revoke all on table public.stripe_events      from public, anon, authenticated;
revoke all on table public.ai_assistant_usage from public, anon, authenticated;
revoke all on table public.gerar_hc_usage     from public, anon, authenticated;
grant select, insert, update, delete on table public.stripe_events      to service_role;
grant select, insert, update, delete on table public.ai_assistant_usage to service_role;
grant select, insert, update, delete on table public.gerar_hc_usage     to service_role;

insert into public.schema_migrations (version) values ('2026-10-04-stripe-events-lease')
  on conflict (version) do nothing;

-- ── Verificação (SQL Editor, como dono) ─────────────────────────────────────────────────────
--   select has_table_privilege('authenticated', 'public.stripe_events', 'select');  -- false
--   select status, count(*) from public.stripe_events group by 1;                    -- tudo 'done' logo após aplicar
--   -- teste executável: supabase-migrations/tests/2026-10-04-stripe-events-fk.test.sql
