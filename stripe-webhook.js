/**
 * Vercel Function — /api/stripe-webhook.js
 * Recebe eventos do Stripe e atualiza o Supabase
 * 
 * Variáveis de ambiente necessárias:
 *   STRIPE_SECRET_KEY       → sk_live_...
 *   STRIPE_WEBHOOK_SECRET   → whsec_... (do Stripe Dashboard)
 *   SUPABASE_URL            → https://xxx.supabase.co
 *   SUPABASE_SERVICE_KEY    → service_role key (só no backend!)
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const sbAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // service key — só no backend!
);

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  const userId = event.data.object.metadata?.userId;

  switch (event.type) {

    case 'checkout.session.completed':
      // Usuário pagou — atualiza para plano pro
      if (userId) {
        await sbAdmin.from('profiles')
          .update({
            plano: 'pro',
            stripe_id: event.data.object.customer
          })
          .eq('id', userId);
      }
      break;

    case 'customer.subscription.deleted':
    case 'invoice.payment_failed':
      // Assinatura cancelada ou pagamento falhou — volta para trial/expirado
      const customerId = event.data.object.customer;
      await sbAdmin.from('profiles')
        .update({ plano: 'trial' })
        .eq('stripe_id', customerId);
      break;
  }

  res.status(200).json({ received: true });
};
