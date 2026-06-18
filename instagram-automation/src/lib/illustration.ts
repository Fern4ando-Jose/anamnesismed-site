// ─── Geração de ilustração por IA (fal.ai / Flux) ────────────────────────────
// Gera UMA ilustração figurativa por post (usada na capa). Estilo editorial
// clínico de marca + subject por caso (ver SUBJECTS em /api/publish). Em qualquer
// falha retorna null → o /api/og cai no fundo escuro atual (nunca quebra o post).
//
// QA antes de publicar: cada imagem passa por um controle de qualidade por
// VISÃO (Claude) que reprova defeitos anatômicos/estruturais (mão/dedo/membro
// extra, rosto distorcido, anatomia impossível). Se reprovar, regera; se esgotar
// as tentativas, devolve null e o /api/og usa o fundo escuro — assim uma imagem
// com 3 mãos nunca é publicada.

import { type Automation, falCost, anthropicCost, logSpend } from "@/lib/spend";

// Paleta de marca (espelha og/route.tsx). Acento clínico = vermelho + teal.
const ACCENT_WORD = "deep clinical red and muted teal";
const ACCENT_HEX  = "#c0392b and #1a5c5c";

function buildPrompt(subject: string): string {
  return [
    `Conceptual editorial illustration for a premium clinical magazine cover: ${subject}.`,
    `Clearly an ILLUSTRATION — painterly and graphic, NOT a photograph. No bare skin, no nudity, no exposed human bodies or torsos; convey medicine through anatomical models, vintage anatomical charts, instruments, objects and symbolic forms.`,
    `Dramatic chiaroscuro lighting, sculptural and atmospheric, fine grain and subtle paper texture.`,
    `Sober, precise and scholarly, like a serious medical journal cover.`,
    `Restricted, desaturated palette: warm off-white paper tone (#f5f1e8) and deep ink black (#0a0c10), with a single muted accent of ${ACCENT_WORD} (${ACCENT_HEX}).`,
    `One bold central medical metaphor, generous negative space.`,
    // Blindagem anatômica — reduz mão/dedo/membro extra (defeito nº 1 da difusão).
    `Anatomically correct in structure: any depicted hand has exactly five fingers, any model or figure has natural, correctly formed proportions. No extra, missing or fused fingers, hands or limbs; no duplicated or distorted body parts; no malformed faces.`,
    `No text, no letters, no words, no logo, no watermark. No neon, no purple gradient, no gore, no graphic wounds, no corporate clip-art, no busy clutter.`,
  ].join(" ");
}

export interface IllustrationResult {
  url: string | null;
  error?: string;
  model?: string;
  attempts?: number;   // quantas gerações foram necessárias até aprovar (ou desistir)
  qaReason?: string;   // motivo do último veredito do QA (útil no preview)
  cached?: boolean;    // true quando a URL veio do cache de 24h (gasto fal = 0)
}

// Opções de geração — controlam o gasto na fal por caminho de chamada.
export interface GenerateOpts {
  maxTries?: number;        // tentativas no loop de QA (publish=3; preview=1)
  useCache?: boolean;       // reusar a ilustração aprovada do dia (default: true)
  automation?: Automation;  // a quem atribuir o gasto no spend_log (default: "ig-posts")
}

const MAX_TRIES = 3;        // gera no máx. 3 vezes tentando passar no QA
const QA_MODEL = "claude-sonnet-4-6"; // visão confiável p/ contar mãos/dedos

// ─── Cache de 24h da ilustração do dia ───────────────────────────────────────
// Reusa a MESMA imagem aprovada para um (model, subject) por 24h entre os
// caminhos (publish/preview) e entre as contas PT/ES (mesmo caso = mesmo subject
// por índice) — em vez de pagar uma nova geração na fal a cada chamada.
// Best-effort: qualquer falha de banco é fail-open. Só URLs APROVADAS no QA entram.

export function cacheKey(model: string, subject: string): string {
  return `${model}|${subject}`;
}

// Seed determinístico por (subject, dia UTC). PT e ES, no mesmo dia e mesmo caso,
// derivam o MESMO seed → a fal devolve a MESMA imagem: a arte é compartilhada
// entre as contas (só a copy muda por idioma). O dia entra p/ haver variação
// diária. O nº da tentativa é somado FORA daqui (retry de QA gera arte nova).
export function seedForDay(subject: string, day?: string): number {
  const d = day ?? new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  const s = `${subject}|${d}`;
  let h = 2166136261; // FNV-1a 32-bit
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 2_000_000_000; // inteiro não-negativo em faixa segura p/ a fal
}

export function falRequestBody(prompt: string, seed: number) {
  return {
    prompt,
    image_size: { width: 1024, height: 1280 }, // 4:5 — og faz cover-fit p/ 1080×1350
    num_images: 1,
    // Desligado: o checker da fal interpreta metáforas anatômicas como sensíveis
    // e devolve imagem PRETA. O prompt já proíbe gore/feridas; o QA por visão
    // (checkAnatomy) faz o controle de qualidade real.
    enable_safety_checker: false,
    seed, // determinístico por (subject+dia): PT e ES geram a MESMA imagem
  };
}

async function readCachedIllustration(model: string, subject: string): Promise<string | null> {
  try {
    const { sql } = await import("@vercel/postgres");
    const key = cacheKey(model, subject);
    const rows = await sql<{ url: string }>`
      SELECT url FROM illustration_cache
      WHERE cache_key = ${key} AND created_at > NOW() - INTERVAL '24 hours'
      LIMIT 1
    `;
    const url = rows.rows[0]?.url;
    if (!url) return null;
    // URLs da fal podem expirar — confirma que ainda responde antes de reusar.
    try {
      const check = await fetch(url, { method: "GET" });
      if (!check.ok) return null;
    } catch { return null; }
    return url;
  } catch {
    return null; // sem cache → segue para a geração normal
  }
}

async function writeCachedIllustration(model: string, subject: string, url: string): Promise<void> {
  try {
    const { sql } = await import("@vercel/postgres");
    const key = cacheKey(model, subject);
    await sql`
      INSERT INTO illustration_cache (cache_key, url, subject, model, created_at)
      VALUES (${key}, ${url}, ${subject}, ${model}, NOW())
      ON CONFLICT (cache_key) DO UPDATE SET url = ${url}, model = ${model}, created_at = NOW()
    `;
  } catch { /* cache é best-effort — nunca quebra o pipeline */ }
}

// ─── Re-hospedagem no Vercel Blob ────────────────────────────────────────────
// As URLs da fal são CDN de terceiros, lentas/frias de forma intermitente e com
// validade limitada. Re-hospedamos a imagem APROVADA no Blob (infra Vercel,
// rápida e permanente) e cacheamos a URL do Blob. Best-effort: se falhar, segue
// com a URL original da fal.
async function rehostToBlob(srcUrl: string): Promise<string | null> {
  try {
    const raw = process.env.BLOB_READ_WRITE_TOKEN || "";
    const m = raw.match(/vercel_blob_rw_[A-Za-z0-9_-]+/);
    const token = m ? m[0] : raw.trim();
    if (!token) return null;

    const res = await fetch(srcUrl);
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "image/jpeg";
    const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : "jpg";
    const buf = Buffer.from(await res.arrayBuffer());

    const { put } = await import("@vercel/blob");
    const blob = await put(`illustrations/cover.${ext}`, buf, {
      access: "public",
      contentType: ct,
      token,
      addRandomSuffix: true, // nome único por imagem
    });
    return blob.url;
  } catch {
    return null; // re-host é best-effort — nunca quebra o pipeline
  }
}

// Gera UMA imagem no fal e confirma que a URL responde. Sem QA aqui.
// Loga o gasto na fal assim que a imagem é gerada (a fal cobra na geração).
async function generateOnce(
  model: string,
  key: string,
  prompt: string,
  automation: Automation,
  seed: number,
): Promise<{ url: string | null; error?: string }> {
  try {
    const res = await fetch(`https://fal.run/${model}`, {
      method: "POST",
      headers: { Authorization: `Key ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(falRequestBody(prompt, seed)),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { url: null, error: `fal HTTP ${res.status}: ${body.slice(0, 220)}` };
    }
    const data = await res.json();
    // Imagem gerada → fal cobrou. Loga independentemente do QA aprovar depois.
    await logSpend({ automation, platform: "fal", operation: "illustration", model, units: 1, costUsd: falCost(model) });
    // Se o classificador da fal sinaliza o conteúdo, ela devolve imagem PRETA.
    if (Array.isArray(data?.has_nsfw_concepts) && data.has_nsfw_concepts[0] === true) {
      return { url: null, error: "conteúdo sinalizado (nsfw) — fallback p/ capa escura" };
    }
    const url: string | undefined = data?.images?.[0]?.url;
    if (!url) return { url: null, error: `fal sem images[0].url: ${JSON.stringify(data).slice(0, 220)}` };
    let check: Response | null = null;
    try { check = await fetch(url, { method: "GET" }); } catch (e) {
      return { url: null, error: `url gerada não responde (fetch falhou: ${e instanceof Error ? e.message : String(e)})` };
    }
    if (!check.ok) return { url: null, error: `url gerada não responde (HTTP ${check.status})` };
    return { url };
  } catch (e) {
    return { url: null, error: `exceção fal: ${e instanceof Error ? e.message : String(e)}` };
  }
}

const QA_PROMPT =
  "Você é um inspetor de controle de qualidade ESTRITO de ilustrações editoriais clínicas geradas por IA. " +
  "Examine a imagem SOMENTE em busca de defeitos anatômicos ou estruturais que envergonhariam uma revista médica: " +
  "mãos ou dedos a mais ou a menos (cada mão deve ter exatamente cinco dedos), " +
  "braços/pernas/membros a mais, a menos ou fundidos, partes do corpo duplicadas ou deformadas, " +
  "rostos malformados (olhos a mais, traços derretidos), modelos anatômicos impossíveis, ou qualquer anatomia impossível. " +
  "IGNORE o estilo, o clima, a iluminação, o enquadramento, o recorte e a escolha do tema: julgue SÓ a correção física. " +
  'Responda ÚNICAMENTE com um objeto JSON: {"ok": true|false, "reason": "motivo breve"}. ' +
  "ok deve ser false se houver QUALQUER defeito desse tipo visível.";

// Controle de qualidade por visão. Em erro de infra (API caída etc.) é
// fail-open: aceita a imagem para não travar o pipeline.
async function checkAnatomy(imageUrl: string, automation: Automation): Promise<{ ok: boolean; reason: string }> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { ok: true, reason: "QA pulado (sem ANTHROPIC_API_KEY)" };
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: QA_MODEL,
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "url", url: imageUrl } },
              { type: "text", text: QA_PROMPT },
            ],
          },
        ],
      }),
    });
    if (!res.ok) return { ok: true, reason: `QA indisponível (HTTP ${res.status}) — aceitando` };
    const data = await res.json();
    // Loga o gasto real do QA (tokens efetivos da resposta).
    await logSpend({ automation, platform: "anthropic", operation: "qa-anatomy", model: QA_MODEL, units: (data?.usage?.input_tokens ?? 0) + (data?.usage?.output_tokens ?? 0), costUsd: anthropicCost(QA_MODEL, data?.usage) });
    const raw: string = data?.content?.[0]?.text ?? "";
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return { ok: true, reason: `QA sem JSON ("${raw.slice(0, 80)}") — aceitando` };
    const verdict = JSON.parse(match[0]) as { ok?: boolean; reason?: string };
    return { ok: verdict.ok !== false, reason: verdict.reason ?? "" };
  } catch (e) {
    return { ok: true, reason: `QA exceção (${e instanceof Error ? e.message : String(e)}) — aceitando` };
  }
}

// Gera a ilustração com QA. Retorna { url } aprovada, ou { url:null, error } se
// nenhuma das tentativas passou no controle de qualidade (→ og usa o fundo escuro).
export async function generateIllustration(subject: string, opts: GenerateOpts = {}): Promise<IllustrationResult> {
  // Lê no momento da chamada (igual CRON_SECRET) — evita leitura na hora errada do build.
  const FAL_KEY   = process.env.FAL_KEY;
  const FAL_MODEL = process.env.FAL_MODEL || "fal-ai/flux/dev";
  if (!FAL_KEY)  return { url: null, error: "FAL_KEY ausente no runtime" };
  if (!subject)  return { url: null, error: "subject vazio" };

  const maxTries = Math.max(1, opts.maxTries ?? MAX_TRIES);
  const useCache = opts.useCache ?? true;
  const automation: Automation = opts.automation ?? "ig-posts";

  // Reuso da ilustração do dia: gasto fal = 0 quando há hit válido.
  if (useCache) {
    const hit = await readCachedIllustration(FAL_MODEL, subject);
    if (hit) return { url: hit, model: FAL_MODEL, attempts: 0, qaReason: "cache 24h", cached: true };
  }

  const prompt = buildPrompt(subject);
  const baseSeed = seedForDay(subject); // mesmo p/ PT e ES no mesmo dia

  let lastErr = "";
  let lastQa = "";
  for (let attempt = 1; attempt <= maxTries; attempt++) {
    // base+(attempt-1): retry de QA muda a arte, mas PT e ES batem na mesma tentativa.
    const gen = await generateOnce(FAL_MODEL, FAL_KEY, prompt, automation, baseSeed + attempt - 1);
    if (!gen.url) { lastErr = gen.error ?? "erro de geração"; continue; }
    const qa = await checkAnatomy(gen.url, automation);
    if (qa.ok) {
      // Re-hospeda a imagem aprovada no Blob (URL rápida/permanente). Se falhar,
      // segue com a URL original da fal — degrada ao comportamento anterior.
      const finalUrl = (await rehostToBlob(gen.url)) ?? gen.url;
      // Só imagens aprovadas entram no cache → reuso sempre devolve imagem boa.
      if (useCache) await writeCachedIllustration(FAL_MODEL, subject, finalUrl);
      return { url: finalUrl, model: FAL_MODEL, attempts: attempt, qaReason: qa.reason, cached: false };
    }
    lastQa = qa.reason;
    lastErr = `QA reprovou na tentativa ${attempt}: ${qa.reason}`;
    // segue o loop → regera uma composição nova
  }
  return {
    url: null,
    error: `${maxTries} tentativa(s) sem imagem aprovada. Último: ${lastErr}`,
    model: FAL_MODEL,
    attempts: maxTries,
    qaReason: lastQa,
  };
}
