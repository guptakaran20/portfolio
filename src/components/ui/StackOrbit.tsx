"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

type Layer = { category: string; short: string; icon: React.ReactNode; tools: string[] };

const CORE = 0.3; // core diameter as a fraction of the orbit
const ringPct = (i: number, n: number) => 40 + (i * 60) / (n - 1); // 40% → 100%

/**
 * The stack as concentric layers: one ring per category, one icon per ring.
 * Point at a ring (or its category on the left) to light it up; the core lists its tools.
 * Without a pointer it follows the category being scrolled past.
 * Categories on the left must carry data-layer={index} inside #tech-grid.
 */
export function StackOrbit({ layers }: { layers: Layer[] }) {
  const root = useRef<HTMLDivElement>(null);
  const tweens = useRef<gsap.core.Tween[]>([]);
  const [scrollActive, setScrollActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const n = layers.length;
  const active = hovered ?? scrollActive;

  // Slow drift: rings alternate direction; icons counter-rotate to stay upright.
  useGSAP(
    () => {
      if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(root.current);
      layers.forEach((_, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        const duration = 70 + i * 12;
        tweens.current.push(gsap.to(q(`.orbit-ring-${i}`), { rotation: `+=${360 * dir}`, duration, repeat: -1, ease: "none" }));
        tweens.current.push(gsap.to(q(`.orbit-chip-${i}`), { rotation: `+=${-360 * dir}`, duration, repeat: -1, ease: "none" }));
      });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => tweens.current.forEach((t) => (self.isActive ? t.resume() : t.pause())),
      });
      return () => {
        st.kill();
        tweens.current = [];
      };
    },
    { scope: root },
  );

  // Pause the drift while the pointer is on the orbit so the labels are easy to read.
  useEffect(() => {
    tweens.current.forEach((t) => (hovered === null ? t.resume() : t.pause()));
  }, [hovered]);

  // Follow the category being read (scroll) or pointed at (hover) in the list on the left.
  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("#tech-grid [data-layer]"));
    const triggers = blocks.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setScrollActive(Number(el.dataset.layer)),
      }),
    );
    const onEnter = (e: Event) => setHovered(Number((e.currentTarget as HTMLElement).dataset.layer));
    const onLeave = () => setHovered(null);
    blocks.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => {
      triggers.forEach((t) => t.kill());
      blocks.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Mirror the active layer onto the list on the left.
  useEffect(() => {
    document.querySelectorAll<HTMLElement>("#tech-grid [data-layer]").forEach((el) => {
      el.dataset.active = String(Number(el.dataset.layer) === active);
    });
  }, [active]);

  // Which ring is under the pointer: compare the pointer's distance from the centre with each ring's radius.
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) / (r.width / 2);
    if (d < CORE) return; // over the core: keep the current layer
    let best = 0;
    for (let i = 1; i < n; i++) {
      if (Math.abs(d - ringPct(i, n) / 100) < Math.abs(d - ringPct(best, n) / 100)) best = i;
    }
    setHovered(d > 1.08 ? null : best);
  };

  const current = layers[active];

  return (
    <div
      ref={root}
      aria-hidden="true"
      onMouseMove={onMove}
      onMouseLeave={() => setHovered(null)}
      className="relative aspect-square select-none"
      style={{ width: "var(--orbit, 100%)", maxWidth: "100%" }}
    >
      {layers.map((layer, i) => {
        const isActive = i === active;
        const pct = ringPct(i, n);
        const start = i * 51; // spread the icons around the circle
        return (
          <div
            key={layer.category}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: `${pct}%`, height: `${pct}%` }}
          >
            <span
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isActive
                  ? "border-2 border-cyan-500/80 shadow-[0_0_24px_rgba(6,182,212,0.25),inset_0_0_24px_rgba(6,182,212,0.12)]"
                  : "border border-dashed border-slate-300/80 dark:border-white/[0.09]"
              }`}
            />
            <div className={`orbit-ring-${i} absolute inset-0`} style={{ transform: `rotate(${start}deg)` }}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" style={{ transform: `rotate(${-start}deg)` }}>
                <div className={`orbit-chip-${i}`}>
                  <div
                    onMouseEnter={() => setHovered(i)}
                    className={`relative flex items-center justify-center w-11 h-11 rounded-full border bg-white dark:bg-[#0c0c0c] shadow-sm transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-cyan-500 shadow-[0_0_18px_rgba(6,182,212,0.35)] opacity-100"
                        : "border-slate-200 dark:border-white/10 dark:shadow-none opacity-50"
                    }`}
                  >
                    {layer.icon}
                    <span
                      className={`absolute left-full ml-2 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-300 ${
                        isActive
                          ? "opacity-100 translate-x-0 border-cyan-500/40 bg-white text-slate-900 dark:bg-[#0c0c0c] dark:text-white"
                          : "opacity-0 -translate-x-1 pointer-events-none border-transparent"
                      }`}
                    >
                      {layer.short}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Core: the active layer and its tools */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full flex flex-col items-center justify-center text-center px-5 bg-white dark:bg-[#0a0a0a] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
        style={{ width: `${CORE * 100}%` }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500 dark:text-white/55">
          layer {active + 1} / {n}
        </span>
        <span key={active} className="mt-1 text-base font-semibold leading-tight text-slate-900 dark:text-white animate-in fade-in zoom-in-95 duration-300">
          {current.category}
        </span>
        <span key={`t${active}`} className="mt-1.5 text-[11px] leading-snug text-slate-600 dark:text-white/65 line-clamp-3 animate-in fade-in duration-500">
          {current.tools.join(" · ")}
        </span>
      </div>
    </div>
  );
}
