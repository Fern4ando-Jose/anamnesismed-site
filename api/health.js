/**
 * Vercel Function — GET /api/health
 * Health check leve para monitoração (canary-watch / uptime).
 *
 * Devolve 200 sempre que a função executa, com:
 *  - status: "ok"
 *  - time:   timestamp UTC do processamento
 *  - env:    quais integrações ESTÃO configuradas (BOOLEANO, nunca o valor —
 *            segredo jamais vai para a resposta, P3). Deixa o canary detectar
 *            uma env faltando em produção sem expor nada.
 *  - commit: SHA do deploy (Vercel injeta VERCEL_GIT_COMMIT_SHA), quando existir.
 *
 * Não toca no banco nem em API paga — health check tem de ser barato e não
 * disparar custo (P2). Um 500 aqui significa que a própria função não subiu.
 */
module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    status: 'ok',
    time: new Date().toISOString(),
    env: {
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      supabase: !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY),
      stripe: !!process.env.STRIPE_SECRET_KEY,
    },
    commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
  });
};
