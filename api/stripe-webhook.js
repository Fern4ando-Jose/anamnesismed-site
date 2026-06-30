/**
 * Vercel Function — POST /api/stripe-webhook
 * Recebe eventos do Stripe e atualiza o Supabase
 *
 * Env vars necessárias no Vercel:
 *   STRIPE_SECRET_KEY       → sk_live_...
 *   STRIPE_WEBHOOK_SECRET   → whsec_... (do Stripe Dashboard → Webhooks)
 *   SUPABASE_URL            → https://xxx.supabase.co
 *   SUPABASE_SERVICE_KEY    → service_role key (só no backend!)
 *
 * IMPORTANTE: esta rota precisa do body RAW (não parseado).
 * O vercel.json deve ter bodyParser: false para este path.
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const sbAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  // Lê o body raw para validar assinatura do Stripe
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks);

  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).json({ error: 'Webhook signature inválida' });
  }

  // ── Idempotência: grava o event.id ANTES de processar ───────────────────────
  // O Stripe reentrega eventos; sem isto um checkout.session.completed repetido
  // reativaria a assinatura. PK única em stripe_events → 23505 = já processado.
  // A assinatura já foi validada acima (constructEvent), então NÃO há risco de forja:
  // se a tabela ainda não existir, seguimos sem dedup (loga alerta) para não bloquear
  // a ativação de billing antes de a migração rodar.
  let dedupActive = true;
  const ins = await sbAdmin.from('stripe_events').insert({ event_id: event.id, type: event.type });
  if (ins.error) {
    if (ins.error.code === '23505') {
      console.log(`↩️  Evento Stripe já processado, ignorando: ${event.id}`);
      return res.status(200).json({ received: true, duplicate: true });
    }
    console.error('[stripe-webhook] idempotência indisponível (segue sem dedup):', ins.error.message || ins.error.code);
    dedupActive = false;
  }

  const obj = event.data.object;

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const userId = obj.metadata?.userId;
        if (userId) {
          await sbAdmin.from('profiles')
            .update({ plano: 'pro', stripe_id: obj.customer })
            .eq('id', userId);
          console.log(`✅ Usuário ${userId} ativado como pro`);
        }
        break;
      }

      case 'customer.subscription.deleted':
      case 'invoice.payment_failed': {
        const customerId = obj.customer;
        if (customerId) {
          await sbAdmin.from('profiles')
            .update({ plano: 'trial' })
            .eq('stripe_id', customerId);
          console.log(`⚠️  Assinatura cancelada/falhada — customer ${customerId} → trial`);
        }
        break;
      }

      default:
        // Evento não tratado — OK, só confirma recebimento
        break;
    }
  } catch (err) {
    // Falha ao processar: remove o registro de idempotência para permitir que a
    // reentrega do Stripe reprocesse o evento (senão o 23505 o pularia para sempre).
    console.error('[stripe-webhook] erro ao processar', event.type, err && err.message ? err.message : err);
    if (dedupActive) {
      try { await sbAdmin.from('stripe_events').delete().eq('event_id', event.id); } catch (_) { /* best-effort */ }
    }
    return res.status(500).json({ error: 'Erro ao processar evento' });
  }

  res.status(200).json({ received: true });
};
