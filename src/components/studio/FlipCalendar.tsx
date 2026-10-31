"use client";

import { useEffect, useRef, useState } from "react";

const HOLD = 1300; // how long each page stays up
const FLIP = 950; // one page turn

function Page({ count }: { count: number }) {
  return (
    <>
      <span className="cal-holes">
        {Array.from({ length: count }, (_, k) => (
          <i key={k} />
        ))}
      </span>
      <span className="cal-word" />
      <span className="cal-no" />
      <span className="cal-shade" />
    </>
  );
}

/** A ring-bound desk calendar: each page turns over the rings and tucks in behind the stack. */
export function FlipCalendar({ words }: { words: string[] }) {
  const calRef = useRef<HTMLSpanElement>(null);
  const [rings, setRings] = useState(12);

  useEffect(() => {
    const cal = calRef.current!;
    const body = cal.querySelector<HTMLElement>(".cal-body")!;
    const leaf = cal.querySelector<HTMLElement>(".cal-leaf")!;
    const face = cal.querySelector<HTMLElement>(".cal-face")!;
    const under = cal.querySelector<HTMLElement>(".cal-page")!;
    const rear = cal.querySelector<HTMLElement>(".cal-rear")!;
    const measure = cal.querySelector<HTMLElement>(".cal-measure")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = words.length;
    let i = 0, timer = 0, started = false, disposed = false;

    const paint = (page: HTMLElement, k: number) => {
      page.querySelector(".cal-word")!.textContent = words[k];
      page.querySelector(".cal-no")!.textContent = `${String(k + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    };
    paint(face, 0);
    paint(under, 1 % n);

    // size the page to the longest word, and shrink the whole calendar if the column is too narrow
    let fitT = 0;
    const fit = () => {
      cal.style.fontSize = "";
      const fs = parseFloat(getComputedStyle(cal).fontSize);
      let max = 0;
      for (const w of words) {
        measure.textContent = w;
        max = Math.max(max, measure.getBoundingClientRect().width);
      }
      const wEm = max / fs + 0.8 + 0.06; // word + side padding
      body.style.setProperty("--cal-w", wEm.toFixed(3) + "em");
      const avail = (cal.parentElement?.getBoundingClientRect().width ?? 0) - fs * 0.25;
      if (avail > 0 && wEm * fs > avail) cal.style.fontSize = ((fs * avail) / (wEm * fs)).toFixed(2) + "px";
      // spiral rings and punched holes, roughly every 0.7em
      setRings(Math.max(5, Math.round((wEm - 0.64) / 0.7) + 1));
    };
    fit();
    document.fonts?.ready.then(() => !disposed && fit());
    const onResize = () => {
      window.clearTimeout(fitT);
      fitT = window.setTimeout(fit, 120);
    };
    window.addEventListener("resize", onResize);

    // only turn pages while the calendar is on screen; off screen it would animate for nobody
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting));
    io.observe(cal);

    const flip = () => {
      if (disposed) return;
      if (document.hidden || !onScreen) {
        timer = window.setTimeout(flip, 600);
        return;
      }
      const next = (i + 1) % n;
      if (reduced) {
        i = next;
        paint(face, i);
        paint(under, (i + 1) % n);
        timer = window.setTimeout(flip, HOLD + 700);
        return;
      }
      const lin = { duration: FLIP, easing: "linear", fill: "forwards" } as const;
      // once the page is over the top it slips away behind the calendar instead of hanging over the text
      face.animate([{ opacity: 1 }, { opacity: 1, offset: 0.285 }, { opacity: 0, offset: 0.295 }, { opacity: 0 }], lin);
      // the back of the page catches the light coming over the top, then falls into shadow behind the stack
      rear.animate(
        [{ filter: "brightness(1)" }, { filter: "brightness(1.02)", offset: 0.29 }, { filter: "brightness(.96)", offset: 0.45 }, { filter: "brightness(.9)" }],
        lin,
      );
      const a = leaf.animate(
        [{ transform: "translateZ(.004em) rotateX(0deg)" }, { transform: "translateZ(.004em) rotateX(352deg)" }],
        { duration: FLIP, easing: "cubic-bezier(.5,.05,.2,1)", fill: "forwards" },
      );
      face.querySelector<HTMLElement>(".cal-shade")!.animate(
        [{ opacity: 0 }, { opacity: 0.45, offset: 0.2 }, { opacity: 0, offset: 0.275 }, { opacity: 0 }],
        lin,
      );
      under.querySelector<HTMLElement>(".cal-shade")!.animate([{ opacity: 0.7 }, { opacity: 0 }], {
        duration: FLIP * 0.9,
        easing: "cubic-bezier(.3,.6,.4,1)",
        fill: "forwards",
      });
      a.onfinish = () => {
        i = next;
        paint(face, i); // the leaf now shows what was underneath…
        leaf.getAnimations({ subtree: true }).forEach((x) => x.cancel());
        cal.querySelectorAll<HTMLElement>(".cal-shade").forEach((sh) => sh.getAnimations().forEach((x) => x.cancel()));
        paint(under, (i + 1) % n); // …and the next word waits below
        timer = window.setTimeout(flip, HOLD);
      };
    };
    const start = () => {
      if (started) return;
      started = true;
      timer = window.setTimeout(flip, 1300);
    };
    if (document.documentElement.dataset.ready) start();
    else window.addEventListener("intro:ready", start, { once: true });

    return () => {
      disposed = true;
      io.disconnect();
      window.clearTimeout(timer);
      window.clearTimeout(fitT);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("intro:ready", start);
      leaf.getAnimations({ subtree: true }).forEach((x) => x.cancel());
    };
  }, [words]);

  return (
    <span ref={calRef} className="cal" aria-hidden="true">
      <span className="cal-body">
        <span className="cal-stand" />
        <span className="cal-stack">
          <span className="cal-back">
            <span className="cal-holes">
              {Array.from({ length: rings }, (_, k) => (
                <i key={k} />
              ))}
            </span>
          </span>
          <span className="cal-page">
            <Page count={rings} />
          </span>
          <span className="cal-leaf">
            <span className="cal-face">
              <Page count={rings} />
            </span>
            <span className="cal-rear">
              <span className="cal-holes">
                {Array.from({ length: rings }, (_, k) => (
                  <i key={k} />
                ))}
              </span>
            </span>
          </span>
        </span>
        <span className="cal-rings">
          {Array.from({ length: rings }, (_, k) => (
            <i key={k} />
          ))}
        </span>
      </span>
      <span className="cal-measure" />
    </span>
  );
}
