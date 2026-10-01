/**
 * Vercel Function — POST /api/create-checkout-session
 * Cria sessão de pagamento no Stripe
 *
 * Env vars necessárias no Vercel:
 *   STRIPE_SECRET_KEY   → sk_live_...
 *   STRIPE_PRICE_ID     → price_...
 *   NEXT_PUBLIC_URL     → https://www.anamnesismed.com
 *   SUPABASE_URL / SUPABASE_SERVICE_KEY → para validar o token do usuário
 *
 * SEGURANÇA: exige `Authorization: Bearer <access_token do Supabase>`. O userId e o
 * email vêm do TOKEN validado no servidor — o body é ignorado para identidade (senão
 * qualquer um criaria checkout com metadata.userId de outra pessoa e ativaria o plano dela).
 */

const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');
const { iniciaRota, autenticar, aplicaLimite, contaEmExclusao, STATUS_VIVOS } = require('./_comum');

module.exports = async (req, res) => {
  // CORS restrito a NEXT_PUBLIC_URL (fail-closed), no-store, preflight e método — ver _comum.js.
  if (iniciaRota(req, res, 'POST')) return;

  // Body inválido (undefined/não-objeto) → 400, nunca 500. A identidade NÃO vem do body.
  if (req.body !== undefined && req.body !== null && (typeof req.body !== 'object' || Array.isArray(req.body))) {
    return res.status(400).json({ error: 'Corpo da requisição inválido' });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID || !process.env.NEXT_PUBLIC_URL) {
    console.error('[create-checkout-session] env do Stripe/URL ausente');
    return res.status(500).json({ error: 'Pagamento não configurado no servidor' });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Supabase não configurado no servidor' });
  }

  // Autenticação — token do Supabase no header Authorization
  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const auth = await autenticar(sbAdmin, req);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const userId = auth.user.id;
  const email = auth.user.email;
  if (!userId || !email) return res.status(400).json({ error: 'Usuário sem email válido' });

  // Limite por usuário (20/h) — fail-closed: 429 + Retry-After; 503 se o limitador faltar.
  if (!(await aplicaLimite(res, sbAdmin, userId, 'checkout'))) return;

  // Perfil do usuário (service_role): plano atual e customer do Stripe, se já houver; e a marca de
  // "conta em exclusão" (não se abre checkout para conta que está sendo apagada — senão a pessoa
  // pagaria por uma conta que some). FAIL-CLOSED: sem conseguir ler, não cria checkout.
  let plano = null;
  let stripeId = null;
  try {
    const { data: prof, error } = await sbAdmin.from('profiles').select('plano, stripe_id').eq('id', userId).maybeSingle();
    if (error) throw new Error(error.code || 'erro ao ler perfil');
    if (prof) { plano = prof.plano || null; stripeId = prof.stripe_id || null; }
    if (await contaEmExclusao(sbAdmin, userId)) {
      return res.status(409).json({ error: 'Esta conta está em processo de exclusão e não pode assinar.', code: 'conta_em_exclusao' });
    }
  } catch (e) {
    console.error('[create-checkout-session] não foi possível ler o perfil/marca de exclusão:', String(e && e.message).slice(0, 120));
    return res.status(503).json({ error: 'Não foi possível verificar sua assinatura agora. Tente novamente em instantes.' });
  }

  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    // Quem já é `pro` com assinatura VIVA no Stripe não pode assinar de novo (cobrança em
    // dobro). `past_due` conta como viva: o caminho certo é atualizar o cartão, não assinar outra vez.
    // Se for `pro` mas o Stripe não mostra assinatura viva (plano concedido à mão ou desatualizado),
    // deixa seguir. Falha ao consultar o Stripe também é fail-closed.
    if (plano === 'pro' && stripeId) {
      const lista = await stripe.subscriptions.list({ customer: stripeId, status: 'all', limit: 20 });
      const viva = ((lista && lista.data) || []).some((sub) => STATUS_VIVOS.includes(sub.status));
      if (viva) {
        return res.status(409).json({ error: 'Você já possui uma assinatura ativa. Gerencie-a pela página de configurações.', code: 'already_subscribed' });
      }
    }

    const base = {
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      metadata: { userId },
      success_url: `${process.env.NEXT_PUBLIC_URL}/anamnesismed-dashboard.html?payment=success`,
      cancel_url:  `${process.env.NEXT_PUBLIC_URL}/anamnesismed-landing.html#pricing`,
      allow_promotion_codes: true,
    };

    let session;
    if (stripeId) {
      // Reaproveita o customer existente (histórico/cartões/faturas no mesmo cadastro, sem
      // duplicar clientes). `customer` e `customer_email` são mutuamente exclusivos no Stripe.
      try {
        session = await stripe.checkout.sessions.create({ ...base, customer: stripeId });
      } catch (e) {
        // stripe_id órfão (customer apagado no Stripe): cai para e-mail em vez de travar o checkout.
        if (e && e.code === 'resource_missing') session = await stripe.checkout.sessions.create({ ...base, customer_email: email });
        else throw e;
      }
    } else {
      session = await stripe.checkout.sessions.create({ ...base, customer_email: email });
    }

    res.status(200).json({ url: session.url });
  } catch (err) {
    // Sem o objeto de erro inteiro: pode carregar request/headers da API do Stripe.
    console.error('Stripe checkout error:', JSON.stringify({ type: err && err.type, code: err && err.code, status: err && err.statusCode }));
    res.status(500).json({ error: 'Não foi possível iniciar o pagamento' });
  }
};
