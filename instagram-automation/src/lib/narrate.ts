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
}

// Vozes ElevenLabs (premade) — boas em PT-BR e ES neutro no multilingual-v2.
export const REEL_VOICE: Record<"pt" | "es", string> = { pt: "Sarah", es: "Sarah" };

// Normaliza os timestamps do fal/ElevenLabs (que podem vir por palavra ou por
// caractere) para uma lista de PALAVRAS {text,start,end} em segundos.
function normalizeWords(ts: unknown): NarrationWord[] {
  if (!ts) return [];
  // Formato por palavra: [{ text|word, start, end }]
  if (Array.isArray(ts)) {
    const arr = ts as Array<Record<string, unknown>>;
    if (arr.length && (arr[0].word !== undefined || arr[0].text !== undefined) && arr[0].start !== undefined) {
      return arr.map((w) => ({
        text: String(w.word ?? w.text ?? "").trim(),
        start: Number(w.start ?? 0),
        end: Number(w.end ?? w.start ?? 0),
      })).filter((w) => w.text);
    }
  }
  // Formato por caractere: { characters:[{text,start,end}] } → agrupa em palavras
  const chars = (ts as { characters?: Array<{ text?: string; start?: number; end?: number }> })?.characters;
  if (Array.isArray(chars)) {
    const words: NarrationWord[] = [];
    let cur = "", start = 0, end = 0, open = false;
    for (const c of chars) {
      const ch = String(c.text ?? "");
      if (/\s/.test(ch)) {
        if (open && cur) { words.push({ text: cur, start, end }); cur = ""; open = false; }
      } else {
        if (!open) { start = Number(c.start ?? 0); open = true; }
        cur += ch; end = Number(c.end ?? c.start ?? 0);
      }
    }
    if (open && cur) words.push({ text: cur, start, end });
    return words;
  }
  return [];
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
    return { audioUrl, words, durationSec, voice };
  } catch (e) {
    console.error("[narrate] exceção", e instanceof Error ? e.message : String(e));
    return null;
  }
}
