// ─── Gera b-roll de vídeo (fal/Veo) e injeta em bgVideo no reel-props.json ─────
// Uso (no CI): node scripts/generate-broll.mjs ../reel-props.json
// - Lê a especialidade (kw) do props p/ escolher uma cena atmosférica segura.
// - Gera o vídeo via fila da fal (queue), faz polling e grava bgVideo no JSON.
// - Em QUALQUER falha: loga no stderr e sai 0 SEM bgVideo (a composição cai no
//   fundo teal sólido — nunca quebra o Reel).
// Observação: logs vão p/ stderr; stdout fica reservado p/ a URL (compatibilidade).

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const log = (...a) => console.error("[broll]", ...a);

const KEY = process.env.FAL_KEY;
const MODEL = process.env.FAL_VIDEO_MODEL || "fal-ai/veo3.1/fast";
const propsPath = resolve(process.cwd(), process.argv[2] || "../reel-props.json");

// Cena atmosférica por especialidade (segura: sem anatomia que a IA possa errar).
const SCENES = {
  CARDIOLOGIA: "extreme close-up of a hospital heart-rate monitor with a pulsing ECG line in a dark room",
  NEUROLOGIA: "soft-focus brain scan images glowing on a dark medical light-box, slow pan",
  PNEUMOLOGIA: "a chest x-ray glowing on a dark viewer while soft light shifts, slow push-in",
  GASTRO: "abstract macro of amber fluid and glass laboratory vials in a dim lab, slow motion",
  ENDOCRINOLOGIA: "macro of glass vials and a slow drop forming in a calm dim laboratory",
  ONCOLOGIA: "a dim microscope and slides on a lab bench with soft volumetric light, slow dolly",
  INFECTOLOGIA: "a microscope under soft light in a dark lab with faint particles drifting",
  REUMATOLOGIA: "soft-focus x-ray films on a dark light-box, gentle camera drift",
  PEDIATRIA: "a calm, softly lit empty hospital ward at dawn, gentle slow dolly, no people",
  CIRURGIA: "out-of-focus surgical lights and instruments on a sterile tray, cool tones, slow motion",
  VASCULAR: "abstract flowing red light through dark channels, suggesting circulation, slow motion",
  GERIATRIA: "a quiet softly lit hospital corridor at dusk with warm window light, slow dolly",
};

function buildPrompt(kw) {
  const scene = SCENES[(kw || "").toUpperCase()] ||
    "an abstract close-up of a hospital vital-signs monitor glowing softly in a dark room";
  return `Cinematic vertical 9:16 b-roll, slow motion: ${scene}. Soft teal and deep navy tones with a subtle warm accent, shallow depth of field, calm professional medical documentary realism. No text, no on-screen letters, no logos, no watermark, no people's faces.`;
}

async function main() {
  let props;
  try {
    props = JSON.parse(readFileSync(propsPath, "utf8"));
  } catch (e) {
    log("não consegui ler props:", e.message, "— seguindo sem b-roll");
    return;
  }
  if (!KEY) { log("FAL_KEY ausente — seguindo sem b-roll (fundo teal)"); return; }

  const auth = { Authorization: `Key ${KEY}` };
  const prompt = buildPrompt(props.kw);
  log("modelo:", MODEL, "| kw:", props.kw);

  try {
    const sub = await fetch(`https://queue.fal.run/${MODEL}`, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, aspect_ratio: "9:16", resolution: "1080p", generate_audio: false }),
    });
    const subj = await sub.json();
    if (!subj.status_url) { log("sem status_url:", JSON.stringify(subj).slice(0, 200)); return; }

    let done = false;
    for (let i = 0; i < 50 && !done; i++) {
      await new Promise((r) => setTimeout(r, 6000));
      const sj = await (await fetch(subj.status_url, { headers: auth })).json();
      log(`status[${i}]:`, sj.status);
      if (sj.status === "COMPLETED") done = true;
      else if (sj.status === "FAILED" || sj.status === "ERROR") { log("falhou:", JSON.stringify(sj).slice(0, 200)); return; }
    }
    if (!done) { log("timeout no polling — seguindo sem b-roll"); return; }

    const rj = await (await fetch(subj.response_url, { headers: auth })).json();
    const url = rj?.video?.url || rj?.video_url;
    if (!url) { log("resposta sem url de vídeo:", JSON.stringify(rj).slice(0, 200)); return; }

    props.bgVideo = url;
    writeFileSync(propsPath, JSON.stringify(props));
    log("b-roll OK → bgVideo gravado");
    process.stdout.write(url); // também imprime a URL p/ quem capturar stdout
  } catch (e) {
    log("exceção:", e?.message || String(e), "— seguindo sem b-roll");
  }
}

main();
