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
const { iniciaRota, autenticar, devolverCota, aplicaLimite, descreveErro } = require('./_comum');

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
      '',
      // Estas regras de estilo espelham o motor local de reserva (anamnesismed-narrativa.js),
      // reescrito em 02/08/2026 por ordem do dono: "tem que ser uma história clínica fluida,
      // igual as histórias clínicas geradas em hospitais". Os dois escritores do produto
      // precisam soar iguais — senão o médico percebe quando a IA não rodou.
      'ESTILO (como se escreve numa enfermaria, não num formulário):',
      '· Frases curtas. No máximo três informações por frase — nunca uma fila de vírgulas.',
      '· O tempo de evolução vem colado no sintoma: "com dor em face anterior da perna direita há 3 anos" — nunca "apresentando quadro de 3 anos de evolução, caracterizado por...".',
      '· A localização emenda no sintoma ("dor em região retroesternal"), sem o particípio "localizada em" entre vírgulas.',
      '· Nada de rótulo de campo no texto: escreva "Relaciona o quadro com esforço físico", nunca "Como fatores moduladores, refere:".',
      '· Resposta negativa vira negativo pertinente ("Nega irradiação"), nunca é copiada como achado ("irradiada para não irradia").',
      '· Concorde gênero e número com o substantivo-guia: a dor é constritiva, não constritivo.',
      '',
      'EXEMPLO do padrão esperado (formato, não conteúdo — não reaproveite estes dados):',
      '"Paciente feminino de 62 anos, com dor em face anterior da perna direita há 3 anos, de início insidioso. Descreve a dor como urente, de intensidade 7-8/10 na EVA e descontínua (em crises). Desde o início, o quadro apresenta curso flutuante. Relaciona o quadro com repouso. Nega irradiação. Procura esta unidade de saúde para avaliação médica."',
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
    '',
    'ESTILO (como se escribe en una sala, no en un formulario):',
    '· Frases cortas. Máximo tres informaciones por frase — nunca una fila de comas.',
    '· El tiempo de evolución va pegado al síntoma: "con dolor en cara anterior de la pierna derecha desde hace 3 años" — nunca "presentando cuadro de 3 años de evolución, caracterizado por...".',
    '· La localización se une al síntoma ("dolor en región retroesternal"), sin el participio "localizado en" entre comas.',
    '· Nada de etiquetas de campo en el texto: escribe "Relaciona el cuadro con el esfuerzo físico", nunca "Como factores moduladores, refiere:".',
    '· Una respuesta negativa se vuelve negativo pertinente ("Niega irradiación"), nunca se copia como hallazgo ("irradiado hacia no irradia").',
    '· Concuerda género y número con el sustantivo guía.',
    '',
    'EJEMPLO del patrón esperado (formato, no contenido — no reutilices estos datos):',
    '"Paciente femenino de 62 años, con dolor en cara anterior de la pierna derecha desde hace 3 años, de inicio insidioso. Describe el dolor como urente, de intensidad 7-8/10 en EVA y discontinuo (por crisis). Desde su inicio, el cuadro presenta curso fluctuante. Relaciona el cuadro con el reposo. Niega irradiación. Acude a esta unidad de salud para evaluación médica."',
  ].join('\n');
}

// ── Limites de tamanho de input (anti-abuso/custo: tudo isto entra no prompt) ──
var LIM = { relato: 8000, campo: 1000, nome: 200, motivos: 10, respostas: 60 };
function clip(s, max) { s = (s == null ? '' : String(s)); return s.length > max ? s.slice(0, max) : s; }

// Sanitização de tipos: o body vem do cliente (não confiável). Tudo que entra no
// prompt passa por aqui — tipo errado vira '' em vez de estourar 500 ou injetar objeto.
function txt(v, max) { return (typeof v === 'string' || typeof v === 'number') ? clip(String(v).trim(), max) : ''; }
function ordemSegura(v) { var n = parseInt(v, 10); return (isFinite(n) && n > 0 && n < 100) ? String(n) : ''; }
function sanitizaDemografia(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) return {};
  var sx = d.sexo === 'M' || d.sexo === 'F' ? d.sexo : txt(d.sexo, 20);
  return { idade: txt(d.idade, 20), sexo: sx, tempoEvolucao: txt(d.tempoEvolucao, LIM.campo) };
}
function sanitizaMotivos(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, LIM.motivos).filter(function (m) { return m && typeof m === 'object'; }).map(function (m) {
    var resp = Array.isArray(m.respostas) ? m.respostas.slice(0, LIM.respostas) : [];
    return {
      ordem: ordemSegura(m.ordem),
      nome: txt(m.nome, LIM.nome),
      respostas: resp.filter(function (r) { return r && typeof r === 'object'; }).map(function (r) {
        return { pergunta: txt(r.pergunta, LIM.campo), resposta: txt(r.resposta, LIM.campo) };
      }),
    };
  });
}

// Recebe demografia/motivos JÁ sanitizados (sanitizaDemografia/sanitizaMotivos).
function buildUserMessage(pt, demografia, motivos, relatoLivre) {
  var L = [];
  L.push(pt ? '## Dados do paciente' : '## Datos del paciente');
  if (demografia) {
    if (demografia.idade) L.push((pt ? 'Idade: ' : 'Edad: ') + demografia.idade);
    if (demografia.sexo) {
      var sx = demografia.sexo === 'M' ? 'masculino'
             : demografia.sexo === 'F' ? (pt ? 'feminino' : 'femenino') : demografia.sexo;
      L.push('Sexo: ' + sx);
    }
    if (demografia.tempoEvolucao) L.push((pt ? 'Tempo de evolução: ' : 'Tiempo de evolución: ') + demografia.tempoEvolucao);
  }
  L.push('');
  L.push(pt ? '## Motivos e respostas do guia (AEA)' : '## Motivos y respuestas de la guía (AEA)');
  motivos.forEach(function (m) {
    L.push('');
    L.push('Motivo ' + m.ordem + ': ' + m.nome);
    m.respostas.forEach(function (r) {
      if (r.pergunta && r.resposta) L.push('- ' + r.pergunta + ': ' + r.resposta);
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
  // CORS restrito, no-store, preflight e método (centralizado em _comum.js).
  if (iniciaRota(req, res, 'POST')) return;

  var body = (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) ? req.body : {};
  var lang = body.lang === 'es' ? 'es' : 'pt';
  var pt = lang !== 'es';
  var msg = function (p, e) { return pt ? p : e; };
  var motivos = sanitizaMotivos(body.motivos);
  var demografia = sanitizaDemografia(body.demografia);
  var relatoLivre = typeof body.relatoLivre === 'string' ? clip(body.relatoLivre, LIM.relato) : '';

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada no servidor' });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Supabase não configurado no servidor' });
  }

  // 1) Autenticação — token do Supabase no header Authorization (bloqueia anônimo)
  var sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  var auth = await autenticar(sbAdmin, req, msg);
  if (auth.error) return res.status(auth.status).json({ error: auth.error });
  var userId = auth.user.id;

  // 2) Conteúdo mínimo — validado ANTES de descontar a cota (400 não consome limite).
  // Precisa de pelo menos um motivo com alguma resposta OU relato livre preenchido
  var temConteudo = (relatoLivre.trim().length > 0) || motivos.some(function (m) {
    return m.respostas.some(function (r) { return r.resposta; });
  });
  if (!temConteudo) {
    return res.status(400).json({ error: pt ? 'Sem respostas suficientes para gerar a HC' : 'Sin respuestas suficientes para generar la HC' });
  }

  // 3a) Rajada curta (6/min) ANTES da cota diária: disparo em loop não consome a cota do dia nem chama o
  // modelo. Fail-closed (503 se `consumir_limite` não existir — migration 2026-10-03).
  if (!(await aplicaLimite(res, sbAdmin, userId, 'gerar-hc-rajada'))) return;

  // 3) Limite diário por usuário — FAIL-CLOSED e ATÔMICO (controle de custo da API paga).
  // Não há gate de plano: qualquer usuário logado (trial ou pro) gera HC por IA.
  // O incremento é feito pela RPC `consumir_cota_ia` (insert ... on conflict do update ...
  // where count < limite), então requisições concorrentes não furam o teto. Se a RPC não
  // existir (migration 2026-10-01-uso-atomico-rpc.sql não aplicada) ou falhar, devolvemos
  // 503 e NÃO chamamos o modelo (o front cai no motor de narrativa local).
  var usageUnavailable = function () {
    return res.status(503).json({ error: msg('Serviço de IA temporariamente indisponível', 'Servicio de IA temporalmente no disponible'), code: 'usage_unavailable' });
  };
  try {
    var rpc = await sbAdmin.rpc('consumir_cota_ia', { p_user_id: userId, p_rota: 'gerar-hc', p_limite: DAILY_LIMIT });
    if (rpc.error || typeof rpc.data !== 'number') {
      console.error('[ALERTA custo] RPC consumir_cota_ia falhou (fail-closed; migration aplicada?):', rpc.error ? descreveErro(rpc.error) : 'retorno inesperado');
      return usageUnavailable();
    }
    if (rpc.data < 0) {
      return res.status(429).json({ error: msg('Limite diário de gerações de HC atingido. Tente novamente amanhã.', 'Límite diario de generaciones de HC alcanzado. Inténtalo de nuevo mañana.'), code: 'rate_limit' });
    }
  } catch (e) {
    console.error('[ALERTA custo] consumir_cota_ia exceção (fail-closed):', descreveErro(e));
    return usageUnavailable();
  }

  try {
    var client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, timeout: 25000, maxRetries: 0 });
    var response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // Prompt caching: o system é estável entre requests (o que varia é a mensagem
      // do usuário). O breakpoint fica no bloco system para reusar o prefixo.
      // ⚠️ HOJE não cacheia de fato: o mínimo cacheável do Haiku 4.5 é 4096 tokens e
      // este system tem ~600 → a API devolve cache_creation_input_tokens: 0 (silencioso).
      // Mantido como estrutura correta: se o system crescer além do mínimo, passa a
      // cachear sozinho, sem nova mudança de código.
      system: [{ type: 'text', text: buildSystemPrompt(pt), cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: buildUserMessage(pt, demografia, motivos, relatoLivre) }],
    });

    var narrativa = (response.content || [])
      .filter(function (b) { return b.type === 'text'; })
      .map(function (b) { return b.text; })
      .join('')
      .trim();

    if (!narrativa) {
      // Modelo não entregou texto: o usuário não recebeu o serviço → devolve a cota.
      await devolverCota(sbAdmin, userId, 'gerar-hc');
      return res.status(502).json({ error: pt ? 'O modelo não retornou texto' : 'El modelo no devolvió texto' });
    }
    // Observabilidade estruturada: uma linha JSON por chamada paga, para a rotina
    // semanal de custo ler nos logs da Vercel (rota + status + userId + tokens).
    // userId é ID do Supabase (não é PII); nenhum dado de paciente é logado.
    var u = (response && response.usage) || {};
    console.log(JSON.stringify({
      evt: 'ai_call', route: 'gerar-hc', status: 200, lang: lang, model: MODEL,
      userId: userId, input_tokens: u.input_tokens || 0, output_tokens: u.output_tokens || 0,
      cache_read: u.cache_read_input_tokens || 0, cache_write: u.cache_creation_input_tokens || 0,
      ts: new Date().toISOString(),
    }));
    return res.status(200).json({ narrativa: narrativa });
  } catch (err) {
    // Loga só o necessário no servidor (sem dados de paciente) e devolve mensagem FIXA:
    // err.message do SDK pode conter trechos do request/detalhes internos.
    console.error('gerar-hc error:', JSON.stringify({ status: (err && err.status) || null, erro: descreveErro(err) }));
    // A cota foi consumida antes da chamada: se o modelo falhou (erro/timeout/5xx do SDK),
    // devolve-a — sem mascarar o erro original (devolverCota nunca lança).
    await devolverCota(sbAdmin, userId, 'gerar-hc');
    var status = (err && err.status) || 500;
    if (status === 429) return res.status(503).json({ error: msg('Serviço de IA sobrecarregado. Tente novamente em instantes.', 'Servicio de IA sobrecargado. Inténtalo de nuevo en unos instantes.') });
    return res.status(502).json({ error: msg('Erro ao gerar a HC', 'Error al generar la HC') });
  }
};
