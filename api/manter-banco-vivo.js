/**
 * Vercel Function — GET /api/manter-banco-vivo
 *
 * POR QUE EXISTE (02/08/2026): o dono não conseguiu entrar no site. O banco (Supabase)
 * havia sido DESLIGADO pelo próprio serviço — o plano gratuito pausa projetos parados
 * alguns dias e, ao pausar, o endereço do banco some da internet. A tela de login
 * continuava abrindo, mas não tinha para onde falar. Ninguém foi avisado: descobrimos
 * porque o dono tentou usar.
 *
 * O que este endpoint faz: uma consulta minúscula ao banco, uma vez por dia, pelo
 * agendador da Vercel (ver "crons" no vercel.json). Um banco tocado todo dia nunca
 * fica "parado" o suficiente para ser pausado — e, se ainda assim estiver fora do ar,
 * a resposta registra o erro no log da função, que é onde o canário procura.
 *
 * Não gasta API paga (P2): fala só com o Supabase, com a chave de serviço já
 * configurada. Não lê nem devolve dado de paciente — conta linhas de `profiles`.
 *
 * Proteção: o agendador da Vercel manda o cabeçalho `x-vercel-cron`; fora isso,
 * exige `?token=` igual a CRON_SECRET quando essa variável existir. Sem proteção
 * alguma seria uma porta aberta para qualquer um martelar o banco.
 */
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const doAgendador = !!req.headers['x-vercel-cron'];
  const segredo = process.env.CRON_SECRET;
  const tokenOk = !segredo || (req.query && req.query.token === segredo);
  if (!doAgendador && !tokenOk) return res.status(401).json({ error: 'Não autorizado' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    console.error(JSON.stringify({ evt: 'keepalive', ok: false, motivo: 'env ausente' }));
    return res.status(503).json({ ok: false, error: 'Supabase não configurado no servidor' });
  }

  const t0 = Date.now();
  try {
    const sb = createClient(url, key);
    // `head: true` traz só a contagem — nenhum dado de paciente sai do banco.
    const { error, count } = await sb.from('profiles').select('id', { count: 'exact', head: true });
    if (error) throw new Error(error.message || 'consulta falhou');
    const ms = Date.now() - t0;
    console.log(JSON.stringify({ evt: 'keepalive', ok: true, perfis: count || 0, ms: ms, ts: new Date().toISOString() }));
    return res.status(200).json({ ok: true, perfis: count || 0, ms: ms });
  } catch (e) {
    const ms = Date.now() - t0;
    // Mensagem sanitizada: o erro cru do banco pode trazer detalhe interno (P3).
    console.error(JSON.stringify({ evt: 'keepalive', ok: false, ms: ms, motivo: String(e && e.message).slice(0, 200) }));
    return res.status(503).json({ ok: false, error: 'Banco não respondeu' });
  }
};
