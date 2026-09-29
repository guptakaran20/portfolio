"use client";

import { PreviewFrame, setState, setStatus } from "./PreviewFrame";
import { usePreviewTimeline } from "./usePreviewTimeline";

// Real numbers from the delta-OTA release log: 3 of 574 files changed, 0.41 MB instead of a 21.6 MB bundle.
const FILES = 574;
const COLS = 41; // 41 × 14 = 574
const CHANGED = new Set([38, 251, 467]);

export function OtaDeltaPreview() {
  const ref = usePreviewTimeline((tl, q) => {
    const cells = q(".pv-cell");
    const changed = q(".pv-cell[data-changed='true']");

    tl.set(cells, { opacity: 0.35 }, 0);
    setState(tl, changed, "idle", 0);
    tl.set(q(".pv-bar"), { scaleX: 0 }, 0);
    tl.set(q(".pv-size"), { text: "0.00 MB" }, 0);
    tl.set(q(".pv-reused"), { text: "0 reused" }, 0);
    setStatus(tl, q, "running", "comparing SHA-256 hashes", 0);

    tl.to(cells, { opacity: 1, duration: 0.25, ease: "none", stagger: { each: 1.5 / FILES } }, 0.2);
    tl.set(q(".pv-reused"), { text: `${FILES - CHANGED.size} reused` }, 1.9);
    setState(tl, changed, "changed", 1.9);
    tl.fromTo(changed, { scale: 0.4 }, { scale: 1, duration: 0.35, ease: "back.out(4)", stagger: 0.08, immediateRender: false }, 1.9);
    setStatus(tl, q, "running", `${CHANGED.size} files to download`, 1.9);
    tl.to(q(".pv-bar"), { scaleX: 1, duration: 0.7, ease: "power2.out" }, 2.3);
    tl.set(q(".pv-size"), { text: "0.41 MB" }, 3.0);
    setStatus(tl, q, "done", "updated over the air", 3.0);
    tl.to({}, { duration: 1.4 });
  });

  return (
    <PreviewFrame frameRef={ref} label="ota · delta release" status="comparing SHA-256 hashes">
      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: FILES }).map((_, i) => (
          <span
            key={i}
            data-changed={CHANGED.has(i) ? "true" : undefined}
            data-state="idle"
            className="pv-cell aspect-square rounded-[1px] bg-slate-300 dark:bg-white/20 data-[state=changed]:bg-cyan-500 dark:data-[state=changed]:bg-cyan-500 data-[state=changed]:shadow-[0_0_0_2px_rgba(6,182,212,0.25)]"
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 font-mono text-[10px] sm:text-[11px] text-slate-600 dark:text-white/60">
        <div className="relative flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          {/* drawn to scale: 0.41 MB is 1.9% of the 21.6 MB full bundle */}
          <span className="pv-bar absolute inset-y-0 left-0 w-[1.9%] min-w-1 origin-left rounded-full bg-cyan-500" />
        </div>
        <span className="tabular-nums">
          <span className="pv-size text-slate-900 dark:text-white">0.41 MB</span> / 21.6 MB
        </span>
      </div>
      <p className="mt-1.5 font-mono text-[10px] text-slate-500 dark:text-white/50">
        {CHANGED.size} of {FILES} files changed · <span className="pv-reused">{FILES - CHANGED.size} reused</span>
      </p>
    </PreviewFrame>
  );
}

export default OtaDeltaPreview;
