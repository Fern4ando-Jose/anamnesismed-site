/**
 * Vercel Function — POST /api/create-checkout-session
 * Cria sessão de pagamento no Stripe
 *
 * Env vars necessárias no Vercel:
 *   STRIPE_SECRET_KEY   → sk_live_...
 *   STRIPE_PRICE_ID     → price_...
 *   NEXT_PUBLIC_URL     → https://www.anamnesismed.com
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // CORS para o domínio do app
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, userId } = req.body;
  if (!email || !userId) {
    return res.status(400).json({ error: 'Email e userId obrigatórios' });
  }

  try {
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
