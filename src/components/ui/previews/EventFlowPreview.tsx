"use client";

import { FlowRow, PreviewFrame, setState, setStatus } from "./PreviewFrame";
import { usePreviewTimeline } from "./usePreviewTimeline";

const LOG = [
  { text: "worker-2 claimed score", tone: "text-slate-500 dark:text-white/50" },
  { text: "score failed · retry 1/3 scheduled", tone: "text-rose-600 dark:text-rose-300" },
  { text: "retry succeeded · DLQ 0", tone: "text-emerald-700 dark:text-emerald-300" },
];

/** EventFlow: a DAG run where one node fails, is retried by the worker pool, and the run still completes. */
export function EventFlowPreview() {
  const ref = usePreviewTimeline((tl, q) => {
    const node = (i: number) => q(`.pv-node-${i}`);
    const edge = (i: number) => q(`.pv-edge-${i}`);
    const log = (i: number) => q(`.pv-log-${i}`);

    setState(tl, q(".pv-node"), "idle", 0);
    tl.set(q(".pv-edge"), { scaleX: 0 }, 0);
    tl.set(q(".pv-log"), { opacity: 0, y: 4 }, 0);
    setStatus(tl, q, "running", "running", 0);

    setState(tl, node(0), "running", 0.2);
    setState(tl, node(0), "done", 0.7);
    tl.to(edge(0), { scaleX: 1, duration: 0.3, ease: "none" }, 0.7);
    setState(tl, node(1), "running", 1.0);
    setState(tl, node(1), "done", 1.5);
    tl.to(edge(1), { scaleX: 1, duration: 0.3, ease: "none" }, 1.5);
    setState(tl, node(2), "running", 1.8);
    tl.to(log(0), { opacity: 1, y: 0, duration: 0.3 }, 1.8);
    setState(tl, node(2), "failed", 2.5);
    tl.fromTo(node(2), { x: -2 }, { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)", immediateRender: false }, 2.5);
    setStatus(tl, q, "failed", "retrying", 2.5);
    tl.to(log(1), { opacity: 1, y: 0, duration: 0.3 }, 2.5);
    setState(tl, node(2), "running", 3.2);
    setStatus(tl, q, "running", "running", 3.2);
    setState(tl, node(2), "done", 3.8);
    tl.to(log(2), { opacity: 1, y: 0, duration: 0.3 }, 3.8);
    tl.to(edge(2), { scaleX: 1, duration: 0.3, ease: "none" }, 3.8);
    setState(tl, node(3), "running", 4.1);
    setState(tl, node(3), "done", 4.5);
    setStatus(tl, q, "done", "completed", 4.5);
    tl.to({}, { duration: 1.2 });
  });

  return (
    <PreviewFrame frameRef={ref} label="eventflow · workflow run" status="running">
      <FlowRow steps={["ingest", "validate", "score", "notify"]} />
      <ul className="mt-3 space-y-1 font-mono text-[10px] sm:text-[11px]">
        {LOG.map((l, i) => (
          <li key={l.text} className={`pv-log pv-log-${i} opacity-0 ${l.tone}`}>
            <span className="opacity-70">›</span> {l.text}
          </li>
        ))}
      </ul>
    </PreviewFrame>
  );
}

export default EventFlowPreview;
