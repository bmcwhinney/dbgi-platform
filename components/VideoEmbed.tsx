"use client";

import type { CSSProperties } from "react";
import MuxPlayer from "@mux/mux-player-react";

// DBGI brand mapped onto Mux Player's theming API:
// accentColor = interactive highlights (progress fill, hover), primaryColor = icon color,
// secondaryColor = control bar background. --controls-backdrop-color is the gradient
// scrim behind the bottom control bar (documented custom property, not a React prop).
const playerStyle: CSSProperties & Record<string, string> = {
  width: "100%",
  aspectRatio: "16 / 9",
  display: "block",
  fontFamily: "var(--font-public-sans, 'Public Sans'), sans-serif",
  "--controls-backdrop-color": "rgba(6, 18, 11, 0.65)",
};

export function VideoEmbed({
  playbackId,
  title,
  poster,
}: {
  playbackId: string;
  title?: string;
  poster?: string;
}) {
  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      metadata={{ video_title: title }}
      poster={poster}
      accentColor="#F24C27"
      primaryColor="#FCFBFA"
      secondaryColor="#0D2617"
      style={playerStyle}
    />
  );
}
