/**
 * Vercel Function — /api/gerar-hc
 * Gera a narrativa clínica da AEA (História da Doença Atual) com a Claude API,
 * a partir dos motivos selecionados + respostas do guia AEA + dados do paciente.
 *
 * SEGURANÇA (mesmo padrão do /api/assistente-dx):
 *  - Exige `Authorization: Bearer <access_token do Supabase>` — bloqueia anônimo (401).
 *  - Valida o token no servidor (qualquer usuário logado — trial ou pro — tem acesso;
 *    não há gate de plano aqui, decisão do dono: manter o comportamento atual).
 *  - Aplica limite diário por usuário (controle de custo da API) — FAIL-CLOSED: se a
 *    tabela de uso não existir/falhar, devolve 503 e NÃO faz a chamada paga (o front
 *    cai no motor de narrativa local, então o usuário ainda recebe a HC).
 *  - A chave da Anthropic NUNCA vai ao front-end — toda a chamada acontece aqui.
 *
 * Variáveis de ambiente necessárias no Vercel:
 *   ANTHROPIC_API_KEY     → chave secreta da Anthropic (sk-ant-...)
 *   SUPABASE_URL          → https://xxx.supabase.co
 *   SUPABASE_SERVICE_KEY  → service_role key (só no backend!)
 *
 * Entrada (POST JSON):
 *   { lang:'pt'|'es', demografia:{idade,sexo,tempoEvolucao}, motivos:[{ordem,nome,respostas:[{pergunta,resposta}]}], relatoLivre:'<texto livre da AEA>' }
 * Saída:
 *   { narrativa: "<texto clínico>" }   ou   { error: "<mensagem>" }
 *
 * REGRA: a chave NUNCA vai para o front-end. Toda a chamada ao modelo acontece aqui.
 */

const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');

const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 1800;

// ── LIMITE DIÁRIO POR USUÁRIO ────────────────────────────────────────────────
// Geração de HC é o fluxo central — teto mais generoso que o assistente (DAILY_LIMIT=20).
// Quando os planos forem segmentados (médico×estudante), trocar por mapa lido do profile.
const DAILY_LIMIT = 40;

function buildSystemPrompt(pt) {
  if (pt) {
    return [
      'Você é um assistente de documentação clínica que redige a seção AEA (Antecedentes da Enfermidade Atual / História da Doença Atual) de uma história clínica, em português do Brasil.',
      '',
      'REGRAS OBRIGATÓRIAS:',
      '1. Use EXCLUSIVAMENTE as informações fornecidas. NUNCA invente sintomas, sinais, achados de exame físico, diagnósticos, exames, medicamentos, doses ou valores que não estejam nos dados.',
      '2. Escreva em prosa clínica corrida, cronológica e profissional, na 3ª pessoa ("Paciente..."), NÃO em formato de lista pergunta-resposta.',
      '3. COERÊNCIA TEMPORAL: construa UMA única linha do tempo. Quando o relato livre trouxer datas/intervalos explícitos (ex.: "há 15 dias", "há 20 dias"), use-os como espinha dorsal da cronologia. NUNCA afirme duas durações contraditórias para o mesmo quadro: se o "Tempo de evolução" genérico divergir das datas do relato, prefira as datas do relato e não repita o valor genérico conflitante.',
      '4. O relato livre do profissional é o eixo da história: incorpore-o como narrativa principal e organize as respostas do guia (AEA) ao redor dele, sem contradizê-lo.',
      '5. ORGANIZAÇÃO: comece pela queixa principal e pelo início do quadro; agrupe sintomas relacionados (ex.: respiratórios juntos, dor caracterizada junto de seus atributos) e use transições. Quando houver vários motivos, integre-os em uma história clínica plausível, não em blocos justapostos.',
      '6. Normalize a terminologia para português clínico correto (ex.: "queda da própria altura", "fossa ilíaca direita"). Não deixe traduções literais ou expressões ambíguas.',
      '7. Destaque com clareza os sinais de alarme (red flags) quando presentes, indicando a necessidade de investigação/atenção quando apropriado clinicamente.',
      '8. Omita campos vazios ou não respondidos — não escreva "não informado" para tudo.',
      '9. NÃO use títulos, marcadores, markdown ou listas. Apenas o(s) parágrafo(s) de texto corrido.',
      '10. Termine com a frase de fecho padrão: "Procura esta unidade de saúde para avaliação médica." (somente se houver história relevante).',
      '11. Não acrescente comentários, observações ou explicações fora da narrativa clínica.',
    ].join('\n');
  }
  return [
    'Eres un asistente de documentación clínica que redacta la sección AEA (Antecedentes de la Enfermedad Actual / Historia de la Enfermedad Actual) de una historia clínica, en español.',
    '',
    'REGLAS OBLIGATORIAS:',
    '1. Usa EXCLUSIVAMENTE la información proporcionada. NUNCA inventes síntomas, signos, hallazgos del examen físico, diagnósticos, estudios, medicamentos, dosis ni valores que no estén en los datos.',
    '2. Escribe en prosa clínica continua, cronológica y profesional, en 3ª persona ("Paciente..."), NO en formato de lista pregunta-respuesta.',
    '3. COHERENCIA TEMPORAL: construye UNA sola línea de tiempo. Cuando el relato libre traiga fechas/intervalos explícitos (ej.: "hace 15 días", "hace 20 días"), úsalos como columna vertebral de la cronología. NUNCA afirmes dos duraciones contradictorias para el mismo cuadro: si el "Tiempo de evolución" genérico difiere de las fechas del relato, prioriza las fechas del relato y no repitas el valor genérico en conflicto.',
    '4. El relato libre del profesional es el eje de la historia: incorpóralo como narrativa principal y organiza las respuestas de la guía (AEA) a su alrededor, sin contradecirlo.',
    '5. ORGANIZACIÓN: comienza por el motivo principal y el inicio del cuadro; agrupa síntomas relacionados (ej.: respiratorios juntos, el dolor caracterizado junto a sus atributos) y usa transiciones. Cuando haya varios motivos, intégralos en una historia clínica plausible, no en bloques yuxtapuestos.',
    '6. Normaliza la terminología a español clínico correcto (ej.: "caída desde su propia altura", "fosa ilíaca derecha"). No dejes traducciones literales del portugués ni expresiones ambiguas (NUNCA escribas "caída de su propio cuerpo").',
    '7. Destaca con claridad los signos de alarma (red flags) cuando estén presentes, indicando la necesidad de investigación/atención cuando sea clínicamente apropiado.',
    '8. Omite los campos vacíos o no respondidos — no escribas "no informado" para todo.',
    '9. NO uses títulos, viñetas, markdown ni listas. Solo el/los párrafo(s) de texto continuo.',
    '10. Termina con la frase de cierre estándar: "Acude a esta unidad de salud para evaluación médica." (solo si hay historia relevante).',
    '11. No agregues comentarios, observaciones ni explicaciones fuera de la narrativa clínica.',
  ].join('\n');
}

// ── Limites de tamanho de input (anti-abuso/custo: tudo isto entra no prompt) ──
var LIM = { relato: 8000, campo: 1000, nome: 200, motivos: 10, respostas: 60 };
function clip(s, max) { s = (s == null ? '' : String(s)); return s.length > max ? s.slice(0, max) : s; }

function buildUserMessage(pt, demografia, motivos, relatoLivre) {
  var L = [];
  L.push(pt ? '## Dados do paciente' : '## Datos del paciente');
  if (demografia) {
    if (demografia.idade) L.push((pt ? 'Idade: ' : 'Edad: ') + demografia.idade);
    if (demografia.sexo) {
      var sx = demografia.sexo === 'M' ? (pt ? 'masculino' : 'masculino')
             : demografia.sexo === 'F' ? (pt ? 'feminino' : 'femenino') : demografia.sexo;
      L.push((pt ? 'Sexo: ' : 'Sexo: ') + sx);
    }
    if (demografia.tempoEvolucao) L.push((pt ? 'Tempo de evolução: ' : 'Tiempo de evolución: ') + demografia.tempoEvolucao);
  }
  L.push('');
  L.push(pt ? '## Motivos e respostas do guia (AEA)' : '## Motivos y respuestas de la guía (AEA)');
  (motivos || []).slice(0, LIM.motivos).forEach(function (m) {
    L.push('');
    L.push((pt ? 'Motivo ' : 'Motivo ') + (m.ordem || '') + ': ' + clip(m.nome, LIM.nome));
    (m.respostas || []).slice(0, LIM.respostas).forEach(function (r) {
      if (r && r.pergunta && r.resposta) L.push('- ' + clip(r.pergunta, LIM.campo) + ': ' + clip(r.resposta, LIM.campo));
    });
  });
  if (relatoLivre && String(relatoLivre).trim()) {
    L.push('');
    L.push(pt ? '## Relato livre do profissional (incorpore ao texto)' : '## Relato libre del profesional (incorpóralo al texto)');
    L.push(clip(String(relatoLivre).trim(), LIM.relato));
  }
  L.push('');
  L.push(pt
    ? 'Redija agora a narrativa da AEA integrando os motivos, o tempo de evolução e o relato livre numa única história coerente, seguindo todas as regras.'
    : 'Redacta ahora la narrativa de la AEA integrando los motivos, el tiempo de evolución y el relato libre en una sola historia coherente, siguiendo todas las reglas.');
  return L.join('\n');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var body = req.body || {};
  var lang = body.lang === 'es' ? 'es' : 'pt';
  var pt = lang !== 'es';
  var msg = function (p, e) { return pt ? p : e; };
  var motivos = Array.isArray(body.motivos) ? body.motivos : [];
  var relatoLivre = typeof body.relatoLivre === 'string' ? body.relatoLivre : '';

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada no servidor' });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Supabase não configurado no servidor' });
  }

  // 1) Autenticação — token do Supabase no header Authorization (bloqueia anônimo)
  var authHeader = req.headers['authorization'] || req.headers['Authorization'] || '';
  var token = /^Bearer\s+(.+)$/i.test(authHeader) ? authHeader.replace(/^Bearer\s+/i, '').trim() : '';
  if (!token) return res.status(401).json({ error: msg('Não autenticado', 'No autenticado') });

  var sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

  var userId = null;
  try {
    var au = await sbAdmin.auth.getUser(token);
    if (au.error || !au.data || !au.data.user) return res.status(401).json({ error: msg('Sessão inválida', 'Sesión inválida') });
    userId = au.data.user.id;
  } catch (e) {
    return res.status(401).json({ error: msg('Falha ao validar sessão', 'Error al validar la sesión') });
  }

  // 2) Limite diário por usuário — FAIL-CLOSED (controle de custo da API paga).
  // Não há gate de plano: qualquer usuário logado (trial ou pro) gera HC por IA.
  // Se a tabela de uso não existir ou falhar, devolvemos 503 e NÃO chamamos o modelo
  // (o front cai no motor de narrativa local — o usuário ainda recebe a HC).
  var usageUnavailable = function () {
    return res.status(503).json({ error: msg('Serviço de IA temporariamente indisponível', 'Servicio de IA temporalmente no disponible'), code: 'usage_unavailable' });
  };
  try {
    var dia = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
    var sel = await sbAdmin.from('gerar_hc_usage').select('count').eq('user_id', userId).eq('dia', dia).single();
    if (sel.error && sel.error.code !== 'PGRST116') {
      // PGRST116 = nenhuma linha (1º uso do dia, esperado). Qualquer outro erro
      // (inclui tabela ausente) → fail-closed para não recriar o furo de custo.
      console.error('[ALERTA custo] gerar_hc_usage select falhou (fail-closed):', sel.error.message || sel.error.code);
      return usageUnavailable();
    }
    var usados = sel.data && typeof sel.data.count === 'number' ? sel.data.count : 0;
    if (usados >= DAILY_LIMIT) {
      return res.status(429).json({ error: msg('Limite diário de gerações de HC atingido. Tente novamente amanhã.', 'Límite diario de generaciones de HC alcanzado. Inténtalo de nuevo mañana.'), code: 'rate_limit' });
    }
    var up = await sbAdmin.from('gerar_hc_usage').upsert({ user_id: userId, dia: dia, count: usados + 1 }, { onConflict: 'user_id,dia' });
    if (up.error) {
      console.error('[ALERTA custo] gerar_hc_usage upsert falhou (fail-closed):', up.error.message || up.error.code);
      return usageUnavailable();
    }
  } catch (e) {
    console.error('[ALERTA custo] gerar_hc_usage exceção (fail-closed):', e && e.message ? e.message : e);
    return usageUnavailable();
  }

  // Precisa de pelo menos um motivo com alguma resposta OU relato livre preenchido
  var temConteudo = (relatoLivre.trim().length > 0) || motivos.some(function (m) {
    return m && Array.isArray(m.respostas) && m.respostas.some(function (r) { return r && r.resposta; });
  });
  if (!temConteudo) {
    return res.status(400).json({ error: pt ? 'Sem respostas suficientes para gerar a HC' : 'Sin respuestas suficientes para generar la HC' });
  }

  try {
    var client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    var response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: buildSystemPrompt(pt),
      messages: [{ role: 'user', content: buildUserMessage(pt, body.demografia, motivos, relatoLivre) }],
    });

    var narrativa = (response.content || [])
      .filter(function (b) { return b.type === 'text'; })
      .map(function (b) { return b.text; })
      .join('')
      .trim();

    if (!narrativa) {
      return res.status(502).json({ error: pt ? 'O modelo não retornou texto' : 'El modelo no devolvió texto' });
    }
    return res.status(200).json({ narrativa: narrativa });
  } catch (err) {
    console.error('gerar-hc error:', err && err.message ? err.message : err);
    var status = (err && err.status) || 500;
    // Erros 4xx têm mensagem intencional p/ o usuário; 5xx (SDK/infra) → mensagem genérica (não vazar interno).
    var safeMsg = status < 500 && err && err.message
      ? err.message
      : msg('Erro ao gerar a HC', 'Error al generar la HC');
    return res.status(status).json({ error: safeMsg });
  }
};
