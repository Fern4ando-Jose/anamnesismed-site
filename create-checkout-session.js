/**
 * Vercel Function — /api/create-checkout-session.js
 * Cria sessão de pagamento no Stripe
 * 
 * Variáveis de ambiente necessárias no Vercel:
 *   STRIPE_SECRET_KEY   → chave secreta do Stripe (sk_live_...)
 *   STRIPE_PRICE_ID     → id do preço recorrente ($1.99/mês)
 *   NEXT_PUBLIC_URL     → https://anamnesismed.com
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, userId } = req.body;

  if (!email || !userId) {
    return res.status(400).json({ error: 'Email e userId obrigatórios' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [{
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      }],
      metadata: { userId },
      success_url: `${process.env.NEXT_PUBLIC_URL}/anamnesismed-dashboard.html?payment=success`,
      cancel_url:  `${process.env.NEXT_PUBLIC_URL}/anamnesismed-landing.html#pricing`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
};
