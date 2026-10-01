-- Rollback de 2026-10-04-profiles-protege-email.sql
-- ⚠️ SEGURANÇA: REABRE a edição de `profiles.email` pelo cliente. Só é seguro enquanto o código de
-- /api/reconciliar-assinaturas continuar conferindo o e-mail em auth.users (não em profiles.email).
-- Restaura o corpo da função de 2026-10-02 (trava plano/trial_end/stripe_id, search_path fixo, sem SECURITY DEFINER).
-- O reparo de dados (e-mail do perfil alinhado ao login) NÃO é desfeito.
create or replace function public.profiles_protege_billing()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
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

delete from public.schema_migrations where version = '2026-10-04-profiles-protege-email';
