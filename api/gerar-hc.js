/**
 * Vercel Function — /api/gerar-hc
 * Gera a narrativa clínica da AEA (História da Doença Atual) com a Claude API,
 * a partir dos motivos selecionados + respostas do guia AEA + dados do paciente.
 *
 * Variáveis de ambiente necessárias no Vercel:
 *   ANTHROPIC_API_KEY → chave secreta da Anthropic (sk-ant-...)
 *
 * Entrada (POST JSON):
 *   { lang:'pt'|'es', demografia:{idade,sexo,tempoEvolucao}, motivos:[{ordem,nome,respostas:[{pergunta,resposta}]}] }
 * Saída:
 *   { narrativa: "<texto clínico>" }   ou   { error: "<mensagem>" }
 *
 * REGRA: a chave NUNCA vai para o front-end. Toda a chamada ao modelo acontece aqui.
 */

const Anthropic = require('@anthropic-ai/sdk');

const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 1800;

function buildSystemPrompt(pt) {
  if (pt) {
    return [
      'Você é um assistente de documentação clínica que redige a seção AEA (Antecedentes da Enfermidade Atual / História da Doença Atual) de uma história clínica, em português do Brasil.',
      '',
      'REGRAS OBRIGATÓRIAS:',
      '1. Use EXCLUSIVAMENTE as informações fornecidas. NUNCA invente sintomas, sinais, achados de exame físico, diagnósticos, exames, medicamentos, doses ou valores que não estejam nos dados.',
      '2. Escreva em prosa clínica corrida, cronológica e profissional, na 3ª pessoa ("Paciente..."), NÃO em formato de lista pergunta-resposta.',
      '3. Respeite a ordem dos motivos informados e integre todos em UMA única história coerente.',
      '4. Destaque com clareza os sinais de alarme (red flags) quando presentes, indicando a necessidade de investigação/atenção quando apropriado clinicamente.',
      '5. Omita campos vazios ou não respondidos — não escreva "não informado" para tudo.',
      '6. NÃO use títulos, marcadores, markdown ou listas. Apenas o(s) parágrafo(s) de texto corrido.',
      '7. Termine com a frase de fecho padrão: "Procura esta unidade de saúde para avaliação médica." (somente se houver história relevante).',
      '8. Não acrescente comentários, observações ou explicações fora da narrativa clínica.',
    ].join('\n');
  }
  return [
    'Eres un asistente de documentación clínica que redacta la sección AEA (Antecedentes de la Enfermedad Actual / Historia de la Enfermedad Actual) de una historia clínica, en español.',
    '',
    'REGLAS OBLIGATORIAS:',
    '1. Usa EXCLUSIVAMENTE la información proporcionada. NUNCA inventes síntomas, signos, hallazgos del examen físico, diagnósticos, estudios, medicamentos, dosis ni valores que no estén en los datos.',
    '2. Escribe en prosa clínica continua, cronológica y profesional, en 3ª persona ("Paciente..."), NO en formato de lista pregunta-respuesta.',
    '3. Respeta el orden de los motivos indicados e integra todos en UNA sola historia coherente.',
    '4. Destaca con claridad los signos de alarma (red flags) cuando estén presentes, indicando la necesidad de investigación/atención cuando sea clínicamente apropiado.',
    '5. Omite los campos vacíos o no respondidos — no escribas "no informado" para todo.',
    '6. NO uses títulos, viñetas, markdown ni listas. Solo el/los párrafo(s) de texto continuo.',
    '7. Termina con la frase de cierre estándar: "Acude a esta unidad de salud para evaluación médica." (solo si hay historia relevante).',
    '8. No agregues comentarios, observaciones ni explicaciones fuera de la narrativa clínica.',
  ].join('\n');
}

function buildUserMessage(pt, demografia, motivos) {
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
  (motivos || []).forEach(function (m) {
    L.push('');
    L.push((pt ? 'Motivo ' : 'Motivo ') + (m.ordem || '') + ': ' + (m.nome || ''));
    (m.respostas || []).forEach(function (r) {
      if (r && r.pergunta && r.resposta) L.push('- ' + r.pergunta + ': ' + r.resposta);
    });
  });
  L.push('');
  L.push(pt
    ? 'Redija agora a narrativa da AEA seguindo todas as regras.'
    : 'Redacta ahora la narrativa de la AEA siguiendo todas las reglas.');
  return L.join('\n');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada no servidor' });
  }

  var body = req.body || {};
  var lang = body.lang === 'es' ? 'es' : 'pt';
  var pt = lang !== 'es';
  var motivos = Array.isArray(body.motivos) ? body.motivos : [];

  // Precisa de pelo menos um motivo com alguma resposta
  var temConteudo = motivos.some(function (m) {
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
      messages: [{ role: 'user', content: buildUserMessage(pt, body.demografia, motivos) }],
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
    return res.status(status).json({ error: (err && err.message) || 'Erro ao gerar a HC' });
  }
};
