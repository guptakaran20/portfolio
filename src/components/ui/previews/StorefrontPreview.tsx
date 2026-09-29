"use client";

import { ShoppingBag } from "lucide-react";
import { PreviewFrame, setState, setStatus } from "./PreviewFrame";
import { usePreviewTimeline } from "./usePreviewTimeline";

/** Arovia Vibes: add to cart → order placed → confirmation email sent. */
export function StorefrontPreview() {
  const ref = usePreviewTimeline((tl, q) => {
    tl.set(q(".pv-cart"), { text: "0" }, 0);
    setState(tl, q(".pv-add"), "idle", 0);
    setState(tl, q(".pv-tile"), "idle", 0);
    tl.set(q(".pv-order"), { autoAlpha: 0, y: 6 }, 0);
    setStatus(tl, q, "idle", "browsing", 0);

    setState(tl, q(".pv-tile-1"), "focus", 0.4);
    setState(tl, q(".pv-add"), "pressed", 1.0);
    tl.fromTo(q(".pv-add"), { scale: 0.92 }, { scale: 1, duration: 0.3, ease: "back.out(3)", immediateRender: false }, 1.0);
    tl.set(q(".pv-cart"), { text: "1" }, 1.1);
    tl.fromTo(q(".pv-cart-badge"), { scale: 1.5 }, { scale: 1, duration: 0.35, ease: "back.out(3)", immediateRender: false }, 1.1);
    setStatus(tl, q, "running", "added to cart", 1.1);
    tl.to(q(".pv-order"), { autoAlpha: 1, y: 0, duration: 0.35 }, 2.0);
    setStatus(tl, q, "done", "order placed", 2.0);
    tl.to({}, { duration: 1.6 });
  });

  return (
    <PreviewFrame frameRef={ref} label="aroviavibes · storefront" status="browsing">
      <div className="flex items-center justify-end mb-2">
        <span className="relative inline-flex items-center text-slate-600 dark:text-white/60">
          <ShoppingBag className="w-4 h-4" />
          <span className="pv-cart-badge absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-cyan-600 text-white font-mono text-[9px] leading-[14px] text-center">
            <span className="pv-cart">0</span>
          </span>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            data-state="idle"
            className={`pv-tile pv-tile-${i} rounded-md border border-slate-200 dark:border-white/10 p-1.5 transition-colors duration-300 data-[state=focus]:border-cyan-500 dark:data-[state=focus]:border-cyan-500`}
          >
            <span className="block h-9 rounded-sm bg-slate-200 dark:bg-white/[0.06]" />
            <span className="block mt-1.5 h-1.5 w-3/4 rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="mt-1.5 flex items-center justify-between">
              <span className="block h-1.5 w-1/3 rounded-full bg-slate-300 dark:bg-white/15" />
              {i === 1 && (
                <span
                  data-state="idle"
                  className="pv-add inline-block rounded-sm border border-slate-300 dark:border-white/15 px-1 font-mono text-[9px] text-slate-600 dark:text-white/60 transition-colors data-[state=pressed]:bg-cyan-600 data-[state=pressed]:border-cyan-600 dark:data-[state=pressed]:border-cyan-600 data-[state=pressed]:text-white dark:data-[state=pressed]:text-white"
                >
                  add
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="pv-order invisible opacity-0 mt-2.5 font-mono text-[10px] text-emerald-700 dark:text-emerald-300">
        › order confirmed · email sent via Resend
      </p>
    </PreviewFrame>
  );
}

export default StorefrontPreview;
