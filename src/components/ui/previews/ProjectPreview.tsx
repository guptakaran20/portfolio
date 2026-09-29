"use client";

import { EventFlowPreview } from "./EventFlowPreview";
import { BattlePreview } from "./BattlePreview";
import { SchemaMapPreview } from "./SchemaMapPreview";
import { DealPipelinePreview } from "./DealPipelinePreview";
import { StorefrontPreview } from "./StorefrontPreview";
import { ReaderPreview } from "./ReaderPreview";

const PREVIEWS: Record<string, () => React.JSX.Element> = {
  EventFlow: EventFlowPreview,
  CodeArena: BattlePreview,
  ImportlyAI: SchemaMapPreview,
  SponsorGrid: DealPipelinePreview,
  "Arovia Vibes": StorefrontPreview,
  StrangerBlogs: ReaderPreview,
};

/** Animated, product-specific preview shown at the top of each project card. */
export function ProjectPreview({ title }: { title: string }) {
  const Preview = PREVIEWS[title];
  return Preview ? <Preview /> : null;
}
