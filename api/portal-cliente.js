/**
 * Vercel Function — POST /api/portal-cliente
 * Abre o Portal de Cobrança do Stripe (Billing Portal) do PRÓPRIO usuário: trocar cartão,
 * ver faturas e cancelar a assinatura. É o destino do botão "Gerenciar assinatura" (a 409
 * `already_subscribed` de /api/create-checkout-session manda o usuário para cá).
 *
 * Exige `Authorization: Bearer <access_token do Supabase>`; o customer vem do PERFIL do usuário do
 * token (profiles.stripe_id), nunca do body — ninguém abre o portal de terceiros.
 *   200 { url }                       → redirecionar o navegador para `url` (sessão de uso único)
 *   401                               → sem/ com token inválido
 *   404 { code: 'sem_assinatura' }    → o usuário não tem customer no Stripe (nunca assinou)
 *   429/503                           → limite (20/h) / limitador indisponível (fail-closed)
 * Ao terminar, o Stripe devolve o usuário para `${NEXT_PUBLIC_URL}/anamnesismed-config.html#plano`.
 *
 * ⚠️ Pré-requisito no Stripe (ação do dono): ativar/configurar o portal em
 * Dashboard → Configurações → Billing → Portal do cliente (o modo "live" e o "test" são separados).
 * Sem isso o Stripe recusa a criação e a rota devolve 502 `portal_indisponivel`.
 *
 * Env vars: STRIPE_SECRET_KEY, NEXT_PUBLIC_URL, SUPABASE_URL, SUPABASE_SERVICE_KEY.
 */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');
const { iniciaRota, autenticar, aplicaLimite } = require('./_comum');

module.exports = async (req, res) => {
  if (iniciaRota(req, res, 'POST')) return;

  if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_URL) {
    console.error('[portal-cliente] env do Stripe/URL ausente');
    return res.status(500).json({ error: 'Pagamento não configurado no servidor' });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Supabase não configurado no servidor' });
  }

  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const auth = await autenticar(sbAdmin, req);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const userId = auth.user.id;

  if (!(await aplicaLimite(res, sbAdmin, userId, 'portal-cliente'))) return;

  // FAIL-CLOSED: sem ler o perfil não há como saber o customer.
  let stripeId = null;
  try {
    const { data: prof, error } = await sbAdmin.from('profiles').select('stripe_id').eq('id', userId).maybeSingle();
    if (error) throw new Error(error.code || 'erro ao ler perfil');
    stripeId = (prof && prof.stripe_id) || null;
  } catch (e) {
    console.error('[portal-cliente] não foi possível ler o perfil:', String(e && e.message).slice(0, 120));
    return res.status(503).json({ error: 'Não foi possível verificar sua assinatura agora. Tente novamente em instantes.' });
  }
  if (!stripeId) {
    return res.status(404).json({ error: 'Você ainda não possui assinatura para gerenciar.', code: 'sem_assinatura' });
  }

  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const sessao = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: `${process.env.NEXT_PUBLIC_URL}/anamnesismed-config.html#plano`,
    });
    return res.status(200).json({ url: sessao.url });
  } catch (err) {
    // customer apagado no Stripe = é como não ter assinatura.
    if (err && err.code === 'resource_missing') {
      return res.status(404).json({ error: 'Você ainda não possui assinatura para gerenciar.', code: 'sem_assinatura' });
    }
    // Sem o objeto de erro inteiro: pode carregar request/headers da API do Stripe.
    console.error('[portal-cliente] Stripe error:', JSON.stringify({ type: err && err.type, code: err && err.code, status: err && err.statusCode }));
    return res.status(502).json({ error: 'Não foi possível abrir o portal de assinatura agora.', code: 'portal_indisponivel' });
  }
};
