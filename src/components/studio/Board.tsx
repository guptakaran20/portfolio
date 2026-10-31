"use client";

import { useEffect, useRef, useState } from "react";
import { numbers } from "./data";
import { click } from "./sound";

const WIDTH = 5;
const GLYPHS = "0123456789+";

function Flap({ ch, prev, tick }: { ch: string; prev: string; tick: number }) {
  return (
    <span className="flap" aria-hidden="true">
      <span className="top">{ch}</span>
      <span className="bot">{ch}</span>
      {tick > 0 && prev !== ch && (
        <span key={tick} className="leaf">
          {prev}
        </span>
      )}
    </span>
  );
}

/** A departures board that clatters through characters before landing on each total. */
export function Board() {
  const targets = numbers.map((n) => n.value.padStart(WIDTH, " "));
  const blank = () => targets.map(() => Array<string>(WIDTH).fill(" "));
  const [frame, setFrame] = useState(() => ({ cells: blank(), prev: blank(), tick: 0 }));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setFrame((f) => ({ cells: targets.map((t) => t.split("")), prev: f.cells, tick: 0 }));
          return;
        }
        let step = 0;
        timer = window.setInterval(() => {
          step++;
          let settled = true;
          const next = targets.map((t, r) =>
            t.split("").map((ch, c) => {
              // each cell settles a little later than the one before it
              const landAt = 6 + c * 2 + r * 2;
              if (ch === " " || step >= landAt) return ch;
              settled = false;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }),
          );
          setFrame((f) => ({ cells: next, prev: f.cells, tick: step }));
          if (step % 2 === 0) click("flap");
          if (settled) window.clearInterval(timer);
        }, 75);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="board-sec" aria-labelledby="board-title">
      <div className="wrap">
        <div className="board-head reveal">
          <div>
            <p className="eyebrow">By the numbers</p>
            <h2 id="board-title" className="display">
              Arrivals,
              <br />
              all on time.
            </h2>
          </div>
          <p>Counted from git, LeetCode and GitHub, not rounded up for effect. Most of it landed in 2026.</p>
        </div>
        <div ref={ref} className="board reveal">
          <div className="board-top mono">
            <span>KG-OPS · Live totals</span>
            <span className="lamp">On time</span>
          </div>
          {numbers.map((n, r) => (
            <div key={n.label} className="board-row">
              <span className="board-label mono">{n.label}</span>
              <span className="flaps">
                <span className="sr-only">{n.value}</span>
                {frame.cells[r].map((ch, c) => (
                  <Flap key={c} ch={ch} prev={frame.prev[r][c]} tick={frame.tick} />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
