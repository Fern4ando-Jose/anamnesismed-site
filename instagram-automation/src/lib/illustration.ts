// ─── Geração de ilustração por IA (fal.ai / Flux) ────────────────────────────
// Gera UMA ilustração figurativa por post (usada na capa). Estilo editorial
// clínico de marca + subject por tema (ver SUBJECTS em /api/publish). Em qualquer
// falha retorna null → o /api/og cai no fundo escuro atual (nunca quebra o post).

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
    `No text, no letters, no words, no logo, no watermark. No neon, no purple gradient, no gore, no graphic wounds, no corporate clip-art, no busy clutter.`,
  ].join(" ");
}

export interface IllustrationResult { url: string | null; error?: string; model?: string }

export async function generateIllustration(subject: string): Promise<IllustrationResult> {
  // Lê no momento da chamada (igual CRON_SECRET) — evita leitura na hora errada do build.
  const FAL_KEY   = process.env.FAL_KEY;
  const FAL_MODEL = process.env.FAL_MODEL || "fal-ai/flux/dev";
  if (!FAL_KEY)  return { url: null, error: "FAL_KEY ausente no runtime" };
  if (!subject)  return { url: null, error: "subject vazio" };

  const prompt = buildPrompt(subject);
  try {
    const res = await fetch(`https://fal.run/${FAL_MODEL}`, {
      method: "POST",
      headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        image_size: { width: 1024, height: 1280 }, // 4:5 — og faz cover-fit p/ 1080×1350
        num_images: 1,
        // Desligado: o checker da fal interpreta metáforas anatômicas como sensíveis
        // e devolve imagem PRETA. O prompt já proíbe gore/feridas/conteúdo gráfico.
        enable_safety_checker: false,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { url: null, error: `fal HTTP ${res.status}: ${body.slice(0, 220)}`, model: FAL_MODEL };
    }
    const data = await res.json();
    // Se o classificador da fal sinaliza o conteúdo, ela devolve imagem PRETA com URL
    // válida. Tratamos como falha → o /api/og usa a capa escura tipográfica (nunca preta).
    if (Array.isArray(data?.has_nsfw_concepts) && data.has_nsfw_concepts[0] === true) {
      return { url: null, error: "conteúdo sinalizado (nsfw) — fallback p/ capa escura", model: FAL_MODEL };
    }
    const url: string | undefined = data?.images?.[0]?.url;
    if (!url) return { url: null, error: `fal sem images[0].url: ${JSON.stringify(data).slice(0, 220)}`, model: FAL_MODEL };

    // Confirma que a URL responde antes de mandar pro Instagram.
    let check: Response | null = null;
    try { check = await fetch(url, { method: "GET" }); }
    catch (e) { return { url: null, error: `url não responde: ${e instanceof Error ? e.message : String(e)}`, model: FAL_MODEL }; }
    if (!check.ok) return { url: null, error: `url não responde (HTTP ${check.status})`, model: FAL_MODEL };

    return { url, model: FAL_MODEL };
  } catch (e) {
    return { url: null, error: `exceção: ${e instanceof Error ? e.message : String(e)}`, model: FAL_MODEL };
  }
}
