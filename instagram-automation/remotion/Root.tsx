// ─── Catálogo de composições Remotion ─────────────────────────────────────────
// "Reel"      — reel clássico (capa/slides/cta, footage por beat).
// "ReelSync"  — reel SINCRONIZADO (voz IA + visual por frase + legenda palavra a
//               palavra). Duração = exatamente a narração. 1080x1920, 30fps.

import React from "react";
import { Composition } from "remotion";
import { Reel, reelDefaultProps, ReelProps, beatFrames } from "./Reel";
import { ReelSync, reelSyncDefaultProps, ReelSyncProps, syncDurationInFrames } from "./ReelSync";

const FPS = 30;

function totalDurationInFrames(slidesCount: number, beatSecs?: number[]): number {
  return beatFrames(slidesCount, FPS, beatSecs).reduce((a, b) => a + b, 0);
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={totalDurationInFrames(reelDefaultProps.slides.length)}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={reelDefaultProps}
        calculateMetadata={({ props }) => {
          const p = props as ReelProps;
          const count = p.slides && p.slides.length ? p.slides.length : reelDefaultProps.slides.length;
          return { durationInFrames: totalDurationInFrames(count, p.beatSecs) };
        }}
      />
      <Composition
        id="ReelSync"
        component={ReelSync}
        durationInFrames={syncDurationInFrames(reelSyncDefaultProps.durationSec, FPS)}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={reelSyncDefaultProps}
        calculateMetadata={({ props }) => {
          const p = props as ReelSyncProps;
          return { durationInFrames: syncDurationInFrames(p.durationSec || reelSyncDefaultProps.durationSec, FPS) };
        }}
      />
    </>
  );
};
