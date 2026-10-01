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
 * LIMITES: 5 exportações/hora por usuário (429 + Retry-After; 503 se o limitador faltar) e TETO de
 * tamanho — no máximo 20.000 linhas no total e ~4 MB de JSON (a Vercel corta respostas acima de
 * 4,5 MB). Acima disso → 413 `export_muito_grande` com mensagem clara (nunca uma exportação
 * truncada); o titular pede a exportação completa pelo canal do DPO (docs/lgpd.md).
 *
 * Env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY, NEXT_PUBLIC_URL (CORS).
 */
const { createClient } = require('@supabase/supabase-js');
const { iniciaRota, autenticar, aplicaLimite, tabelaAusente, descreveErro, falhaSegura } = require('./_comum');

const PAGINA = 1000;            // tamanho do lote (limite padrão do PostgREST)
const MAX_LINHAS = 20000;       // teto TOTAL de linhas (todas as tabelas somadas)
const MAX_BYTES = 4000000;      // teto do JSON (limite de resposta da Vercel ≈ 4,5 MB)

class ExportGrande extends Error {}

// Lê todas as linhas do dono, em lotes, descontando do orçamento COMPARTILHADO `orc`
// ({ linhas, bytes }). Tabela inexistente → []. Estourou o teto → ExportGrande. Outro erro → lança.
async function lerTudo(sb, tabela, coluna, valor, orc) {
  const linhas = [];
  for (let ini = 0; ; ini += PAGINA) {
    const { data, error } = await sb.from(tabela).select('*').eq(coluna, valor).order('id', { ascending: true }).range(ini, ini + PAGINA - 1);
    if (error) {
      if (tabelaAusente(error)) return [];
      throw falhaSegura(tabela + ': ' + descreveErro(error));
    }
    const lote = data || [];
    orc.linhas += lote.length;
    orc.bytes += Buffer.byteLength(JSON.stringify(lote), 'utf8'); // bytes reais (UTF-8), não caracteres
    if (orc.linhas > MAX_LINHAS || orc.bytes > MAX_BYTES) throw new ExportGrande(tabela);
    linhas.push(...lote);
    if (lote.length < PAGINA) break;
  }
  return linhas;
}

module.exports = async (req, res) => {
  if (iniciaRota(req, res, 'GET')) return;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('[exportar-dados] env do Supabase ausente');
    return res.status(500).json({ error: 'Supabase não configurado no servidor' });
  }

  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const auth = await autenticar(sbAdmin, req);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  const user = auth.user;

  if (!(await aplicaLimite(res, sbAdmin, user.id, 'exportar-dados'))) return;

  try {
    // Sequencial (não Promise.all): o orçamento é compartilhado e o primeiro estouro já aborta,
    // sem carregar as outras tabelas na memória da função.
    const orc = { linhas: 0, bytes: 0 };
    const perfis = await lerTudo(sbAdmin, 'profiles', 'id', user.id, orc);
    const historias = await lerTudo(sbAdmin, 'historias_clinicas', 'user_id', user.id, orc);
    const pdfs = await lerTudo(sbAdmin, 'pdf_exports', 'user_id', user.id, orc);
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
    if (e instanceof ExportGrande) {
      console.warn('[exportar-dados] exportação acima do teto (' + MAX_LINHAS + ' linhas / ' + MAX_BYTES + ' bytes) user=' + user.id);
      return res.status(413).json({
        error: 'Seus dados excedem o tamanho máximo da exportação pelo site (' + MAX_LINHAS + ' registros ou 4 MB). Peça a exportação completa pelo canal de privacidade (DPO).',
        code: 'export_muito_grande',
      });
    }
    console.error('[exportar-dados] falha ao ler dados:', descreveErro(e), 'user=' + user.id);
    return res.status(500).json({ error: 'Não foi possível exportar seus dados agora. Tente novamente.' });
  }
};
