// Monta os inputProps do ReelSync a partir do plano (preview.json) gerando 1 imagem
// por cena via /api/reel-visual (cada chamada é curta — cabe no timeout). Roda na CI.
// Lê ./preview.json e escreve ./reel-props.json (no cwd = raiz do repo).
import { readFileSync, writeFileSync } from "node:fs";

const CS = process.env.CRON_SECRET;
const BASE = process.env.REEL_BASE || "https://anamnesismed-ig.vercel.app";

const p = JSON.parse(readFileSync("preview.json", "utf8"));
if (!p.reelSync || !p.spec) {
  console.error("ERRO: preview não devolveu reelSync/spec:", JSON.stringify(p).slice(0, 300));
  process.exit(1);
}
const s = p.spec;
const handle = p.handle || "@anamnesismed";

// 1 imagem por cena, SEQUENCIAL (evita estourar a concorrência do fal).
for (const sc of s.scenes) {
  try {
    const r = await fetch(`${BASE}/api/reel-visual?prompt=${encodeURIComponent(sc.visualPrompt)}`, {
      headers: { Authorization: `Bearer ${CS}` },
    });
    if (r.ok) { const d = await r.json(); sc.visualUrl = d.url || ""; sc.visualType = "image"; }
    else console.error(`[visual] "${sc.caption}" → HTTP ${r.status}`);
  } catch (e) { console.error(`[visual] "${sc.caption}" → ${e.message}`); }
  console.error(`[visual] "${sc.caption}" → ${sc.visualUrl ? "ok" : "sem imagem"}`);
}

const props = {
  hook: s.hook,
  handle,
  audioUrl: s.audioUrl,
  durationSec: s.durationSec,
  scenes: s.scenes,
  captions: s.captions,
  music: "music/bed-1.mp3",
  ctaButton: (handle.includes(".es") ? "Sigue " : "Siga ") + handle,
};
writeFileSync("reel-props.json", JSON.stringify(props));
const withImg = s.scenes.filter((x) => x.visualUrl).length;
console.log(`ReelSync props OK → ${s.scenes.length} cenas (${withImg} c/ imagem), ${s.captions.length} palavras, ${s.durationSec.toFixed(1)}s, voz ${s.voice}`);
