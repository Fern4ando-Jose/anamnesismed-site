-- Migração: impede o CLIENTE de alterar plano/trial/cobrança em `profiles` (paywall).
-- Contexto (auditoria docs/auditoria/01-planos-acesso.md, P0): a policy de profiles é
-- `FOR ALL ... WITH CHECK (id = auth.uid())`, que valida só o DONO da linha, não QUAIS colunas
-- mudam. Com a anon key pública, qualquer usuário logado podia fazer
--   sb.from('profiles').update({ plano: 'pro' })      -- vira pago sem pagar
--   sb.from('profiles').update({ trial_end: '2099-…' }) -- trial eterno
-- Também podia APAGAR a própria linha e re-inserir, ganhando novo trial de 30 dias.
--
-- O que esta migration faz:
--  1. Trigger BEFORE INSERT/UPDATE: quando quem escreve é `authenticated`/`anon` (cliente via
--     PostgREST), `plano`, `trial_end` e `stripe_id` não mudam — no INSERT recebem os valores
--     iniciais (trial de 30 dias); no UPDATE mantêm o valor antigo. Escritas de `service_role`
--     (webhook do Stripe), do SQL Editor (`postgres`) e do `handle_new_user` (security definer)
--     passam sem alteração.
--  2. Troca a policy `FOR ALL` por select/insert/update: o cliente deixa de poder DELETAR a linha.
--
-- NÃO protege `tipo_usuario` ainda: o modal de onboarding grava essa coluna pelo cliente
-- (supabase-integration.js). Isso é tratado na Fase 1 (plano × tipo), com RPC no servidor.
--
-- A trigger descarta a mudança em silêncio (não levanta erro) para não quebrar o upsert de
-- `authSaveProfile`, que ainda envia plano/trial_end no payload.
--
-- Aplicar no SQL Editor do Supabase (projeto AnamnesisMed). Idempotente.

create or replace function public.proteger_colunas_plano()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- service_role, postgres (SQL Editor) e funções security definer: confiáveis.
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.plano     := 'trial';
    new.trial_end := now() + interval '30 days';
    new.stripe_id := null;
    return new;
  end if;

  -- UPDATE feito pelo cliente: plano, trial e cobrança não mudam.
  new.stripe_id := old.stripe_id;
  if old.plano is null then
    -- linha antiga sem plano: o cliente só pode iniciá-la como trial (nunca como pago)
    new.plano     := 'trial';
    new.trial_end := coalesce(old.trial_end, now() + interval '30 days');
  else
    new.plano     := old.plano;
    new.trial_end := old.trial_end;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_proteger_colunas_plano on public.profiles;
create trigger trg_proteger_colunas_plano
before insert or update on public.profiles
for each row execute function public.proteger_colunas_plano();

-- ── policies: sem DELETE para o cliente ────────────────────────────────────
drop policy if exists "usuario_acessa_proprio_perfil" on public.profiles;
drop policy if exists "usuario_le_proprio_perfil"      on public.profiles;
drop policy if exists "usuario_cria_proprio_perfil"    on public.profiles;
drop policy if exists "usuario_edita_proprio_perfil"   on public.profiles;

create policy "usuario_le_proprio_perfil"
  on public.profiles for select
  using (id = auth.uid());

create policy "usuario_cria_proprio_perfil"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "usuario_edita_proprio_perfil"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- ── Verificação (rodar manualmente após aplicar) ───────────────────────────
--   select tgname from pg_trigger where tgrelid = 'public.profiles'::regclass and not tgisinternal;
--   -- deve listar trg_proteger_colunas_plano
--   select policyname, cmd from pg_policies where schemaname='public' and tablename='profiles';
--   -- deve listar select, insert e update (nenhuma ALL, nenhuma DELETE)
--   -- Teste funcional: logado como usuário comum, `update profiles set plano='pro'` NÃO muda o plano.

insert into public.schema_migrations (version) values ('2026-10-01-protege-colunas-plano')
  on conflict (version) do nothing;
