"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

const R = 25;
const C = 2 * Math.PI * R;

/** Round back-to-top button whose ring fills as you scroll. */
export function BackToTop() {
  const [shown, setShown] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    // at most once a frame, however many scroll events a fling fires
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setShown(window.scrollY > window.innerHeight * 0.6);
      ringRef.current?.setAttribute("stroke-dashoffset", (C * (1 - p)).toFixed(1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button className={`to-top ${shown ? "is-shown" : ""}`} aria-label="Back to top" onClick={() => lenis?.scrollTo(0)}>
      <svg className="totop-ring" viewBox="0 0 54 54" aria-hidden="true">
        <circle ref={ringRef} cx="27" cy="27" r={R} fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray={C} strokeDashoffset={C} />
      </svg>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M7 12V2M3 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/** Adds .is-in to every .reveal as it scrolls into view, including ones that mount later. */
export function Reveals() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // anything already scrolled past counts as seen too
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    const watch = (root: ParentNode) => root.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    watch(document);
    // sections that mount (or re-mount) later bring their own elements to reveal
    const mo = new MutationObserver((muts) => {
      for (const m of muts)
        m.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches(".reveal:not(.is-in)")) io.observe(n);
          watch(n);
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
