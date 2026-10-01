/**
 * Vercel Function — POST /api/excluir-conta
 * Exclusão da conta e dos dados do próprio usuário (LGPD art. 18, VI — "eliminação").
 *
 * O que faz, nesta ordem (cada passo é idempotente; falhou no meio → 5xx e o usuário pode
 * repetir a chamada, que continua de onde parou):
 *   1. Valida o token (Bearer) e o corpo: exige `{ "confirmar": true }` (ação irreversível).
 *   2. Cancela NA HORA as assinaturas do Stripe do cliente (se houver). Se não conseguir
 *      cancelar, ABORTA antes de apagar qualquer coisa — senão o ex-usuário continuaria sendo
 *      cobrado sem ter conta.
 *   3. Apaga (service_role) as HCs (`historias_clinicas`), exportações de PDF, tabelas de uso
 *      de IA e o perfil.
 *   4. Apaga o usuário no Auth do Supabase (sem isto o login continuaria existindo).
 *
 * Resposta: 200 `{ ok: true }`. Repetir a chamada depois de concluída devolve 401 (o token do
 * usuário apagado deixa de valer) — o resultado final é o mesmo: a conta não existe mais.
 *
 * PRIVACIDADE: nunca loga conteúdo clínico, e-mail nem corpo da requisição; só IDs e códigos de
 * erro. O que NÃO é apagado: faturas/registros fiscais no Stripe (o Stripe os retém por
 * obrigação legal) — ver docs/lgpd.md.
 *
 * Env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY, STRIPE_SECRET_KEY, NEXT_PUBLIC_URL (CORS).
 */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');
const { lerToken, aplicaCors, tabelaAusente, usuarioDoToken } = require('./_comum');

// [tabela, coluna do dono] — ordem importa: filhas antes do perfil e do usuário no Auth
// (`historias_clinicas.user_id` referencia auth.users SEM cascade).
const TABELAS = [
  ['historias_clinicas', 'user_id'],
  ['pdf_exports', 'user_id'],
  ['gerar_hc_usage', 'user_id'],
  ['ai_assistant_usage', 'user_id'],
  ['profiles', 'id'],
];

// Assinaturas que ainda podem cobrar (tudo que não está encerrado).
const ENCERRADAS = ['canceled', 'incomplete_expired'];

function falha(res, status, msg, motivo, userId) {
  if (motivo) console.error('[excluir-conta]', motivo, userId ? 'user=' + userId : '');
  return res.status(status).json({ error: msg });
}

module.exports = async (req, res) => {
  aplicaCors(res, 'POST, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return falha(res, 500, 'Supabase não configurado no servidor', 'env do Supabase ausente');
  }

  const token = lerToken(req);
  if (!token) return res.status(401).json({ error: 'Não autenticado' });

  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const user = await usuarioDoToken(sbAdmin, token);
  if (!user) return res.status(401).json({ error: 'Sessão inválida' });
  const userId = user.id;

  // Ação irreversível: exige confirmação explícita no corpo.
  const body = (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) ? req.body : {};
  if (body.confirmar !== true) {
    return res.status(400).json({ error: 'Confirmação obrigatória: envie {"confirmar": true}', code: 'confirmacao_obrigatoria' });
  }

  // 1) Perfil → customer do Stripe. FAIL-CLOSED: sem saber se há assinatura, não apaga.
  let stripeId = null;
  try {
    const { data: prof, error } = await sbAdmin.from('profiles').select('stripe_id').eq('id', userId).maybeSingle();
    if (error) throw new Error(error.code || 'erro ao ler perfil');
    stripeId = (prof && prof.stripe_id) || null;
  } catch (e) {
    return falha(res, 503, 'Não foi possível concluir agora. Tente novamente em instantes.', 'leitura do perfil falhou: ' + String(e && e.message).slice(0, 80), userId);
  }

  // 2) Cancela assinaturas no Stripe (se houver). Falha → aborta SEM apagar nada.
  if (stripeId) {
    if (!process.env.STRIPE_SECRET_KEY) {
      return falha(res, 500, 'Pagamento não configurado no servidor', 'STRIPE_SECRET_KEY ausente com stripe_id presente', userId);
    }
    try {
      const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
      const lista = await stripe.subscriptions.list({ customer: stripeId, status: 'all', limit: 100 });
      for (const sub of ((lista && lista.data) || [])) {
        if (ENCERRADAS.includes(sub.status)) continue;
        try {
          await stripe.subscriptions.cancel(sub.id);
        } catch (e) {
          if (!(e && e.code === 'resource_missing')) throw e; // já não existe = ok
        }
      }
    } catch (e) {
      // customer apagado no Stripe = nada a cancelar; qualquer outro erro aborta.
      if (!(e && e.code === 'resource_missing')) {
        return falha(res, 502, 'Não foi possível cancelar a assinatura. Nada foi apagado; tente novamente.', 'cancelamento no Stripe falhou: ' + JSON.stringify({ type: e && e.type, code: e && e.code, status: e && e.statusCode }), userId);
      }
    }
  }

  // 3) Dados do usuário. `delete` do supabase-js NÃO lança: checa o `error` de cada tabela.
  for (const [tabela, coluna] of TABELAS) {
    try {
      const { error } = await sbAdmin.from(tabela).delete().eq(coluna, userId);
      if (error && !tabelaAusente(error)) throw new Error(error.code || 'erro ao apagar');
    } catch (e) {
      return falha(res, 500, 'Não foi possível apagar todos os dados. Tente novamente.', 'delete em ' + tabela + ' falhou: ' + String(e && e.message).slice(0, 80), userId);
    }
  }

  // 4) Usuário no Auth. "Não encontrado" = já apagado (idempotente).
  try {
    const { error } = await sbAdmin.auth.admin.deleteUser(userId);
    if (error) {
      const jaNaoExiste = error.status === 404 || error.code === 'user_not_found';
      if (!jaNaoExiste) throw new Error(error.code || String(error.status || 'erro'));
    }
  } catch (e) {
    return falha(res, 500, 'Dados apagados, mas não foi possível remover o login. Tente novamente.', 'auth.admin.deleteUser falhou: ' + String(e && e.message).slice(0, 80), userId);
  }

  console.log(JSON.stringify({ evt: 'conta_excluida', stripe: !!stripeId, ts: new Date().toISOString() }));
  return res.status(200).json({ ok: true });
};
