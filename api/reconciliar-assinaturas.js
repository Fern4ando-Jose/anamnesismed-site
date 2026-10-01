/**
 * Vercel Function — GET /api/reconciliar-assinaturas
 *
 * POR QUE EXISTE: o webhook do Stripe grava o `event.id` em `stripe_events` ANTES de processar. Se o
 * processamento falha e a reversão da idempotência TAMBÉM falha (banco fora do ar), o evento fica
 * "processado" e o Stripe não reentrega: o cliente pagou e ficou sem plano (ou, ao contrário,
 * cancelou e continuou `pro`). Esta rotina — rodada pelo cron diário — compara o banco com a
 * VERDADE do Stripe e corrige as divergências:
 *   B) Para cada assinatura VIVA no Stripe (active/trialing/past_due): o perfil do customer
 *      (profiles.stripe_id) tem de estar `pro`. Se o perfil não tem stripe_id (webhook perdido antes
 *      de gravar), tenta achá-lo pelo e-mail do customer — só se houver EXATAMENTE 1 perfil, sem
 *      stripe_id próprio, fora de exclusão e (se STRIPE_PRICE_ID existir) com o preço do app.
 *   A) Para cada perfil `pro` COM stripe_id cujo customer não tem assinatura viva: volta para `trial`
 *      (confirmado por consulta direta ao Stripe antes de rebaixar).
 * Perfis `pro` SEM stripe_id (concedidos à mão) nunca são tocados.
 *
 * Divergência sem como corrigir (assinatura viva sem perfil, perfil duplicado, conta em exclusão) só
 * gera LOG de ALERTA — para o dono tratar. Logs estruturados (uma linha JSON) com IDs apenas
 * (user, customer, subscription); nunca e-mail, nome ou dado clínico.
 *
 * Tempo/paginação: roda até PRAZO_MS (a função tem maxDuration 60 s). Se não terminar, devolve
 * `completo: false` e `proximo` (cursor do passo A): chame de novo com `?depois=<proximo>` (o passo B
 * é reexecutado inteiro, é barato e idempotente). Cada execução é segura de repetir.
 *
 * Proteção: `Authorization: Bearer <CRON_SECRET>` SEMPRE (a Vercel injeta nos crons quando a env
 * existe); sem a env → 503 (fail-closed), igual a /api/manter-banco-vivo.
 *
 * Env vars: CRON_SECRET, STRIPE_SECRET_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY, STRIPE_PRICE_ID (opcional).
 */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');
const { STATUS_VIVOS, temAssinaturaViva, contaEmExclusao } = require('./_comum');

const PRAZO_MS = 45000;   // deixa folga dentro do maxDuration de 60 s
const PAGINA_STRIPE = 100;
const PAGINA_PERFIS = 200;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const idDe = (v) => (typeof v === 'string' ? v : (v && v.id) || null);
const log = (o) => console.log(JSON.stringify({ evt: 'reconciliacao_corrige', ...o, ts: new Date().toISOString() }));
const alerta = (o) => console.error(JSON.stringify({ evt: 'reconciliacao_alerta', ...o, ts: new Date().toISOString() }));

const emExclusao = (sb, userId) => contaEmExclusao(sb, userId, { toleraAusente: true });

module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'no-store');

  const segredo = process.env.CRON_SECRET;
  if (!segredo) {
    console.error(JSON.stringify({ evt: 'reconciliacao', ok: false, motivo: 'CRON_SECRET ausente' }));
    return res.status(503).json({ ok: false, error: 'CRON_SECRET não configurado no servidor' });
  }
  if ((req.headers['authorization'] || '') !== 'Bearer ' + segredo) return res.status(401).json({ error: 'Não autorizado' });

  if (!process.env.STRIPE_SECRET_KEY || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error(JSON.stringify({ evt: 'reconciliacao', ok: false, motivo: 'env ausente' }));
    return res.status(503).json({ ok: false, error: 'Servidor não configurado' });
  }

  const depois = req.query && typeof req.query.depois === 'string' ? req.query.depois : '';
  if (depois && !UUID.test(depois)) return res.status(400).json({ error: 'Parâmetro depois inválido' });

  const t0 = Date.now();
  const acabou = () => Date.now() - t0 >= PRAZO_MS;
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const precoApp = process.env.STRIPE_PRICE_ID || '';
  const r = { vivas_vistas: 0, corrigidos_pro: 0, adotados_por_email: 0, rebaixados: 0, alertas: 0, erros: 0 };
  let completo = true;
  let proximo = null;
  const vivos = new Set(); // customers com assinatura viva (passo B)

  try {
    // ── B) assinaturas vivas no Stripe → perfil tem de ser `pro` ──────────────────────────────
    passoB:
    for (const status of STATUS_VIVOS) {
      let apos;
      for (;;) {
        if (acabou()) { completo = false; break passoB; }
        const pagina = await stripe.subscriptions.list({ status, limit: PAGINA_STRIPE, ...(apos ? { starting_after: apos } : {}) });
        const subs = (pagina && pagina.data) || [];
        for (const sub of subs) {
          if (acabou()) { completo = false; break passoB; }
          const cid = idDe(sub.customer);
          if (!cid || vivos.has(cid)) continue;
          vivos.add(cid);
          r.vivas_vistas++;
          try {
            const { data: perfis, error } = await sb.from('profiles').select('id, plano, stripe_id').eq('stripe_id', cid).limit(2);
            if (error) throw new Error(error.code || 'erro ao ler perfil');
            if (perfis.length > 1) { r.alertas++; alerta({ motivo: 'stripe_id_duplicado', customer: cid }); continue; }
            if (perfis.length === 1) {
              const p = perfis[0];
              if (p.plano === 'pro') continue;
              if (await emExclusao(sb, p.id)) { r.alertas++; alerta({ motivo: 'assinatura_viva_conta_em_exclusao', user: p.id, customer: cid, subscription: sub.id }); continue; }
              const up = await sb.from('profiles').update({ plano: 'pro' }).eq('id', p.id);
              if (up.error) throw new Error(up.error.code || 'erro ao atualizar');
              r.corrigidos_pro++;
              log({ user: p.id, customer: cid, subscription: sub.id, de: p.plano || null, para: 'pro', motivo: 'assinatura_viva_no_stripe' });
              continue;
            }
            // Nenhum perfil com esse stripe_id: o webhook de checkout pode ter se perdido.
            const noPreco = !precoApp || ((sub.items && sub.items.data) || []).some((i) => i.price && i.price.id === precoApp);
            const cli = noPreco ? await stripe.customers.retrieve(cid) : null;
            const email = cli && !cli.deleted && typeof cli.email === 'string' ? cli.email.trim().toLowerCase() : '';
            let alvo = null;
            if (email) {
              const { data: porEmail, error: e2 } = await sb.from('profiles').select('id, plano, stripe_id').eq('email', email).limit(2);
              if (e2) throw new Error(e2.code || 'erro ao ler perfil por e-mail');
              if (porEmail.length === 1 && !porEmail[0].stripe_id) alvo = porEmail[0];
            }
            if (alvo && !(await emExclusao(sb, alvo.id))) {
              const up = await sb.from('profiles').update({ plano: 'pro', stripe_id: cid }).eq('id', alvo.id).is('stripe_id', null);
              if (up.error) throw new Error(up.error.code || 'erro ao atualizar');
              r.adotados_por_email++;
              log({ user: alvo.id, customer: cid, subscription: sub.id, de: alvo.plano || null, para: 'pro', motivo: 'perfil_sem_stripe_id' });
            } else {
              r.alertas++;
              alerta({ motivo: 'assinatura_viva_sem_perfil', customer: cid, subscription: sub.id });
            }
          } catch (e) {
            r.erros++;
            alerta({ motivo: 'falha_ao_reconciliar_assinatura', customer: cid, erro: String(e && (e.code || e.message)).slice(0, 80) });
          }
        }
        if (!(pagina && pagina.has_more) || !subs.length) break;
        apos = subs[subs.length - 1].id;
      }
    }

    // ── A) perfis `pro` com stripe_id sem assinatura viva → trial ─────────────────────────────
    let cursor = depois || null;
    if (completo) {
      for (;;) {
        if (acabou()) { completo = false; proximo = cursor; break; }
        let q = sb.from('profiles').select('id, stripe_id').eq('plano', 'pro').not('stripe_id', 'is', null);
        if (cursor) q = q.gt('id', cursor);
        const { data: perfis, error } = await q.order('id', { ascending: true }).limit(PAGINA_PERFIS);
        if (error) throw new Error(error.code || 'erro ao listar perfis');
        const lote = perfis || [];
        let interrompido = false;
        for (const p of lote) {
          if (acabou()) { interrompido = true; break; }
          cursor = p.id;
          if (vivos.has(p.stripe_id)) continue;
          try {
            let viva = false;
            try { viva = await temAssinaturaViva(stripe, p.stripe_id); } catch (e) { if (!(e && e.code === 'resource_missing')) throw e; }
            if (viva) continue;
            const up = await sb.from('profiles').update({ plano: 'trial' }).eq('id', p.id).eq('plano', 'pro');
            if (up.error) throw new Error(up.error.code || 'erro ao atualizar');
            r.rebaixados++;
            log({ user: p.id, customer: p.stripe_id, de: 'pro', para: 'trial', motivo: 'sem_assinatura_viva_no_stripe' });
          } catch (e) {
            r.erros++;
            alerta({ motivo: 'falha_ao_verificar_perfil_pro', user: p.id, erro: String(e && (e.code || e.message)).slice(0, 80) });
          }
        }
        if (interrompido) { completo = false; proximo = cursor; break; }
        if (lote.length < PAGINA_PERFIS) break;
      }
    } else {
      proximo = depois || null; // B não terminou; o passo A nem começou
    }
  } catch (e) {
    const ms = Date.now() - t0;
    console.error(JSON.stringify({ evt: 'reconciliacao', ok: false, ms, ...r, motivo: String(e && (e.code || e.message)).slice(0, 120) }));
    return res.status(503).json({ ok: false, error: 'Reconciliação falhou', ...r });
  }

  const ms = Date.now() - t0;
  console.log(JSON.stringify({ evt: 'reconciliacao', ok: true, completo, ms, ...r, ts: new Date().toISOString() }));
  return res.status(200).json({ ok: true, completo, ms, ...r, ...(completo ? {} : { proximo }) });
};
