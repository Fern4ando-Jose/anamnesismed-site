/**
 * Utilitários compartilhados das Vercel Functions (arquivo com prefixo "_": a Vercel NÃO o
 * publica como rota; só é empacotado junto de quem o importa).
 *
 * Nada aqui loga dado de paciente nem o texto cru de erros de SDK.
 */

// Extrai o token do header `Authorization: Bearer <access_token do Supabase>`.
function lerToken(req) {
  const h = (req.headers && (req.headers['authorization'] || req.headers['Authorization'])) || '';
  return /^Bearer\s+(.+)$/i.test(h) ? h.replace(/^Bearer\s+/i, '').trim() : '';
}

// CORS fail-closed: só o domínio do app (NEXT_PUBLIC_URL), nunca '*'.
function aplicaCors(res, metodos) {
  const origem = process.env.NEXT_PUBLIC_URL || '';
  if (origem) res.setHeader('Access-Control-Allow-Origin', origem);
  res.setHeader('Access-Control-Allow-Methods', metodos);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

/**
 * Devolve 1 unidade da cota diária de IA (RPC `devolver_cota_ia`) quando a chamada ao
 * modelo FALHOU depois de a cota já ter sido consumida (a cota é consumida ANTES, de forma
 * atômica, para o teto de custo valer sob concorrência). Nunca lança e nunca mascara o erro
 * original da rota: qualquer falha aqui só vira log (sem dados sensíveis).
 * Retorna true se a devolução foi confirmada.
 */
async function devolverCota(sbAdmin, userId, rota) {
  try {
    const { error } = await sbAdmin.rpc('devolver_cota_ia', { p_user_id: userId, p_rota: rota });
    if (error) {
      console.error('[cota] devolver_cota_ia falhou (migration 2026-10-02 aplicada?):', rota, error.code || String(error.message || '').slice(0, 120));
      return false;
    }
    return true;
  } catch (e) {
    console.error('[cota] devolver_cota_ia exceção:', rota, String(e && e.message).slice(0, 120));
    return false;
  }
}

// Tabela ainda não criada (migration opcional não aplicada): 42P01 = undefined_table (Postgres),
// PGRST205 = tabela fora do schema cache (PostgREST). Tratada como "sem dados", não como falha.
function tabelaAusente(error) {
  return !!error && (error.code === '42P01' || error.code === 'PGRST205');
}

// Valida o token no Supabase. Retorna o usuário ({id, email, ...}) ou null.
async function usuarioDoToken(sbAdmin, token) {
  try {
    const { data, error } = await sbAdmin.auth.getUser(token);
    return (!error && data && data.user && data.user.id) ? data.user : null;
  } catch (e) {
    return null;
  }
}

// Padrão de entrada das rotas: CORS restrito, `Cache-Control: no-store`, preflight e método.
// Retorna true quando a resposta JÁ foi enviada (OPTIONS ou método errado) — a rota só faz `return`.
function iniciaRota(req, res, metodo) {
  aplicaCors(res, metodo + ', OPTIONS');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') { res.status(200).end(); return true; }
  if (req.method !== metodo) { res.status(405).json({ error: 'Method not allowed' }); return true; }
  return false;
}

/**
 * Autentica a requisição (Bearer do Supabase). Retorna `{ user }` ou `{ status: 401, error }`
 * (a rota só devolve o erro). `msg(pt, es)` permite rotas bilíngues; o padrão é português.
 * A identidade vem SEMPRE do token validado no servidor, nunca do body.
 */
async function autenticar(sbAdmin, req, msg) {
  const m = msg || ((p) => p);
  const token = lerToken(req);
  if (!token) return { status: 401, error: m('Não autenticado', 'No autenticado') };
  try {
    const { data, error } = await sbAdmin.auth.getUser(token);
    if (error || !data || !data.user || !data.user.id) return { status: 401, error: m('Sessão inválida', 'Sesión inválida') };
    return { user: data.user };
  } catch (e) {
    return { status: 401, error: m('Falha ao validar sessão', 'Error al validar la sesión') };
  }
}

// Limites por usuário (janela fixa, em segundos) das rotas SEM cota de IA. Ajuste aqui.
const LIMITES = {
  'exportar-dados': { max: 5, janelaSeg: 3600 },
  'excluir-conta': { max: 3, janelaSeg: 3600 },
  'checkout': { max: 20, janelaSeg: 3600 },
  'portal-cliente': { max: 20, janelaSeg: 3600 },
};

/**
 * Consome 1 unidade do limite `acao` do usuário (RPC atômica `consumir_limite`, só service_role).
 * Retorna true se PODE seguir. Caso contrário JÁ respondeu: 429 + `Retry-After` (segundos) quando
 * estourou, ou 503 quando o limitador está indisponível (FALHA FECHADA: RPC ausente/erro — a
 * migration 2026-10-03-consumir-limite.sql não foi aplicada?).
 */
async function aplicaLimite(res, sbAdmin, userId, acao) {
  const cfg = LIMITES[acao];
  let retorno;
  try {
    retorno = await sbAdmin.rpc('consumir_limite', { p_user_id: userId, p_acao: acao, p_janela_seg: cfg.janelaSeg, p_max: cfg.max });
  } catch (e) {
    retorno = { error: { code: 'EXC' } };
  }
  const { data, error } = retorno || {};
  if (error || typeof data !== 'number' || data < 0) {
    console.error('[ALERTA limite] consumir_limite indisponível (fail-closed; migration 2026-10-03 aplicada?):', acao, error ? (error.code || String(error.message || '').slice(0, 80)) : 'retorno inesperado');
    res.status(503).json({ error: 'Serviço temporariamente indisponível. Tente novamente em instantes.', code: 'limite_indisponivel' });
    return false;
  }
  if (data > 0) {
    res.setHeader('Retry-After', String(data));
    res.status(429).json({ error: 'Muitas tentativas. Aguarde antes de tentar de novo.', code: 'rate_limited', retry_after: data });
    return false;
  }
  return true;
}

// Assinaturas do Stripe que ainda valem como plano `pro` (past_due conta: o caminho é atualizar o cartão).
const STATUS_VIVOS = ['active', 'trialing', 'past_due'];

// O customer tem alguma assinatura viva (exceto `ignorarId`)? Lança em erro do Stripe (o chamador decide).
async function temAssinaturaViva(stripe, customerId, ignorarId) {
  const lista = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 100 });
  return ((lista && lista.data) || []).some((sub) => sub.id !== ignorarId && STATUS_VIVOS.includes(sub.status));
}

// A conta está marcada como "em exclusão"? (tabela contas_em_exclusao, só service_role.)
// Retorna true/false; LANÇA se não der para saber (tabela ausente inclusive) — quem chama falha fechado.
async function contaEmExclusao(sbAdmin, userId) {
  const { data, error } = await sbAdmin.from('contas_em_exclusao').select('user_id').eq('user_id', userId).maybeSingle();
  if (error) throw new Error(error.code || 'erro ao ler contas_em_exclusao');
  return !!data;
}

module.exports = { lerToken, aplicaCors, devolverCota, tabelaAusente, usuarioDoToken, iniciaRota, autenticar, aplicaLimite, LIMITES, STATUS_VIVOS, temAssinaturaViva, contaEmExclusao };
