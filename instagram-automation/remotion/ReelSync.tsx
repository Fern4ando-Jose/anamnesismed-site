// ─── Reel SINCRONIZADO (voz IA + visual por frase + legenda palavra a palavra) ──
// Vertical 1080x1920, 30fps. Tudo travado na linha do tempo da NARRAÇÃO:
//   • áudio = narração (URL remota) + trilha baixa por baixo
//   • cenas = 1 visual POR FRASE (vídeo LTX nos beats-chave, imagem Flux + Ken Burns
//     no resto) — gerado pra CASAR com o que está sendo dito naquele momento
//   • legenda = palavra a palavra, nos timestamps da própria voz (estilo Reels)
// Área segura: legenda no miolo, marca no topo, base livre p/ o IG.
import React from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, OffthreadVideo,
  interpolate, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";

const { fontFamily: DMSANS } = loadDMSans();
const TEAL_DK = "#0B7C88", TEAL = "#0FA3B1", CORAL = "#FF5C49", WHITE = "#fff";
const SHADOW = "0 4px 30px rgba(0,0,0,0.6)";

export type SyncScene = { visualUrl: string; visualType: "video" | "image"; start: number; end: number; caption: string };
export type SyncCaption = { text: string; start: number; end: number };
export type ReelSyncProps = {
  hook: string;
  handle: string;
  audioUrl: string;
  durationSec: number;
  scenes: SyncScene[];
  captions: SyncCaption[];
  music?: string;     // arquivo em public/ (trilha baixa)
  ctaButton: string;  // "Siga @anamnesismed" / "Sigue @anamnesismed.es"
};

export const reelSyncDefaultProps: ReelSyncProps = {
  hook: "Como medir a PA sem errar",
  handle: "@anamnesismed",
  audioUrl: "",
  durationSec: 6,
  scenes: [],
  captions: [],
  ctaButton: "Siga @anamnesismed",
};

export function syncDurationInFrames(durationSec: number, fps: number): number {
  return Math.max(fps, Math.round((durationSec + 0.6) * fps));
}

// Cena: vídeo (corte seco) OU imagem com Ken Burns (zoom/pan lento) + scrim.
function Scene({ scene, fps }: { scene: SyncScene; fps: number }) {
  const frame = useCurrentFrame();
  const durF = Math.max(1, Math.round((scene.end - scene.start) * fps));
  const p = interpolate(frame, [0, durF], [0, 1], { extrapolateRight: "clamp" });
  const scale = 1.06 + p * 0.12;          // 1.06 → 1.18
  const tx = interpolate(p, [0, 1], [-18, 18]);
  return (
    <AbsoluteFill style={{ backgroundColor: TEAL_DK, overflow: "hidden" }}>
      {scene.visualUrl ? (
        scene.visualType === "video" ? (
          <OffthreadVideo src={scene.visualUrl} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Img src={scene.visualUrl} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale}) translateX(${tx}px)` }} />
        )
      ) : (
        <AbsoluteFill style={{ background: `radial-gradient(circle at 80% 12%, ${TEAL} 0%, ${TEAL_DK} 60%)` }} />
      )}
      {/* Scrim p/ legibilidade da legenda (mais escuro no miolo/base) */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(6,28,31,0.45) 0%, rgba(6,28,31,0.15) 35%, rgba(6,28,31,0.55) 100%)" }} />
    </AbsoluteFill>
  );
}

// Legenda palavra a palavra: mostra um grupo curto (a "frase" ao redor da palavra
// ativa), destacando em coral a palavra que está sendo falada AGORA.
function Captions({ captions }: { captions: SyncCaption[] }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (!captions.length) return null;
  // palavra ativa = a que contém t (ou a próxima a começar)
  let active = captions.findIndex((w) => t >= w.start && t <= w.end);
  if (active === -1) {
    const next = captions.findIndex((w) => w.start > t);
    active = next === -1 ? captions.length - 1 : Math.max(0, next - 1);
  }
  const GROUP = 3;
  const gStart = Math.floor(active / GROUP) * GROUP;
  const group = captions.slice(gStart, gStart + GROUP);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "360px 90px 470px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 22px", textAlign: "center" }}>
        {group.map((w, i) => {
          const isActive = gStart + i === active;
          return (
            <span key={gStart + i} style={{
              fontFamily: DMSANS, fontWeight: 800, fontSize: 92, lineHeight: 1.1,
              letterSpacing: -1, color: isActive ? CORAL : WHITE, textShadow: SHADOW,
              transform: isActive ? "scale(1.04)" : "scale(1)", display: "inline-block",
            }}>{w.text}</span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export const ReelSync: React.FC<ReelSyncProps> = ({ hook, handle, audioUrl, durationSec, scenes, captions, music, ctaButton }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: TEAL_DK }}>
      {/* Cenas (visual por frase) */}
      {scenes.map((s, i) => {
        const from = Math.round(s.start * fps);
        const dur = Math.max(1, Math.round((s.end - s.start) * fps));
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <Scene scene={s} fps={fps} />
          </Sequence>
        );
      })}

      {/* Legenda sincronizada palavra a palavra */}
      <Captions captions={captions} />

      {/* Marca no topo + gancho (só nos ~2s iniciais, como reforço da capa) */}
      <div style={{ position: "absolute", top: 150, left: 80, right: 80, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: CORAL }} />
        <div style={{ fontFamily: DMSANS, fontSize: 36, fontWeight: 700, color: WHITE, textShadow: SHADOW }}>{handle}</div>
      </div>
      {frame < fps * 2.2 && hook ? (
        <div style={{ position: "absolute", top: 232, left: 80, right: 80, fontFamily: DMSANS, fontWeight: 800, fontSize: 56, lineHeight: 1.12, color: WHITE, textShadow: SHADOW, opacity: interpolate(frame, [0, 10, fps * 1.8, fps * 2.2], [0, 1, 1, 0], { extrapolateRight: "clamp" }) }}>{hook}</div>
      ) : null}

      {/* CTA no final (último ~2.4s) */}
      {frame > (durationSec - 2.4) * fps ? (
        <div style={{ position: "absolute", bottom: 360, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <div style={{ fontFamily: DMSANS, fontWeight: 700, fontSize: 40, color: WHITE, backgroundColor: CORAL, padding: "20px 44px", borderRadius: 14, textShadow: SHADOW }}>{ctaButton}</div>
        </div>
      ) : null}

      {/* Áudio: narração + trilha baixa por baixo */}
      {audioUrl ? <Audio src={audioUrl} /> : null}
      {music ? <Audio src={staticFile(music)} volume={0.12} /> : null}
    </AbsoluteFill>
  );
};
