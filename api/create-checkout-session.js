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

module.exports = async (req, res) => {
  // CORS — falha fechado: só o domínio do app (NEXT_PUBLIC_URL), nunca '*'.
  // Endpoint que cria cobrança não pode aceitar qualquer origem. Sem a env
  // configurada, não enviamos o header (cross-origin bloqueado; same-origin segue).
  const allowedOrigin = process.env.NEXT_PUBLIC_URL || '';
  if (allowedOrigin) res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
  const authHeader = req.headers['authorization'] || req.headers['Authorization'] || '';
  const token = /^Bearer\s+(.+)$/i.test(authHeader) ? authHeader.replace(/^Bearer\s+/i, '').trim() : '';
  if (!token) return res.status(401).json({ error: 'Não autenticado' });

  let userId = null;
  let email = null;
  try {
    const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
    const { data, error } = await sbAdmin.auth.getUser(token);
    if (error || !data || !data.user) return res.status(401).json({ error: 'Sessão inválida' });
    userId = data.user.id;
    email = data.user.email;
  } catch (e) {
    return res.status(401).json({ error: 'Falha ao validar sessão' });
  }
  if (!userId || !email) return res.status(400).json({ error: 'Usuário sem email válido' });

  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      metadata: { userId },
      success_url: `${process.env.NEXT_PUBLIC_URL}/anamnesismed-dashboard.html?payment=success`,
      cancel_url:  `${process.env.NEXT_PUBLIC_URL}/anamnesismed-landing.html#pricing`,
      allow_promotion_codes: true,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({ error: 'Não foi possível iniciar o pagamento' });
  }
};
