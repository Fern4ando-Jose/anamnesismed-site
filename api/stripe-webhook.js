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
const { temAssinaturaViva, contaEmExclusao, STATUS_VIVOS, descreveErro, falhaSegura } = require('./_comum');

const MAX_BODY = 1000000;   // ~1 MB: eventos do Stripe têm poucos KB; acima disso é abuso (413)
const LEASE_MS = 60000;     // evento 'processing' há mais que isto pode ser reassumido por outra entrega

const idDe = (v) => (typeof v === 'string' ? v : (v && v.id) || null);

// Eventos que EXIGEM escrita no banco. Só estes entram em stripe_events: registrar todo
// tipo que o Stripe enviar (inclusive os que ignoramos) só incharia a tabela e daria
// superfície para encher o banco com eventos irrelevantes.
//  - customer.subscription.updated: unpaid/canceled REBAIXAM (se não houver outra assinatura viva);
//    active/trialing PROMOVEM a pro (recupera quem ficou sem plano por um checkout perdido, ou voltou de
//    past_due/unpaid pagando o cartão). Outros status (past_due, incomplete...) não escrevem nada.
//  - invoice.payment_failed só loga (não rebaixa na 1ª falha).
function eventoExigeEscrita(event) {
  switch (event && event.type) {
    case 'checkout.session.completed':
    case 'customer.subscription.deleted':
      return true;
    case 'customer.subscription.updated': {
      const st = event.data && event.data.object && event.data.object.status;
      return st === 'unpaid' || st === 'canceled' || st === 'active' || st === 'trialing';
    }
    default:
      return false;
  }
}

// Lê o body raw (a assinatura do Stripe é calculada sobre os bytes exatos) com TETO: devolve null se passar de `max`.
async function lerBody(req, max) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > max) return null;
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

// ── Idempotência com estado e lease (tabela stripe_events; colunas status/processing_desde da migration
// 2026-10-04-stripe-events-lease) ───────────────────────────────────────────────────────────────────
// Devolve 'ok' (este worker processa), 'duplicado' (já concluído) ou 'ocupado' (outro worker processa há < 1 min).
// LANÇA em qualquer erro de banco que não seja a violação de PK (23505): FALHA FECHADA → 5xx e o Stripe reentrega.
async function reivindica(sbAdmin, event) {
  const ins = await sbAdmin.from('stripe_events').insert({ event_id: event.id, type: event.type });
  if (!ins.error) return 'ok';
  if (ins.error.code !== '23505') throw falhaSegura('idempotência indisponível: ' + descreveErro(ins.error));

  const { data, error } = await sbAdmin.from('stripe_events').select('status, processing_desde').eq('event_id', event.id).maybeSingle();
  if (error) {
    // Colunas da migration 2026-10-04 ainda não existem: modelo antigo (linha presente = já processado).
    if (error.code === '42703') return 'duplicado';
    throw falhaSegura('leitura da idempotência falhou: ' + descreveErro(error));
  }
  if (!data) return 'ocupado'; // a linha foi revertida entre o insert e o select: a próxima entrega reprocessa
  if (data.status === 'done') return 'duplicado';
  const desde = Date.parse(data.processing_desde);
  if (Number.isFinite(desde) && Date.now() - desde < LEASE_MS) return 'ocupado';

  // Lease vencido (worker anterior morreu): assume com compare-and-swap no processing_desde.
  const novo = await sbAdmin.from('stripe_events')
    .update({ processing_desde: new Date().toISOString() })
    .eq('event_id', event.id).eq('status', 'processing').eq('processing_desde', data.processing_desde)
    .select('event_id');
  if (novo.error) throw falhaSegura('retomada do lease falhou: ' + descreveErro(novo.error));
  return Array.isArray(novo.data) && novo.data.length ? 'ok' : 'ocupado';
}

// Conta em exclusão? Tabela ausente = sem marca (não trava a ativação de billing); outro erro lança
// (→ 500 e o Stripe reentrega).
const emExclusao = (sbAdmin, userId) => contaEmExclusao(sbAdmin, userId, { toleraAusente: true });

// Cancela, BEST EFFORT, a assinatura criada por um checkout cujo perfil não existe mais / está em
// exclusão (senão o ex-usuário seria cobrado sem ter conta). Nunca lança; só loga IDs (sem PII).
async function cancelaAssinaturaOrfa(stripe, obj) {
  try {
    const ids = new Set();
    if (typeof obj.subscription === 'string' && obj.subscription) ids.add(obj.subscription);
    else if (obj.subscription && obj.subscription.id) ids.add(obj.subscription.id);
    if (!ids.size && typeof obj.customer === 'string' && obj.customer) {
      const lista = await stripe.subscriptions.list({ customer: obj.customer, status: 'all', limit: 100 });
      for (const sub of ((lista && lista.data) || [])) if (STATUS_VIVOS.includes(sub.status)) ids.add(sub.id);
    }
    for (const id of ids) {
      try { await stripe.subscriptions.cancel(id); } catch (e) { if (!(e && e.code === 'resource_missing')) throw e; }
    }
    return ids.size;
  } catch (e) {
    console.error('[ALERTA stripe] não foi possível cancelar a assinatura órfã — cancele manualmente no Stripe. customer', obj && obj.customer, descreveErro(e));
    return -1;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const faltando = ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_KEY']
    .filter((k) => !process.env[k]);
  if (faltando.length) {
    console.error('[stripe-webhook] env ausente no servidor:', faltando.join(', '));
    return res.status(500).json({ error: 'Webhook não configurado no servidor' });
  }

  // Sem o header de assinatura não há o que validar: recusa ANTES de ler o body ou criar clients.
  const sig = req.headers['stripe-signature'];
  if (!sig || typeof sig !== 'string') return res.status(400).json({ error: 'Webhook signature ausente' });

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

  // Lê o body raw (com teto de ~1 MB) para validar a assinatura do Stripe
  const rawBody = await lerBody(req, MAX_BODY);
  if (!rawBody) return res.status(413).json({ error: 'Corpo grande demais' });

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', descreveErro(err));
    return res.status(400).json({ error: 'Webhook signature inválida' });
  }

  // Tipos que não escrevem nada: confirma (200) SEM registrar em stripe_events.
  if (!eventoExigeEscrita(event)) {
    if (event.type === 'invoice.payment_failed') {
      // Só registra; não rebaixa na primeira falha (dunning do Stripe cuida das novas tentativas).
      console.warn(`[stripe-webhook] pagamento falhou — customer ${event.data.object.customer} (sem rebaixar)`);
    }
    return res.status(200).json({ received: true, ignored: true });
  }

  // ── Idempotência com lease: reivindica o event.id ANTES de processar, marca 'done' só ao FINAL ──────────
  // O Stripe reentrega eventos; sem isto um checkout.session.completed repetido reativaria a assinatura.
  // FALHA FECHADA: se a idempotência não pode ser garantida (erro de banco que não seja PK duplicada),
  // responde 5xx e o Stripe reentrega — a assinatura já foi validada, então não há risco de forja, mas
  // processar sem dedup/lease permitiria corridas.
  let posse;
  try {
    posse = await reivindica(sbAdmin, event);
  } catch (e) {
    console.error('[stripe-webhook] idempotência indisponível (falha fechada, o Stripe reentrega):', descreveErro(e));
    return res.status(503).json({ error: 'Idempotência indisponível' });
  }
  if (posse === 'duplicado') {
    console.log(`↩️  Evento Stripe já processado, ignorando: ${event.id}`);
    return res.status(200).json({ received: true, duplicate: true });
  }
  if (posse === 'ocupado') {
    console.log(`⏳ Evento Stripe em processamento por outra execução: ${event.id}`);
    res.setHeader && res.setHeader('Retry-After', '60');
    return res.status(503).json({ error: 'Evento em processamento', code: 'em_processamento' });
  }

  const obj = event.data.object;

  // Confirma NO STRIPE que a assinatura está viva (active/trialing/past_due) antes de conceder `pro`:
  // o payload do evento pode estar atrasado/fora de ordem. Devolve a assinatura, ou null se não vale
  // (inexistente ou não-viva). Erro de rede/API LANÇA (→ 5xx e reentrega).
  async function assinaturaViva(subId) {
    if (!subId) return null;
    let sub;
    try {
      sub = await stripe.subscriptions.retrieve(subId);
    } catch (e) {
      if (e && e.code === 'resource_missing') return null;
      throw e;
    }
    return sub && STATUS_VIVOS.includes(sub.status) ? sub : null;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        // Só assinatura PAGA ativa o plano: confere `mode` e `payment_status` (um checkout em
        // outro modo, ou concluído sem pagamento, não pode virar `pro`). `no_payment_required`
        // cobre assinatura com período de teste.
        if (obj.mode !== 'subscription') {
          console.warn(`[stripe-webhook] checkout.session.completed com mode=${obj.mode} (esperado subscription) — nada ativado`);
          break;
        }
        if (obj.payment_status !== 'paid' && obj.payment_status !== 'no_payment_required') {
          console.warn(`[stripe-webhook] checkout.session.completed com payment_status=${obj.payment_status} — nada ativado`);
          break;
        }
        const userId = obj.metadata?.userId;
        if (userId) {
          // Conta sendo excluída (ou já excluída): NÃO ativa; devolve sucesso idempotente (200),
          // porque reentregar não adianta, e cancela a assinatura que o checkout acabou de criar.
          if (await emExclusao(sbAdmin, userId)) {
            const n = await cancelaAssinaturaOrfa(stripe, obj);
            console.error(`[ALERTA stripe] checkout concluído para conta em exclusão (user ${userId}, customer ${obj.customer}) — não ativado; assinaturas canceladas: ${n}`);
            break;
          }
          // Confirma no Stripe que a assinatura do checkout está viva (não confia só no payload).
          const subId = idDe(obj.subscription);
          const sub = await assinaturaViva(subId);
          if (!sub) {
            console.error(`[ALERTA stripe] checkout concluído, mas a assinatura ${subId || '(ausente)'} não está viva no Stripe — plano NÃO ativado (user ${userId}, customer ${obj.customer})`);
            break;
          }
          // `update` do supabase-js NÃO lança: devolve { error }. Sem checar, um erro (ou
          // nenhuma linha afetada) devolvia 200 ao Stripe, que não retentava — cliente
          // pagou e ficou sem o plano. Erro de banco vira throw → 5xx + reversão da
          // idempotência (catch abaixo), e o Stripe reentrega.
          const { data: linhas, error } = await sbAdmin.from('profiles')
            .update({ plano: 'pro', stripe_id: obj.customer })
            .eq('id', userId)
            .select('id');
          if (error) throw falhaSegura('falha ao ativar plano pro: ' + descreveErro(error));
          if (!Array.isArray(linhas) || linhas.length === 0) {
            // Perfil inexistente (conta já excluída): reentregar não resolve — responder 500 faria o
            // Stripe insistir por dias. Sucesso idempotente + ALERTA + cancela a assinatura criada.
            const n = await cancelaAssinaturaOrfa(stripe, obj);
            console.error(`[ALERTA stripe] checkout concluído sem perfil (user ${userId}, customer ${obj.customer}) — não ativado; assinaturas canceladas: ${n}`);
            break;
          }
          console.log(`✅ Usuário ${userId} ativado como pro`);
        } else {
          console.warn('[stripe-webhook] checkout.session.completed sem metadata.userId — nada ativado');
        }
        break;
      }

      // customer.subscription.updated: active/trialing PROMOVEM (recupera quem ficou sem plano); unpaid/canceled
      // REBAIXAM (cai no caso abaixo). invoice.payment_failed NÃO rebaixa — a 1ª falha de cartão é rotineira e
      // o Stripe faz novas tentativas (dunning); se esgotar, a assinatura vira unpaid/canceled.
      case 'customer.subscription.updated': {
        if (obj.status === 'active' || obj.status === 'trialing') {
          const customerId = idDe(obj.customer);
          if (!customerId) break;
          const { data: perfis, error } = await sbAdmin.from('profiles').select('id, plano').eq('stripe_id', customerId).limit(2);
          if (error) throw falhaSegura('falha ao ler perfil por stripe_id: ' + descreveErro(error));
          if (!perfis || perfis.length === 0) {
            console.warn(`[stripe-webhook] assinatura ${obj.id} ${obj.status} sem perfil com stripe_id (customer ${customerId}) — nada promovido (o checkout/reconciliação vinculam)`);
            break;
          }
          if (perfis.length > 1) {
            console.error(`[ALERTA stripe] stripe_id duplicado em profiles (customer ${customerId}) — nada promovido`);
            break;
          }
          const perfil = perfis[0];
          if (perfil.plano === 'pro') break; // já está pro
          if (await emExclusao(sbAdmin, perfil.id)) {
            console.error(`[ALERTA stripe] assinatura ${obj.status} de conta em exclusão (user ${perfil.id}, customer ${customerId}) — não promovido`);
            break;
          }
          if (!(await assinaturaViva(obj.id))) {
            console.warn(`[stripe-webhook] assinatura ${obj.id} não está viva no Stripe agora (evento atrasado?) — nada promovido`);
            break;
          }
          const { error: e2 } = await sbAdmin.from('profiles').update({ plano: 'pro' }).eq('stripe_id', customerId);
          if (e2) throw falhaSegura('falha ao promover plano: ' + descreveErro(e2));
          console.log(`✅ Assinatura ${obj.status} — customer ${customerId} → pro`);
          break;
        }
        if (obj.status !== 'unpaid' && obj.status !== 'canceled') break;
        // eslint-disable-next-line no-fallthrough
      }
      // Rebaixa SOMENTE quando a assinatura realmente acabou: deleted, ou updated com status unpaid/canceled.
      // eslint-disable-next-line no-fallthrough
      case 'customer.subscription.deleted': {
        const customerId = obj.customer;
        if (customerId) {
          // Assinatura ANTIGA encerrada não rebaixa quem já tem OUTRA assinatura viva (reassinou, ou
          // há duas no mesmo customer). Falha ao consultar o Stripe → throw → 500 (reentrega).
          if (await temAssinaturaViva(stripe, customerId, obj.id)) {
            console.log(`ℹ️  Assinatura ${obj.id} encerrada (${event.type}), mas customer ${customerId} tem outra viva — plano mantido`);
            break;
          }
          // Mesma regra: checa o `error` (não lança). Zero linhas é legítimo aqui (conta já
          // excluída / customer desconhecido), então só o erro real reprova.
          const { error } = await sbAdmin.from('profiles')
            .update({ plano: 'trial' })
            .eq('stripe_id', customerId);
          if (error) throw falhaSegura('falha ao rebaixar plano: ' + descreveErro(error));
          console.log(`⚠️  Assinatura encerrada (${event.type}) — customer ${customerId} → trial`);
        }
        break;
      }

      default:
        // Inalcançável: eventoExigeEscrita() já filtrou os tipos sem escrita.
        break;
    }
  } catch (err) {
    // Falha ao processar: remove o registro de idempotência para a reentrega do Stripe reprocessar
    // imediatamente. Se a remoção também falhar, o lease (1 min) deixa outra entrega assumir o evento.
    console.error('[stripe-webhook] erro ao processar', event.type, descreveErro(err));
    try {
      const del = await sbAdmin.from('stripe_events').delete().eq('event_id', event.id);
      if (del && del.error) console.error('[ALERTA stripe] não foi possível reverter a idempotência de', event.id, '— o lease de 1 min libera a reentrega:', descreveErro(del.error));
    } catch (_) { console.error('[ALERTA stripe] exceção ao reverter a idempotência de', event.id); }
    return res.status(500).json({ error: 'Erro ao processar evento' });
  }

  // Só agora o evento vale como concluído. Falha aqui não derruba a resposta (o processamento é idempotente:
  // no pior caso o lease vence e uma reentrega repete o mesmo efeito).
  try {
    const fim = await sbAdmin.from('stripe_events').update({ status: 'done' }).eq('event_id', event.id);
    if (fim && fim.error) console.error('[ALERTA stripe] evento processado, mas não foi marcado done:', event.id, descreveErro(fim.error));
  } catch (e) {
    console.error('[ALERTA stripe] exceção ao marcar done:', event.id, descreveErro(e));
  }

  res.status(200).json({ received: true });
};

// Desliga o parse automático do body (necessário p/ validar a assinatura do Stripe).
module.exports.config = { api: { bodyParser: false } };
