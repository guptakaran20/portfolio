import React from "react";
import { cn } from "@/lib/utils";

/**
 * Shared chrome for the animated product previews: a monospace label on the left,
 * a live status chip on the right (driven by the timeline through `.pv-status` / `.pv-status-text`).
 * The whole frame is decorative, so it is hidden from assistive tech; the surrounding card carries the real text.
 */
export function PreviewFrame({
  label,
  status,
  children,
  className,
  bodyClassName,
  frameRef,
}: {
  label: string;
  status: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  frameRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className={cn(
        "rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] overflow-hidden select-none",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-slate-200 dark:border-white/[0.06] font-mono text-[10px] sm:text-[11px] text-slate-500 dark:text-white/55">
        <span className="truncate">{label}</span>
        <span
          className="pv-status group inline-flex items-center gap-1.5 shrink-0 text-slate-500 dark:text-white/55 data-[state=running]:text-cyan-700 dark:data-[state=running]:text-cyan-300 data-[state=done]:text-emerald-700 dark:data-[state=done]:text-emerald-300 data-[state=failed]:text-rose-600 dark:data-[state=failed]:text-rose-300 transition-colors"
          data-state="idle"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-data-[state=running]:bg-cyan-500 group-data-[state=running]:animate-pulse group-data-[state=done]:bg-emerald-500 group-data-[state=failed]:bg-rose-500 transition-colors" />
          <span className="pv-status-text">{status}</span>
        </span>
      </div>
      <div className={cn("p-3 sm:p-4", bodyClassName)}>{children}</div>
    </div>
  );
}

/** Node + connector row used by the ILEED pipeline and the EventFlow run. */
export function FlowRow({ steps, className }: { steps: string[]; className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <span
            className={cn(
              `pv-node pv-node-${i}`,
              "group inline-flex items-center gap-1.5 rounded-md border px-1.5 sm:px-2 py-1 font-mono text-[10px] sm:text-[11px] whitespace-nowrap transition-colors duration-300",
              "border-slate-300 bg-white text-slate-600 dark:border-white/15 dark:bg-white/[0.03] dark:text-white/60",
              "data-[state=running]:border-cyan-500 dark:data-[state=running]:border-cyan-500 data-[state=running]:text-cyan-700 dark:data-[state=running]:text-cyan-300",
              "data-[state=done]:border-emerald-500/60 dark:data-[state=done]:border-emerald-500/60 data-[state=done]:text-emerald-700 dark:data-[state=done]:text-emerald-300",
              "data-[state=failed]:border-rose-500 dark:data-[state=failed]:border-rose-500 data-[state=failed]:text-rose-600 dark:data-[state=failed]:text-rose-300",
            )}
            data-state="idle"
          >
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/25 group-data-[state=running]:bg-cyan-500 dark:group-data-[state=running]:bg-cyan-500 group-data-[state=running]:animate-pulse group-data-[state=done]:bg-emerald-500 dark:group-data-[state=done]:bg-emerald-500 group-data-[state=failed]:bg-rose-500 dark:group-data-[state=failed]:bg-rose-500 transition-colors" />
            {label}
          </span>
          {i < steps.length - 1 && (
            <span className="relative flex-1 min-w-2 h-px mx-0.5 sm:mx-1 bg-slate-300 dark:bg-white/15 overflow-hidden">
              <span className={`pv-edge pv-edge-${i} absolute inset-0 origin-left scale-x-0 bg-cyan-500`} />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/** Timeline helpers shared by the flow-based previews. */
export function setState(tl: gsap.core.Timeline, targets: Element[] | Element, state: string, at: number | string) {
  tl.set(targets, { attr: { "data-state": state } }, at);
}

export function setStatus(tl: gsap.core.Timeline, q: (s: string) => Element[], state: string, text: string, at: number | string) {
  tl.set(q(".pv-status"), { attr: { "data-state": state } }, at);
  tl.set(q(".pv-status-text"), { text }, at);
}
