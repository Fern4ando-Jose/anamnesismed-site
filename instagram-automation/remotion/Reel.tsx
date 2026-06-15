// ─── Composição do Reel AnamnesísMed ──────────────────────────────────────────
// Vídeo vertical 1080x1920 (9:16), 30fps, sem áudio. Visual alinhado à MARCA:
// fundo teal sólido (#0B7C88), tipografia DM Sans branca, acentos coral (#FF5C49).
//   1. Capa  → kicker (especialidade) + gancho `title` + "Qual o diagnóstico?"
//   2. Slides → número coral grande + frase, palavra de destaque em coral
//   3. CTA   → "Siga @anamnesismed" + pergunta/CTA

import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

const { fontFamily: DMSANS } = loadDMSans();

// ─── Cores da marca (espelham og/route.tsx e o site) ─────────────────────────
const TEAL_DK = "#0B7C88"; // fundo sólido
const TEAL    = "#0FA3B1";
const CORAL   = "#FF5C49";
const WHITE   = "#ffffff";
const SOFT    = "rgba(255,255,255,0.78)";
const FAINT   = "rgba(255,255,255,0.14)";

// Fundo de marca com leve profundidade (radial teal claro -> teal escuro).
const BG: React.CSSProperties = {
  background: `radial-gradient(circle at 80% 12%, ${TEAL} 0%, ${TEAL_DK} 60%)`,
};

// ─── Props de entrada (inputProps) ────────────────────────────────────────────
// type (não interface) p/ satisfazer o constraint Props extends Record<string,unknown>.
export type ReelProps = {
  title: string;        // gancho da capa
  slides: string[];     // frases dos slides internos
  accentWords: string[];// palavra de destaque (coral) por slide
  cta: string;          // revelação/pergunta na cena final
  kw: string;           // especialidade (kicker)
  ed: string;           // edição (ex.: "012")
};

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
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Realça a palavra `accent` dentro de `text` pintando-a de coral.
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

// Wordmark / handle do rodapé.
function Handle() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: CORAL }} />
      <div style={{ fontFamily: DMSANS, fontSize: 36, fontWeight: 700, letterSpacing: 1, color: WHITE }}>
        @anamnesismed
      </div>
    </div>
  );
}

// Kicker: traço coral + rótulo em caixa-alta.
function Kicker({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <div style={{ width: 64, height: 8, borderRadius: 4, backgroundColor: CORAL }} />
      <div style={{ fontFamily: DMSANS, fontSize: 36, fontWeight: 700, letterSpacing: 8, color: CORAL }}>
        {label.toUpperCase()}
      </div>
    </div>
  );
}

// ─── Cena 1 — Capa ────────────────────────────────────────────────────────────
function CoverScene({ title, kw, ed }: { title: string; kw: string; ed: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const y = interpolate(entry, [0, 1], [60, 0]);
  const op = interpolate(entry, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={BG}>
      {/* Barra de acento no topo */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 14, backgroundColor: CORAL }} />
      {/* Cabeçalho: edição */}
      <div style={{
        position: "absolute", top: 110, left: 90,
        fontFamily: DMSANS, fontSize: 32, fontWeight: 700, letterSpacing: 6, color: SOFT,
      }}>
        ANAMNESÍSMED · Nº {ed}
      </div>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", padding: "0 90px" }}>
        <div style={{ transform: `translateY(${y}px)`, opacity: op, display: "flex", flexDirection: "column", gap: 44 }}>
          <Kicker label={kw} />
          <div style={{ fontFamily: DMSANS, fontWeight: 800, fontSize: 92, lineHeight: 1.08, color: WHITE, letterSpacing: -2 }}>
            {title}
          </div>
        </div>
      </AbsoluteFill>

      <div style={{ position: "absolute", bottom: 96, left: 90 }}>
        <Handle />
      </div>
    </AbsoluteFill>
  );
}

// ─── Cena de slide ──────────────────────────────────────────────────────────
function SlideScene({ text, accent, index, total }: { text: string; accent: string; index: number; total: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const numEntry = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 25 });
  const numScale = interpolate(numEntry, [0, 1], [0.6, 1]);
  const textEntry = spring({ frame: frame - 6, fps, config: { damping: 200 }, durationInFrames: 28 });
  const textX = interpolate(textEntry, [0, 1], [-60, 0]);
  const textOp = interpolate(textEntry, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={BG}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 14, backgroundColor: CORAL }} />
      {/* Progresso NN / TT */}
      <div style={{
        position: "absolute", top: 110, left: 90,
        fontFamily: DMSANS, fontSize: 38, fontWeight: 700, letterSpacing: 2, color: SOFT,
      }}>
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", padding: "0 90px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {/* Número coral grande */}
          <div style={{
            fontFamily: DMSANS, fontWeight: 800, fontSize: 200, lineHeight: 1, color: CORAL,
            transform: `scale(${numScale})`, transformOrigin: "left center",
          }}>
            {String(index).padStart(2, "0")}
          </div>
          {/* Texto */}
          <div style={{
            transform: `translateX(${textX}px)`, opacity: textOp,
            fontFamily: DMSANS, fontWeight: 800, fontSize: 76, lineHeight: 1.18, color: WHITE, letterSpacing: -1,
          }}>
            <Highlighted text={text} accent={accent} />
          </div>
        </div>
      </AbsoluteFill>

      <div style={{ position: "absolute", bottom: 96, left: 90 }}>
        <Handle />
      </div>
    </AbsoluteFill>
  );
}

// ─── Cena final — Revelação / CTA ─────────────────────────────────────────────
function CtaScene({ cta }: { cta: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entry = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const scale = interpolate(entry, [0, 1], [0.85, 1]);
  const op = interpolate(entry, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={BG}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 14, backgroundColor: CORAL }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 90px", textAlign: "center" }}>
        <div style={{ transform: `scale(${scale})`, opacity: op, display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
          <Kicker label="Resposta" />
          {/* Revelação (cta = "Diagnóstico: X") */}
          <div style={{ fontFamily: DMSANS, fontWeight: 800, fontSize: 76, lineHeight: 1.12, color: WHITE, letterSpacing: -1, maxWidth: 900 }}>
            {cta}
          </div>
          {/* Siga */}
          <div style={{
            marginTop: 20, fontFamily: DMSANS, fontWeight: 700, fontSize: 40, color: WHITE,
            backgroundColor: CORAL, padding: "22px 46px", borderRadius: 14,
          }}>
            Siga @anamnesismed
          </div>
          <div style={{ fontFamily: DMSANS, fontSize: 34, fontWeight: 700, letterSpacing: 1, color: SOFT }}>
            → Anamnese completa no link da bio
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

// ─── Composição completa ──────────────────────────────────────────────────────
export const Reel: React.FC<ReelProps> = ({ title, slides, accentWords, cta, kw, ed }) => {
  const { fps } = useVideoConfig();
  const COVER = Math.round(fps * 2.8);
  const SLIDE = Math.round(fps * 2.6);
  const CTA = Math.round(fps * 3.0);

  const safeSlides = slides && slides.length ? slides : reelDefaultProps.slides;

  let cursor = 0;
  const next = (dur: number) => { const from = cursor; cursor += dur; return from; };

  return (
    <AbsoluteFill style={{ backgroundColor: TEAL_DK }}>
      <Sequence from={next(COVER)} durationInFrames={COVER}>
        <CoverScene title={title} kw={kw} ed={ed} />
      </Sequence>
      {safeSlides.map((text, i) => (
        <Sequence key={i} from={next(SLIDE)} durationInFrames={SLIDE}>
          <SlideScene text={text} accent={accentWords?.[i] ?? ""} index={i + 1} total={safeSlides.length} />
        </Sequence>
      ))}
      <Sequence from={next(CTA)} durationInFrames={CTA}>
        <CtaScene cta={cta} />
      </Sequence>
    </AbsoluteFill>
  );
};
