-- Migração: impede escalada de plano em `profiles` (usuário alterando o próprio plano).
-- Contexto: a policy `usuario_acessa_proprio_perfil` (2026-06-23) é FOR ALL com
-- `using/with check (id = auth.uid())` — protege a LINHA, não as COLUNAS. Qualquer usuário
-- logado podia rodar, do navegador (chave anon + JWT dele):
--     supabase.from('profiles').update({ plano: 'pro' }).eq('id', <meu id>)
-- e ganhar o plano pago sem pagar. Também podia estender `trial_end` ou apagar o próprio
-- perfil e recriá-lo para reiniciar o trial.
--
-- Correção (duas camadas):
--  1) Policies separadas: SELECT/INSERT/UPDATE do próprio perfil; SEM policy de DELETE.
--  2) Trigger BEFORE INSERT/UPDATE que, para chamadas vindas do cliente (role `authenticated`
--     ou `anon`), força as colunas de billing: `plano`, `trial_end`, `stripe_id`.
--     - INSERT: plano='trial', trial_end = now()+30 dias, stripe_id = null.
--     - UPDATE: mantém o valor antigo (a mudança é silenciosamente descartada).
--       Exceção: `trial_end` antigo NULL (perfil legado) recebe now()+30 dias.
--     A service_role (webhook do Stripe), o SQL Editor e o gatilho `handle_new_user`
--     (role sem JWT) NÃO são afetados — por isso o webhook continua ativando o plano.
--  Por que trigger e não REVOKE/GRANT por coluna: o front (supabase-integration.js) faz
--  `upsert` com `plano` e `trial_end` no payload (cadastro/primeiro acesso). Com GRANT por
--  coluna esse upsert passaria a dar erro 42501; com o trigger ele segue funcionando e o
--  servidor decide os valores. Colunas que o cliente realmente grava hoje (preservadas):
--  id, email, nome, sobrenome, universidade, ano_curso, idioma, termos_aceitos, tipo_usuario.
--
-- ⚠️ AÇÃO MANUAL DO DONO: rodar este arquivo no SQL Editor do Supabase (projeto AnamnesisMed).
-- Idempotente — seguro re-rodar. Rollback: down/2026-10-01-profiles-protege-billing.down.sql

-- ── 1) Policies por operação (sem DELETE) ──────────────────────────────────
alter table public.profiles enable row level security;

drop policy if exists "usuario_acessa_proprio_perfil" on public.profiles;
drop policy if exists "usuario_ve_proprio_perfil" on public.profiles;
drop policy if exists "usuario_cria_proprio_perfil" on public.profiles;
drop policy if exists "usuario_atualiza_proprio_perfil" on public.profiles;

create policy "usuario_ve_proprio_perfil"
  on public.profiles for select
  using (id = auth.uid());

create policy "usuario_cria_proprio_perfil"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "usuario_atualiza_proprio_perfil"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- ── 2) Trigger que protege as colunas de billing ───────────────────────────
create or replace function public.profiles_protege_billing()
returns trigger
language plpgsql
as $$
begin
  -- auth.role() lê o claim `role` do JWT da requisição. NULL (SQL Editor, gatilho de
  -- cadastro, conexões diretas) e 'service_role' passam livres.
  if coalesce(auth.role(), 'service_role') not in ('authenticated', 'anon') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.plano     := 'trial';
    new.trial_end := now() + interval '30 days';
    new.stripe_id := null;
  else
    new.plano     := old.plano;
    new.stripe_id := old.stripe_id;
    new.trial_end := coalesce(old.trial_end, now() + interval '30 days');
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_protege_billing on public.profiles;

create trigger trg_profiles_protege_billing
before insert or update on public.profiles
for each row execute procedure public.profiles_protege_billing();

-- ── Registro ───────────────────────────────────────────────────────────────
insert into public.schema_migrations (version) values ('2026-10-01-profiles-protege-billing')
  on conflict (version) do nothing;

-- ── Verificação (rodar manualmente após aplicar) ───────────────────────────
--   select policyname, cmd from pg_policies where schemaname='public' and tablename='profiles';
--   -- esperado: select / insert / update (nenhum delete / all)
--   -- Teste real: logado como usuário comum (anon key + JWT), no console do navegador:
--   --   await sb.from('profiles').update({plano:'pro'}).eq('id', (await sb.auth.getUser()).data.user.id)
--   --   e depois reler o perfil: `plano` deve continuar 'trial'.
