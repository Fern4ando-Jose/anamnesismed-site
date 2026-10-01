-- Migração: trava `profiles.email` contra edição pelo cliente (takeover de billing por e-mail).
-- Contexto (achado A1, BLOQUEADOR): a policy de UPDATE de `profiles` deixa o usuário editar a PRÓPRIA linha
-- inteira, inclusive `email`. /api/reconciliar-assinaturas adotava, por e-mail do customer do Stripe, o perfil
-- sem `stripe_id` cujo `profiles.email` batesse — então um atacante podia gravar no próprio perfil o e-mail de
-- um assinante e receber o `plano = pro` (e o `stripe_id` dele, abrindo o portal de cobrança da vítima).
--
-- Correção (defesa em profundidade; o código também mudou — a reconciliação agora confere o e-mail em
-- auth.users via admin.getUserById, com `email_confirmed_at`, e não confia mais em profiles.email):
--  1) `profiles_protege_billing` (mesmo trigger, função recriada) passa a travar também `email`:
--     - UPDATE por authenticated/anon: new.email := old.email (a mudança é descartada em silêncio);
--     - INSERT por authenticated/anon: new.email := e-mail do login em auth.users (ignora o enviado).
--     service_role, SQL Editor e gatilhos (sem JWT) seguem livres, como para plano/trial_end/stripe_id.
--     A função vira SECURITY DEFINER (precisa ler auth.users no INSERT) com search_path fixo (public, pg_temp);
--     EXECUTE revogado de public/anon/authenticated (é função de trigger; o Postgres não confere EXECUTE ao disparar).
--  2) Reparo de dados: alinha `profiles.email` ao e-mail real do login onde divergir (limpa eventual linha já
--     "envenenada"). Roda como dono (sem JWT) → o trigger deixa passar.
--
-- NÃO travados de propósito: `tipo_usuario`, `termos_aceitos`, `genero` etc. O front (supabase-integration.js,
-- cadastro/onboarding) os grava pelo cliente; travar quebraria o fluxo e eles não dão acesso a billing.
-- Efeito colateral aceito: quem trocar o e-mail do login no Supabase Auth fica com `profiles.email` antigo até
-- um sync manual (nada de segurança depende dele; a tela de config mostra o do perfil).
--
-- ⚠️ AÇÃO MANUAL DO DONO: rodar no SQL Editor. Pré-requisitos: 2026-10-01-profiles-protege-billing e 2026-10-02-*.
-- NÃO re-execute depois dela a 2026-10-01-profiles-protege-billing nem a 2026-10-02-devolver-cota-e-search-path
-- (recriam a função SEM a trava de e-mail); se o fizer, rode esta de novo. Idempotente.
-- Rollback: down/2026-10-04-profiles-protege-email.down.sql

create or replace function public.profiles_protege_billing()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_email text;
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
    select u.email into v_email from auth.users u where u.id = new.id;
    new.email     := v_email;
  else
    new.plano     := old.plano;
    new.stripe_id := old.stripe_id;
    new.trial_end := coalesce(old.trial_end, now() + interval '30 days');
    new.email     := old.email;
  end if;
  return new;
end;
$$;

revoke all on function public.profiles_protege_billing() from public, anon, authenticated;

-- O trigger já existe (2026-10-01); recria só para garantir que está ativo e com a definição esperada.
drop trigger if exists trg_profiles_protege_billing on public.profiles;
create trigger trg_profiles_protege_billing
before insert or update on public.profiles
for each row execute procedure public.profiles_protege_billing();

-- Reparo: e-mail do perfil = e-mail do login (corrige linhas adulteradas antes desta trava).
update public.profiles p
   set email = u.email
  from auth.users u
 where u.id = p.id
   and u.email is not null
   and p.email is distinct from u.email;

insert into public.schema_migrations (version) values ('2026-10-04-profiles-protege-email')
  on conflict (version) do nothing;

-- ── Verificação (SQL Editor, como dono) ─────────────────────────────────────────────────────
--   select count(*) from public.profiles p join auth.users u on u.id = p.id where p.email is distinct from u.email;  -- 0
--   -- teste executável: supabase-migrations/tests/2026-10-04-profiles-protege-email.test.sql
