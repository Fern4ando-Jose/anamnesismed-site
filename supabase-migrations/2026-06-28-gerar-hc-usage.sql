-- Migração: tabela de uso da geração de HC por IA (/api/gerar-hc)
-- Contexto: o endpoint /api/gerar-hc passou a exigir autenticação (token Supabase) e
-- a aplicar um limite diário por usuário, para controlar o custo da API da Anthropic.
-- A escrita é feita SOMENTE pelo backend (service_role), que ignora RLS.
--
-- IMPORTANTE — comportamento FAIL-CLOSED: enquanto esta tabela NÃO existir, o endpoint
-- devolve 503 e NÃO faz a chamada paga (o front cai no motor de narrativa LOCAL, então o
-- usuário ainda recebe a HC). Rode esta migração no SQL Editor do Supabase (projeto
-- AnamnesisMed) para liberar a geração de HC por IA em produção.
--
-- Espelha a estrutura de ai_assistant_usage (2026-06-14).

create table if not exists public.gerar_hc_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  dia date not null,
  count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, dia)
);

-- RLS ligado: nenhuma policy de cliente → só a service_role (backend) lê/escreve.
alter table public.gerar_hc_usage enable row level security;

-- Mantém updated_at coerente em cada upsert.
create or replace function public.touch_gerar_hc_usage()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_touch_gerar_hc_usage on public.gerar_hc_usage;

create trigger trg_touch_gerar_hc_usage
before update on public.gerar_hc_usage
for each row execute procedure public.touch_gerar_hc_usage();
