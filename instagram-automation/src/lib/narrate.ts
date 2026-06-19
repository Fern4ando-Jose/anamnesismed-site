// ─── Narração por IA (voz) via fal.ai → ElevenLabs multilingual-v2 ─────────────
// Usa a MESMA FAL_KEY do servidor que já gera os covers (Flux). Pede timestamps:true
// → a API devolve o tempo de CADA palavra, que usamos p/ LEGENDA SINCRONIZADA e p/
// cortar o footage no tempo da fala (o "sincronizado" do reel). Falha/sem chave →
// devolve null e o reel cai no modo sem narração (nunca quebra).

export interface NarrationWord { text: string; start: number; end: number }
export interface Narration {
  audioUrl: string;
  words: NarrationWord[];
  durationSec: number;
  voice: string;
  rawSample?: string; // amostra do formato de timestamps cru (debug)
}

// Vozes ElevenLabs (premade) — boas em PT-BR e ES neutro no multilingual-v2.
export const REEL_VOICE: Record<"pt" | "es", string> = { pt: "Sarah", es: "Sarah" };

// Normaliza os timestamps do fal/ElevenLabs para PALAVRAS {text,start,end} (s).
// Formato real (multilingual-v2): ARRAY de blocos, cada um com `characters[]` +
// `character_start_times_seconds[]` + `character_end_times_seconds[]` (arrays
// paralelos por caractere). Agrupamos os caracteres em palavras (separadas por
// espaço). Também aceita formato por palavra [{text|word,start,end}] como fallback.
function normalizeWords(ts: unknown): NarrationWord[] {
  if (!ts) return [];
  const blocks = Array.isArray(ts) ? ts : [ts];

  // Fallback: array já no nível de palavra.
  const a0 = blocks[0] as Record<string, unknown> | undefined;
  if (a0 && (a0.word !== undefined || a0.text !== undefined) && a0.start !== undefined && a0.characters === undefined) {
    return (blocks as Array<Record<string, unknown>>)
      .map((w) => ({ text: String(w.word ?? w.text ?? "").trim(), start: Number(w.start ?? 0), end: Number(w.end ?? w.start ?? 0) }))
      .filter((w) => w.text);
  }

  // Formato por caractere (ElevenLabs): junta caracteres em palavras.
  const words: NarrationWord[] = [];
  let cur = "", start = 0, end = 0, open = false;
  for (const b of blocks as Array<Record<string, unknown>>) {
    const chars = b?.characters as unknown[];
    const st = (b?.character_start_times_seconds ?? b?.characterStartTimesSeconds) as number[] | undefined;
    const en = (b?.character_end_times_seconds ?? b?.characterEndTimesSeconds) as number[] | undefined;
    if (!Array.isArray(chars)) continue;
    for (let i = 0; i < chars.length; i++) {
      const ch = String(chars[i] ?? "");
      const cs = Array.isArray(st) ? Number(st[i] ?? 0) : 0;
      const ce = Array.isArray(en) ? Number(en[i] ?? cs) : cs;
      if (/\s/.test(ch)) {
        if (open && cur) { words.push({ text: cur, start, end }); cur = ""; open = false; }
      } else {
        if (!open) { start = cs; open = true; }
        cur += ch; end = ce;
      }
    }
  }
  if (open && cur) words.push({ text: cur, start, end });
  return words;
}

export async function narrate(text: string, lang: "pt" | "es", voiceOverride?: string): Promise<Narration | null> {
  const KEY = process.env.FAL_KEY;
  if (!KEY || !text.trim()) return null;
  const voice = voiceOverride ?? REEL_VOICE[lang];
  try {
    const r = await fetch("https://fal.run/fal-ai/elevenlabs/tts/multilingual-v2", {
      method: "POST",
      headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        text, voice, language_code: lang, timestamps: true,
        stability: 0.4, similarity_boost: 0.8, style: 0.15, speed: 1.05,
      }),
    });
    if (!r.ok) { console.error("[narrate] fal", r.status, (await r.text()).slice(0, 200)); return null; }
    const d = await r.json();
    const audioUrl = d?.audio?.url;
    if (!audioUrl) return null;
    const words = normalizeWords(d?.timestamps);
    const durationSec = words.length ? words[words.length - 1].end : 0;
    const rawSample = JSON.stringify(d?.timestamps)?.slice(0, 280);
    return { audioUrl, words, durationSec, voice, rawSample };
  } catch (e) {
    console.error("[narrate] exceção", e instanceof Error ? e.message : String(e));
    return null;
  }
}
