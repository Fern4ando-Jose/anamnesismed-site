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
 * O body é lido do stream (antes de qualquer acesso a req.body) e o
 * `module.exports.config` abaixo desliga o bodyParser no runtime que o respeitar.
 */

// Só os MÓDULOS são carregados no topo; os CLIENTES (Stripe/Supabase) são criados dentro
// do handler, depois de checar as envs — assim a falta de uma env vira um erro claro
// (500 com log) em vez de derrubar o carregamento da função.
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const faltando = ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_KEY']
    .filter((k) => !process.env[k]);
  if (faltando.length) {
    console.error('[stripe-webhook] env ausente no servidor:', faltando.join(', '));
    return res.status(500).json({ error: 'Webhook não configurado no servidor' });
  }
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

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

      // Rebaixa SOMENTE quando a assinatura realmente acabou: deleted, ou updated com
      // status unpaid/canceled. invoice.payment_failed NÃO rebaixa — a 1ª falha de cartão
      // é rotineira e o Stripe faz novas tentativas (dunning); se esgotar, ele muda a
      // assinatura para unpaid/canceled e cai nos casos abaixo.
      case 'customer.subscription.updated':
        if (obj.status !== 'unpaid' && obj.status !== 'canceled') break;
        // eslint-disable-next-line no-fallthrough
      case 'customer.subscription.deleted': {
        const customerId = obj.customer;
        if (customerId) {
          await sbAdmin.from('profiles')
            .update({ plano: 'trial' })
            .eq('stripe_id', customerId);
          console.log(`⚠️  Assinatura encerrada (${event.type}) — customer ${customerId} → trial`);
        }
        break;
      }

      case 'invoice.payment_failed':
        // Só registra; não rebaixa na primeira falha (ver comentário acima).
        console.warn(`[stripe-webhook] pagamento falhou — customer ${obj.customer} (sem rebaixar)`);
        break;

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

// Desliga o parse automático do body (necessário p/ validar a assinatura do Stripe).
module.exports.config = { api: { bodyParser: false } };
