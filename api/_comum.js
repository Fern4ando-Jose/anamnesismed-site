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

module.exports = { lerToken, aplicaCors, devolverCota, tabelaAusente, usuarioDoToken };
