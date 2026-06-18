// ─── Busca footage real no Pexels (grátis) e injeta clips[] no reel-props.json ──
// Uso (CI): node scripts/fetch-stock.mjs ../reel-props.json
// - Decisão 2026-06-18: o footage é AMBIENTE clínico genérico, NÃO a cena literal
//   do caso. O acervo grátis do Pexels não tem clipe específico ("endoscopia de
//   úlcera", "amostra de melena" etc.) e devolvia vídeo aleatório sem nada a ver
//   com o texto. Então ignoramos as videoKeywords (cenas literais) e usamos só um
//   pool de termos amplos que o Pexels TEM de verdade (hospital, médico, lab…),
//   com um leve toque por especialidade. O texto do reel carrega o sentido; o
//   vídeo é só pano de fundo profissional.
// - Busca vídeos VERTICAIS (portrait) na API do Pexels e escolhe N clipes
//   distintos (1 por beat: capa + slides + cta).
// - Em qualquer falha / sem chave: loga no stderr e sai 0 SEM clips (a composição
//   cai no fundo teal sólido — nunca quebra o Reel).
// Logs no stderr; stdout reservado.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const log = (...a) => console.error("[stock]", ...a);
const KEY = process.env.PEXELS_API_KEY;
const propsPath = resolve(process.cwd(), process.argv[2] || "../reel-props.json");

// Especialidade → 2 termos de "toque" temático (inglês indexa melhor no Pexels).
// Mantidos AMPLOS de propósito: precisam existir no acervo grátis como footage
// real, não como cena clínica específica. As chaves batem com tema.esp.
const TERMS = {
  CARDIOLOGIA: ["heart rate monitor", "ecg hospital"],
  NEUROLOGIA: ["mri scan", "brain scan"],
  PNEUMOLOGIA: ["chest x ray", "oxygen mask hospital"],
  GASTRO: ["medical laboratory", "ultrasound exam"],
  ENDOCRINOLOGIA: ["laboratory blood test", "glucose test"],
  NEFROLOGIA: ["dialysis machine", "laboratory blood test"],
  INFECTOLOGIA: ["microscope laboratory", "iv drip hospital"],
  ONCOLOGIA: ["microscope laboratory", "cancer research"],
  REUMATOLOGIA: ["x ray bones", "physical therapy"],
  ORTOPEDIA: ["x ray bones", "physical therapy"],
  RADIOLOGIA: ["ct scan", "mri scan"],
  TOXICOLOGIA: ["emergency room", "iv drip hospital"],
  EMERGENCIA: ["emergency room", "ambulance hospital"],
  "EMERGÊNCIA": ["emergency room", "ambulance hospital"],
  CLINICA: ["doctor consultation", "hospital ward"],
  "CLÍNICA": ["doctor consultation", "hospital ward"],
  PEDIATRIA: ["pediatric hospital", "child care hospital"],
  CIRURGIA: ["operating room", "surgeon hospital"],
  VASCULAR: ["blood flow", "vein ultrasound"],
  GERIATRIA: ["elderly care", "senior patient hospital"],
};
// Pool base de b-roll clínico genérico — termos que o Pexels SEMPRE tem como
// footage real (não animação 3D abstrata nem resultado aleatório).
const GENERIC = [
  "hospital corridor",
  "doctor with stethoscope",
  "medical team hospital",
  "nurse hospital",
  "doctor writing notes",
  "laboratory research",
  "patient hospital bed",
  "medical equipment closeup",
];

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

  // B-roll clínico genérico: leve toque por especialidade + pool seguro. NÃO usa
  // as videoKeywords (cenas literais), que o acervo grátis não entrega.
  const esp = String(props.specialty || props.esp || "").toUpperCase().trim();
  const terms = [...(TERMS[esp] || []), ...GENERIC];

  try {
    // 1 clipe distinto por beat, varrendo o pool. Cada termo retorna footage real
    // de hospital/médico/lab — ambiente profissional, nunca "errado" pro texto.
    for (const q of terms) {
      if (clips.filter(Boolean).length >= need) break;
      const link = await firstClip(q, used);
      if (link) { clips.push(link); log(`b-roll "${q}" → ok`); }
      else log(`b-roll "${q}" → sem clipe`);
    }
    // Se o pool não encheu os beats (raro), completa com termos bem genéricos.
    for (const q of ["hospital", "doctor", "healthcare", "medical research", "stethoscope"]) {
      if (clips.filter(Boolean).length >= need) break;
      const link = await firstClip(q, used);
      if (link) { clips.push(link); log(`b-roll extra "${q}" → ok`); }
    }
  } catch (e) { log("exceção na busca:", e?.message || String(e)); }

  const real = clips.filter(Boolean).length;
  if (!real) { log("nenhum clipe encontrado — seguindo sem footage"); return; }
  props.clips = clips;
  writeFileSync(propsPath, JSON.stringify(props));
  log(`footage OK → ${real}/${clips.length} cenas com clipe`);
}

main();
