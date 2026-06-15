// ─── Busca footage real no Pexels (grátis) e injeta clips[] no reel-props.json ──
// Uso (CI): node scripts/fetch-stock.mjs ../reel-props.json
// - Escolhe termos de busca pela especialidade (kw) + termos médicos genéricos.
// - Busca vídeos VERTICAIS (portrait) na API do Pexels, monta um pool e escolhe
//   N clipes distintos (1 por beat: capa + slides + cta).
// - Em qualquer falha / sem chave: loga no stderr e sai 0 SEM clips (a composição
//   cai no fundo teal sólido — nunca quebra o Reel).
// Logs no stderr; stdout reservado.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const log = (...a) => console.error("[stock]", ...a);
const KEY = process.env.PEXELS_API_KEY;
const propsPath = resolve(process.cwd(), process.argv[2] || "../reel-props.json");

// Especialidade → termos de busca (inglês indexa melhor no Pexels).
const TERMS = {
  CARDIOLOGIA: ["heart rate monitor", "cardiology", "heartbeat"],
  NEUROLOGIA: ["brain scan", "mri scan", "neurology"],
  PNEUMOLOGIA: ["chest x ray", "breathing", "lungs"],
  GASTRO: ["laboratory", "medical lab", "stomach anatomy"],
  ENDOCRINOLOGIA: ["laboratory blood", "insulin", "medical lab"],
  ONCOLOGIA: ["microscope lab", "cancer research", "laboratory"],
  INFECTOLOGIA: ["microscope", "virus research", "laboratory"],
  REUMATOLOGIA: ["x ray bones", "joint pain", "hospital"],
  PEDIATRIA: ["pediatric hospital", "child care hospital", "hospital"],
  CIRURGIA: ["surgery room", "operating room", "surgeon"],
  VASCULAR: ["blood flow", "vein", "circulation"],
  GERIATRIA: ["elderly care", "hospital corridor", "senior patient"],
};
const GENERIC = ["hospital", "doctor", "medical", "stethoscope", "hospital corridor", "healthcare", "medical research"];

async function searchPexels(query) {
  const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=portrait&per_page=8&size=medium`;
  const r = await fetch(url, { headers: { Authorization: KEY } });
  if (!r.ok) { log(`busca "${query}" HTTP ${r.status}`); return []; }
  const j = await r.json();
  return (j.videos || []);
}

// Escolhe o melhor arquivo vertical mp4 de um vídeo do Pexels.
function pickFile(video) {
  const files = (video.video_files || []).filter((f) => f.file_type === "video/mp4" && f.link);
  const portrait = files.filter((f) => f.height && f.width && f.height >= f.width);
  const pool = (portrait.length ? portrait : files)
    .sort((a, b) => (Math.abs((a.height || 0) - 1920) - Math.abs((b.height || 0) - 1920)));
  return pool[0]?.link;
}

async function main() {
  let props;
  try { props = JSON.parse(readFileSync(propsPath, "utf8")); }
  catch (e) { log("não consegui ler props:", e.message); return; }
  if (!KEY) { log("PEXELS_API_KEY ausente — seguindo sem footage (fundo teal)"); return; }

  const need = (Array.isArray(props.slides) ? props.slides.length : 3) + 2; // capa + slides + cta
  const terms = [...(TERMS[(props.kw || "").toUpperCase()] || []), ...GENERIC];

  const seen = new Set();
  const clips = [];
  try {
    for (const q of terms) {
      if (clips.length >= need) break;
      const vids = await searchPexels(q);
      for (const v of vids) {
        if (clips.length >= need) break;
        if (seen.has(v.id)) continue;
        const link = pickFile(v);
        if (link) { seen.add(v.id); clips.push(link); }
      }
    }
  } catch (e) { log("exceção na busca:", e?.message || String(e)); }

  if (!clips.length) { log("nenhum clipe encontrado — seguindo sem footage"); return; }
  props.clips = clips;
  writeFileSync(propsPath, JSON.stringify(props));
  log(`footage OK → ${clips.length} clipes gravados (precisava de ${need})`);
}

main();
