import { NextRequest, NextResponse } from "next/server";

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
}

type Slot = "manha" | "tarde" | "noite";
type Lang = "pt" | "es";

// ─── Tópicos — rotação semanal ────────────────────────────────────────────────
// Foco: anamnese, semiologia, raciocínio clínico, ferramentas do AnamnesísMed
// Multilíngue: a conta @anamnesismed publica em PT; @anamnesismed.es em ES
// (definido por POST_LANG no deploy, ou ?lang=es para teste).

const TOPICS_BY_LANG: Record<Lang, string[]> = {
  pt: [
    "Mnemônico SOCRATES para avaliação da dor",
    "Dispneia: abordagem sistemática e diagnóstico diferencial",
    "Score HEART para dor torácica na emergência",
    "Anamnese da febre: quando investigar mais",
    "Perda de peso involuntária: bandeiras vermelhas",
    "Cefaleia em trovão: emergência neurológica",
    "CURB-65 e decisão de internação na pneumonia",
    "Síncope: avaliação clínica e estratificação de risco",
    "FINDRISC e rastreio de diabetes tipo 2",
    "Anamnese psicossocial — o que os livros não ensinam",
    "Semiologia do abdome: da queixa ao diagnóstico",
    "Edema de membros inferiores: causas e investigação",
    "Palpitações: abordagem na consulta",
    "Anamnese geriátrica e síndrome da fragilidade",
    "Mnemônico OPQRST para urgências clínicas",
    "Icterícia: diagnóstico diferencial e semiologia",
    "Dor lombar: bandeiras vermelhas e amarelas",
    "Anamnese cardiorrespiratória completa",
    "Score Well's para TVP e embolia pulmonar",
    "Hemograma alterado: correlação clínica",
    "HAS: anamnese e avaliação de risco cardiovascular",
  ],
  es: [
    "Mnemotecnia SOCRATES para evaluar el dolor",
    "Disnea: abordaje sistemático y diagnóstico diferencial",
    "Score HEART para dolor torácico en urgencias",
    "Anamnesis de la fiebre: cuándo investigar más",
    "Pérdida de peso involuntaria: señales de alarma",
    "Cefalea en trueno: emergencia neurológica",
    "CURB-65 y decisión de ingreso en la neumonía",
    "Síncope: evaluación clínica y estratificación del riesgo",
    "FINDRISC y cribado de diabetes tipo 2",
    "Anamnesis psicosocial: lo que los libros no enseñan",
    "Semiología del abdomen: del síntoma al diagnóstico",
    "Edema de miembros inferiores: causas e investigación",
    "Palpitaciones: abordaje en la consulta",
    "Anamnesis geriátrica y síndrome de fragilidad",
    "Mnemotecnia OPQRST para urgencias clínicas",
    "Ictericia: diagnóstico diferencial y semiología",
    "Lumbalgia: señales de alarma rojas y amarillas",
    "Anamnesis cardiorrespiratoria completa",
    "Score de Wells para TVP y embolia pulmonar",
    "Hemograma alterado: correlación clínica",
    "HTA: anamnesis y evaluación del riesgo cardiovascular",
  ],
};

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
    return `Eres el estratega de contenido de AnamnesísMed — plataforma de anamnesis clínica para médicos y estudiantes de medicina de habla hispana. Tu misión: crear un CARRUSEL de Instagram que MAXIMICE el engagement (guardados, compartidos y comentarios) para ganar seguidores — siempre dentro de temas médicos serios y correctos.

Tema: "${topic}"
${slotInstr}

${context ? `Contexto investigado:\n${context}\n` : ""}
PRINCIPIOS DE ENGAGEMENT (sigue TODOS):
- GANCHO QUE FRENA EL SCROLL: el título de la portada debe generar curiosidad o tensión en < 2 segundos. Usa stakes ("el error que cuesta el diagnóstico"), curiosidad ("lo que nadie te enseñó sobre…"), número ("3 signos que…") o contraste ("no es la prueba — es la pregunta"). NADA genérico.
- VALOR PARA GUARDAR: cada diapositiva entrega 1 dato concreto y aplicable (mnemotecnia, señal de alarma, score, paso) que el lector querrá GUARDAR para la guardia.
- COMENTARIO FÁCIL: la pregunta final debe ser específica y fácil de responder (experiencia personal, "¿cuál es tu conducta?", de acuerdo/en desacuerdo).
- ESCANEABLE: frases cortas, sin relleno, lenguaje de quien está en la práctica.

Genera un JSON válido (sin markdown, sin backticks) con esta estructura EXACTA:
{
  "postTitle": "GANCHO de portada que frena el scroll, máx 55 caracteres, español, sin punto final",
  "postBody": "artículo en markdown, mínimo 300 palabras, español, con aplicación clínica práctica (va al sitio, no al pie de foto)",
  "slides": [
    "insight 1 — el dato más valioso/sorprendente del tema, MÁX 85 caracteres",
    "insight 2 — profundiza con mnemotecnia, score o dato memorable, máx 85 caracteres",
    "insight 3 — un error común a evitar O un detalle que cambia la conducta, máx 85 caracteres",
    "insight 4 — cierra con la consecuencia práctica / qué hacer ahora, máx 85 caracteres"
  ],
  "accentWords": [
    "1 palabra clave de la diapositiva 1 (aparecerá en rojo)",
    "1 palabra clave de la diapositiva 2",
    "1 palabra clave de la diapositiva 3",
    "1 palabra clave de la diapositiva 4"
  ],
  "cta": "pregunta corta y específica que genere comentarios de médicos/estudiantes, 50-90 caracteres",
  "instagramCaption": "pie de foto 700-1600 caracteres en español, EN ESTE orden: (1) gancho en la 1a línea repitiendo la tensión de la portada; (2) 3-4 párrafos cortos entregando el valor clínico del tema; (3) CTA de crecimiento: 'Guarda para tu próxima guardia', 'Etiqueta a un colega' y 'Sigue ${handle} para dominar la anamnesis'; (4) la pregunta de engagement; (5) '→ Anamnesis completa en el link de la bio'; (6) en una última línea, 6-9 hashtags. Usa emojis con moderación (1-3).",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}

Para los hashtags, MEZCLA alcance amplio + nicho comprometido (elige los relevantes al tema): #medicina #medicinainterna #estudiantedemedicina #futuromedico #residentesmedicos #semiologia #anamnesis #urgencias #MIR #ENARM #saludpublica #diagnostico #medtwitter #anamnesismed`;
  }

  return `Você é o estrategista de conteúdo do AnamnesísMed — plataforma de anamnese clínica para médicos e estudantes de medicina no Brasil. Sua missão: criar um CARROSSEL de Instagram que MAXIMIZE engajamento (saves, compartilhamentos e comentários) para crescer seguidores — sempre dentro de temas médicos sérios e corretos.

Tema: "${topic}"
${slotInstr}

${context ? `Contexto pesquisado:\n${context}\n` : ""}
PRINCÍPIOS DE ENGAJAMENTO (siga TODOS):
- GANCHO QUE PARA O SCROLL: o título da capa precisa gerar curiosidade ou tensão em < 2 segundos. Use stakes ("o erro que custa o diagnóstico"), curiosidade ("o que ninguém te ensinou sobre…"), número ("3 sinais que…") ou contraste ("não é o exame — é a pergunta"). NADA genérico.
- VALOR SALVÁVEL: cada slide entrega 1 informação concreta e aplicável (mnemônico, red flag, score, passo) que o leitor vai querer SALVAR para usar no plantão.
- COMENTÁRIO FÁCIL: a pergunta final deve ser específica e fácil de responder (experiência pessoal, "qual sua conduta?", concordo/discordo).
- ESCANEÁVEL: frases curtas, zero enrolação, linguagem de quem está na prática.

Gere um JSON válido (sem markdown, sem backticks) com esta estrutura EXATA:
{
  "postTitle": "GANCHO da capa que para o scroll, máx 55 chars, português, sem ponto final",
  "postBody": "artigo em markdown, mínimo 300 palavras, português, com aplicação clínica prática (vai para o site, não para a legenda)",
  "slides": [
    "insight 1 — a informação mais valiosa/surpreendente do tema, MÁX 85 chars",
    "insight 2 — aprofunda com mnemônico, score ou dado memorável, máx 85 chars",
    "insight 3 — um erro comum a evitar OU um detalhe que muda a conduta, máx 85 chars",
    "insight 4 — fecha com a consequência prática / o que fazer agora, máx 85 chars"
  ],
  "accentWords": [
    "1 palavra-chave do slide 1 (aparecerá em vermelho)",
    "1 palavra-chave do slide 2",
    "1 palavra-chave do slide 3",
    "1 palavra-chave do slide 4"
  ],
  "cta": "pergunta curta e específica que gere comentários de médicos/estudantes, 50-90 chars",
  "instagramCaption": "legenda 700-1600 chars em português, NESTA ordem: (1) gancho na 1a linha repetindo a tensão da capa; (2) 3-4 parágrafos curtos entregando o valor clínico do tema; (3) CTA de crescimento: 'Salve para o próximo plantão', 'Marque um colega' e 'Siga ${handle} para dominar a anamnese'; (4) a pergunta de engajamento; (5) '→ Anamnese completa no link da bio'; (6) em uma última linha, 6-9 hashtags. Use emojis com parcimônia (1-3).",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}

Para as hashtags, MISTURE alcance amplo + nicho engajado (escolha as relevantes ao tema): #medicina #medicinabrasileira #estudantedemedicina #futuromedico #ligaacademica #residenciamedica #semiologia #anamnese #clinicamedica #plantao #condutamedica #diagnostico #medstudent #anamnesismed`;
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
    const kw   = extractKeyword(topic, lang);
    const base = process.env.PRODUCTION_URL ?? "https://anamnesismed-ig.vercel.app";
    const enc  = (s: string) => encodeURIComponent(s.slice(0, 120));
    const hq   = `&handle=${enc(handle)}`; // handle da conta no rodapé das imagens
    const followLabel = lang === "es" ? `Sigue ${handle}` : `Siga ${handle}`;
    const ctaBadges   = lang === "es" ? "Guardar,Compartir,Etiqueta a un colega"
                                      : "Salvar,Compartilhar,Marque um colega";
    const ctaBio      = lang === "es" ? "Link en bio" : "Link na bio";
    const ctaExtra    = `&follow=${enc(followLabel)}&badges=${enc(ctaBadges)}&bio=${enc(ctaBio)}`;

    const totalSlides = 2 + content.slides.length; // capa + insights + cta

    // Construir URLs de cada slide (geradas pelo /api/og)
    const slideUrls: string[] = [
      // Slide 1 — capa
      `${base}/api/og?slide=cover&slot=${slot}&title=${enc(content.postTitle)}&kw=${enc(kw)}&ed=${ed}${hq}`,
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
        slideUrls,
      });
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
