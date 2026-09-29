"use client";

import { PreviewFrame, setState, setStatus } from "./PreviewFrame";
import { usePreviewTimeline } from "./usePreviewTimeline";

const LINES = ["w-full", "w-11/12", "w-full", "w-4/6", "w-10/12"];

/** StrangerBlogs: a post is written, published, then read in the focused reading mode. */
export function ReaderPreview() {
  const ref = usePreviewTimeline((tl, q) => {
    tl.set(q(".pv-line"), { scaleX: 0 }, 0);
    tl.set(q(".pv-progress"), { scaleX: 0 }, 0);
    setState(tl, q(".pv-page"), "default", 0);
    setStatus(tl, q, "running", "drafting", 0);

    q(".pv-line").forEach((line, i) => {
      tl.to(line, { scaleX: 1, duration: 0.45, ease: "power1.out" }, 0.2 + i * 0.4);
    });
    setStatus(tl, q, "done", "published", 2.4);
    setState(tl, q(".pv-page"), "reading", 3.0);
    setStatus(tl, q, "done", "reading mode", 3.0);
    tl.to(q(".pv-progress"), { scaleX: 1, duration: 1.8, ease: "none" }, 3.0);
    tl.to({}, { duration: 0.8 });
  });

  return (
    <PreviewFrame frameRef={ref} label="strangerblogs · new post" status="drafting" bodyClassName="p-0">
      <span className="block h-0.5 bg-slate-200 dark:bg-white/10">
        <span className="pv-progress block h-full origin-left scale-x-0 bg-cyan-500" />
      </span>
      <div
        data-state="default"
        className="pv-page p-3 sm:p-4 transition-all duration-500 data-[state=reading]:bg-amber-50 dark:data-[state=reading]:bg-white/[0.04] data-[state=reading]:px-8 sm:data-[state=reading]:px-12"
      >
        <span className="block h-2.5 w-2/5 rounded-full bg-slate-300 dark:bg-white/20 mb-3" />
        <div className="space-y-2">
          {LINES.map((w, i) => (
            <span key={i} className={`pv-line block h-1.5 ${w} origin-left scale-x-0 rounded-full bg-slate-200 dark:bg-white/10`} />
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

export default ReaderPreview;
