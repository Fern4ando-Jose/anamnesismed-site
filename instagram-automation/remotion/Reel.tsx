// ─── Composição do Reel AnamnesísMed ──────────────────────────────────────────
// Vídeo vertical 1080x1920 (9:16), 30fps, sem áudio. Sequência de cenas:
//   1. Capa  → gancho `title` (Playfair branco) sobre INK, watermark gigante `kw`
//   2. Slides → fundo CREAM, número grande, palavra de destaque em vermelho
//   3. CTA   → "Siga @anamnesismed" sobre INK
// As fontes Playfair Display + DM Sans são carregadas via @remotion/google-fonts.

import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

// Carrega as famílias e expõe os nomes p/ usar em fontFamily
const { fontFamily: PLAYFAIR } = loadPlayfair();
const { fontFamily: DMSANS } = loadDMSans();

// ─── Cores da marca ───────────────────────────────────────────────────────────
const INK = "#0a0c10";
const PAPER = "#f5f1e8";
const CREAM = "#ede8d8";
const RED = "#c0392b";
const WHITE = "#ffffff";

// ─── Props de entrada (inputProps) ────────────────────────────────────────────
// type (não interface) para satisfazer o constraint do Remotion
// Composition: Props extends Record<string, unknown> — interfaces não são
// atribuíveis a índice implícito, mas um type-alias de objeto é.
export type ReelProps = {
  title: string; // gancho da capa
  slides: string[]; // frases dos slides internos
  accentWords: string[]; // palavra em vermelho por slide
  cta: string; // pergunta/chamada (vai na cena final, abaixo do "Siga")
  kw: string; // keyword curta — watermark gigante
  ed: string; // número da edição (ex.: "012")
};

export const reelDefaultProps: ReelProps = {
  title: "O erro que custa o diagnóstico",
  slides: [
    "A pergunta certa vale mais que o exame caro",
    "SOCRATES organiza toda a avaliação da dor",
    "Bandeira vermelha ignorada muda o desfecho",
  ],
  accentWords: ["diagnóstico", "SOCRATES", "vermelha"],
  cta: "Qual sua pergunta-chave na anamnese?",
  kw: "ANAMNESE",
  ed: "001",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Realça a palavra `accent` dentro de `text` pintando-a de vermelho.
function Highlighted({ text, accent }: { text: string; accent: string }) {
  if (!accent) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(accent.toLowerCase());
  if (idx === -1) return <>{text}</>;
  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + accent.length);
  const after = text.slice(idx + accent.length);
  return (
    <>
      {before}
      <span style={{ color: RED }}>{match}</span>
      {after}
    </>
  );
}

// Faixa fina vermelha de assinatura (handle) usada nos rodapés
function Handle({ color = INK }: { color?: string }) {
  return (
    <div
      style={{
        fontFamily: DMSANS,
        fontSize: 38,
        fontWeight: 600,
        letterSpacing: 2,
        color,
        opacity: 0.85,
      }}
    >
      @anamnesismed
    </div>
  );
}

// ─── Cena 1 — Capa ────────────────────────────────────────────────────────────
function CoverScene({ title, kw, ed }: { title: string; kw: string; ed: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrada do título com mola (sobe e aparece)
  const entry = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const titleY = interpolate(entry, [0, 1], [60, 0]);
  const titleOpacity = interpolate(entry, [0, 1], [0, 1]);

  // Watermark gigante com leve drift horizontal
  const drift = interpolate(frame, [0, 90], [-20, 20], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      {/* Watermark gigante translúcido em vermelho */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `translateX(${drift}px) rotate(-8deg)`,
        }}
      >
        <div
          style={{
            fontFamily: PLAYFAIR,
            fontWeight: 900,
            fontSize: 320,
            color: RED,
            opacity: 0.12,
            whiteSpace: "nowrap",
            letterSpacing: -8,
          }}
        >
          {kw}
        </div>
      </AbsoluteFill>

      {/* Cabeçalho: edição */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 90,
          fontFamily: DMSANS,
          fontSize: 34,
          letterSpacing: 6,
          color: PAPER,
          opacity: 0.6,
        }}
      >
        ANAMNESÍSMED · Nº {ed}
      </div>

      {/* Título/gancho */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 90px",
        }}
      >
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          <div
            style={{
              width: 110,
              height: 8,
              backgroundColor: RED,
              marginBottom: 40,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              fontFamily: PLAYFAIR,
              fontWeight: 800,
              fontSize: 108,
              lineHeight: 1.05,
              color: WHITE,
            }}
          >
            {title}
          </div>
        </div>
      </AbsoluteFill>

      {/* Rodapé com handle */}
      <div style={{ position: "absolute", bottom: 90, left: 90 }}>
        <Handle color={PAPER} />
      </div>
    </AbsoluteFill>
  );
}

// ─── Cena de slide (insight) ──────────────────────────────────────────────────
function SlideScene({
  text,
  accent,
  index,
  total,
}: {
  text: string;
  accent: string;
  index: number; // 1-based (apenas para o número grande)
  total: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Número grande entra com mola
  const numEntry = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 25 });
  const numScale = interpolate(numEntry, [0, 1], [0.6, 1]);
  const numOpacity = interpolate(numEntry, [0, 1], [0, 1]);

  // Texto entra deslizando da esquerda, com pequeno atraso
  const textEntry = spring({
    frame: frame - 6,
    fps,
    config: { damping: 200 },
    durationInFrames: 28,
  });
  const textX = interpolate(textEntry, [0, 1], [-60, 0]);
  const textOpacity = interpolate(textEntry, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: CREAM }}>
      {/* Número grande de fundo */}
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 70,
          fontFamily: PLAYFAIR,
          fontWeight: 900,
          fontSize: 420,
          color: INK,
          opacity: 0.08,
          transform: `scale(${numScale})`,
        }}
      >
        {index}
      </div>

      {/* Indicador de progresso (índice / total) */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 90,
          fontFamily: DMSANS,
          fontSize: 40,
          fontWeight: 700,
          color: RED,
          opacity: numOpacity,
        }}
      >
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Texto do insight, com palavra de destaque em vermelho */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 90px",
        }}
      >
        <div
          style={{
            transform: `translateX(${textX}px)`,
            opacity: textOpacity,
            fontFamily: PLAYFAIR,
            fontWeight: 700,
            fontSize: 88,
            lineHeight: 1.15,
            color: INK,
          }}
        >
          <Highlighted text={text} accent={accent} />
        </div>
      </AbsoluteFill>

      {/* Rodapé */}
      <div style={{ position: "absolute", bottom: 90, left: 90 }}>
        <Handle color={INK} />
      </div>
    </AbsoluteFill>
  );
}

// ─── Cena final — CTA ─────────────────────────────────────────────────────────
function CtaScene({ cta }: { cta: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const scale = interpolate(entry, [0, 1], [0.85, 1]);
  const opacity = interpolate(entry, [0, 1], [0, 1]);

  // Pulso sutil no "Siga"
  const pulse = 1 + 0.02 * Math.sin((frame / fps) * Math.PI * 2);

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 90px",
          textAlign: "center",
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <div
          style={{
            width: 110,
            height: 8,
            backgroundColor: RED,
            marginBottom: 50,
            borderRadius: 4,
          }}
        />
        <div
          style={{
            fontFamily: PLAYFAIR,
            fontWeight: 800,
            fontSize: 96,
            lineHeight: 1.1,
            color: WHITE,
            transform: `scale(${pulse})`,
          }}
        >
          Siga <span style={{ color: RED }}>@anamnesismed</span>
        </div>

        {/* Pergunta/CTA de engajamento */}
        <div
          style={{
            marginTop: 50,
            fontFamily: DMSANS,
            fontWeight: 400,
            fontSize: 52,
            lineHeight: 1.3,
            color: PAPER,
            opacity: 0.9,
            maxWidth: 880,
          }}
        >
          {cta}
        </div>

        <div
          style={{
            marginTop: 70,
            fontFamily: DMSANS,
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: 2,
            color: RED,
          }}
        >
          → Anamnese completa no link da bio
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

// ─── Composição completa ──────────────────────────────────────────────────────
export const Reel: React.FC<ReelProps> = ({ title, slides, accentWords, cta, kw, ed }) => {
  const { fps } = useVideoConfig();

  // Duração por cena (em frames). Capa e CTA um pouco mais longas.
  const COVER = Math.round(fps * 2.8); // ~2.8s
  const SLIDE = Math.round(fps * 2.6); // ~2.6s cada
  const CTA = Math.round(fps * 3.0); // ~3.0s

  const safeSlides = slides && slides.length ? slides : reelDefaultProps.slides;

  let cursor = 0;
  const next = (dur: number) => {
    const from = cursor;
    cursor += dur;
    return from;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <Sequence from={next(COVER)} durationInFrames={COVER}>
        <CoverScene title={title} kw={kw} ed={ed} />
      </Sequence>

      {safeSlides.map((text, i) => (
        <Sequence key={i} from={next(SLIDE)} durationInFrames={SLIDE}>
          <SlideScene
            text={text}
            accent={accentWords?.[i] ?? ""}
            index={i + 1}
            total={safeSlides.length}
          />
        </Sequence>
      ))}

      <Sequence from={next(CTA)} durationInFrames={CTA}>
        <CtaScene cta={cta} />
      </Sequence>
    </AbsoluteFill>
  );
};
