/**
 * Vercel Function — POST /api/excluir-conta
 * Exclusão da conta e dos dados do próprio usuário (LGPD art. 18, VI — "eliminação").
 *
 * O que faz, nesta ordem (cada passo é idempotente; falhou no meio → 5xx e o usuário pode
 *   repetir a chamada, que continua de onde parou):
 *   1. Valida o token (Bearer) e o corpo: exige `{ "confirmar": true }` (ação irreversível).
 *      Limite: 3 exclusões/hora por usuário (429 + Retry-After; 503 se o limitador faltar).
 *   1b. MARCA a conta como "em exclusão" (tabela `contas_em_exclusao`) ANTES de qualquer efeito:
 *      a partir daí /api/create-checkout-session recusa novos checkouts (409) e o webhook do Stripe
 *      trata um checkout tardio como sucesso idempotente e cancela a assinatura criada. Sem
 *      conseguir marcar → 503 e nada é feito. A marca NÃO tem FK e sobrevive à exclusão do login.
 *   2. Cancela NA HORA as assinaturas do Stripe do cliente (se houver) e, em seguida, apaga o customer
 *      no Stripe (best effort: falha só é logada; faturas já emitidas seguem retidas pelo Stripe).
 *      Se não conseguir cancelar, ABORTA antes de apagar qualquer coisa — senão o ex-usuário continuaria
 *      sendo cobrado sem ter conta — e REMOVE a marca de exclusão (reversão), para a conta não ficar
 *      travada (sem checkout) depois de uma exclusão que não aconteceu.
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
const { iniciaRota, autenticar, aplicaLimite, tabelaAusente, descreveErro, falhaSegura } = require('./_comum');

// [tabela, coluna do dono] — ordem importa: filhas antes do perfil e do usuário no Auth
// (a FK de `historias_clinicas.user_id` virou CASCADE na migration 2026-10-04, mas a ordem explícita continua valendo).
// REGRA (checada por test/sql-pg.test.js no Postgres de teste): toda tabela de `public` com FK para
// auth.users TEM de estar aqui OU ter ON DELETE CASCADE (ex.: `rate_limits` cai por cascade).
// Ao criar tabela nova com dado do usuário, inclua-a aqui. `contas_em_exclusao` fica de fora de
// propósito (a marca sobrevive à exclusão).
const TABELAS = [
  ['historias_clinicas', 'user_id'],
  ['pdf_exports', 'user_id'],
  ['gerar_hc_usage', 'user_id'],
  ['ai_assistant_usage', 'user_id'],
  ['profiles', 'id'],
];

// Assinaturas que ainda podem cobrar (tudo que não está encerrado).
const ENCERRADAS = ['canceled', 'incomplete_expired'];

// Desfaz a marca de "em exclusão" (best effort) quando a exclusão é ABORTADA antes de apagar qualquer dado.
// Sem isso a conta ficaria impedida de abrir checkout. Nunca lança.
async function desfazMarca(sbAdmin, userId) {
  try {
    const { error } = await sbAdmin.from('contas_em_exclusao').delete().eq('user_id', userId);
    if (error) console.error('[ALERTA excluir-conta] não foi possível remover a marca de exclusão após abortar:', descreveErro(error), 'user=' + userId);
  } catch (e) {
    console.error('[ALERTA excluir-conta] exceção ao remover a marca de exclusão após abortar:', descreveErro(e), 'user=' + userId);
  }
}

function falha(res, status, msg, motivo, userId) {
  if (motivo) console.error('[excluir-conta]', motivo, userId ? 'user=' + userId : '');
  return res.status(status).json({ error: msg });
}

module.exports = async (req, res) => {
  if (iniciaRota(req, res, 'POST')) return;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return falha(res, 500, 'Supabase não configurado no servidor', 'env do Supabase ausente');
  }

  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const auth = await autenticar(sbAdmin, req);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const userId = auth.user.id;

  // Ação irreversível: exige confirmação explícita no corpo.
  const body = (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) ? req.body : {};
  if (body.confirmar !== true) {
    return res.status(400).json({ error: 'Confirmação obrigatória: envie {"confirmar": true}', code: 'confirmacao_obrigatoria' });
  }

  // Limite por usuário (fail-closed). Depois da confirmação: corpo inválido não gasta tentativa.
  if (!(await aplicaLimite(res, sbAdmin, userId, 'excluir-conta'))) return;

  // 1a) MARCA a conta como "em exclusão" ANTES de qualquer efeito (idempotente: upsert por user_id).
  // Fail-closed: sem a marca não dá para impedir um checkout concorrente, então não prossegue.
  try {
    const { error } = await sbAdmin.from('contas_em_exclusao').upsert({ user_id: userId }, { onConflict: 'user_id', ignoreDuplicates: true });
    if (error) throw falhaSegura('erro ao marcar: ' + descreveErro(error));
  } catch (e) {
    return falha(res, 503, 'Não foi possível concluir agora. Tente novamente em instantes.', 'marca de exclusão falhou (migration 2026-10-03-contas-em-exclusao aplicada?): ' + descreveErro(e), userId);
  }

  // 1) Perfil → customer do Stripe. FAIL-CLOSED: sem saber se há assinatura, não apaga.
  let stripeId = null;
  try {
    const { data: prof, error } = await sbAdmin.from('profiles').select('stripe_id').eq('id', userId).maybeSingle();
    if (error) throw falhaSegura('erro ao ler perfil: ' + descreveErro(error));
    stripeId = (prof && prof.stripe_id) || null;
  } catch (e) {
    await desfazMarca(sbAdmin, userId);
    return falha(res, 503, 'Não foi possível concluir agora. Tente novamente em instantes.', 'leitura do perfil falhou: ' + descreveErro(e), userId);
  }

  // 2) Cancela assinaturas no Stripe (se houver). Falha → aborta SEM apagar nada.
  if (stripeId) {
    if (!process.env.STRIPE_SECRET_KEY) {
      await desfazMarca(sbAdmin, userId);
      return falha(res, 500, 'Pagamento não configurado no servidor', 'STRIPE_SECRET_KEY ausente com stripe_id presente', userId);
    }
    try {
      const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
      // Expira checkouts ainda ABERTOS do customer (best effort): um deles poderia ser pago depois
      // do cancelamento. Se escapar, o webhook cancela a assinatura criada (conta marcada).
      try {
        const abertas = await stripe.checkout.sessions.list({ customer: stripeId, status: 'open', limit: 100 });
        for (const sessao of ((abertas && abertas.data) || [])) {
          try { await stripe.checkout.sessions.expire(sessao.id); } catch (_) { /* já expirada/paga */ }
        }
      } catch (e) {
        console.warn('[excluir-conta] não foi possível expirar checkouts abertos (segue):', descreveErro(e), 'user=' + userId);
      }
      const lista = await stripe.subscriptions.list({ customer: stripeId, status: 'all', limit: 100 });
      for (const sub of ((lista && lista.data) || [])) {
        if (ENCERRADAS.includes(sub.status)) continue;
        try {
          await stripe.subscriptions.cancel(sub.id);
        } catch (e) {
          if (!(e && e.code === 'resource_missing')) throw e; // já não existe = ok
        }
      }
      // Apaga o customer (best effort): tira nome/e-mail do Stripe e impede novas cobranças no cadastro antigo.
      // Falha só vira log — as assinaturas já foram canceladas e a exclusão dos dados segue.
      try {
        await stripe.customers.del(stripeId);
      } catch (e) {
        if (!(e && e.code === 'resource_missing')) console.error('[ALERTA excluir-conta] customer do Stripe não apagado (apague manualmente se necessário):', stripeId, descreveErro(e), 'user=' + userId);
      }
    } catch (e) {
      // customer apagado no Stripe = nada a cancelar; qualquer outro erro aborta.
      if (!(e && e.code === 'resource_missing')) {
        await desfazMarca(sbAdmin, userId); // nada foi apagado: reverte a marca para não travar a conta
        return falha(res, 502, 'Não foi possível cancelar a assinatura. Nada foi apagado; tente novamente.', 'cancelamento no Stripe falhou: ' + descreveErro(e), userId);
      }
    }
  }

  // 3) Dados do usuário. `delete` do supabase-js NÃO lança: checa o `error` de cada tabela.
  for (const [tabela, coluna] of TABELAS) {
    try {
      const { error } = await sbAdmin.from(tabela).delete().eq(coluna, userId);
      if (error && !tabelaAusente(error)) throw falhaSegura('erro ao apagar: ' + descreveErro(error));
    } catch (e) {
      return falha(res, 500, 'Não foi possível apagar todos os dados. Tente novamente.', 'delete em ' + tabela + ' falhou: ' + descreveErro(e), userId);
    }
  }

  // 4) Usuário no Auth. "Não encontrado" = já apagado (idempotente).
  try {
    const { error } = await sbAdmin.auth.admin.deleteUser(userId);
    if (error) {
      const jaNaoExiste = error.status === 404 || error.code === 'user_not_found';
      if (!jaNaoExiste) throw falhaSegura('erro ao remover login: ' + descreveErro(error));
    }
  } catch (e) {
    return falha(res, 500, 'Dados apagados, mas não foi possível remover o login. Tente novamente.', 'auth.admin.deleteUser falhou: ' + descreveErro(e), userId);
  }

  console.log(JSON.stringify({ evt: 'conta_excluida', stripe: !!stripeId, ts: new Date().toISOString() }));
  return res.status(200).json({ ok: true });
};

module.exports.TABELAS = TABELAS;
