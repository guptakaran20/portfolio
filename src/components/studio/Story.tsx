"use client";

import { useEffect, useRef, useState } from "react";
import { story } from "./data";

/** Rolling digits, like a tape counter. */
function Odometer({ value }: { value: string }) {
  return (
    <span className="odo" aria-label={value}>
      {value.split("").map((d, p) => (
        <span
          key={p}
          className="odo-col"
          aria-hidden="true"
          style={{ transform: `translateY(${-Number(d)}em)`, "--p": p } as React.CSSProperties}
        >
          {Array.from({ length: 10 }, (_, n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
      ))}
    </span>
  );
}

/** A watch face with tick marks; it winds backwards as you scroll. */
// fixed precision so server and client render identical attributes
const r2 = (n: number) => Math.round(n * 100) / 100;

function Dial() {
  const ticks = Array.from({ length: 120 }, (_, i) => i);
  return (
    <svg className="dial" viewBox="-100 -100 200 200" aria-hidden="true">
      {[96, 78, 60, 44].map((r) => (
        <circle key={r} r={r} fill="none" stroke="currentColor" strokeWidth={r === 96 ? 0.5 : 0.3} />
      ))}
      {ticks.map((i) => {
        const long = i % 10 === 0;
        const mid = i % 5 === 0;
        const a = (i / 120) * Math.PI * 2;
        const r1 = 96;
        const len = long ? 84 : mid ? 89 : 92;
        return (
          <line
            key={i}
            x1={r2(Math.cos(a) * r1)}
            y1={r2(Math.sin(a) * r1)}
            x2={r2(Math.cos(a) * len)}
            y2={r2(Math.sin(a) * len)}
            stroke="currentColor"
            strokeWidth={long ? 0.8 : 0.35}
          />
        );
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        return (
          <text key={i} x={r2(Math.cos(a) * 70)} y={r2(Math.sin(a) * 70 + 2)} fontSize="6" textAnchor="middle" fill="currentColor" fontFamily="monospace">
            {String(i === 0 ? 12 : i).padStart(2, "0")}
          </text>
        );
      })}
      <line x1="0" y1="0" x2="0" y2="-56" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="0" y1="0" x2="38" y2="0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Story() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);
  const chapter = story[active];

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));

    // write the transforms straight onto the two elements that move, so a scroll frame
    // touches nothing else (a custom property on the section would restyle all of it)
    const dial = sectionRef.current?.querySelector<SVGElement>(".dial");
    const fill = sectionRef.current?.querySelector<HTMLElement>(".story-fill");
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return; // off screen: nothing to move
        const prog = Math.min(1, Math.max(0, (window.innerHeight / 2 - r.top) / r.height));
        if (dial) dial.style.transform = `translateY(-50%) rotate(${(-prog * 540).toFixed(2)}deg)`;
        if (fill) fill.style.transform = `scaleY(${prog.toFixed(4)})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="story"
      id="story"
      aria-labelledby="story-title"
      style={{ "--tint": chapter.tint } as React.CSSProperties}
    >
      <div className="story-bg" aria-hidden="true">
        <span className="blob a" />
        <span className="blob b" />
        <Dial />
      </div>
      <div className="wrap story-grid">
        <div className="story-left">
          <p className="eyebrow">My story</p>
          <h2 id="story-title" className="display">
            Let&apos;s rewind
            <br />
            the tape.
          </h2>
          <Odometer value={chapter.year} />
          <p className="mono story-range">{chapter.range}</p>
          <div className="story-progress" style={{ "--spin": `${-active * 72}deg` } as React.CSSProperties}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9a6 6 0 1 0 1.8-4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M2.6 2.2v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 5.5V9l2.4 1.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span>
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(story.length).padStart(2, "0")}
            </span>
            <span className="story-track" style={{ "--prog": (active + 1) / story.length } as React.CSSProperties}>
              <i />
            </span>
          </div>
        </div>
        <div className="story-right">
          <div className="story-rail" aria-hidden="true">
            <span className="story-fill" />
            <span className="story-dot" />
          </div>
          <ol>
            {story.map((c, i) => (
              <li
                key={c.title}
                ref={(el) => {
                  items.current[i] = el;
                }}
                data-i={i}
                className={`chapter ${active === i ? "is-active" : ""}`}
              >
                <span className="year-m" aria-hidden="true">
                  {c.year}
                </span>
                <p className="mono">{c.range}</p>
                <h3>{c.title}</h3>
                <p className="where">{c.where}</p>
                <ul>
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
