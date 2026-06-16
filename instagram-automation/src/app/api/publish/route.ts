import { NextRequest, NextResponse } from "next/server";
import { generateIllustration } from "@/lib/illustration";
import { prerenderToBlob } from "@/lib/prerender";

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
}

type Slot = "manha" | "tarde" | "noite";
type Lang = "pt" | "es";

// ─── Casos clínicos — formato "Qual o diagnóstico?" ───────────────────────────
// Cada item é um CASO (apresentação + diagnóstico oculto). O prompt monta um
// carrossel interativo que SÓ revela o diagnóstico no último slide e na legenda.
// PT e ES compartilham o mesmo índice → mesmo caso, mesma imagem de capa (SUBJECTS)
// e mesma etiqueta de especialidade (CASE_SYS). Mexeu num caso? Ajuste as 3 listas
// na MESMA posição. Idioma definido por POST_LANG (ou ?lang=es para teste).

const TOPICS_BY_LANG: Record<Lang, string[]> = {
  pt: [
    "Homem de 60 anos com dor torácica opressiva irradiando para a mandíbula, sudorese fria e náusea. (Diagnóstico, revelar só no slide final: infarto agudo do miocárdio.)",
    "Mulher de 30 anos com dispneia súbita e dor pleurítica após voo longo, taquicardia e SpO2 baixa. (Diagnóstico, revelar só no fim: tromboembolismo pulmonar.)",
    "Homem de 22 anos com cefaleia súbita 'a pior da vida' e rigidez de nuca. (Diagnóstico, revelar só no fim: hemorragia subaracnóidea.)",
    "Homem de 72 anos com dor abdominal súbita intensa e abdome em tábua. (Diagnóstico, revelar só no fim: úlcera péptica perfurada, abdome agudo perfurativo.)",
    "Mulher de 24 anos com poliúria, polidipsia, perda de peso e hálito cetônico. (Diagnóstico, revelar só no fim: cetoacidose diabética.)",
    "Homem de 58 anos com icterícia indolor, perda de peso e vesícula palpável (sinal de Courvoisier). (Diagnóstico, revelar só no fim: câncer de cabeça de pâncreas.)",
    "Criança de 5 anos com febre há 5 dias, conjuntivite, língua em framboesa e descamação das mãos. (Diagnóstico, revelar só no fim: doença de Kawasaki.)",
    "Mulher de 38 anos com palpitações, perda de peso, tremor e exoftalmia. (Diagnóstico, revelar só no fim: hipertireoidismo, doença de Graves.)",
    "Homem de 55 anos tabagista com claudicação intermitente, pé frio e pulsos distais ausentes. (Diagnóstico, revelar só no fim: doença arterial periférica.)",
    "Homem de 80 anos com confusão mental aguda e flutuante e disúria. (Diagnóstico, revelar só no fim: delirium secundário a infecção urinária.)",
    "Mulher de 26 anos com dor periumbilical que migrou para a fossa ilíaca direita, com Blumberg e febre baixa. (Diagnóstico, revelar só no fim: apendicite aguda.)",
    "Homem de 50 anos etilista com hematêmese volumosa e ascite. (Diagnóstico, revelar só no fim: hemorragia por varizes esofágicas.)",
    "Atleta de 19 anos com síncope durante esforço e sopro sistólico que aumenta com a manobra de Valsalva. (Diagnóstico, revelar só no fim: cardiomiopatia hipertrófica.)",
    "Mulher de 65 anos com dispneia aos esforços, ortopneia e edema de membros inferiores. (Diagnóstico, revelar só no fim: insuficiência cardíaca.)",
    "Homem de 28 anos com lombalgia noturna e rigidez matinal por mais de 1 hora que melhora com exercício. (Diagnóstico, revelar só no fim: espondilite anquilosante.)",
    "Lactente não vacinado com crises de tosse paroxística seguidas de guincho inspiratório. (Diagnóstico, revelar só no fim: coqueluche.)",
    "Mulher de 27 anos com fadiga, artralgia e rash malar fotossensível. (Diagnóstico, revelar só no fim: lúpus eritematoso sistêmico.)",
    "Homem de 67 anos com tremor de repouso assimétrico, bradicinesia e rigidez em roda denteada. (Diagnóstico, revelar só no fim: doença de Parkinson.)",
    "Homem de 45 anos com dor epigástrica, melena e uso crônico de anti-inflamatórios. (Diagnóstico, revelar só no fim: úlcera péptica sangrante.)",
    "Homem de 40 anos usuário de drogas injetáveis com febre, sopro cardíaco novo e lesões de Janeway. (Diagnóstico, revelar só no fim: endocardite infecciosa.)",
    "Mulher de 70 anos com cefaleia temporal, claudicação de mandíbula e VHS muito elevado. (Diagnóstico, revelar só no fim: arterite de células gigantes, temporal.)",
  ],
  es: [
    "Hombre de 60 años con dolor torácico opresivo irradiado a la mandíbula, sudoración fría y náuseas. (Diagnóstico, revelar solo en la última diapositiva: infarto agudo de miocardio.)",
    "Mujer de 30 años con disnea súbita y dolor pleurítico tras un vuelo largo, taquicardia y SpO2 baja. (Diagnóstico, revelar solo al final: tromboembolismo pulmonar.)",
    "Hombre de 22 años con cefalea súbita 'la peor de su vida' y rigidez de nuca. (Diagnóstico, revelar solo al final: hemorragia subaracnoidea.)",
    "Hombre de 72 años con dolor abdominal súbito intenso y abdomen en tabla. (Diagnóstico, revelar solo al final: úlcera péptica perforada, abdomen agudo perforativo.)",
    "Mujer de 24 años con poliuria, polidipsia, pérdida de peso y aliento cetónico. (Diagnóstico, revelar solo al final: cetoacidosis diabética.)",
    "Hombre de 58 años con ictericia indolora, pérdida de peso y vesícula palpable (signo de Courvoisier). (Diagnóstico, revelar solo al final: cáncer de cabeza de páncreas.)",
    "Niño de 5 años con fiebre de 5 días, conjuntivitis, lengua en fresa y descamación de manos. (Diagnóstico, revelar solo al final: enfermedad de Kawasaki.)",
    "Mujer de 38 años con palpitaciones, pérdida de peso, temblor y exoftalmos. (Diagnóstico, revelar solo al final: hipertiroidismo, enfermedad de Graves.)",
    "Hombre de 55 años fumador con claudicación intermitente, pie frío y pulsos distales ausentes. (Diagnóstico, revelar solo al final: enfermedad arterial periférica.)",
    "Hombre de 80 años con confusión aguda fluctuante y disuria. (Diagnóstico, revelar solo al final: delirium secundario a infección urinaria.)",
    "Mujer de 26 años con dolor periumbilical que migró a la fosa ilíaca derecha, con Blumberg y febrícula. (Diagnóstico, revelar solo al final: apendicitis aguda.)",
    "Hombre de 50 años alcohólico con hematemesis abundante y ascitis. (Diagnóstico, revelar solo al final: hemorragia por varices esofágicas.)",
    "Atleta de 19 años con síncope de esfuerzo y soplo sistólico que aumenta con la maniobra de Valsalva. (Diagnóstico, revelar solo al final: miocardiopatía hipertrófica.)",
    "Mujer de 65 años con disnea de esfuerzo, ortopnea y edema de miembros inferiores. (Diagnóstico, revelar solo al final: insuficiencia cardíaca.)",
    "Hombre de 28 años con lumbalgia nocturna y rigidez matinal de más de 1 hora que mejora con el ejercicio. (Diagnóstico, revelar solo al final: espondilitis anquilosante.)",
    "Lactante no vacunado con accesos de tos paroxística seguidos de gallo inspiratorio. (Diagnóstico, revelar solo al final: tos ferina.)",
    "Mujer de 27 años con fatiga, artralgia y rash malar fotosensible. (Diagnóstico, revelar solo al final: lupus eritematoso sistémico.)",
    "Hombre de 67 años con temblor de reposo asimétrico, bradicinesia y rigidez en rueda dentada. (Diagnóstico, revelar solo al final: enfermedad de Parkinson.)",
    "Hombre de 45 años con dolor epigástrico, melena y uso crónico de antiinflamatorios. (Diagnóstico, revelar solo al final: úlcera péptica sangrante.)",
    "Hombre de 40 años usuario de drogas inyectables con fiebre, soplo nuevo y lesiones de Janeway. (Diagnóstico, revelar solo al final: endocarditis infecciosa.)",
    "Mujer de 70 años con cefalea temporal, claudicación mandibular y VSG muy elevada. (Diagnóstico, revelar solo al final: arteritis de células gigantes, temporal.)",
  ],
};

// ─── Metáfora visual da capa por caso (alinhada por ÍNDICE) ────────────────────
// Subjects em inglês (Flux responde melhor). Atmosféricas e metafóricas: sugerem
// o sistema/cena, mas NÃO entregam o diagnóstico (é "Qual o diagnóstico?").
const SUBJECTS: string[] = [
  "a sculptural anatomical heart model on a dark surface beside a single jagged ECG tracing",
  "a glass anatomical model of the lungs with one bronchial branch abruptly clouded and blocked",
  "a cracked classical marble bust of a head with a sudden lightning fissure across the skull",
  "an antique anatomical chart of the abdomen on aged paper with a stark red mark over the stomach",
  "a still life of a water glass, a draining hourglass and faint sugar crystals with a sweet vapor",
  "a dim still life of an anatomical torso model turning amber with a shadowed pancreas highlighted",
  "a child's empty bed with a thermometer and a single small red origami crane, tender",
  "an antique pocket watch spinning fast beside a butterfly-shaped thyroid silhouette, restless",
  "a cold dim corridor with a single boot beside a narrowing pipe losing its flow",
  "an elderly portrait painting dissolving into drifting fog and scattered clock hands",
  "an antique abdominal anatomy chart with a single glowing red point at the lower right",
  "a cracked dark wine vessel overflowing beside a shadowed anatomical liver model",
  "an empty stadium track at dusk with a single fallen medal and a thick-walled heart model",
  "an anatomical heart model half submerged in slowly rising dark water, heavy",
  "an anatomical spine model gradually fusing into a rigid bamboo stalk in dawn light",
  "a small empty crib with trembling lines in the air and a single fragile feather",
  "a porcelain mask with a butterfly-shaped crack across the cheeks under soft sunlight",
  "a still life of bronze sculpted hands caught mid-tremor, motion frozen into stillness",
  "an anatomical stomach model with a single smoldering ember glowing inside and a dark drop",
  "an anatomical heart-valve model with delicate growths and tiny embers drifting nearby",
  "a classical marble head in profile with one temple artery glowing inflamed red",
];

// ─── Etiqueta de especialidade por caso (capa: rótulo + watermark) ─────────────
// Alinhada por índice. Usada como "kw" (rótulo vermelho + watermark de 3 letras).
const CASE_SYS: string[] = [
  "CARDIOLOGIA", "PNEUMOLOGIA", "NEUROLOGIA", "CIRURGIA", "ENDOCRINOLOGIA",
  "ONCOLOGIA", "PEDIATRIA", "ENDOCRINOLOGIA", "VASCULAR", "GERIATRIA",
  "CIRURGIA", "GASTRO", "CARDIOLOGIA", "CARDIOLOGIA", "REUMATOLOGIA",
  "INFECTOLOGIA", "REUMATOLOGIA", "NEUROLOGIA", "GASTRO", "INFECTOLOGIA",
  "REUMATOLOGIA",
];

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

function getTopicForSlot(slot: Slot, date: Date, lang: Lang): string {
  const start      = new Date(date.getFullYear(), 0, 0);
  const dayOfYear  = Math.floor((date.getTime() - start.getTime()) / 86400000);
  const weekNum    = Math.floor(dayOfYear / 7);
  const dayOfWeek  = date.getDay();
  const slotIdx    = slot === "manha" ? 0 : slot === "tarde" ? 1 : 2;

  // embaralhamento determinístico por semana
  const arr  = [...TOPICS_BY_LANG[lang]];
  let seed   = weekNum * 6364136223846793005 + 1442695040888963407;
  for (let i = arr.length - 1; i > 0; i--) {
    seed     = Math.imul(seed, 1664525) + 1013904223;
    const j  = Math.abs(seed) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const idx = (dayOfWeek * 3 + slotIdx) % arr.length;
  return arr[idx];
}

// ─── Instruções por slot ──────────────────────────────────────────────────────

const SLOT_INSTRUCTIONS_BY_LANG: Record<Lang, Record<Slot, string>> = {
  pt: {
    manha: `Ângulo MANHÃ — motivacional e prático. O médico ou estudante está começando
o plantão ou o dia de estudos. Entregue um insight clínico rápido e aplicável
HOJE. Tom direto, confiante e encorajador. O gancho deve dar energia ("comece
o plantão sabendo isto").`,

    tarde: `Ângulo TARDE — pílula prática e objetiva. O leitor tem 30 segundos entre
atendimentos. Entregue UMA regra de ouro, um passo a passo enxuto ou um erro
comum a evitar. Tom de "salva-vidas de bolso", escaneável e direto ao ponto.`,

    noite: `Ângulo NOITE — reflexivo e profundo. O leitor está terminando o dia.
Convide-o a pensar sobre raciocínio clínico e o impacto de uma boa anamnese na
vida do paciente. Tom calmo e instigante, que gera comentários e identificação.`,
  },
  es: {
    manha: `Ángulo MAÑANA — motivacional y práctico. El médico o estudiante empieza
la guardia o el día de estudio. Entrega un dato clínico rápido y aplicable HOY.
Tono directo, seguro y alentador. El gancho debe dar energía ("empieza la
guardia sabiendo esto").`,

    tarde: `Ángulo TARDE — píldora práctica y concreta. El lector tiene 30 segundos
entre pacientes. Entrega UNA regla de oro, un paso a paso conciso o un error
común a evitar. Tono de "salvavidas de bolsillo", escaneable y al grano.`,

    noite: `Ángulo NOCHE — reflexivo y profundo. El lector termina su día. Invítalo a
pensar sobre el razonamiento clínico y el impacto de una buena anamnesis en la
vida del paciente. Tono calmado y provocador, que genera comentarios.`,
  },
};

// ─── Pesquisa de contexto médico ─────────────────────────────────────────────

async function searchTopic(topic: string): Promise<SearchResult[]> {
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
    const data = await res.json();
    return (data.results ?? []).map((r: any) => ({
      title: r.title ?? "", content: r.content ?? "", url: r.url ?? "",
    }));
  } catch {
    return [];
  }
}

// ─── Prompt do Claude (PT/ES) ─────────────────────────────────────────────────

function buildPrompt(lang: Lang, topic: string, context: string, slot: Slot, handle: string): string {
  const slotInstr = SLOT_INSTRUCTIONS_BY_LANG[lang][slot];

  if (lang === "es") {
    return `Eres el editor clínico de AnamnesísMed — plataforma de anamnesis para médicos y estudiantes de habla hispana. Crea un CARRUSEL de Instagram en formato "¿CUÁL ES EL DIAGNÓSTICO?": un caso clínico interactivo que atrapa la atención, hace PENSAR al lector y comentar su sospecha, y solo revela el diagnóstico al final. Contenido serio y correcto.

Caso (con el diagnóstico entre paréntesis — NO lo reveles antes del final): "${topic}"
${slotInstr}

${context ? `Contexto investigado:\n${context}\n` : ""}
REGLAS DEL FORMATO (sigue TODAS):
- NO reveles el diagnóstico en la portada ni en las diapositivas 1 a 4 — solo en el campo "cta" y en el pie de foto. Construye suspenso.
- Portada: presenta el caso de forma intrigante y termina con "¿Cuál es el diagnóstico?".
- Las diapositivas entregan el caso por etapas (historia → examen → pista decisiva) e invitan a la sospecha.
- Clínica correcta y específica (datos, signos y hallazgos reales del caso). Lenguaje de quien está en la práctica, frases cortas.
- COMENTARIO FÁCIL: pide la sospecha del lector antes de la revelación.

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

Para los hashtags, MEZCLA alcance amplio + nicho: #medicina #medicinainterna #estudiantedemedicina #futuromedico #residentesmedicos #casoclinico #cualeseldiagnostico #semiologia #urgencias #MIR #ENARM #diagnostico #medtwitter #anamnesismed`;
  }

  return `Você é o editor clínico do AnamnesísMed — plataforma de anamnese para médicos e estudantes no Brasil. Crie um CARROSSEL de Instagram no formato "QUAL O DIAGNÓSTICO?": um caso clínico interativo que prende a atenção, faz o leitor PENSAR e COMENTAR o palpite, e só revela o diagnóstico no fim. Conteúdo sério e correto.

Caso (com o diagnóstico entre parênteses — NÃO revele antes do fim): "${topic}"
${slotInstr}

${context ? `Contexto pesquisado:\n${context}\n` : ""}
REGRAS DO FORMATO (siga TODAS):
- NÃO revele o diagnóstico na capa nem nos slides 1 a 4 — só no campo "cta" e na legenda. Construa suspense.
- Capa: apresente o caso de forma intrigante e termine com "Qual o diagnóstico?".
- Os slides entregam o caso em etapas (história → exame → pista decisiva) e convidam ao palpite.
- Clínica correta e específica (dados, sinais e achados reais do caso). Linguagem de quem está na prática, frases curtas.
- COMENTÁRIO FÁCIL: peça o palpite do leitor antes da revelação.

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

Para as hashtags, MISTURE alcance amplo + nicho: #medicina #medicinabrasileira #estudantedemedicina #futuromedico #ligaacademica #residenciamedica #casoclinico #qualodiagnostico #semiologia #clinicamedica #diagnostico #medstudent #anamnesismed`;
}

// ─── Geração de conteúdo via Claude ──────────────────────────────────────────

async function generateContent(
  topic: string,
  searchResults: SearchResult[],
  slot: Slot,
  lang: Lang,
  handle: string,
): Promise<GeneratedContent> {
  const context = searchResults
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.content}`)
    .join("\n\n");

  const prompt = buildPrompt(lang, topic, context, slot, handle);

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
  const data  = await res.json();
  const raw   = data.content?.[0]?.text ?? "";
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean) as GeneratedContent;
}

// ─── Token do Instagram ───────────────────────────────────────────────────────

async function getAccessToken(): Promise<string> {
  try {
    const { sql } = await import("@vercel/postgres");
    const rows = await sql`SELECT value FROM config WHERE key = 'meta_access_token'`;
    if (rows.rows[0]?.value) return rows.rows[0].value;
  } catch { /* fallback para env var */ }
  return process.env.META_ACCESS_TOKEN!;
}

// ─── Publicação como carrossel ────────────────────────────────────────────────

async function publishCarousel(caption: string, imageUrls: string[]): Promise<string> {
  const accountId = process.env.META_INSTAGRAM_ACCOUNT_ID!;
  const token     = await getAccessToken();
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
  instagramPostId: string | null; publishedAt: Date;
}): Promise<void> {
  const { sql } = await import("@vercel/postgres");
  await sql`
    INSERT INTO posts (
      topic, slot, title, body, instagram_caption,
      tags, instagram_post_id, published_at
    ) VALUES (
      ${params.topic}, ${params.slot}, ${params.title},
      ${params.body}, ${params.instagramCaption},
      ${params.tags as any},
      ${params.instagramPostId},
      ${params.publishedAt.toISOString()}
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

  const log: Record<string, unknown> = { slot, lang };

  try {
    const now   = new Date();
    const topic = topicOverride ?? getTopicForSlot(slot, now, lang);
    log.topic   = topic;

    // Verificar se tópico já foi publicado hoje
    try {
      const { sql } = await import("@vercel/postgres");
      const existing = await sql`
        SELECT id FROM posts
        WHERE topic = ${topic}
          AND published_at > NOW() - INTERVAL '20 hours'
        LIMIT 1
      `;
      if (existing.rows.length > 0) {
        return NextResponse.json({ ok: true, skipped: true, reason: "Tópico já publicado hoje", topic });
      }
    } catch { /* ignora erro de banco na checagem */ }

    // Pesquisa e geração de conteúdo
    const searchResults = await searchTopic(topic);
    const content       = await generateContent(topic, searchResults, slot, lang, handle);
    log.title           = content.postTitle;

    // Número de edição sequencial
    let editionNum = 1;
    try {
      const { sql } = await import("@vercel/postgres");
      const cnt      = await sql`SELECT COUNT(*) as n FROM posts`;
      editionNum     = (parseInt(cnt.rows[0]?.n ?? "0") || 0) + 1;
    } catch { /* fallback silencioso */ }

    const ed   = String(editionNum).padStart(3, "0");
    // Índice canônico do caso (mesma posição em TOPICS_BY_LANG e CASE_SYS).
    const topicIdx = TOPICS_BY_LANG[lang].indexOf(topic);
    const subject  = topicIdx >= 0 ? (SUBJECTS[topicIdx] ?? "") : "";
    // Etiqueta de especialidade na capa (rótulo); fallback p/ keyword.
    const kw   = topicIdx >= 0 ? (CASE_SYS[topicIdx] ?? extractKeyword(topic, lang))
                               : extractKeyword(topic, lang);
    const base = process.env.PRODUCTION_URL ?? "https://anamnesismed-ig.vercel.app";
    const enc  = (s: string) => encodeURIComponent(s.slice(0, 120));
    const hq   = `&handle=${enc(handle)}`; // handle da conta no rodapé das imagens
    const followLabel = lang === "es" ? `Sigue ${handle}` : `Siga ${handle}`;
    const ctaBadges   = lang === "es" ? "Guardar,Compartir,Etiqueta a un colega"
                                      : "Salvar,Compartilhar,Marque um colega";
    const ctaBio      = lang === "es" ? "Link en bio" : "Link na bio";
    const ctaExtra    = `&follow=${enc(followLabel)}&badges=${enc(ctaBadges)}&bio=${enc(ctaBio)}`;

    // Ilustração (fal/Flux) só na CAPA. Falha/nsfw → og usa fundo teal (nunca quebra).
    const ill = await generateIllustration(subject);
    log.illustration = ill.url ? "ia" : `fallback: ${ill.error ?? "?"}`;
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
        slideUrls,
      });
    }

    // Pré-renderiza a CAPA (única com ilustração de IA) para o Blob: o Instagram
    // passa a buscar uma imagem estática e pronta, em vez de compor on-the-fly
    // (download da IA + Satori) — o que, em cold start, estourava o timeout do
    // fetch do IG e travava a publicação. Falha → mantém a capa on-the-fly.
    if (imgParam) {
      const coverBlob = await prerenderToBlob(slideUrls[0], `og/cover-${slot}-${ed}.png`);
      if (coverBlob) {
        slideUrls[0]  = coverBlob;
        log.coverBlob = coverBlob;
      } else {
        log.coverBlob = "falhou — mantendo capa on-the-fly";
      }
    }

    // Publicar no Instagram
    let instagramPostId: string | null = null;
    try {
      instagramPostId = await publishCarousel(content.instagramCaption, slideUrls);
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
