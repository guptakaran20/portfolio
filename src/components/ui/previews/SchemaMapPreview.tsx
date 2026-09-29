"use client";

import { Check } from "lucide-react";
import { PreviewFrame, setState, setStatus } from "./PreviewFrame";
import { usePreviewTimeline } from "./usePreviewTimeline";

// Messy CSV headers on the left, the CRM schema on the right; MAP[i] is the schema row for raw header i.
const RAW = ["E-mail Addr", "fname", "Company Nm", "Ph #"];
const SCHEMA = ["first_name", "email", "phone", "company"];
const MAP = [1, 0, 3, 2];

const ROW_H = 26; // px, keep in sync with h-[26px]
const GAP = 6; // px, keep in sync with gap-1.5
const COL_H = RAW.length * ROW_H + (RAW.length - 1) * GAP;
const yPct = (i: number) => ((i * (ROW_H + GAP) + ROW_H / 2) / COL_H) * 100;

const cell =
  "flex items-center h-[26px] px-2 rounded-md border font-mono text-[10px] sm:text-[11px] whitespace-nowrap transition-colors duration-300";

/** ImportlyAI: each raw header is read, matched by the Gemini pipeline, and linked to its CRM field. */
export function SchemaMapPreview() {
  const ref = usePreviewTimeline((tl, q) => {
    setState(tl, q(".pv-raw"), "idle", 0);
    setState(tl, q(".pv-field"), "idle", 0);
    tl.set(q(".pv-link"), { strokeDashoffset: 1 }, 0);
    tl.set(q(".pv-check"), { autoAlpha: 0 }, 0);
    tl.set(q(".pv-bar"), { scaleX: 0 }, 0);
    setStatus(tl, q, "running", "inferring schema", 0);

    RAW.forEach((_, i) => {
      const at = 0.3 + i * 0.75;
      setState(tl, q(`.pv-raw-${i}`), "running", at);
      tl.to(q(`.pv-link-${i}`), { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" }, at + 0.15);
      setState(tl, q(`.pv-raw-${i}`), "done", at + 0.6);
      setState(tl, q(`.pv-field-${MAP[i]}`), "done", at + 0.6);
      tl.to(q(`.pv-check-${MAP[i]}`), { autoAlpha: 1, duration: 0.2 }, at + 0.6);
      setStatus(tl, q, "running", `mapping ${i + 1}/${RAW.length}`, at);
    });
    tl.to(q(".pv-bar"), { scaleX: 1, duration: 3.2, ease: "none" }, 0.2);
    setStatus(tl, q, "done", "mapped · streaming rows", 3.4);
    tl.to({}, { duration: 1.4 });
  });

  return (
    <PreviewFrame frameRef={ref} label="importlyai · contacts.csv" status="inferring schema">
      <div className="flex items-stretch">
        <div className="flex flex-col gap-1.5">
          {RAW.map((h, i) => (
            <span
              key={h}
              data-state="idle"
              className={`pv-raw pv-raw-${i} ${cell} border-slate-300 bg-white text-slate-600 dark:border-white/15 dark:bg-white/[0.03] dark:text-white/60 data-[state=running]:border-cyan-500 dark:data-[state=running]:border-cyan-500 data-[state=running]:text-cyan-700 dark:data-[state=running]:text-cyan-300 data-[state=done]:text-slate-500 dark:data-[state=done]:text-white/45`}
            >
              {h}
            </span>
          ))}
        </div>

        <svg className="flex-1 min-w-8" style={{ height: COL_H }} viewBox="0 0 100 100" preserveAspectRatio="none">
          {RAW.map((_, i) => {
            const y1 = yPct(i);
            const y2 = yPct(MAP[i]);
            return (
              <path
                key={i}
                className={`pv-link pv-link-${i} stroke-cyan-500`}
                d={`M2 ${y1} C 50 ${y1}, 50 ${y2}, 98 ${y2}`}
                fill="none"
                strokeWidth={1.2}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
              />
            );
          })}
        </svg>

        <div className="flex flex-col gap-1.5">
          {SCHEMA.map((f, i) => (
            <span
              key={f}
              data-state="idle"
              className={`pv-field pv-field-${i} ${cell} gap-1.5 border-slate-300 bg-white text-slate-600 dark:border-white/15 dark:bg-white/[0.03] dark:text-white/60 data-[state=done]:border-emerald-500/60 dark:data-[state=done]:border-emerald-500/60 data-[state=done]:text-emerald-700 dark:data-[state=done]:text-emerald-300`}
            >
              <Check className={`pv-check pv-check-${i} invisible opacity-0 w-3 h-3`} strokeWidth={3} />
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-slate-500 dark:text-white/50">
        <span className="shrink-0">Gemini · SSE</span>
        <span className="relative flex-1 h-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          <span className="pv-bar absolute inset-0 origin-left scale-x-0 bg-cyan-500" />
        </span>
      </div>
    </PreviewFrame>
  );
}

export default SchemaMapPreview;
