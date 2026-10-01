-- Migração: limitador de taxa atômico por usuário (`consumir_limite`) + tabela `rate_limits`.
-- Contexto: só as rotas de IA tinham cota. /api/excluir-conta, /api/exportar-dados,
-- /api/create-checkout-session e /api/portal-cliente (todas autenticadas, mas caras: apagam dados,
-- leem até 20 mil linhas, chamam o Stripe) podiam ser martelada por um token válido.
--
-- Janela FIXA por (usuário, ação): a 1ª chamada abre a janela; as seguintes incrementam o contador
-- até `p_max`; depois da janela o contador reinicia. Tudo em UMA instrução (insert ... on conflict
-- do update ... where), serializada por linha pelo Postgres — sem corrida sob concorrência.
--
-- Contrato: `consumir_limite(p_user_id, p_acao, p_janela_seg, p_max)` devolve
--     0  → permitido (consumiu 1 unidade);
--    >0  → BARRADO; é o número de segundos até a janela reabrir (vai no header Retry-After).
-- Ações: texto livre `^[a-z0-9_-]{1,40}$` (ex.: 'exportar-dados', 'excluir-conta', 'checkout').
-- Só a service_role executa (usuário comum NÃO pode chamar via anon key nem ler a tabela).
-- FAIL-CLOSED no código: sem esta função as quatro rotas devolvem 503.
--
-- ⚠️ AÇÃO MANUAL DO DONO: rodar no SQL Editor ANTES do deploy do código que a chama.
-- Idempotente. Rollback: down/2026-10-03-consumir-limite.down.sql

create table if not exists public.rate_limits (
  user_id       uuid not null references auth.users (id) on delete cascade,
  acao          text not null,
  janela_inicio timestamptz not null default now(),
  count         integer not null default 0,
  primary key (user_id, acao)
);

alter table public.rate_limits enable row level security;
-- Sem policies: ninguém além da service_role (que ignora RLS) lê/grava. Revoga também os
-- privilégios padrão que o Supabase concede a anon/authenticated em tabelas novas.
revoke all on table public.rate_limits from public, anon, authenticated;
grant select, insert, update, delete on table public.rate_limits to service_role;

create or replace function public.consumir_limite(p_user_id uuid, p_acao text, p_janela_seg integer, p_max integer)
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_agora timestamptz := clock_timestamp();
  v_janela interval;
  v_count integer;
  v_inicio timestamptz;
begin
  if p_user_id is null or p_acao is null or p_acao !~ '^[a-z0-9_-]{1,40}$'
     or p_janela_seg is null or p_janela_seg < 1 or p_janela_seg > 86400
     or p_max is null or p_max < 1 then
    raise exception 'parametros invalidos';
  end if;
  v_janela := make_interval(secs => p_janela_seg);

  insert into public.rate_limits as t (user_id, acao, janela_inicio, count)
  values (p_user_id, p_acao, v_agora, 1)
  on conflict (user_id, acao) do update
    set janela_inicio = case when t.janela_inicio <= v_agora - v_janela then v_agora else t.janela_inicio end,
        count         = case when t.janela_inicio <= v_agora - v_janela then 1 else t.count + 1 end
    where t.janela_inicio <= v_agora - v_janela or t.count < p_max
  returning t.count into v_count;

  if v_count is not null then
    return 0;
  end if;

  -- Barrado: o `where` impediu o update. Calcula quanto falta para a janela reabrir.
  select janela_inicio into v_inicio from public.rate_limits where user_id = p_user_id and acao = p_acao;
  return greatest(1, ceil(extract(epoch from (v_inicio + v_janela - v_agora)))::integer);
end;
$$;

revoke all on function public.consumir_limite(uuid, text, integer, integer) from public, anon, authenticated;
grant execute on function public.consumir_limite(uuid, text, integer, integer) to service_role;

insert into public.schema_migrations (version) values ('2026-10-03-consumir-limite')
  on conflict (version) do nothing;

-- ── Verificação (SQL Editor, como dono) ─────────────────────────────────────────────────────
--   select public.consumir_limite('<uuid de um usuário>', 'teste', 3600, 2);  -- 0, 0, depois >0
--   -- teste executável: supabase-migrations/tests/2026-10-03-consumir-limite.test.sql
