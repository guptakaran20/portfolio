"use client";

import dynamic from "next/dynamic";

export const TerminalClient = dynamic(() => import("./Terminal"), { ssr: true });
export const GithubActivityClient = dynamic(() => import("./GithubActivity"), { ssr: true });
export const CanvasRevealEffectClient = dynamic(
  () => import("./CanvasRevealEffect").then((mod) => mod.CanvasRevealEffect),
  { ssr: true }
);
