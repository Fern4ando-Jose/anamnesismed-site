import { NextRequest, NextResponse } from "next/server";
import { generateIllustration } from "@/lib/illustration";
import { prerenderToBlob } from "@/lib/prerender";
import { parseContentJson } from "@/lib/content-json";
import { type Automation, checkBudget, logSpend, anthropicCost, tavilyCost, EST_RUN_COST } from "@/lib/spend";
import { TOPICS_BY_LANG, SUBJECTS, CASE_SYS } from "@/lib/temas";

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

function buildPrompt(lang: Lang, topic: string, context: string, slot: Slot, handle: string): string {
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
): Promise<GeneratedContent> {
  const context = searchResults
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.content}`)
    .join("\n\n");

  const prompt = buildPrompt(lang, topic, context, slot, handle);

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

  const log: Record<string, unknown> = { slot, lang };

  try {
    const now   = new Date();
    const topic = topicOverride ?? getTopicForSlot(slot, now, lang);
    log.topic   = topic;

    // Trava anti-duplicata: o mesmo CASO não se repete na conta em 7 dias.
    // Janela de 7 dias (era 20h) cobre o ciclo semanal de tópicos e impede que
    // backfill/disparo manual republiquem o caso da semana. A separação por
    // idioma é implícita: as listas TOPICS_BY_LANG.pt e .es têm textos distintos,
    // então uma string PT nunca casa com post da conta ES (e vice-versa).
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
    const content       = await generateContent(topic, searchResults, slot, lang, handle, automation);
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
