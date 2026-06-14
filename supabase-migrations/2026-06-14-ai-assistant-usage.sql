-- Migração: tabela de uso do Assistente de IA (apoio diagnóstico)
-- Contexto: o endpoint /api/assistente-dx (plano pago) precisa limitar o número de
-- análises por usuário por dia, para controlar o custo da API da Anthropic.
-- A escrita é feita SOMENTE pelo backend (service_role), que ignora RLS.
--
-- Aplicar no SQL Editor do Supabase (projeto AnamnesisMed).
-- Enquanto esta migração não for aplicada, o endpoint funciona em modo "fail-open"
-- (não bloqueia por limite) — aplique-a antes de liberar o recurso em produção.

create table if not exists public.ai_assistant_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  dia date not null,
  count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, dia)
);

-- RLS ligado: nenhuma policy de cliente → só a service_role (backend) lê/escreve.
alter table public.ai_assistant_usage enable row level security;

-- Mantém updated_at coerente em cada upsert.
create or replace function public.touch_ai_assistant_usage()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_touch_ai_assistant_usage on public.ai_assistant_usage;

create trigger trg_touch_ai_assistant_usage
before update on public.ai_assistant_usage
for each row execute procedure public.touch_ai_assistant_usage();
