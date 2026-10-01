/**
 * Vercel Function — GET /api/exportar-dados
 * Portabilidade/acesso aos dados do PRÓPRIO usuário (LGPD art. 18, II e V): devolve um JSON
 * com o perfil e todas as HCs (e exportações de PDF) dele.
 *
 * Exige `Authorization: Bearer <access_token do Supabase>`; o usuário vem do TOKEN validado no
 * servidor — não há parâmetro de id, então ninguém exporta dado de terceiros. Leitura com a
 * service_role SEMPRE filtrada pelo id do token. Falha em qualquer tabela → 5xx (nunca entrega
 * uma exportação parcial como se fosse completa).
 *
 * PRIVACIDADE: o conteúdo clínico só vai na resposta ao próprio dono; nada é logado.
 * Resposta com `Cache-Control: no-store` e download como arquivo.
 *
 * Env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY, NEXT_PUBLIC_URL (CORS).
 */
const { createClient } = require('@supabase/supabase-js');
const { lerToken, aplicaCors, tabelaAusente, usuarioDoToken } = require('./_comum');

const PAGINA = 1000;       // tamanho do lote (limite padrão do PostgREST)
const MAX_LINHAS = 20000;  // teto de segurança por tabela (memória/tempo da função)

// Lê todas as linhas do dono, em lotes. Tabela inexistente → []. Outro erro → lança.
async function lerTudo(sb, tabela, coluna, valor) {
  const linhas = [];
  for (let ini = 0; ini < MAX_LINHAS; ini += PAGINA) {
    const { data, error } = await sb.from(tabela).select('*').eq(coluna, valor).order('id', { ascending: true }).range(ini, ini + PAGINA - 1);
    if (error) {
      if (tabelaAusente(error)) return [];
      throw new Error(tabela + ': ' + (error.code || 'erro de leitura'));
    }
    const lote = data || [];
    linhas.push(...lote);
    if (lote.length < PAGINA) break;
  }
  return linhas;
}

module.exports = async (req, res) => {
  aplicaCors(res, 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('[exportar-dados] env do Supabase ausente');
    return res.status(500).json({ error: 'Supabase não configurado no servidor' });
  }

  const token = lerToken(req);
  if (!token) return res.status(401).json({ error: 'Não autenticado' });

  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const user = await usuarioDoToken(sbAdmin, token);
  if (!user) return res.status(401).json({ error: 'Sessão inválida' });

  try {
    const [perfis, historias, pdfs] = await Promise.all([
      lerTudo(sbAdmin, 'profiles', 'id', user.id),
      lerTudo(sbAdmin, 'historias_clinicas', 'user_id', user.id),
      lerTudo(sbAdmin, 'pdf_exports', 'user_id', user.id),
    ]);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="anamnesismed-meus-dados.json"');
    return res.status(200).json({
      exportado_em: new Date().toISOString(),
      usuario: { id: user.id, email: user.email || null },
      perfil: perfis[0] || null,
      historias_clinicas: historias,
      pdf_exports: pdfs,
    });
  } catch (e) {
    console.error('[exportar-dados] falha ao ler dados:', String(e && e.message).slice(0, 80), 'user=' + user.id);
    return res.status(500).json({ error: 'Não foi possível exportar seus dados agora. Tente novamente.' });
  }
};
