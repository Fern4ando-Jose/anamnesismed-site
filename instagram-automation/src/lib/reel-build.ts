// ─── Motor do REEL SINCRONIZADO ───────────────────────────────────────────────
// Resolve o problema "a imagem não casa com o texto": em vez de pegar 5 clipes
// genéricos do banco, GERA o visual POR FRASE (casa o conteúdo) e trava tudo no
// tempo da voz (legenda palavra a palavra + corte da cena na fronteira da frase).
// Misto (decisão do dono): beats-chave = IA-VÍDEO (LTX image-to-video, movimento
// real); demais = IA-IMAGEM (Flux) com Ken Burns no render. Falhas degradam p/
// imagem (nunca quebra o reel).
import { narrate } from "@/lib/narrate";
import { type Automation, logSpend } from "@/lib/spend";

export interface ReelBeat { say: string; caption: string; visual: string; key: boolean }
export interface ReelScene { visualUrl: string; visualType: "video" | "image"; start: number; end: number; caption: string }
export interface ReelCaption { text: string; start: number; end: number }
export interface ReelSpec {
  hook: string;
  audioUrl: string;
  durationSec: number;
  voice: string;
  scenes: ReelScene[];
  captions: ReelCaption[]; // palavra a palavra (timestamps da própria voz)
  ctaText: string;
}

type Lang = "pt" | "es";

// ── 1) Conteúdo em BEATS (Claude) ──────────────────────────────────────────────
function reelContentPrompt(lang: Lang, topic: string): string {
  if (lang === "es") {
    return `Eres el guionista clínico de AnamnesísMed (estudiantes de medicina de 4º año+, internos, residentes de LATAM). Escribe el GUION de un REEL vertical de 20-30 s sobre una TÉCNICA/maniobra clínica filmable. Tono "tú", español latino neutro (NUNCA "vosotros" ni portugués). Serio y correcto.

Tema: "${topic}"

El reel se NARRA (voz IA) y cada frase tiene SU PROPIA imagen que ilustra EXACTAMENTE lo que se dice (por eso describe el visual con precisión, en INGLÉS, como una foto clínica realista). Gancho que frena el scroll en 1-2 s. Cierre que pide GUARDAR/etiquetar.

Devuelve SOLO un JSON válido (sin markdown):
{
  "hook": "frase-gancho de portada, <=55 caracteres, español",
  "beats": [
    {"say":"frase hablada natural (8-16 palabras)","caption":"texto en pantalla <=32 chars","visual":"realistic clinical photo prompt in ENGLISH of EXACTLY this beat's action","key":true},
    {"say":"...","caption":"...","visual":"...","key":false},
    {"say":"...","caption":"...","visual":"...","key":false},
    {"say":"...","caption":"...","visual":"...","key":false}
  ],
  "cta":"frase hablada de cierre pidiendo guardar/etiquetar (<=14 palabras)",
  "ctaCaption":"texto en pantalla del cierre <=28 chars",
  "instagramCaption":"pie de foto 500-1000 chars en español: gancho + desarrollo + 'Guarda esto' + 'Sigue @anamnesismed.es' + última línea con 6-9 hashtags",
  "tags":["t1","t2","t3","t4","t5"]
}
Marca exactamente 1 o 2 beats con "key":true (los momentos de acción central, que tendrán video). El resto "key":false.`;
  }
  return `Você é o roteirista clínico do AnamnesísMed (estudantes de medicina do 4º ano+, internos, R1 no Brasil). Escreva o ROTEIRO de um REEL vertical de 20-30 s sobre uma TÉCNICA/manobra clínica filmável. Tom "você", português BR direto. Sério e correto.

Tema: "${topic}"

O reel é NARRADO (voz IA) e cada frase tem A SUA imagem que ilustra EXATAMENTE o que está sendo dito (por isso descreva o visual com precisão, em INGLÊS, como uma foto clínica realista). Gancho que para o scroll em 1-2 s. Fechamento pedindo SALVAR/marcar.

Devolva SÓ um JSON válido (sem markdown):
{
  "hook": "frase-gancho de capa, <=55 chars, português",
  "beats": [
    {"say":"frase falada natural (8-16 palavras)","caption":"texto na tela <=32 chars","visual":"realistic clinical photo prompt in ENGLISH of EXACTLY this beat's action","key":true},
    {"say":"...","caption":"...","visual":"...","key":false},
    {"say":"...","caption":"...","visual":"...","key":false},
    {"say":"...","caption":"...","visual":"...","key":false}
  ],
  "cta":"frase falada de fechamento pedindo salvar/marcar (<=14 palavras)",
  "ctaCaption":"texto na tela do fechamento <=28 chars",
  "instagramCaption":"legenda 500-1000 chars em português: gancho + desenvolvimento + 'Salve isso' + 'Siga @anamnesismed' + última linha com 6-9 hashtags",
  "tags":["t1","t2","t3","t4","t5"]
}
Marque exatamente 1 ou 2 beats com "key":true (os momentos de ação central, que terão vídeo). O resto "key":false.`;
}

interface ReelContent {
  hook: string; beats: ReelBeat[]; cta: string; ctaCaption: string;
  instagramCaption: string; tags: string[];
}

async function generateReelContent(lang: Lang, topic: string, automation: Automation): Promise<ReelContent> {
  const prompt = reelContentPrompt(lang, topic);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY!, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 2048, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Claude reel ${res.status}`);
  const data = await res.json();
  await logSpend({ automation, platform: "anthropic", operation: "reel-content", model: "claude-haiku-4-5-20251001", units: (data?.usage?.input_tokens ?? 0) + (data?.usage?.output_tokens ?? 0), costUsd: 0.01 });
  const raw: string = data.content?.[0]?.text ?? "";
  const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
  const c = JSON.parse(json) as ReelContent;
  c.beats = (c.beats ?? []).slice(0, 5);
  return c;
}

// ── 2) Visual por frase: imagem Flux (9:16) + LTX image-to-video nos beats-chave ─
async function genReelImage(prompt: string, automation: Automation): Promise<string | null> {
  const KEY = process.env.FAL_KEY;
  if (!KEY) return null;
  const model = process.env.FAL_MODEL || "fal-ai/flux/dev";
  const full = `${prompt}. Realistic clinical documentary photography, modern hospital, natural light, shallow depth of field, professional, no text, no watermark.`;
  try {
    const r = await fetch(`https://fal.run/${model}`, {
      method: "POST", headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: full, image_size: { width: 1080, height: 1920 }, num_images: 1, enable_safety_checker: false }),
    });
    if (!r.ok) return null;
    const d = await r.json();
    await logSpend({ automation, platform: "fal", operation: "reel-image", model, units: 1, costUsd: 0.01 });
    return d?.images?.[0]?.url ?? null;
  } catch { return null; }
}

async function imageToVideo(imageUrl: string, prompt: string, automation: Automation): Promise<string | null> {
  const KEY = process.env.FAL_KEY;
  if (!KEY) return null;
  const model = "fal-ai/ltx-video-13b-distilled/image-to-video";
  try {
    const r = await fetch(`https://fal.run/${model}`, {
      method: "POST", headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl, prompt, resolution: "720p", aspect_ratio: "9:16", num_frames: 121, frame_rate: 24 }),
    });
    if (!r.ok) { console.error("[i2v] fal", r.status, (await r.text()).slice(0, 160)); return null; }
    const d = await r.json();
    await logSpend({ automation, platform: "fal", operation: "reel-i2v", model, units: 1, costUsd: 0.05 });
    return d?.video?.url ?? null;
  } catch (e) { console.error("[i2v] exceção", e instanceof Error ? e.message : String(e)); return null; }
}

// ── 3) Timing: divide as palavras da narração entre os beats (por contagem) ──────
function splitScenes(beats: ReelBeat[], ctaText: string, words: { text: string; start: number; end: number }[]): { idx: number; start: number; end: number }[] {
  const segs = [...beats.map((b) => b.say), ctaText];
  const counts = segs.map((s) => Math.max(1, s.trim().split(/\s+/).length));
  const out: { idx: number; start: number; end: number }[] = [];
  let w = 0;
  for (let i = 0; i < counts.length; i++) {
    const startW = w;
    const endW = Math.min(words.length - 1, w + counts[i] - 1);
    const start = words[startW]?.start ?? (out[out.length - 1]?.end ?? 0);
    const end = words[endW]?.end ?? start;
    out.push({ idx: i, start, end });
    w = endW + 1;
  }
  return out;
}

// ── 4) Monta a ReelSpec completa ────────────────────────────────────────────────
export async function buildReelSpec(lang: Lang, topic: string, automation: Automation): Promise<ReelSpec | null> {
  const content = await generateReelContent(lang, topic, automation);
  const narrationFull = [...content.beats.map((b) => b.say), content.cta].join(" ");
  const narration = await narrate(narrationFull, lang);
  if (!narration || !narration.words.length) return null;

  // Visuais por frase, em paralelo. Beats-chave: imagem→vídeo (LTX). Demais: imagem.
  const allBeats: ReelBeat[] = [...content.beats, { say: content.cta, caption: content.ctaCaption, visual: content.beats[0]?.visual ?? topic, key: false }];
  const visuals = await Promise.all(allBeats.map(async (b) => {
    const img = await genReelImage(b.visual, automation);
    if (!img) return { visualUrl: "", visualType: "image" as const };
    if (b.key) {
      const vid = await imageToVideo(img, b.visual, automation);
      if (vid) return { visualUrl: vid, visualType: "video" as const };
    }
    return { visualUrl: img, visualType: "image" as const };
  }));

  const segs = splitScenes(content.beats, content.cta, narration.words);
  const scenes: ReelScene[] = segs.map((s) => ({
    visualUrl: visuals[s.idx]?.visualUrl ?? "",
    visualType: visuals[s.idx]?.visualType ?? "image",
    start: s.start,
    end: s.end,
    caption: allBeats[s.idx]?.caption ?? "",
  }));

  return {
    hook: content.hook,
    audioUrl: narration.audioUrl,
    durationSec: narration.durationSec,
    voice: narration.voice,
    scenes,
    captions: narration.words,
    ctaText: content.ctaCaption,
  };
}
