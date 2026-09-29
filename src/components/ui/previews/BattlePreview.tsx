"use client";

import { PreviewFrame, setState, setStatus } from "./PreviewFrame";
import { usePreviewTimeline } from "./usePreviewTimeline";

const TESTS = 6;
// When each test case passes, in seconds. The rival fails test 4 and is still resubmitting when the round ends.
const YOU = [0.4, 0.8, 1.3, 1.7, 2.2, 2.6];
const RIVAL = [0.6, 1.1, 1.6];
const RIVAL_FAIL = { index: 3, at: 2.1 };

function Row({ who }: { who: "you" | "rival" }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-10 font-mono text-[10px] sm:text-[11px] text-slate-600 dark:text-white/60">{who}</span>
      <div className="flex flex-1 gap-1">
        {Array.from({ length: TESTS }).map((_, i) => (
          <span
            key={i}
            data-state="idle"
            className={`pv-test pv-${who}-${i} flex-1 h-5 rounded-sm border border-slate-300 dark:border-white/15 transition-colors duration-200 data-[state=pass]:bg-emerald-500/80 data-[state=pass]:border-emerald-500 dark:data-[state=pass]:border-emerald-500 data-[state=fail]:bg-rose-500/80 data-[state=fail]:border-rose-500 dark:data-[state=fail]:border-rose-500`}
          />
        ))}
      </div>
      <span className={`pv-score-${who} w-8 text-right font-mono text-[10px] sm:text-[11px] tabular-nums text-slate-600 dark:text-white/60`}>
        0/{TESTS}
      </span>
      <span
        className={`pv-win-${who} invisible opacity-0 font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300`}
      >
        won
      </span>
    </div>
  );
}

/** CodeArena: a live 1v1 round where both players race through the same test cases. */
export function BattlePreview() {
  const ref = usePreviewTimeline((tl, q) => {
    setState(tl, q(".pv-test"), "idle", 0);
    tl.set([q(".pv-score-you"), q(".pv-score-rival")], { text: `0/${TESTS}` }, 0);
    tl.set([q(".pv-win-you"), q(".pv-win-rival")], { autoAlpha: 0 }, 0);
    setStatus(tl, q, "running", "live · 2 players", 0);

    YOU.forEach((at, i) => {
      setState(tl, q(`.pv-you-${i}`), "pass", at);
      tl.set(q(".pv-score-you"), { text: `${i + 1}/${TESTS}` }, at);
    });
    RIVAL.forEach((at, i) => {
      setState(tl, q(`.pv-rival-${i}`), "pass", at);
      tl.set(q(".pv-score-rival"), { text: `${i + 1}/${TESTS}` }, at);
    });
    setState(tl, q(`.pv-rival-${RIVAL_FAIL.index}`), "fail", RIVAL_FAIL.at);
    tl.to(q(".pv-win-you"), { autoAlpha: 1, duration: 0.3 }, YOU[TESTS - 1]);
    tl.fromTo(q(".pv-win-you"), { scale: 0.6 }, { scale: 1, duration: 0.35, ease: "back.out(3)", immediateRender: false }, YOU[TESTS - 1]);
    setStatus(tl, q, "done", "round over · you won", YOU[TESTS - 1]);
    tl.to({}, { duration: 1.6 });
  });

  return (
    <PreviewFrame frameRef={ref} label="codearena · 1v1 battle" status="live · 2 players">
      <div className="space-y-2">
        <Row who="you" />
        <Row who="rival" />
      </div>
      <p className="mt-3 font-mono text-[10px] text-slate-500 dark:text-white/50">
        Socket.IO sync · Piston sandbox · Redis matchmaking
      </p>
    </PreviewFrame>
  );
}

export default BattlePreview;
