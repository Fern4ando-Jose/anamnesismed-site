-- Migração: tabela de idempotência de eventos do Stripe (/api/stripe-webhook)
-- Contexto: o Stripe REENTREGA eventos (retries, redeliveries). Sem idempotência, um
-- checkout.session.completed repetido reprocessa a ativação da assinatura. O webhook
-- passou a gravar o event.id (PK única) ANTES de processar e a sair cedo (200) se o
-- evento já foi visto. A escrita é feita SOMENTE pelo backend (service_role).
--
-- Comportamento até esta migração rodar: o webhook NÃO bloqueia (a assinatura já é
-- validada por constructEvent, então não há risco de forja) — apenas segue sem dedup
-- e loga um alerta. Rode esta migração no SQL Editor do Supabase (projeto AnamnesisMed)
-- para ativar a idempotência em produção.

create table if not exists public.stripe_events (
  event_id text primary key,
  type text,
  received_at timestamptz not null default now()
);

-- RLS ligado: nenhuma policy de cliente → só a service_role (backend) lê/escreve.
alter table public.stripe_events enable row level security;
