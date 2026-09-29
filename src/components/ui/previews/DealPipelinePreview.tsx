"use client";

import { PreviewFrame, setStatus } from "./PreviewFrame";
import { usePreviewTimeline } from "./usePreviewTimeline";

const STAGES = ["Lead", "Contacted", "Negotiating", "Closed"];
const START = [3, 2, 1, 4];

/** SponsorGrid: a new sponsor moves through the pipeline and the column counts update. */
export function DealPipelinePreview() {
  const ref = usePreviewTimeline((tl, q) => {
    const card = q(".pv-deal");
    const count = (i: number) => q(`.pv-count-${i}`);

    tl.set(card, { xPercent: 0, autoAlpha: 0, y: 6 }, 0);
    STAGES.forEach((_, i) => tl.set(count(i), { text: String(START[i]) }, 0));
    setStatus(tl, q, "running", "new lead", 0);

    tl.to(card, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.2);
    tl.set(count(0), { text: String(START[0] + 1) }, 0.3);

    [1, 2, 3].forEach((stage, step) => {
      const at = 1.0 + step * 1.0;
      tl.to(card, { xPercent: stage * 100, duration: 0.55, ease: "power3.inOut" }, at);
      tl.set(count(stage - 1), { text: String(START[stage - 1]) }, at + 0.1); // card left that column
      tl.set(count(stage), { text: String(START[stage] + 1) }, at + 0.5);
      setStatus(tl, q, stage === 3 ? "done" : "running", stage === 3 ? "deal closed" : STAGES[stage].toLowerCase(), at + 0.5);
    });
    tl.to({}, { duration: 1.4 });
  });

  return (
    <PreviewFrame frameRef={ref} label="sponsorgrid · sponsor pipeline" status="new lead">
      <div className="relative">
        <div className="grid grid-cols-4">
          {STAGES.map((s, i) => (
            <div key={s} className={`px-1 ${i > 0 ? "border-l border-dashed border-slate-300 dark:border-white/10" : ""}`}>
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-slate-600 dark:text-white/60 mb-1.5">
                <span className="truncate">{s}</span>
                <span className={`pv-count-${i} tabular-nums`}>{START[i]}</span>
              </div>
              <div className="space-y-1">
                <span className="block h-4 rounded-sm bg-slate-200 dark:bg-white/[0.06]" />
                <span className="block h-4 rounded-sm bg-slate-200 dark:bg-white/[0.06]" />
                <span className="block h-4 rounded-sm bg-slate-200/60 dark:bg-white/[0.03]" />
              </div>
            </div>
          ))}
        </div>
        {/* the moving card is exactly one column wide, so xPercent: 100 moves it one stage */}
        <div className="pv-deal invisible opacity-0 absolute left-0 top-[21px] w-1/4 px-1 pointer-events-none">
          <span className="flex items-center gap-1 h-5 px-1.5 rounded-sm border border-cyan-500 bg-cyan-50 dark:bg-cyan-950 font-mono text-[9px] sm:text-[10px] text-cyan-700 dark:text-cyan-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
            <span className="truncate">sponsor</span>
          </span>
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] text-slate-500 dark:text-white/50">Prisma · PostgreSQL · CSRF-protected sessions</p>
    </PreviewFrame>
  );
}

export default DealPipelinePreview;
