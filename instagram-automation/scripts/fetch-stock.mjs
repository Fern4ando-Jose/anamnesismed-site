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

// Retorna o melhor clipe portrait p/ uma query (que ainda não esteja em `used`).
async function firstClip(query, used) {
  const vids = await searchPexels(query);
  for (const v of vids) {
    if (used.has(v.id)) continue;
    const link = pickFile(v);
    if (link) { used.add(v.id); return link; }
  }
  return null;
}

async function main() {
  let props;
  try { props = JSON.parse(readFileSync(propsPath, "utf8")); }
  catch (e) { log("não consegui ler props:", e.message); return; }
  if (!KEY) { log("PEXELS_API_KEY ausente — seguindo sem footage (fundo teal)"); return; }

  const need = (Array.isArray(props.slides) ? props.slides.length : 3) + 2; // capa + slides + cta
  const used = new Set();
  const clips = [];

  try {
    // PREFERIDO: 1 clipe por CENA, na ordem das videoKeywords (footage casa com o texto).
    const ordered = Array.isArray(props.videoKeywords) && props.videoKeywords.length
      ? props.videoKeywords.slice(0, need)
      : null;

    if (ordered) {
      for (const q of ordered) {
        let link = await firstClip(q, used);
        if (!link) link = await firstClip("hospital medical closeup", used); // fallback p/ a cena
        clips.push(link); // pode ser null → a cena usa fundo teal
        log(`cena "${q}" → ${link ? "ok" : "sem clipe"}`);
      }
    } else {
      // FALLBACK: termos por especialidade + genéricos (sem alinhamento por cena).
      const terms = [...(TERMS[(props.kw || "").toUpperCase()] || []), ...GENERIC];
      for (const q of terms) {
        if (clips.length >= need) break;
        const link = await firstClip(q, used);
        if (link) clips.push(link);
      }
    }
  } catch (e) { log("exceção na busca:", e?.message || String(e)); }

  const real = clips.filter(Boolean).length;
  if (!real) { log("nenhum clipe encontrado — seguindo sem footage"); return; }
  props.clips = clips;
  writeFileSync(propsPath, JSON.stringify(props));
  log(`footage OK → ${real}/${clips.length} cenas com clipe`);
}

main();
