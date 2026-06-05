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

type Slot = "manha" | "noite";

// ─── Tópicos — rotação semanal ────────────────────────────────────────────────
// Foco: anamnese, semiologia, raciocínio clínico, ferramentas do AnamnesísMed

const TOPICS = [
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
];

// ─── Keyword curta para os slides ─────────────────────────────────────────────

function extractKeyword(topic: string): string {
  const STOP = new Set([
    "e","o","a","de","do","da","para","na","no","em","com","por",
    "um","uma","se","ao","as","os","das","dos","quando","mais",
  ]);
  const word = topic.split(/\s+/).find(w => !STOP.has(w.toLowerCase()))
    ?? topic.split(" ")[0];
  return word.toUpperCase().replace(/[^A-ZÁÉÍÓÚÜÃÕÂÊÇ]/g, "");
}

function getTopicForSlot(slot: Slot, date: Date): string {
  const start      = new Date(date.getFullYear(), 0, 0);
  const dayOfYear  = Math.floor((date.getTime() - start.getTime()) / 86400000);
  const weekNum    = Math.floor(dayOfYear / 7);
  const dayOfWeek  = date.getDay();
  const slotIdx    = slot === "manha" ? 0 : 1;

  // embaralhamento determinístico por semana
  const arr  = [...TOPICS];
  let seed   = weekNum * 6364136223846793005 + 1442695040888963407;
  for (let i = arr.length - 1; i > 0; i--) {
    seed     = Math.imul(seed, 1664525) + 1013904223;
    const j  = Math.abs(seed) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const idx = (dayOfWeek * 2 + slotIdx) % arr.length;
  return arr[idx];
}

// ─── Instruções por slot ──────────────────────────────────────────────────────

const SLOT_INSTRUCTIONS: Record<Slot, string> = {
  manha: `Ângulo MANHÃ — motivacional e prático. O médico ou estudante está começando
o plantão ou o dia de estudos. Entregue um insight clínico rápido e aplicável
hoje. Tono direto, confiante e encorajador.`,

  noite: `Ângulo NOITE — reflexivo e profundo. O leitor está terminando o dia.
Convide-o a pensar sobre raciocínio clínico, sobre o impacto de uma boa
anamnese na vida do paciente. Tono calmo, instigante, que gera comentários.`,
};

// ─── Pesquisa de contexto médico ─────────────────────────────────────────────

async function searchTopic(topic: string): Promise<SearchResult[]> {
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
  if (!res.ok) throw new Error(`Tavily error: ${res.status}`);
  const data = await res.json();
  return (data.results ?? []).map((r: any) => ({
    title: r.title ?? "", content: r.content ?? "", url: r.url ?? "",
  }));
}

// ─── Geração de conteúdo via Claude ──────────────────────────────────────────

async function generateContent(
  topic: string,
  searchResults: SearchResult[],
  slot: Slot,
): Promise<GeneratedContent> {
  const context = searchResults
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.content}`)
    .join("\n\n");

  const prompt = `Você é o editor do AnamnesísMed — plataforma de anamnese clínica para médicos e estudantes de medicina.

Tema: "${topic}"
${SLOT_INSTRUCTIONS[slot]}

Contexto pesquisado:
${context}

Gere um JSON válido (sem markdown, sem backticks) com esta estrutura EXATA:
{
  "postTitle": "título impactante, máx 55 chars, em português",
  "postBody": "artigo em markdown, mínimo 300 palavras, em português, com aplicação clínica prática",
  "slides": [
    "insight clínico 1 — frase impactante, MÁXIMO 85 chars, sobre o tema",
    "insight clínico 2 — aprofunda ou traz dado/mnemônico relevante, máx 85 chars",
    "insight clínico 3 — remata com consequência prática, máx 85 chars"
  ],
  "accentWords": [
    "palavra-chave do slide 1 que aparecerá destacada em vermelho (1 palavra)",
    "palavra-chave do slide 2",
    "palavra-chave do slide 3"
  ],
  "cta": "pergunta ou chamada à ação, 60-100 chars, que gere comentários médicos",
  "instagramCaption": "legenda IG máx 2200 chars: gancho forte + conteúdo clínico + CTA para link na bio + 5-7 hashtags médicos em português",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}

Hashtags sugeridas (inclua as relevantes): #medicina #medicinabrasileira #estudantedemedicina #semiologia #anamnese #residenciamédica #plantão #clínicamédica #diagnostico #anamnesismed`;

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
  const slot: Slot    = slotParam === "noite" ? "noite" : "manha";

  const log: Record<string, unknown> = { slot };

  try {
    const now   = new Date();
    const topic = topicOverride ?? getTopicForSlot(slot, now);
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
    const content       = await generateContent(topic, searchResults, slot);
    log.title           = content.postTitle;

    // Número de edição sequencial
    let editionNum = 1;
    try {
      const { sql } = await import("@vercel/postgres");
      const cnt      = await sql`SELECT COUNT(*) as n FROM posts`;
      editionNum     = (parseInt(cnt.rows[0]?.n ?? "0") || 0) + 1;
    } catch { /* fallback silencioso */ }

    const ed   = String(editionNum).padStart(3, "0");
    const kw   = extractKeyword(topic);
    const base = process.env.PRODUCTION_URL ?? "https://anamnesismed-ig.vercel.app";
    const enc  = (s: string) => encodeURIComponent(s.slice(0, 120));

    const totalSlides = 2 + content.slides.length; // capa + insights + cta

    // Construir URLs de cada slide (geradas pelo /api/og)
    const slideUrls: string[] = [
      // Slide 1 — capa
      `${base}/api/og?slide=cover&slot=${slot}&title=${enc(content.postTitle)}&kw=${enc(kw)}&ed=${ed}`,
      // Slides de insight
      ...content.slides.map((text, i) =>
        `${base}/api/og?slide=insight&text=${enc(text)}&accent=${enc(content.accentWords[i] ?? "")}&num=${i + 2}&total=${totalSlides}&kw=${enc(kw)}&ed=${ed}`
      ),
      // Slide CTA final
      `${base}/api/og?slide=cta&text=${enc(content.cta)}&num=${totalSlides}&total=${totalSlides}&kw=${enc(kw)}&ed=${ed}`,
    ];

    // Publicar no Instagram
    let instagramPostId: string | null = null;
    try {
      instagramPostId = await publishCarousel(content.instagramCaption, slideUrls);
      log.instagramPostId = instagramPostId;
      log.slides          = slideUrls.length;
    } catch (igErr) {
      log.instagramError = String(igErr);
    }

    // Salvar no banco
    await savePost({
      topic, slot,
      title: content.postTitle,
      body: content.postBody,
      instagramCaption: content.instagramCaption,
      tags: content.tags,
      instagramPostId,
      publishedAt: now,
    });

    log.ok = true;
    return NextResponse.json({ ok: true, post: log });

  } catch (err) {
    console.error("[publish] erro:", err);
    return NextResponse.json({ ok: false, error: String(err), log }, { status: 500 });
  }
}
