// ─── Catálogo de composições Remotion ─────────────────────────────────────────
// Registra a composição "Reel" com dimensões 1080x1920 (9:16), 30fps.
// A duração total é calculada dinamicamente a partir dos props (nº de slides),
// usando calculateMetadata — assim o vídeo se ajusta a 3, 4 ou mais slides.

import React from "react";
import { Composition } from "remotion";
import { Reel, reelDefaultProps, ReelProps, beatFrames } from "./Reel";

const FPS = 30;

// Duração total = soma dos frames de cada beat (MESMA função do Reel → nunca
// dessincroniza). Com narração (beatSecs), o vídeo dura exatamente a fala.
function totalDurationInFrames(slidesCount: number, beatSecs?: number[]): number {
  return beatFrames(slidesCount, FPS, beatSecs).reduce((a, b) => a + b, 0);
}

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Reel"
      component={Reel}
      durationInFrames={totalDurationInFrames(reelDefaultProps.slides.length)}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={reelDefaultProps}
      // Recalcula a duração conforme os slides e a narração (beatSecs) recebidos.
      calculateMetadata={({ props }) => {
        const p = props as ReelProps;
        const count = p.slides && p.slides.length ? p.slides.length : reelDefaultProps.slides.length;
        return { durationInFrames: totalDurationInFrames(count, p.beatSecs) };
      }}
    />
  );
};
