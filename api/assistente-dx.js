/**
 * Vercel Function — POST /api/assistente-dx
 * Assistente de IA de APOIO DIAGNÓSTICO. Lê a HC (anonimizada) montada no app e
 * devolve um relatório estruturado de raciocínio clínico: resumo do caso,
 * diagnóstico diferencial priorizado (achados a favor/contra), sinais de alarme
 * e próximos passos. NÃO substitui o julgamento médico.
 *
 * SEGURANÇA (regra do produto):
 *  - Exige `Authorization: Bearer <access_token do Supabase>`.
 *  - Valida o token no servidor e confirma que o usuário é do plano PAGO ('pro').
 *  - Aplica limite diário por usuário (controle de custo da API).
 *  - A chave da Anthropic NUNCA vai ao front-end — toda a chamada acontece aqui.
 *
 * Variáveis de ambiente necessárias no Vercel:
 *   ANTHROPIC_API_KEY     → chave secreta da Anthropic (sk-ant-...)
 *   SUPABASE_URL          → https://xxx.supabase.co
 *   SUPABASE_SERVICE_KEY  → service_role key (só no backend!)
 *
 * Entrada (POST JSON):
 *   { lang:'pt'|'es', hc:{ demografia, motivos:[...], relatoLivre, antecedentes,
 *                          exameFisico, sinaisVitais, hipoteses } }
 * Saída:
 *   { relatorio:{ resumo, diferenciais:[{hipotese,probabilidade,aFavor:[],contra:[]}],
 *                 sinaisAlarme:[], proximosPassos:[] }, raw? } | { error }
 */

const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');

const MODEL = 'claude-sonnet-4-6';
// 1500 e não 2200 (02/08/2026): o relatório estruturado cabe com folga neste
// tamanho, e cada token a mais é tempo a mais dentro do teto da função — foi
// resposta longa demais que fazia a análise ser cortada no meio (ver comentário
// em "5) Chamada ao modelo").
const MAX_TOKENS = 1500;

// ── LIMITE DIÁRIO POR USUÁRIO ────────────────────────────────────────────────
// TODO (a definir depois): diferenciar limite/preço entre MÉDICO e ESTUDANTE.
// Hoje há plano Estudante (US$1,99/mês) e a intenção de plano Médico (~US$4,99/mês).
// Quando os planos forem segmentados no perfil, trocar este valor fixo por um
// mapa { estudante: N, medico: M } lido do profile. Por ora, um teto único.
const DAILY_LIMIT = 20;

// ── PROMPT DO SISTEMA (apoio ao raciocínio clínico) ───────────────────────────
function buildSystemPrompt(pt) {
  if (pt) {
    return [
      'Você é um assistente de APOIO AO RACIOCÍNIO CLÍNICO para profissionais e estudantes de medicina. A partir de uma história clínica (HC) estruturada, você ajuda a organizar o raciocínio diagnóstico e a validar a coerência entre o quadro clínico e as hipóteses.',
      '',
      'REGRAS OBRIGATÓRIAS:',
      '1. Use EXCLUSIVAMENTE as informações fornecidas na HC. NUNCA invente sintomas, sinais, exames ou dados que não estejam no texto. Se um dado essencial faltar, aponte-o como lacuna a investigar.',
      '2. Você é uma FERRAMENTA DE APOIO À DECISÃO — não emite diagnóstico definitivo, não prescreve tratamento e não substitui a avaliação médica presencial. Enquadre tudo como sugestão para correlação clínica.',
      '3. Priorize as hipóteses por probabilidade considerando o quadro, e SEMPRE destaque os diagnósticos graves/que não se pode perder ("can\'t-miss"), mesmo quando pouco prováveis.',
      '4. Para cada hipótese, liste objetivamente os achados da HC que a sustentam (a favor) e os que a enfraquecem ou ainda faltam para confirmá-la (contra).',
      '5. Em "próximos passos", sugira exames complementares pertinentes e perguntas/dados que faltam na anamnese — sem prescrever doses ou condutas terapêuticas definitivas.',
      '6. Seja conciso, técnico e em português clínico do Brasil.',
      '',
      'FORMATO DE SAÍDA: responda APENAS com um objeto JSON válido (sem markdown, sem cercas ```), exatamente neste formato:',
      '{',
      '  "resumo": "uma frase resumindo o caso (representação do problema)",',
      '  "diferenciais": [ { "hipotese": "nome da hipótese", "probabilidade": "alta|media|baixa", "aFavor": ["achado 1","achado 2"], "contra": ["achado/lacuna 1"] } ],',
      '  "sinaisAlarme": ["sinal de alarme / red flag presente ou a vigiar"],',
      '  "proximosPassos": ["exame ou pergunta sugerida"]',
      '}',
      'Inclua de 3 a 6 hipóteses em "diferenciais", ordenadas da mais para a menos provável. Não escreva nada fora do JSON.',
    ].join('\n');
  }
  return [
    'Eres un asistente de APOYO AL RAZONAMIENTO CLÍNICO para profesionales y estudiantes de medicina. A partir de una historia clínica (HC) estructurada, ayudas a organizar el razonamiento diagnóstico y a validar la coherencia entre el cuadro clínico y las hipótesis.',
    '',
    'REGLAS OBLIGATORIAS:',
    '1. Usa EXCLUSIVAMENTE la información proporcionada en la HC. NUNCA inventes síntomas, signos, estudios ni datos que no estén en el texto. Si falta un dato esencial, señálalo como una laguna a investigar.',
    '2. Eres una HERRAMIENTA DE APOYO A LA DECISIÓN — no emites diagnóstico definitivo, no prescribes tratamiento y no sustituyes la evaluación médica presencial. Enmarca todo como sugerencia para correlación clínica.',
    '3. Prioriza las hipótesis por probabilidad según el cuadro, y SIEMPRE destaca los diagnósticos graves/que no se pueden pasar por alto ("can\'t-miss"), aunque sean poco probables.',
    '4. Para cada hipótesis, enumera objetivamente los hallazgos de la HC que la sustentan (a favor) y los que la debilitan o aún faltan para confirmarla (en contra).',
    '5. En "próximos pasos", sugiere estudios complementarios pertinentes y preguntas/datos que faltan en la anamnesis — sin prescribir dosis ni conductas terapéuticas definitivas.',
    '6. Sé conciso, técnico y en español clínico.',
    '',
    'FORMATO DE SALIDA: responde SOLO con un objeto JSON válido (sin markdown, sin vallas ```), exactamente en este formato:',
    '{',
    '  "resumo": "una frase que resume el caso (representación del problema)",',
    '  "diferenciais": [ { "hipotese": "nombre de la hipótesis", "probabilidade": "alta|media|baixa", "aFavor": ["hallazgo 1","hallazgo 2"], "contra": ["hallazgo/laguna 1"] } ],',
    '  "sinaisAlarme": ["signo de alarma / red flag presente o a vigilar"],',
    '  "proximosPassos": ["estudio o pregunta sugerida"]',
    '}',
    'Incluye de 3 a 6 hipótesis en "diferenciais", ordenadas de la más a la menos probable. No escribas nada fuera del JSON.',
  ].join('\n');
}

// ── Limites de tamanho de input (anti-abuso/custo: tudo isto entra no prompt) ──
const LIM = { bloco: 4000, campo: 1000, nome: 200, motivos: 10, respostas: 60 };
const clip = (s, max) => { s = (s == null ? '' : String(s)); return s.length > max ? s.slice(0, max) : s; };

// ── MONTA A MENSAGEM DO USUÁRIO a partir da HC (já anonimizada pelo front) ─────
function buildUserMessage(pt, hc) {
  hc = hc || {};
  const L = [];
  const push = (label, val, max) => { if (val && String(val).trim()) L.push(label + ': ' + clip(String(val).trim(), max || LIM.bloco)); };

  L.push(pt ? '## História Clínica (anonimizada)' : '## Historia Clínica (anonimizada)');

  const d = hc.demografia || {};
  push(pt ? 'Idade' : 'Edad', d.idade);
  if (d.sexo) push('Sexo', d.sexo === 'M' ? (pt ? 'masculino' : 'masculino') : d.sexo === 'F' ? (pt ? 'feminino' : 'femenino') : d.sexo);
  push(pt ? 'Tempo de evolução' : 'Tiempo de evolución', d.tempoEvolucao);

  if (Array.isArray(hc.motivos) && hc.motivos.length) {
    L.push('');
    L.push(pt ? '## Motivos e respostas guiadas (AEA)' : '## Motivos y respuestas guiadas (AEA)');
    hc.motivos.slice(0, LIM.motivos).forEach((m) => {
      L.push('');
      L.push((pt ? 'Motivo ' : 'Motivo ') + (m.ordem || '') + ': ' + clip(m.nome, LIM.nome));
      (m.respostas || []).slice(0, LIM.respostas).forEach((r) => { if (r && r.pergunta && r.resposta) L.push('- ' + clip(r.pergunta, LIM.campo) + ': ' + clip(r.resposta, LIM.campo)); });
    });
  }

  if (hc.relatoLivre && String(hc.relatoLivre).trim()) {
    L.push('');
    L.push(pt ? '## Relato livre / HDA' : '## Relato libre / HEA');
    L.push(clip(String(hc.relatoLivre).trim(), LIM.bloco));
  }
  if (hc.antecedentes && String(hc.antecedentes).trim()) {
    L.push('');
    L.push(pt ? '## Antecedentes (APP / APF / hábitos / RAS)' : '## Antecedentes (APP / APF / hábitos / RAS)');
    L.push(clip(String(hc.antecedentes).trim(), LIM.bloco));
  }
  if (hc.sinaisVitais && String(hc.sinaisVitais).trim()) {
    L.push('');
    L.push(pt ? '## Sinais vitais' : '## Signos vitales');
    L.push(clip(String(hc.sinaisVitais).trim(), LIM.bloco));
  }
  if (hc.exameFisico && String(hc.exameFisico).trim()) {
    L.push('');
    L.push(pt ? '## Exame físico' : '## Examen físico');
    L.push(clip(String(hc.exameFisico).trim(), LIM.bloco));
  }
  if (hc.hipoteses && String(hc.hipoteses).trim()) {
    L.push('');
    L.push(pt ? '## Hipóteses já anotadas pelo profissional' : '## Hipótesis ya anotadas por el profesional');
    L.push(clip(String(hc.hipoteses).trim(), LIM.bloco));
  }

  L.push('');
  L.push(pt
    ? 'Analise a HC acima e produza o relatório de apoio diagnóstico no formato JSON especificado.'
    : 'Analiza la HC anterior y produce el informe de apoyo diagnóstico en el formato JSON especificado.');
  return L.join('\n');
}

// ── Extrai e valida o JSON retornado pelo modelo ──────────────────────────────
function parseRelatorio(text) {
  if (!text) return null;
  let s = String(text).trim();
  // remove cercas de código se vierem
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  // pega do primeiro { ao último }
  const a = s.indexOf('{'), b = s.lastIndexOf('}');
  if (a >= 0 && b > a) s = s.slice(a, b + 1);
  try {
    const o = JSON.parse(s);
    return {
      resumo: typeof o.resumo === 'string' ? o.resumo : '',
      diferenciais: Array.isArray(o.diferenciais) ? o.diferenciais.map((h) => ({
        hipotese: String(h.hipotese || ''),
        probabilidade: ['alta', 'media', 'baixa'].indexOf(String(h.probabilidade || '').toLowerCase()) >= 0 ? String(h.probabilidade).toLowerCase() : 'media',
        aFavor: Array.isArray(h.aFavor) ? h.aFavor.map(String) : [],
        contra: Array.isArray(h.contra) ? h.contra.map(String) : [],
      })) : [],
      sinaisAlarme: Array.isArray(o.sinaisAlarme) ? o.sinaisAlarme.map(String) : [],
      proximosPassos: Array.isArray(o.proximosPassos) ? o.proximosPassos.map(String) : [],
    };
  } catch (e) {
    return null;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};
  const lang = body.lang === 'es' ? 'es' : 'pt';
  const pt = lang !== 'es';
  const msg = (p, e) => (pt ? p : e);

  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada no servidor' });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) return res.status(500).json({ error: 'Supabase não configurado no servidor' });

  // 1) Autenticação — token do Supabase no header Authorization
  const authHeader = req.headers['authorization'] || req.headers['Authorization'] || '';
  const token = /^Bearer\s+(.+)$/i.test(authHeader) ? authHeader.replace(/^Bearer\s+/i, '').trim() : '';
  if (!token) return res.status(401).json({ error: msg('Não autenticado', 'No autenticado') });

  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

  let userId = null;
  try {
    const { data, error } = await sbAdmin.auth.getUser(token);
    if (error || !data || !data.user) return res.status(401).json({ error: msg('Sessão inválida', 'Sesión inválida') });
    userId = data.user.id;
  } catch (e) {
    return res.status(401).json({ error: msg('Falha ao validar sessão', 'Error al validar la sesión') });
  }

  // 2) Plano pago — só 'pro' tem acesso (TODO: incluir trial/segmentar médico×estudante depois)
  try {
    const { data: prof, error } = await sbAdmin.from('profiles').select('plano').eq('id', userId).single();
    if (error || !prof || prof.plano !== 'pro') {
      return res.status(403).json({ error: msg('Recurso exclusivo do plano pago', 'Recurso exclusivo del plan de pago'), code: 'upgrade' });
    }
  } catch (e) {
    return res.status(403).json({ error: msg('Não foi possível confirmar o plano', 'No se pudo confirmar el plan'), code: 'upgrade' });
  }

  // 3) Limite diário por usuário (fail-open se a tabela ainda não existir)
  try {
    const dia = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
    const { data: row, error: selErr } = await sbAdmin
      .from('ai_assistant_usage').select('count').eq('user_id', userId).eq('dia', dia).single();
    if (selErr && selErr.code && selErr.code !== 'PGRST116') {
      // PGRST116 = nenhuma linha (esperado no 1º uso do dia). Outros erros → fail-open.
      console.warn('ai_assistant_usage select:', selErr.message || selErr.code);
    } else {
      const usados = row && typeof row.count === 'number' ? row.count : 0;
      if (usados >= DAILY_LIMIT) {
        return res.status(429).json({ error: msg('Limite diário de análises atingido. Tente novamente amanhã.', 'Límite diario de análisis alcanzado. Inténtalo de nuevo mañana.'), code: 'rate_limit' });
      }
      await sbAdmin.from('ai_assistant_usage')
        .upsert({ user_id: userId, dia, count: usados + 1 }, { onConflict: 'user_id,dia' });
    }
  } catch (e) {
    console.warn('ai_assistant_usage indisponível (fail-open):', e && e.message ? e.message : e);
  }

  // 4) Conteúdo mínimo
  const hc = body.hc || {};
  const temConteudo = (hc.relatoLivre && String(hc.relatoLivre).trim()) ||
    (Array.isArray(hc.motivos) && hc.motivos.some((m) => m && Array.isArray(m.respostas) && m.respostas.some((r) => r && r.resposta))) ||
    (hc.exameFisico && String(hc.exameFisico).trim());
  if (!temConteudo) return res.status(400).json({ error: msg('Preencha a HC antes de pedir a análise', 'Completa la HC antes de pedir el análisis') });

  // 5) Chamada ao modelo
  //
  // ⏱️ POR QUE STREAM E NÃO create() DIRETO (02/08/2026): a tela mostrava
  // "Falha de conexão. Tente novamente." em toda análise. A causa não era conexão:
  // a função tinha 30s de teto na Vercel e uma resposta longa do Sonnet passa
  // disso — a plataforma cortava a requisição e devolvia um erro que NÃO é JSON,
  // então o `r.json()` do navegador estourava e caía no catch genérico ("falha de
  // conexão"). Agora: teto de 60s (máximo do plano atual), resposta mais curta e
  // `stream()`, que mantém a conexão viva recebendo os pedaços à medida que saem
  // em vez de esperar tudo de uma vez. O formato devolvido ao cliente é o mesmo.
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      thinking: { type: 'disabled' }, // controle de custo: relatório direto, sem raciocínio extra cobrado
      // Prompt caching no bloco system (estável entre requests; o que varia é a HC do usuário).
      // ⚠️ HOJE não cacheia de fato: o mínimo cacheável do Sonnet 4.6 é 2048 tokens e este
      // system tem ~800 → cache_creation_input_tokens: 0 (silencioso). Estrutura correta
      // mantida: passa a cachear sozinho se o system crescer além do mínimo.
      system: [{ type: 'text', text: buildSystemPrompt(pt), cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: buildUserMessage(pt, hc) }],
    }).finalMessage();

    const text = (response.content || [])
      .filter((b) => b.type === 'text').map((b) => b.text).join('').trim();

    const relatorio = parseRelatorio(text);

    // Observabilidade estruturada: uma linha JSON por chamada paga (rota+status+userId+tokens),
    // lida pela rotina semanal de custo nos logs da Vercel. userId é ID Supabase (não PII);
    // nenhum dado de paciente é logado.
    const u = (response && response.usage) || {};
    console.log(JSON.stringify({
      evt: 'ai_call', route: 'assistente-dx', status: 200, lang: lang, model: MODEL,
      userId: userId, input_tokens: u.input_tokens || 0, output_tokens: u.output_tokens || 0,
      cache_read: u.cache_read_input_tokens || 0, cache_write: u.cache_creation_input_tokens || 0,
      parsed: !!relatorio, ts: new Date().toISOString(),
    }));

    if (!relatorio) {
      // fallback: devolve o texto cru para o front exibir como apoio
      if (text) return res.status(200).json({ relatorio: null, raw: text });
      return res.status(502).json({ error: msg('O modelo não retornou análise', 'El modelo no devolvió análisis') });
    }
    return res.status(200).json({ relatorio });
  } catch (err) {
    console.error('assistente-dx error:', err && err.message ? err.message : err);
    const status = (err && err.status) || 500;
    // Erros 4xx têm mensagem intencional p/ o usuário; 5xx (SDK/infra) → mensagem genérica (não vazar interno).
    const safeMsg = status < 500 && err && err.message
      ? err.message
      : msg('Erro ao gerar a análise', 'Error al generar el análisis');
    return res.status(status).json({ error: safeMsg });
  }
};

// Exposto para teste (não afeta o handler Vercel, que é a função acima).
module.exports.parseRelatorio = parseRelatorio;
