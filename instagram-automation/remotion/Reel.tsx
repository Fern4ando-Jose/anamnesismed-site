// ─── Composição do Reel AnamnesísMed (NÍVEL 3 — footage editado) ───────────────
// Vídeo vertical 1080x1920 (9:16), 30fps. Sequência de CENAS: cada beat do caso é
// um CLIPE de footage real diferente (corte entre clipes), com legenda curta de
// apoio + identidade da marca (teal/coral, DM Sans). Sem clipes → fundo teal sólido.
//   beat 0   = capa (gancho + "Qual o diagnóstico?")
//   beats 1..N = slides (história, exame, pista, palpite)
//   beat N+1 = revelação + "Siga @anamnesismed"

import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

const { fontFamily: DMSANS } = loadDMSans();

const TEAL_DK = "#0B7C88";
const TEAL    = "#0FA3B1";
const CORAL   = "#FF5C49";
const WHITE   = "#ffffff";
const SOFT    = "rgba(255,255,255,0.82)";

const BG_SOLID: React.CSSProperties = {
  background: `radial-gradient(circle at 80% 12%, ${TEAL} 0%, ${TEAL_DK} 60%)`,
};
const SHADOW = "0 4px 30px rgba(0,0,0,0.55)";

export type ReelProps = {
  title: string;
  slides: string[];
  accentWords: string[];
  cta: string;
  kw: string;
  ed: string;
  clips?: string[];    // 1 clipe de footage por beat (cover + slides + cta). Vazio = teal.
  narration?: string;  // arquivo em public/ (Kokoro TTS); ausente = reel mudo
  beatSecs?: number[];  // duração (s) de cada beat = sua narração (cover, slides..., cta)
  music?: string;      // bed de fundo opcional em public/ (volume baixo)
};

// Frames de cada beat: dirigido pela narração (beatSecs) p/ ficar em sync; sem
// narração, cai nas durações fixas. Ordem: [cover, slide1..N, cta].
export function beatFrames(slidesCount: number, fps: number, beatSecs?: number[]): number[] {
  const n = Math.max(1, slidesCount);
  if (beatSecs && beatSecs.length === n + 2) {
    return beatSecs.map((s) => Math.max(1, Math.round(s * fps)));
  }
  return [Math.round(fps * 3.0), ...Array(n).fill(Math.round(fps * 3.0)), Math.round(fps * 3.4)];
}

export const reelDefaultProps: ReelProps = {
  title: "Atleta de 19 anos com desmaio durante treino. Qual o diagnóstico?",
  slides: [
    "Síncope durante o esforço — nunca ignore.",
    "Sopro que aumenta com a manobra de Valsalva.",
    "História familiar de morte súbita precoce.",
  ],
  accentWords: ["esforço", "Valsalva", "súbita"],
  cta: "Diagnóstico: Cardiomiopatia Hipertrófica",
  kw: "CARDIOLOGIA",
  ed: "001",
  clips: [],
};

function Highlighted({ text, accent }: { text: string; accent: string }) {
  if (!accent) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(accent.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: CORAL }}>{text.slice(idx, idx + accent.length)}</span>
      {text.slice(idx + accent.length)}
    </>
  );
}

function Handle() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: CORAL }} />
      <div style={{ fontFamily: DMSANS, fontSize: 36, fontWeight: 700, letterSpacing: 1, color: WHITE, textShadow: SHADOW }}>
        @anamnesismed
      </div>
    </div>
  );
}

function Kicker({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <div style={{ width: 64, height: 8, borderRadius: 4, backgroundColor: CORAL }} />
      <div style={{ fontFamily: DMSANS, fontSize: 36, fontWeight: 700, letterSpacing: 8, color: CORAL, textShadow: SHADOW }}>
        {label.toUpperCase()}
      </div>
    </div>
  );
}

// Fundo do beat: clipe de footage (corte seco) + scrim de marca; ou teal sólido.
// Sem fade no fundo p/ o primeiro frame (thumbnail) nunca ficar em branco.
function BeatBg({ clip }: { clip?: string }) {
  return (
    <AbsoluteFill>
      {clip ? (
        <OffthreadVideo src={clip} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <AbsoluteFill style={BG_SOLID} />
      )}
      <AbsoluteFill style={{
        background: "linear-gradient(180deg, rgba(8,40,46,0.55) 0%, rgba(8,40,46,0.32) 45%, rgba(8,40,46,0.86) 100%)",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 14, backgroundColor: CORAL }} />
    </AbsoluteFill>
  );
}

// ─── Beats ────────────────────────────────────────────────────────────────────
function CoverBeat({ title, kw, ed, clip }: { title: string; kw: string; ed: string; clip?: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 28 });
  const y = interpolate(e, [0, 1], [50, 0]);
  return (
    <AbsoluteFill>
      <BeatBg clip={clip} />
      <div style={{ position: "absolute", top: 110, left: 90, fontFamily: DMSANS, fontSize: 32, fontWeight: 700, letterSpacing: 6, color: SOFT, textShadow: SHADOW }}>
        ANAMNESÍSMED · Nº {ed}
      </div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", padding: "0 90px" }}>
        {/* Capa visível já no frame 0 (thumbnail) — só um leve deslize, sem fade de opacidade */}
        <div style={{ transform: `translateY(${y}px)`, display: "flex", flexDirection: "column", gap: 40 }}>
          <Kicker label={kw} />
          <div style={{ fontFamily: DMSANS, fontWeight: 800, fontSize: 90, lineHeight: 1.08, color: WHITE, letterSpacing: -2, textShadow: SHADOW }}>
            {title}
          </div>
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", bottom: 96, left: 90 }}><Handle /></div>
    </AbsoluteFill>
  );
}

function SlideBeat({ text, accent, index, total, clip }: { text: string; accent: string; index: number; total: number; clip?: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - 4, fps, config: { damping: 200 }, durationInFrames: 26 });
  const x = interpolate(e, [0, 1], [-50, 0]);
  return (
    <AbsoluteFill>
      <BeatBg clip={clip} />
      <div style={{ position: "absolute", top: 110, left: 90, fontFamily: DMSANS, fontSize: 38, fontWeight: 700, letterSpacing: 2, color: SOFT, textShadow: SHADOW }}>
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "flex-start", padding: "0 90px 220px" }}>
        <div style={{ transform: `translateX(${x}px)`, opacity: e, fontFamily: DMSANS, fontWeight: 800, fontSize: 80, lineHeight: 1.16, color: WHITE, letterSpacing: -1, textShadow: SHADOW }}>
          <Highlighted text={text} accent={accent} />
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", bottom: 96, left: 90 }}><Handle /></div>
    </AbsoluteFill>
  );
}

function CtaBeat({ cta, clip }: { cta: string; clip?: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 28 });
  const scale = interpolate(e, [0, 1], [0.86, 1]);
  return (
    <AbsoluteFill>
      <BeatBg clip={clip} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 90px", textAlign: "center" }}>
        <div style={{ transform: `scale(${scale})`, opacity: e, display: "flex", flexDirection: "column", alignItems: "center", gap: 38 }}>
          <Kicker label="Resposta" />
          <div style={{ fontFamily: DMSANS, fontWeight: 800, fontSize: 76, lineHeight: 1.12, color: WHITE, letterSpacing: -1, maxWidth: 900, textShadow: SHADOW }}>
            {cta}
          </div>
          <div style={{ marginTop: 16, fontFamily: DMSANS, fontWeight: 700, fontSize: 40, color: WHITE, backgroundColor: CORAL, padding: "22px 46px", borderRadius: 14 }}>
            Siga @anamnesismed
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

// ─── Composição: sequência de beats em corte ──────────────────────────────────
export const Reel: React.FC<ReelProps> = ({ title, slides, accentWords, cta, kw, ed, clips, narration, beatSecs, music }) => {
  const { fps } = useVideoConfig();
  const safeSlides = slides && slides.length ? slides : reelDefaultProps.slides;
  const frames = beatFrames(safeSlides.length, fps, beatSecs); // [cover, slides..., cta]
  const COVER = frames[0];
  const CTA = frames[frames.length - 1];
  const pool = clips && clips.length ? clips : [];
  const clipAt = (i: number) => (pool.length ? pool[i % pool.length] : undefined);

  let cursor = 0;
  const next = (dur: number) => { const from = cursor; cursor += dur; return from; };
  let beat = 0; // índice do beat p/ escolher o clipe

  return (
    <AbsoluteFill style={{ backgroundColor: TEAL_DK }}>
      {/* Narração (Kokoro) cobre todo o vídeo a partir do frame 0 */}
      {narration ? <Audio src={staticFile(narration)} /> : null}
      {/* Bed de fundo opcional, volume baixo */}
      {music ? <Audio src={staticFile(music)} volume={0.12} loop /> : null}

      <Sequence from={next(COVER)} durationInFrames={COVER}>
        <CoverBeat title={title} kw={kw} ed={ed} clip={clipAt(beat++)} />
      </Sequence>
      {safeSlides.map((text, i) => (
        <Sequence key={i} from={next(frames[i + 1])} durationInFrames={frames[i + 1]}>
          <SlideBeat text={text} accent={accentWords?.[i] ?? ""} index={i + 1} total={safeSlides.length} clip={clipAt(beat++)} />
        </Sequence>
      ))}
      <Sequence from={next(CTA)} durationInFrames={CTA}>
        <CtaBeat cta={cta} clip={clipAt(beat++)} />
      </Sequence>
    </AbsoluteFill>
  );
};
