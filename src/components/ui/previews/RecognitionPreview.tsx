"use client";

import { User } from "lucide-react";
import { FlowRow, PreviewFrame, setState, setStatus } from "./PreviewFrame";
import { usePreviewTimeline } from "./usePreviewTimeline";

const FACES = 8;

/** ILEED: a frame moves camera → detect → FAISS → marked, and the faces in it get matched one by one. */
export function RecognitionPreview() {
  const ref = usePreviewTimeline((tl, q) => {
    const nodes = (i: number) => q(`.pv-node-${i}`);
    const edge = (i: number) => q(`.pv-edge-${i}`);
    const faces = q(".pv-face");
    const count = q(".pv-count");

    setState(tl, q(".pv-node"), "idle", 0);
    setState(tl, faces, "idle", 0);
    tl.set(q(".pv-edge"), { scaleX: 0 }, 0);
    tl.set(count, { text: `0 / ${FACES}` }, 0);
    setStatus(tl, q, "idle", "waiting for frame", 0);

    setStatus(tl, q, "running", "processing frame", 0.3);
    setState(tl, nodes(0), "running", 0.3);
    setState(tl, nodes(0), "done", 0.8);
    tl.to(edge(0), { scaleX: 1, duration: 0.3, ease: "none" }, 0.8);
    setState(tl, nodes(1), "running", 1.1);
    setState(tl, nodes(1), "done", 1.7);
    tl.to(edge(1), { scaleX: 1, duration: 0.3, ease: "none" }, 1.7);
    setState(tl, nodes(2), "running", 2.0);
    faces.forEach((face, i) => {
      const at = 2.1 + i * 0.17;
      setState(tl, face, "match", at);
      tl.fromTo(face, { scale: 0.85 }, { scale: 1, duration: 0.25, ease: "back.out(3)", immediateRender: false }, at);
      tl.set(count, { text: `${i + 1} / ${FACES}` }, at);
    });
    setState(tl, nodes(2), "done", 3.5);
    tl.to(edge(2), { scaleX: 1, duration: 0.3, ease: "none" }, 3.5);
    setState(tl, nodes(3), "running", 3.8);
    setState(tl, nodes(3), "done", 4.2);
    setStatus(tl, q, "done", `${FACES} students marked`, 4.2);
    tl.to({}, { duration: 1.2 });
  });

  return (
    <PreviewFrame frameRef={ref} label="ileed · live RTSP stream" status="waiting for frame">
      <FlowRow steps={["camera", "detect", "FAISS", "marked"]} />
      <div className="mt-3 flex items-center gap-2">
        <div className="flex flex-1 gap-1">
          {Array.from({ length: FACES }).map((_, i) => (
            <span
              key={i}
              data-state="idle"
              className="pv-face flex flex-1 h-6 items-center justify-center rounded border border-slate-300 dark:border-white/15 text-slate-400 dark:text-white/30 transition-colors duration-300 data-[state=match]:border-emerald-500/60 dark:data-[state=match]:border-emerald-500/60 data-[state=match]:bg-emerald-500/10 data-[state=match]:text-emerald-600 dark:data-[state=match]:text-emerald-300"
            >
              <User className="w-3 h-3" strokeWidth={2.2} />
            </span>
          ))}
        </div>
        <span className="pv-count w-11 text-right font-mono text-[10px] sm:text-[11px] tabular-nums text-slate-600 dark:text-white/60">
          0 / {FACES}
        </span>
      </div>
      <p className="mt-2 font-mono text-[10px] text-slate-500 dark:text-white/50">RetinaFace (ONNX) → embedding → FAISS index match</p>
    </PreviewFrame>
  );
}

export default RecognitionPreview;
