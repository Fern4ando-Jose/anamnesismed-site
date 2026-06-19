import { NextRequest, NextResponse } from "next/server";
import { generateIllustration } from "@/lib/illustration";
import { prerenderToBlob } from "@/lib/prerender";
import { parseContentJson } from "@/lib/content-json";
import { type Automation, checkBudget, logSpend, anthropicCost, tavilyCost, EST_RUN_COST } from "@/lib/spend";
import { TEMAS, type Tema, type Formato } from "@/lib/temas";
import { REEL_TEMAS, REEL_ROTULO, FORMATO_VISUAL, type ReelTema, type ReelFormato } from "@/lib/reel-temas";
import { narrate, type Narration } from "@/lib/narrate";
import { buildReelSpec } from "@/lib/reel-build";

export const maxDuration = 300;

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface SearchResult { title: string; content: string; url: string }

interface GeneratedContent {
  postTitle: string;
  postBody: string;
  slides: string[];        // 2-3 insights para slides internos (máx 90 chars cada)
  accentWords: string[];   // palavra de destaque por slide (aparece em vermelho na imagem)
  cta: string;             // slide final — pergunta ou chamada à ação
  instagramCaption: string;
  tags: string[];
  videoKeywords?: string[]; // termos de busca (EN) p/ footage do Reel — 1 por cena
  narration?: string;       // REEL: VO corrido de 20-30s (1 parágrafo) p/ a narração
}

type Slot = "manha" | "tarde" | "noite";
type Lang = "pt" | "es";


// ─── Keyword curta para os slides ─────────────────────────────────────────────

function extractKeyword(topic: string, lang: Lang): string {
  const STOP_BY_LANG: Record<Lang, string[]> = {
    pt: ["e","o","a","de","do","da","para","na","no","em","com","por",
         "um","uma","se","ao","as","os","das","dos","quando","mais"],
    es: ["y","o","el","la","de","del","para","en","con","por","un","una",
         "al","los","las","se","cuándo","más","lo","e"],
  };
  const STOP = new Set(STOP_BY_LANG[lang]);
  const word = topic.split(/\s+/).find(w => !STOP.has(w.toLowerCase()))
    ?? topic.split(" ")[0];
  return word.toUpperCase().replace(/[^A-ZÁÉÍÓÚÜÑÃÕÂÊÔÎÛÀÈÌÒÙÇ]/g, "");
}

// Seleciona o TEMA do dia/slot — sobre o banco INTEIRO (todos os formatos),
// língua-independente: PT e ES no mesmo dia/slot/canal pegam o MESMO tema (capa e
// índice batem; só a copy muda). Avança por dayOfYear (não por dia-da-semana),
// então percorre todo o banco em vez de travar nos 21 primeiros.
// `channel`: o REEL usa um DESLOCAMENTO p/ não cair no mesmo tema do carrossel do
// dia/slot (assuntos distintos entre os formatos).
const REEL_OFFSET = 17; // 53 temas é primo → qualquer offset != 0 nunca colide
function pickTema(slot: Slot, date: Date, channel: "carousel" | "reel" = "carousel"): Tema {
  const start      = new Date(date.getFullYear(), 0, 0);
  const dayOfYear  = Math.floor((date.getTime() - start.getTime()) / 86400000);
  const weekNum    = Math.floor(dayOfYear / 7);
  const slotIdx    = slot === "manha" ? 0 : slot === "tarde" ? 1 : 2;

  // embaralhamento determinístico por semana (igual p/ os dois idiomas)
  const arr  = [...TEMAS];
  let seed   = weekNum * 6364136223846793005 + 1442695040888963407;
  for (let i = arr.length - 1; i > 0; i--) {
    seed     = Math.imul(seed, 1664525) + 1013904223;
    const j  = Math.abs(seed) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const off = channel === "reel" ? REEL_OFFSET : 0;
  const idx = (dayOfYear * 3 + slotIdx + off) % arr.length;
  return arr[idx];
}

// Seleciona o TEMA do REEL — banco PRÓPRIO (REEL_TEMAS), mesma lógica determinística
// e língua-independente do pickTema (PT e ES no mesmo dia/slot pegam o mesmo tema).
function pickReelTema(slot: Slot, date: Date): ReelTema {
  const start     = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86400000);
  const weekNum   = Math.floor(dayOfYear / 7);
  const slotIdx   = slot === "manha" ? 0 : slot === "tarde" ? 1 : 2;

  const arr  = [...REEL_TEMAS];
  let seed   = weekNum * 6364136223846793005 + 1442695040888963407;
  for (let i = arr.length - 1; i > 0; i--) {
    seed     = Math.imul(seed, 1664525) + 1013904223;
    const j  = Math.abs(seed) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const idx = (dayOfYear * 3 + slotIdx) % arr.length;
  return arr[idx];
}

// ─── Instruções por slot ──────────────────────────────────────────────────────

const SLOT_INSTRUCTIONS_BY_LANG: Record<Lang, Record<Slot, string>> = {
  pt: {
    manha: `Ângulo MANHÃ — energia para quem vai encarar o plantão (SUS/UPA) ou o dia
de estudo para a prova de residência. Entregue um ganho clínico aplicável HOJE.
Tom direto e caloroso (você). Gancho que dá gás: "comece o plantão sabendo isto".`,

    tarde: `Ângulo TARDE — bizu de bolso entre um atendimento e outro. UMA regra de
ouro, um passo a passo enxuto ou o erro clássico que cai na prova e no plantão.
Escaneável e direto ao ponto, como anotação de quem está na linha de frente.`,

    noite: `Ângulo NOITE — reflexivo. Quem fechou o plantão pensa no raciocínio
clínico e no peso de uma boa anamnese para o paciente. Tom calmo e instigante,
que puxa comentário e identificação do médico brasileiro.`,
  },
  es: {
    manha: `Ángulo MAÑANA — energía para quien entra a la guardia o estudia para el
ENARM / examen de residencia. Entrega una ganancia clínica aplicable HOY. Trato
de "tú" (nunca "vosotros"), cercano. Gancho que activa: "empieza la guardia
sabiendo esto".`,

    tarde: `Ángulo TARDE — dato de bolsillo entre paciente y paciente. UNA regla de
oro, un paso a paso conciso o el error clásico que cae en el examen y en la
guardia. Escaneable y al grano, como apunte de quien está en la primera línea.`,

    noite: `Ángulo NOCHE — reflexivo. Quien cierra la guardia piensa en el
razonamiento clínico y el peso de una buena anamnesis para el paciente. Tono
calmado y provocador, que invita a comentar; identificación del médico de LATAM.`,
  },
};

// ─── Pesquisa de contexto médico ─────────────────────────────────────────────

async function searchTopic(topic: string, automation: Automation): Promise<SearchResult[]> {
  // Tavily é opcional: sem chave ou em caso de falha, segue sem contexto extra.
  if (!process.env.TAVILY_API_KEY) return [];
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query: topic + " medicina clínica semiologia",
        search_depth: "advanced",
        max_results: 5,
        include_answer: true,
      }),
    });
    if (!res.ok) return [];
    await logSpend({ automation, platform: "tavily", operation: "search", model: "advanced", units: 1, costUsd: tavilyCost() });
    const data = await res.json();
    return (data.results ?? []).map((r: any) => ({
      title: r.title ?? "", content: r.content ?? "", url: r.url ?? "",
    }));
  } catch {
    return [];
  }
}

// ─── Prompt do Claude (PT/ES) ─────────────────────────────────────────────────

// Estrutura de slides por formato (rótulo da capa + o que cada slide entrega + CTA).
const FORMATO_ESTRUTURA: Record<Lang, Record<Exclude<Formato, "caso-diagnostico">, { rotulo: string; capa: string; slides: string; cta: string }>> = {
  pt: {
    "mnemonico": { rotulo: "MNEMÔNICO", capa: "anuncie o mnemônico e prometa que o leitor vai sair sabendo usá-lo", slides: "cada slide destrincha 1 letra/bloco do mnemônico com o significado clínico e um exemplo curto", cta: "a regra de ouro para lembrar e usar no plantão/prova" },
    "red-flag": { rotulo: "RED FLAGS", capa: "nomeie o sintoma e avise que existem sinais que mudam tudo", slides: "cada slide traz 1-2 sinais de alarme e POR QUE eles mudam a conduta", cta: "a conduta: quando investigar/encaminhar com urgência" },
    "passo-a-passo": { rotulo: "PASSO A PASSO", capa: "nomeie a tarefa clínica e prometa um fluxo que cabe no bolso", slides: "cada slide = 1 passo do fluxo, EM ORDEM, objetivo e aplicável", cta: "o erro clássico a evitar (ou o passo que todo mundo pula)" },
    "score": { rotulo: "SCORE", capa: "nomeie o score e diga em 1 frase quando ele é usado", slides: "apresente os critérios e a pontuação de forma escaneável (não despeje tudo num slide só)", cta: "interpretação: os pontos de corte e a conduta que muda" },
  },
  es: {
    "mnemonico": { rotulo: "MNEMOTECNIA", capa: "anuncia la mnemotecnia y promete que el lector saldrá sabiendo usarla", slides: "cada diapositiva desglosa 1 letra/bloque con el significado clínico y un ejemplo corto", cta: "la regla de oro para recordarla y usarla en la guardia/examen" },
    "red-flag": { rotulo: "RED FLAGS", capa: "nombra el síntoma y avisa que hay signos que lo cambian todo", slides: "cada diapositiva trae 1-2 signos de alarma y POR QUÉ cambian la conducta", cta: "la conducta: cuándo investigar/derivar con urgencia" },
    "passo-a-passo": { rotulo: "PASO A PASO", capa: "nombra la tarea clínica y promete un flujo de bolsillo", slides: "cada diapositiva = 1 paso del flujo, EN ORDEN, concreto y aplicable", cta: "el error clásico a evitar (o el paso que todos saltan)" },
    "score": { rotulo: "SCORE", capa: "nombra el score y di en 1 frase cuándo se usa", slides: "presenta los criterios y la puntuación de forma escaneable (no lo vuelques todo en una sola diapositiva)", cta: "interpretación: los puntos de corte y la conducta que cambia" },
  },
};

// Prompt dos formatos novos (mnemônico/red-flag/passo-a-passo/score). Mesma VOZ
// de mercado + motor de alcance + revisão anti-idioma do caso, mas com estrutura
// de slides própria. Sai no MESMO formato JSON → as imagens /api/og servem igual.
function buildFormatoPrompt(lang: Lang, formato: Formato, topic: string, context: string, slot: Slot, handle: string): string {
  const slotInstr = SLOT_INSTRUCTIONS_BY_LANG[lang][slot];
  const e = FORMATO_ESTRUTURA[lang][formato as Exclude<Formato, "caso-diagnostico">];

  if (lang === "es") {
    return `Eres el editor clínico de AnamnesísMed — plataforma de anamnesis para estudiantes de medicina (de 4º año en adelante), internos y residentes de LATINOAMÉRICA. Crea un CARRUSEL de Instagram del tipo ${e.rotulo}, de alto rendimiento para la guardia y el examen de residencia. Contenido serio, correcto y aplicable.

VOZ DEL MERCADO (Latinoamérica) — GENERADO para LATAM, NO traducido del portugués:
- Público: estudiante de medicina de ciclo clínico, interno, residente y quien prepara el ENARM/examen de residencia.
- Trato "tú" (singular) y "ustedes" (plural) — NUNCA "vosotros" ni jerga de España. Español latino neutro.
- Referencias nativas: la guardia, el internado, el hospital público, el examen de residencia.

Tema (${e.rotulo}): "${topic}"
${slotInstr}

${context ? `Contexto investigado:\n${context}\n` : ""}MOTOR DE ALCANCE (RETENCIÓN + GUARDADOS + COMPARTIDOS):
- GANCHO: la portada debe FRENAR EL SCROLL en 1-2 s — concreta y específica, hablándole a "tú".
- GUARDABLE: el contenido debe ser una chuleta que el lector quiera GUARDAR para repasar antes de la guardia/examen.
- COMPARTIBLE: debe dar ganas de etiquetar a un colega — etiquetar = compartir.
- El pie de foto cierra SIEMPRE con un llamado a GUARDAR (🔖) y COMPARTIR/etiquetar (📩) antes de los hashtags.

ESTRUCTURA (${e.rotulo}) — sigue TODAS:
- Portada: ${e.capa}. Concreta y atractiva, máx 80 caracteres.
- Diapositivas (4): ${e.slides}. Frases cortas, lenguaje de quien está en la práctica. Máx 90 caracteres cada una.
- CTA final: ${e.cta}.
- Clínica correcta y específica (criterios, cortes y conductas reales). Sin inventar datos.
- IDIOMA: español latino neutro (tú/ustedes), JAMÁS "vosotros" ni calcos del portugués.

Genera un JSON válido (sin markdown, sin backticks) con esta estructura EXACTA:
{
  "postTitle": "portada/gancho, máx 80 caracteres, español, SIN punto final innecesario",
  "postBody": "artículo en markdown, mínimo 300 palabras, español: desarrollo del tema, con criterios/pasos/letras y su aplicación clínica (va al sitio)",
  "slides": ["slide 1, máx 90", "slide 2, máx 90", "slide 3, máx 90", "slide 4, máx 90"],
  "accentWords": ["palabra clave slide 1 (en rojo)", "palabra clave slide 2", "palabra clave slide 3", "palabra clave slide 4"],
  "cta": "cierre accionable de 30-80 caracteres: ${e.cta}",
  "instagramCaption": "pie de foto 700-1600 caracteres en español: (1) gancho fuerte; (2) desarrollo útil del tema; (3) CTA: 'Guarda para estudiar', 'Etiqueta a un colega' y 'Sigue ${handle} para más'; (4) '→ Anamnesis completa en el link de la bio'; (5) última línea con 6-9 hashtags. Emojis con moderación (1-3).",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "videoKeywords": ["6 términos de búsqueda en INGLÉS para banco de VÍDEO (Pexels), UNO por escena, concretos y filmables, sin términos abstractos"]
}

Para los hashtags, MEZCLA alcance amplio + nicho LATAM (sin etiquetas de España como #MIR): #medicina #estudiantedemedicina #futuromedico #residentesmedicos #medicinainterna #semiologia #urgencias #ENARM #examenderesidencia #medicinalatam #anamnesismed`;
  }

  return `Você é o editor clínico do AnamnesísMed — plataforma de anamnese para estudantes de medicina (do 4º ano em diante), internos e residentes no BRASIL. Crie um CARROSSEL de Instagram do tipo ${e.rotulo}, de alto rendimento para o plantão e a prova de residência. Conteúdo sério, correto e aplicável.

VOZ DO MERCADO (Brasil) — GERADO para o Brasil, NÃO traduzido de outro idioma:
- Público: estudante de medicina do ciclo clínico, interno, R1 e quem estuda para a PROVA DE RESIDÊNCIA (ENARE, USP, UNIFESP) e o Revalida.
- Tratamento "você"; português brasileiro, direto, sem gíria forçada (cabe "bizu", "cai na prova", "fechou o diagnóstico").
- Referências nativas: plantão no SUS/UPA, internato, liga acadêmica, prova de residência.

Tema (${e.rotulo}): "${topic}"
${slotInstr}

${context ? `Contexto pesquisado:\n${context}\n` : ""}MOTOR DE ALCANCE (RETENÇÃO + SALVAMENTOS + COMPARTILHAMENTOS):
- GANCHO: a capa precisa PARAR O SCROLL em 1-2 s — concreta e específica, falando com "você".
- SALVÁVEL: o conteúdo deve ser um bizu que o leitor queira SALVAR para revisar antes do plantão/prova.
- COMPARTILHÁVEL: deve dar vontade de marcar um colega — marcar = compartilhar.
- A legenda fecha SEMPRE com chamada para SALVAR (🔖) e COMPARTILHAR/marcar (📩) antes das hashtags.

ESTRUTURA (${e.rotulo}) — siga TODAS:
- Capa: ${e.capa}. Concreta e atraente, máx 80 chars.
- Slides (4): ${e.slides}. Frases curtas, linguagem de quem está na prática. Máx 90 chars cada.
- CTA final: ${e.cta}.
- Clínica correta e específica (critérios, cortes e condutas reais). Sem inventar dados.
- IDIOMA: português brasileiro (você), nunca tradução/calco de outro idioma.

Gere um JSON válido (sem markdown, sem backticks) com esta estrutura EXATA:
{
  "postTitle": "capa/gancho, máx 80 chars, português, SEM ponto final desnecessário",
  "postBody": "artigo em markdown, mínimo 300 palavras, português: desenvolvimento do tema, com critérios/passos/letras e a aplicação clínica (vai para o site)",
  "slides": ["slide 1, máx 90", "slide 2, máx 90", "slide 3, máx 90", "slide 4, máx 90"],
  "accentWords": ["palavra-chave slide 1 (em vermelho)", "palavra-chave slide 2", "palavra-chave slide 3", "palavra-chave slide 4"],
  "cta": "fechamento acionável de 30-80 chars: ${e.cta}",
  "instagramCaption": "legenda 700-1600 chars em português: (1) gancho forte; (2) desenvolvimento útil do tema; (3) CTA: 'Salve para estudar', 'Marque um colega' e 'Siga ${handle} para mais'; (4) '→ Anamnese completa no link da bio'; (5) em uma última linha, 6-9 hashtags. Emojis com parcimônia (1-3).",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "videoKeywords": ["6 termos de busca em INGLÊS para banco de VÍDEO (Pexels), UM por cena, concretos e filmáveis, sem termos abstratos"]
}

Para as hashtags, MISTURE alcance amplo + nicho BR: #medicina #estudantedemedicina #futuromedico #ligaacademica #residenciamedica #provaderesidencia #enare #revalida #semiologia #clinicamedica #anamnesismed`;
}

// ─── Prompt do REEL (hook-first, NATIVO de reel) ──────────────────────────────
// Reel é o motor de ALCANCE: gancho que para o scroll em 1-2s, payoff curto e CTA
// de engajamento. Sai no MESMO JSON do carrossel (postTitle/slides/cta…) p/ o
// pipeline de render não mudar — só a ESCRITA é diferente (curta e hook-first).
const REEL_ESTRUTURA: Record<Lang, Record<ReelFormato, { rotulo: string; hook: string; linhas: string; cta: string }>> = {
  pt: {
    curiosidade: { rotulo: "VOCÊ SABIA?", hook: "uma afirmação ou pergunta que INTRIGA em ≤55 chars — o fato clínico que pouca gente sabe", linhas: "3 linhas curtas: o fato, POR QUE muda a prática e um detalhe que gruda na memória", cta: "feche pedindo SALVAR e marcar quem não sabia" },
    mnemonico:   { rotulo: "BIZU",        hook: "prometa o bizu que resolve, em ≤55 chars (ex.: 'O bizu que salva sua gasometria')", linhas: "3 linhas: cada uma destrincha letras/critérios do mnemônico com o significado clínico, EM ORDEM", cta: "feche pedindo SALVAR pra prova e perguntar qual letra sempre esquecem" },
    pegadinha:   { rotulo: "PEGA DE PROVA", hook: "anuncie o erro que reprova, em ≤55 chars (ex.: 'A pegadinha de ECG que reprova todo mundo')", linhas: "3 linhas: a ARMADILHA → o raciocínio CORRETO → a regra de ouro pra nunca mais errar", cta: "feche pedindo COMENTAR se já caiu nessa e marcar um colega" },
    tecnica:     { rotulo: "NA PRÁTICA",  hook: "nomeie a técnica/manobra e prometa fazer certo, em ≤55 chars (ex.: 'Como medir a PA sem errar')", linhas: "3 linhas: cada uma = 1 PASSO da técnica, EM ORDEM, do jeito que se faz à beira do leito", cta: "feche pedindo SALVAR pra treinar e marcar a dupla de plantão" },
  },
  es: {
    curiosidade: { rotulo: "¿SABÍAS?",         hook: "una afirmación o pregunta que INTRIGA en ≤55 chars — el dato clínico que pocos saben", linhas: "3 líneas cortas: el dato, POR QUÉ cambia la práctica y un detalle que se queda en la memoria", cta: "cierra pidiendo GUARDAR y etiquetar a quien no lo sabía" },
    mnemonico:   { rotulo: "TRUCO",            hook: "promete el truco que resuelve, en ≤55 chars (ej.: 'El truco que salva tu gasometría')", linhas: "3 líneas: cada una desglosa letras/criterios de la mnemotecnia con el significado clínico, EN ORDEN", cta: "cierra pidiendo GUARDAR para el examen y preguntar qué letra siempre olvidan" },
    pegadinha:   { rotulo: "TRAMPA DE EXAMEN", hook: "anuncia el error que reprueba, en ≤55 chars (ej.: 'La trampa de ECG que reprueba a todos')", linhas: "3 líneas: la TRAMPA → el razonamiento CORRECTO → la regla de oro para no volver a fallar", cta: "cierra pidiendo COMENTAR si ya cayeron y etiquetar a un colega" },
    tecnica:     { rotulo: "EN LA PRÁCTICA", hook: "nombra la técnica/maniobra y promete hacerla bien, en ≤55 chars (ej.: 'Cómo medir la PA sin errar')", linhas: "3 líneas: cada una = 1 PASO de la técnica, EN ORDEN, como se hace a la cabecera del paciente", cta: "cierra pidiendo GUARDAR para practicar y etiquetar a tu compañero de guardia" },
  },
};

function buildReelPrompt(lang: Lang, formato: ReelFormato, topic: string, slot: Slot, handle: string): string {
  const slotInstr = SLOT_INSTRUCTIONS_BY_LANG[lang][slot];
  const e = REEL_ESTRUTURA[lang][formato];

  if (lang === "es") {
    return `Eres el editor clínico de AnamnesísMed — plataforma de anamnesis para estudiantes de medicina (de 4º año en adelante), internos y residentes de LATINOAMÉRICA. Crea el GUION de un REEL vertical de Instagram del tipo ${e.rotulo}. El reel es el motor de ALCANCE: tiene que FRENAR EL SCROLL en 1-2 s y dar ganas de guardar/comentar/compartir. Contenido serio, correcto y aplicable.

VOZ DEL MERCADO (Latinoamérica) — GENERADO para LATAM, NO traducido del portugués:
- Público: estudiante de ciclo clínico, interno, residente y quien prepara el ENARM/examen de residencia.
- Trato "tú" (singular) y "ustedes" (plural) — NUNCA "vosotros" ni jerga de España. Español latino neutro.

Tema (${e.rotulo}): "${topic}"
${slotInstr}

MOTOR DEL REEL (RETENCIÓN + GUARDADOS + COMENTARIOS + COMPARTIDOS):
- GANCHO (portada): ${e.hook}. Es lo PRIMERO que se ve y se oye — sin rodeos, directo a "tú".
- PAYOFF (líneas): ${e.linhas}. Frases MUY cortas, ritmo rápido, una idea por línea.
- CIERRE: ${e.cta}.
- Clínica correcta y específica (criterios, signos, conductas reales). Sin inventar datos.
- IDIOMA: español latino neutro (tú/ustedes), JAMÁS "vosotros" ni calcos del portugués. Relee y corrige cualquier palabra en portugués antes de devolver.

Genera un JSON válido (sin markdown, sin backticks) con esta estructura EXACTA:
{
  "postTitle": "GANCHO del reel, ≤55 caracteres, español, sin punto final innecesario",
  "postBody": "artículo en markdown, mínimo 250 palabras, español: desarrolla el tema con criterios/pasos y aplicación clínica (va al sitio)",
  "slides": ["línea 1, ≤80 caracteres", "línea 2, ≤80", "línea 3, ≤80"],
  "accentWords": ["palabra clave línea 1 (en rojo)", "palabra clave línea 2", "palabra clave línea 3"],
  "cta": "cierre accionable de 30-90 caracteres: ${e.cta}",
  "instagramCaption": "pie de foto 500-1200 caracteres en español: (1) gancho fuerte; (2) el dato/truco/trampa desarrollado; (3) CTA: 'Guarda esto', 'Etiqueta a un colega' y 'Sigue ${handle} para más'; (4) última línea con 6-9 hashtags. Emojis con moderación (1-3).",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}

Para los hashtags, MEZCLA alcance amplio + nicho LATAM (sin #MIR de España): #medicina #estudiantedemedicina #futuromedico #residentesmedicos #medicinainterna #semiologia #ENARM #examenderesidencia #medicinalatam #anamnesismed`;
  }

  return `Você é o editor clínico do AnamnesísMed — plataforma de anamnese para estudantes de medicina (do 4º ano em diante), internos e residentes no BRASIL. Crie o ROTEIRO de um REEL vertical de Instagram do tipo ${e.rotulo}. O reel é o motor de ALCANCE: precisa PARAR O SCROLL em 1-2 s e dar vontade de salvar/comentar/compartilhar. Conteúdo sério, correto e aplicável.

VOZ DO MERCADO (Brasil) — GERADO para o Brasil, NÃO traduzido:
- Público: estudante do ciclo clínico, interno, R1 e quem estuda para a PROVA DE RESIDÊNCIA (ENARE, USP, UNIFESP) e o Revalida.
- Tratamento "você"; português brasileiro direto (cabe "bizu", "cai na prova", "fechou o diagnóstico").

Tema (${e.rotulo}): "${topic}"
${slotInstr}

MOTOR DO REEL (RETENÇÃO + SALVAMENTOS + COMENTÁRIOS + COMPARTILHAMENTOS):
- GANCHO (capa): ${e.hook}. É a PRIMEIRA coisa que aparece — sem rodeio, direto com "você".
- PAYOFF (linhas): ${e.linhas}. Frases MUITO curtas, ritmo rápido, uma ideia por linha.
- FECHAMENTO: ${e.cta}.
- Clínica correta e específica (critérios, sinais, condutas reais). Sem inventar dados.
- IDIOMA: português brasileiro (você), nunca tradução/calco de outro idioma.

Gere um JSON válido (sem markdown, sem backticks) com esta estrutura EXATA:
{
  "postTitle": "GANCHO do reel, ≤55 chars, português, sem ponto final desnecessário",
  "postBody": "artigo em markdown, mínimo 250 palavras, português: desenvolve o tema com critérios/passos e a aplicação clínica (vai para o site)",
  "slides": ["linha 1, ≤80 chars", "linha 2, ≤80", "linha 3, ≤80"],
  "accentWords": ["palavra-chave linha 1 (em vermelho)", "palavra-chave linha 2", "palavra-chave linha 3"],
  "cta": "fechamento acionável de 30-90 chars: ${e.cta}",
  "instagramCaption": "legenda 500-1200 chars em português: (1) gancho forte; (2) o fato/bizu/pegadinha desenvolvido; (3) CTA: 'Salve isso', 'Marque um colega' e 'Siga ${handle} para mais'; (4) em uma última linha, 6-9 hashtags. Emojis com parcimônia (1-3).",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}

Para as hashtags, MISTURE alcance amplo + nicho BR: #medicina #estudantedemedicina #futuromedico #ligaacademica #residenciamedica #provaderesidencia #enare #revalida #semiologia #anamnesismed`;
}

function buildPrompt(lang: Lang, topic: string, context: string, slot: Slot, handle: string, formato: Formato = "caso-diagnostico"): string {
  // Formatos novos (mnemônico, red-flag, passo-a-passo, score) têm estrutura de
  // slides própria — o caso "Qual o diagnóstico?" abaixo fica inalterado.
  if (formato !== "caso-diagnostico") {
    return buildFormatoPrompt(lang, formato, topic, context, slot, handle);
  }

  const slotInstr = SLOT_INSTRUCTIONS_BY_LANG[lang][slot];

  if (lang === "es") {
    return `Eres el editor clínico de AnamnesísMed — plataforma de anamnesis para médicos y estudiantes de LATINOAMÉRICA. Crea un CARRUSEL de Instagram en formato "¿CUÁL ES EL DIAGNÓSTICO?": un caso clínico interactivo que atrapa la atención, hace PENSAR al lector y comentar su sospecha, y solo revela el diagnóstico al final. Contenido serio y correcto.

VOZ DEL MERCADO (Latinoamérica) — este contenido se GENERA para LATAM, NO se traduce del portugués:
- Público: estudiante de medicina, interno, residente y quien prepara el ENARM / examen de residencia (México, Colombia, Perú, Argentina…).
- Trato: "tú" en singular y "ustedes" en plural — NUNCA "vosotros" ni jerga de España.
- Español latino neutro, sin modismos de un solo país; términos clínicos usados en LATAM.
- Referencias nativas: la guardia, el internado, el examen de residencia, el hospital público.
- Tono cercano, directo y profesional. El gancho se piensa para el feed LATAM, nunca calcado de otro idioma.

Caso (con el diagnóstico entre paréntesis — NO lo reveles antes del final): "${topic}"
${slotInstr}

${context ? `Contexto investigado:\n${context}\n` : ""}
MOTOR DE ALCANCE (lo que más empuja el algoritmo es RETENCIÓN + GUARDADOS + COMPARTIDOS):
- GANCHO: la portada debe FRENAR EL SCROLL en 1-2 segundos. Concreta y específica (edad, dato o signo llamativo del caso), nunca abstracta ni genérica. Háblale a "tú".
- GUARDABLE: la PISTA DECISIVA debe ser una perla clínica que el lector quiera GUARDAR para repasar (un signo patognomónico, una regla de oro), no solo describir.
- COMPARTIBLE: el caso debe dar ganas de etiquetar a un colega para resolverlo juntos — etiquetar = compartir.
- El pie de foto cierra SIEMPRE con un llamado explícito a GUARDAR (🔖) y COMPARTIR/etiquetar (📩) antes de los hashtags.

REGLAS DEL FORMATO (sigue TODAS):
- NO reveles el diagnóstico en la portada ni en las diapositivas 1 a 4 — solo en el campo "cta" y en el pie de foto. Construye suspenso.
- Portada: presenta el caso de forma intrigante y termina con "¿Cuál es el diagnóstico?".
- Las diapositivas entregan el caso por etapas (historia → examen → pista decisiva) e invitan a la sospecha.
- Clínica correcta y específica (datos, signos y hallazgos reales del caso). Lenguaje de quien está en la práctica, frases cortas.
- COMENTARIO FÁCIL: pide la sospecha del lector antes de la revelación.
- IDIOMA: español latino neutro (tú/ustedes), JAMÁS "vosotros" ni calcos del portugués.
- REVISIÓN FINAL OBLIGATORIA: antes de devolver el JSON, relee TODO (título, slides, cta, pie de foto) y reemplaza CUALQUIER palabra o construcción en portugués por español latino — ej.: você→tú, dor→dolor, fígado→hígado, criança→niño, palpite→sospecha. No puede quedar NINGUNA palabra en portugués.

Genera un JSON válido (sin markdown, sin backticks) con esta estructura EXACTA:
{
  "postTitle": "portada: resume el caso en 1 frase intrigante y termina con '¿Cuál es el diagnóstico?', máx 80 caracteres, español, SIN revelar la respuesta",
  "postBody": "artículo en markdown, mínimo 300 palabras, español: discusión del caso, razonamiento diagnóstico, diagnóstico diferencial y conducta (va al sitio)",
  "slides": [
    "HISTORIA — presentación, edad, motivo de consulta y factores de riesgo, máx 90 caracteres",
    "EXAMEN FÍSICO — los signos clave hallados, máx 90 caracteres",
    "PISTA DECISIVA — el hallazgo/prueba que orienta al diagnóstico (sin nombrarlo), máx 90 caracteres",
    "¿Tu sospecha? Piensa el diagnóstico más probable y coméntalo 👇 (respuesta en la próxima), máx 90 caracteres"
  ],
  "accentWords": [
    "1 palabra clave de la diapositiva 1 (aparecerá en rojo)",
    "1 palabra clave de la diapositiva 2",
    "1 palabra clave de la diapositiva 3",
    "1 palabra clave de la diapositiva 4"
  ],
  "cta": "REVELACIÓN: empieza con 'Diagnóstico:' y nombra la respuesta de forma clara y corta, 30-80 caracteres",
  "instagramCaption": "pie de foto 700-1600 caracteres en español, EN ESTE orden: (1) recuenta el caso en 2-3 líneas; (2) 'Comenta tu diagnóstico antes de ver la respuesta 👇'; (3) revela el diagnóstico + 2 perlas clínicas (la pista que lo confirma y 1 conducta inicial); (4) CTA: 'Guarda para estudiar', 'Etiqueta a un colega' y 'Sigue ${handle} para más casos'; (5) '→ Anamnesis completa en el link de la bio'; (6) última línea con 6-9 hashtags. Emojis con moderación (1-3).",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "videoKeywords": ["6 términos de búsqueda en INGLÉS para banco de VÍDEO (Pexels), UNO por escena en orden (portada, slides 1-4, revelación), concretos y filmables, que retraten la escena del caso — p.ej.: 'young athlete collapsing on track', 'hospital heart rate monitor closeup', 'doctor listening to patient chest', 'cardiac ultrasound screen', 'worried patient in hospital bed', 'ecg strip printout closeup'. Sin términos abstractos."]
}

Para los hashtags, MEZCLA alcance amplio + nicho LATAM (sin etiquetas de España como #MIR): #medicina #medicinainterna #estudiantedemedicina #futuromedico #residentesmedicos #casoclinico #cualeseldiagnostico #semiologia #urgencias #ENARM #examenderesidencia #medicinalatam #diagnostico #anamnesismed`;
  }

  return `Você é o editor clínico do AnamnesísMed — plataforma de anamnese para médicos e estudantes no BRASIL. Crie um CARROSSEL de Instagram no formato "QUAL O DIAGNÓSTICO?": um caso clínico interativo que prende a atenção, faz o leitor PENSAR e COMENTAR o palpite, e só revela o diagnóstico no fim. Conteúdo sério e correto.

VOZ DO MERCADO (Brasil) — este conteúdo é GERADO para o Brasil, NÃO traduzido de outro idioma:
- Público: estudante de medicina, interno, R1 e quem estuda para a PROVA DE RESIDÊNCIA (ENARE, USP, UNIFESP) e o Revalida.
- Tratamento: "você"; português brasileiro, levemente informal, sem gíria forçada (cabe "bizu", "fechou o diagnóstico", "cai na prova").
- Referências nativas: plantão no SUS/UPA, internato, liga acadêmica, prova de residência.
- Tom direto e caloroso. O gancho é pensado para o feed BR (que premia utilidade para prova e plantão), nunca calcado de outro idioma.

Caso (com o diagnóstico entre parênteses — NÃO revele antes do fim): "${topic}"
${slotInstr}

${context ? `Contexto pesquisado:\n${context}\n` : ""}
MOTOR DE ALCANCE (o que mais empurra o algoritmo é RETENÇÃO + SALVAMENTOS + COMPARTILHAMENTOS):
- GANCHO: a capa precisa PARAR O SCROLL em 1-2 segundos. Concreta e específica (idade, dado ou sinal marcante do caso), nunca abstrata ou genérica. Fale com "você".
- SALVÁVEL: a PISTA DECISIVA deve ser uma pérola clínica que o leitor queira SALVAR para revisar (um sinal patognomônico, um bizu de prova), não só descrever.
- COMPARTILHÁVEL: o caso deve dar vontade de marcar um colega para resolver junto — marcar = compartilhar.
- A legenda fecha SEMPRE com chamada explícita para SALVAR (🔖) e COMPARTILHAR/marcar (📩) antes das hashtags.

REGRAS DO FORMATO (siga TODAS):
- NÃO revele o diagnóstico na capa nem nos slides 1 a 4 — só no campo "cta" e na legenda. Construa suspense.
- Capa: apresente o caso de forma intrigante e termine com "Qual o diagnóstico?".
- Os slides entregam o caso em etapas (história → exame → pista decisiva) e convidam ao palpite.
- Clínica correta e específica (dados, sinais e achados reais do caso). Linguagem de quem está na prática, frases curtas.
- COMENTÁRIO FÁCIL: peça o palpite do leitor antes da revelação.
- IDIOMA: português brasileiro (você), nunca tradução/calco de outro idioma.
- REVISÃO FINAL OBRIGATÓRIA: antes de devolver o JSON, releia TUDO (título, slides, cta, legenda) e troque QUALQUER palavra ou construção em espanhol por português do Brasil — ex.: tú→você, dolor→dor, hígado→fígado, niño→criança, sospecha→palpite. Não pode sobrar NENHUMA palavra em espanhol.

Gere um JSON válido (sem markdown, sem backticks) com esta estrutura EXATA:
{
  "postTitle": "capa: resuma o caso em 1 frase intrigante e termine com 'Qual o diagnóstico?', máx 80 chars, português, SEM revelar a resposta",
  "postBody": "artigo em markdown, mínimo 300 palavras, português: discussão do caso, raciocínio diagnóstico, diagnóstico diferencial e conduta (vai para o site)",
  "slides": [
    "HISTÓRIA — apresentação, idade, queixa e fatores de risco do caso, máx 90 chars",
    "EXAME FÍSICO — os sinais-chave encontrados, máx 90 chars",
    "PISTA DECISIVA — o achado/exame que aponta o diagnóstico (sem nomeá-lo), máx 90 chars",
    "Seu palpite? Pense no diagnóstico mais provável e comente 👇 (resposta no próximo slide), máx 90 chars"
  ],
  "accentWords": [
    "1 palavra-chave do slide 1 (aparecerá em vermelho)",
    "1 palavra-chave do slide 2",
    "1 palavra-chave do slide 3",
    "1 palavra-chave do slide 4"
  ],
  "cta": "REVELAÇÃO: comece com 'Diagnóstico:' e nomeie a resposta de forma clara e curta, 30-80 chars",
  "instagramCaption": "legenda 700-1600 chars em português, NESTA ordem: (1) reconte o caso em 2-3 linhas; (2) 'Comente seu diagnóstico antes de ver a resposta 👇'; (3) revele o diagnóstico + 2 pérolas clínicas (a pista que fecha o diagnóstico e 1 conduta inicial); (4) CTA: 'Salve para estudar', 'Marque um colega' e 'Siga ${handle} para mais casos'; (5) '→ Anamnese completa no link da bio'; (6) em uma última linha, 6-9 hashtags. Use emojis com parcimônia (1-3).",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "videoKeywords": ["6 termos de busca em INGLÊS para banco de VÍDEO (Pexels), UM por cena na ordem (capa, slides 1-4, revelação), concretos e filmáveis, retratando a cena do caso — ex.: 'young athlete collapsing on track', 'hospital heart rate monitor closeup', 'doctor listening to patient chest', 'cardiac ultrasound screen', 'worried patient in hospital bed', 'ecg strip printout closeup'. Sem termos abstratos."]
}

Para as hashtags, MISTURE alcance amplo + nicho BR: #medicina #medicinabrasileira #estudantedemedicina #futuromedico #ligaacademica #residenciamedica #provaderesidencia #enare #revalida #casoclinico #qualodiagnostico #semiologia #clinicamedica #anamnesismed`;
}

// ─── Geração de conteúdo via Claude ──────────────────────────────────────────

async function generateContent(
  topic: string,
  searchResults: SearchResult[],
  slot: Slot,
  lang: Lang,
  handle: string,
  automation: Automation,
  formato: Formato = "caso-diagnostico",
  reelFormato?: ReelFormato,
): Promise<GeneratedContent> {
  const context = searchResults
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.content}`)
    .join("\n\n");

  // Reel tem gerador próprio (hook-first); carrossel mantém o buildPrompt.
  const prompt = reelFormato
    ? buildReelPrompt(lang, reelFormato, topic, slot, handle)
    : buildPrompt(lang, topic, context, slot, handle, formato);

  // O haiku ocasionalmente devolve JSON malformado → o post falhava em silêncio.
  // Tentamos 2×: parseContentJson extrai o objeto e, se o parse falhar, regenera.
  const MAX_CONTENT_TRIES = 2;
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_CONTENT_TRIES; attempt++) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) throw new Error(`Claude API error: ${res.status}`);
    const data = await res.json();
    await logSpend({ automation, platform: "anthropic", operation: "content", model: "claude-haiku-4-5-20251001", units: (data?.usage?.input_tokens ?? 0) + (data?.usage?.output_tokens ?? 0), costUsd: anthropicCost("claude-haiku-4-5-20251001", data?.usage) });
    const raw  = data.content?.[0]?.text ?? "";
    try {
      return parseContentJson<GeneratedContent>(raw);
    } catch (e) {
      lastErr = e; // JSON malformado → regenera na próxima volta
    }
  }
  throw new Error(`generateContent: JSON inválido após ${MAX_CONTENT_TRIES} tentativas: ${lastErr instanceof Error ? lastErr.message : String(lastErr)}`);
}

// ─── Token do Instagram ───────────────────────────────────────────────────────

async function getAccessToken(lang: Lang = "pt"): Promise<string> {
  // Cada conta tem seu token: PT → META_ACCESS_TOKEN, ES → META_ACCESS_TOKEN_ES.
  const dbKey  = lang === "es" ? "meta_access_token_es" : "meta_access_token";
  const envVar = lang === "es" ? process.env.META_ACCESS_TOKEN_ES : process.env.META_ACCESS_TOKEN;
  try {
    const { sql } = await import("@vercel/postgres");
    const rows = await sql`SELECT value FROM config WHERE key = ${dbKey}`;
    if (rows.rows[0]?.value) return rows.rows[0].value;
  } catch { /* fallback para env var */ }
  return envVar!;
}

// ─── Publicação como carrossel ────────────────────────────────────────────────

async function publishCarousel(caption: string, imageUrls: string[], lang: Lang = "pt"): Promise<string> {
  // Conta de publicação por idioma: PT → @anamnesismed, ES → @anamnesismed.es.
  const accountId = (lang === "es"
    ? process.env.META_INSTAGRAM_ACCOUNT_ID_ES
    : process.env.META_INSTAGRAM_ACCOUNT_ID)!;
  const token     = await getAccessToken(lang);
  const base      = `https://graph.instagram.com/v25.0/${accountId}`;

  // 1. Container por slide
  const childIds: string[] = [];
  for (const url of imageUrls) {
    const r = await fetch(`${base}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: url, is_carousel_item: true, access_token: token }),
    });
    if (!r.ok) throw new Error(`Carousel child error: ${await r.text()}`);
    const { id } = await r.json();
    childIds.push(id);
    await new Promise(res => setTimeout(res, 800));
  }

  // 2. Container do carrossel
  const carRes = await fetch(`${base}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      media_type: "CAROUSEL",
      children: childIds.join(","),
      caption,
      access_token: token,
    }),
  });
  if (!carRes.ok) throw new Error(`Carousel container error: ${await carRes.text()}`);
  const { id: carId } = await carRes.json();

  // 3. Aguardar processamento
  await new Promise(res => setTimeout(res, 3000));

  // 4. Publicar
  const pubRes = await fetch(`${base}/media_publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ creation_id: carId, access_token: token }),
  });
  if (!pubRes.ok) throw new Error(`Publish error: ${await pubRes.text()}`);
  const { id: postId } = await pubRes.json();
  return postId;
}

// ─── Salvar no banco ──────────────────────────────────────────────────────────

async function savePost(params: {
  topic: string; slot: Slot; title: string; body: string;
  instagramCaption: string; tags: string[];
  instagramPostId: string | null; publishedAt: Date; lang: Lang;
}): Promise<void> {
  const { sql } = await import("@vercel/postgres");
  await sql`
    INSERT INTO posts (
      topic, slot, title, body, instagram_caption,
      tags, instagram_post_id, published_at, lang
    ) VALUES (
      ${params.topic}, ${params.slot}, ${params.title},
      ${params.body}, ${params.instagramCaption},
      ${params.tags as any},
      ${params.instagramPostId},
      ${params.publishedAt.toISOString()}, ${params.lang}
    )
  `;
}

// ─── Handler principal ────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Autenticação do cron
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const slotParam    = req.nextUrl.searchParams.get("slot") as Slot | null;
  const topicOverride = req.nextUrl.searchParams.get("topic");
  const slot: Slot    = slotParam === "noite" ? "noite"
                       : slotParam === "tarde" ? "tarde" : "manha";

  // Idioma: POST_LANG no deploy (pt p/ @anamnesismed, es p/ @anamnesismed.es)
  // ou ?lang=es para teste pontual. Handle do CTA segue o idioma (override por POST_HANDLE).
  const langParam  = req.nextUrl.searchParams.get("lang");
  const lang: Lang = (langParam ?? process.env.POST_LANG) === "es" ? "es" : "pt";
  const handle     = process.env.POST_HANDLE
                     ?? (lang === "es" ? "@anamnesismed.es" : "@anamnesismed");

  // Preview (pipeline do Reel/CI) não publica nem é barrado pelo teto — o gasto
  // dele entra no balde "manual". A publicação real entra em "ig-posts".
  const isPreview  = !!req.nextUrl.searchParams.get("preview");
  const automation: Automation = isPreview ? "manual" : "ig-posts";
  // Canal: o reel (via ?channel=reel) pega tema deslocado do carrossel do dia.
  const channel: "carousel" | "reel" = req.nextUrl.searchParams.get("channel") === "reel" ? "reel" : "carousel";

  const log: Record<string, unknown> = { slot, lang };

  try {
    const now   = new Date();
    // Tema do dia/slot (banco inteiro, todos os formatos). topicOverride pula a
    // seleção (disparo manual com ?topic=) e cai no formato caso-diagnostico.
    // Reel tem banco PRÓPRIO (REEL_TEMAS) e gerador hook-first; carrossel usa TEMAS.
    // QA: no preview, ?reelId=<id> força um tema específico (testar typografia vs footage).
    const reelIdParam = isPreview ? req.nextUrl.searchParams.get("reelId") : null;
    const reelTema = (channel === "reel" && !topicOverride)
      ? (reelIdParam ? (REEL_TEMAS.find((t) => String(t.id) === reelIdParam) ?? pickReelTema(slot, now)) : pickReelTema(slot, now))
      : undefined;
    const tema     = (channel === "reel" || topicOverride) ? undefined : pickTema(slot, now, channel);
    const topic    = topicOverride ?? reelTema?.[lang] ?? (tema ? tema[lang] : "");
    const formato: Formato = tema?.formato ?? "caso-diagnostico";
    const reelFormato: ReelFormato | undefined = reelTema?.formato;
    log.topic     = topic;
    log.formato   = reelFormato ?? formato;

    // Trava anti-duplicata: o mesmo CASO não se repete na conta em 7 dias.
    // Janela de 7 dias (era 20h) cobre o ciclo de temas e impede que
    // backfill/disparo manual republiquem o tema da semana. A separação por
    // idioma é implícita: o enunciado PT (tema.pt) e o ES (tema.es) são textos
    // distintos, então uma string PT nunca casa com post da conta ES (e vice-versa).
    try {
      const { sql } = await import("@vercel/postgres");
      const existing = await sql`
        SELECT id FROM posts
        WHERE topic = ${topic}
          AND published_at > NOW() - INTERVAL '7 days'
        LIMIT 1
      `;
      if (existing.rows.length > 0) {
        return NextResponse.json({ ok: true, skipped: true, reason: "Caso já publicado nesta conta nos últimos 7 dias", topic });
      }
    } catch { /* ignora erro de banco na checagem */ }

    // REEL SINCRONIZADO (preview): monta a ReelSpec (visual POR FRASE casando com a
    // fala + narração + legenda palavra a palavra) e devolve — o render (CI) consome
    // isso direto, sem o conteúdo/imagens de carrossel. É o motor que resolve o
    // "a imagem não casa com o texto". Disparo real do reel é sempre via preview.
    if (channel === "reel" && isPreview) {
      let spec;
      try {
        spec = await buildReelSpec(lang, topic, automation);
      } catch (e) {
        return NextResponse.json({ ok: false, reason: `Erro no reel sincronizado: ${e instanceof Error ? e.message : String(e)}`, topic }, { status: 500 });
      }
      if (!spec) {
        return NextResponse.json({ ok: false, reason: "Falha ao montar o reel sincronizado (narração/visual)", topic }, { status: 502 });
      }
      log.reel = `sync: ${spec.scenes.length} cenas, ${spec.captions.length} palavras, ${spec.durationSec.toFixed(1)}s, voz ${spec.voice}`;
      return NextResponse.json({
        ok: true, preview: true, reelSync: true, topic, slot,
        rotulo: reelFormato ? REEL_ROTULO[lang][reelFormato] : "",
        handle,
        spec,
      });
    }

    // Teto diário de gasto (ig-posts): se a próxima publicação estoura o
    // orçamento, BLOQUEIA (não gasta) e devolve 402 p/ o GitHub Actions falhar
    // e avisar o dono. Suba budget:ig-posts em config p/ liberar. Preview não
    // é barrado (gasto vai p/ "manual").
    if (!isPreview) {
      const gate = await checkBudget("ig-posts", EST_RUN_COST.publish);
      if (!gate.ok) {
        return NextResponse.json({
          ok: false, blocked: true,
          reason: `Orçamento diário ig-posts estourado (gasto US$${gate.spent.toFixed(3)} + est US$${gate.est.toFixed(3)} > teto US$${gate.budget.toFixed(2)}). Suba budget:ig-posts em config p/ liberar.`,
          gate,
        }, { status: 402 });
      }
    }

    // Pesquisa e geração de conteúdo
    const searchResults = await searchTopic(topic, automation);
    const content       = await generateContent(topic, searchResults, slot, lang, handle, automation, formato, reelFormato);
    log.title           = content.postTitle;

    // Número de edição sequencial
    let editionNum = 1;
    try {
      const { sql } = await import("@vercel/postgres");
      const cnt      = await sql`SELECT COUNT(*) as n FROM posts`;
      editionNum     = (parseInt(cnt.rows[0]?.n ?? "0") || 0) + 1;
    } catch { /* fallback silencioso */ }

    const ed   = String(editionNum).padStart(3, "0");
    // Metáfora visual da capa + etiqueta de especialidade vêm do tema selecionado.
    // No disparo manual (topicOverride sem tema) caímos no fallback por keyword.
    const subject = reelTema?.subject ?? tema?.subject ?? "";
    const kw      = reelTema?.esp || tema?.esp || extractKeyword(topic, lang);
    const base = process.env.PRODUCTION_URL ?? "https://anamnesismed-ig.vercel.app";
    const enc  = (s: string) => encodeURIComponent(s.slice(0, 120));
    const hq   = `&handle=${enc(handle)}`; // handle da conta no rodapé das imagens
    const followLabel = lang === "es" ? `Sigue ${handle}` : `Siga ${handle}`;
    const ctaBadges   = lang === "es" ? "Guardar,Compartir,Etiqueta a un colega"
                                      : "Salvar,Compartilhar,Marque um colega";
    const ctaBio      = lang === "es" ? "Link en bio" : "Link na bio";
    const ctaExtra    = `&follow=${enc(followLabel)}&badges=${enc(ctaBadges)}&bio=${enc(ctaBio)}`;

    // Ilustração (fal/Flux) só na CAPA, com QA por visão. Falha/nsfw/reprovação
    // → og usa fundo escuro (nunca quebra). Preview (CI) usa 1 tentativa e gasto
    // "manual"; publicação real usa o loop de QA cheio em "ig-posts".
    const ill = await generateIllustration(subject, isPreview
      ? { maxTries: 1, automation: "manual" }
      : { automation: "ig-posts" });
    log.illustration = ill.url ? `ia (${ill.attempts}t${ill.cached ? ", cache" : ""})` : `fallback: ${ill.error ?? "?"}`;
    const imgParam = ill.url ? `&img=${encodeURIComponent(ill.url)}` : "";

    const totalSlides = 2 + content.slides.length; // capa + insights + cta

    // Construir URLs de cada slide (geradas pelo /api/og)
    const slideUrls: string[] = [
      // Slide 1 — capa (com ilustração)
      `${base}/api/og?slide=cover&slot=${slot}&title=${enc(content.postTitle)}&kw=${enc(kw)}&ed=${ed}${hq}${imgParam}`,
      // Slides de insight
      ...content.slides.map((text, i) =>
        `${base}/api/og?slide=insight&text=${enc(text)}&accent=${enc(content.accentWords[i] ?? "")}&num=${i + 2}&total=${totalSlides}&kw=${enc(kw)}&ed=${ed}${hq}`
      ),
      // Slide CTA final
      `${base}/api/og?slide=cta&text=${enc(content.cta)}&num=${totalSlides}&total=${totalSlides}&kw=${enc(kw)}&ed=${ed}${hq}${ctaExtra}`,
    ];

    // Narração por IA (só REEL): VO de 20-30s em UMA fala corrida, com timestamps
    // por palavra → legenda sincronizada + corte do footage no tempo da voz. É o
    // que dá o "sincronizado". Falha/sem chave → null e o reel segue sem narração.
    let narration: Narration | null = null;
    if (channel === "reel") {
      const vo = content.narration?.trim()
        || [content.postTitle, ...content.slides, content.cta].join(". ");
      narration = await narrate(vo, lang);
      log.narration = narration ? `ok (${narration.words.length} palavras, ${narration.durationSec.toFixed(1)}s, voz ${narration.voice})` : "sem narração";
    }

    // Modo PRÉVIA — gera conteúdo + URLs das imagens SEM publicar nem salvar
    if (req.nextUrl.searchParams.get("preview")) {
      return NextResponse.json({
        ok: true, preview: true, topic, slot,
        title: content.postTitle,
        slides: content.slides,
        accentWords: content.accentWords,
        cta: content.cta,
        caption: content.instagramCaption,
        tags: content.tags,
        videoKeywords: content.videoKeywords ?? [],
        esp: kw, // especialidade (CARDIOLOGIA, GASTRO…) → footage genérico do reel
        // Reel: rótulo do formato (VOCÊ SABIA?/BIZU/PEGA DE PROVA) p/ o badge do vídeo.
        ...(reelFormato ? {
          reelFormato,
          rotulo: REEL_ROTULO[lang][reelFormato],
          visual: FORMATO_VISUAL[reelFormato],          // "footage" | "typografia"
          footage: reelTema?.footage ?? [],             // queries da AÇÃO (só técnica)
        } : {}),
        ...(narration ? {
          narration: { audioUrl: narration.audioUrl, words: narration.words, durationSec: narration.durationSec, voice: narration.voice },
        } : {}),
        slideUrls,
      });
    }

    // Pré-renderiza TODOS os slides (capa + insights + cta) para o Blob: o
    // Instagram passa a buscar PNGs estáticos e prontos, em vez de compor cada
    // um on-the-fly (Satori + download da IA na capa). Em cold start, a composição
    // on-the-fly estourava o timeout de download do IG (erro 9004/2207052 "Media
    // download has failed") em QUALQUER slide — não só na capa (antes só a capa
    // era pré-renderizada). Sequencial p/ reusar a lambda quente. Cada falha
    // mantém a URL on-the-fly daquele slide (nunca quebra o post).
    let prerendered = 0;
    for (let i = 0; i < slideUrls.length; i++) {
      const blob = await prerenderToBlob(slideUrls[i], `og/${slot}-${ed}-${i}.png`);
      if (blob) { slideUrls[i] = blob; prerendered++; }
    }
    log.prerendered = `${prerendered}/${slideUrls.length} slides no Blob`;

    // Publicar no Instagram
    let instagramPostId: string | null = null;
    try {
      instagramPostId = await publishCarousel(content.instagramCaption, slideUrls, lang);
      log.instagramPostId = instagramPostId;
      log.slides          = slideUrls.length;
    } catch (igErr) {
      log.instagramError = String(igErr);
    }

    // Salvar no banco (opcional — não bloqueia a publicação se não houver banco)
    try {
      await savePost({
        topic, slot,
        title: content.postTitle,
        body: content.postBody,
        instagramCaption: content.instagramCaption,
        tags: content.tags,
        instagramPostId,
        publishedAt: now,
        lang,
      });
      log.saved = true;
    } catch (dbErr) {
      log.dbError = String(dbErr);
    }

    log.ok = true;
    return NextResponse.json({ ok: true, post: log });

  } catch (err) {
    console.error("[publish] erro:", err);
    return NextResponse.json({ ok: false, error: String(err), log }, { status: 500 });
  }
}
