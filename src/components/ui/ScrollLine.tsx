"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** A thin line that draws down a timeline as it scrolls through the viewport. */
export function ScrollLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      ref.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ref.current.parentElement, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
      },
    );
  }, []);
  return <span ref={ref} aria-hidden className={`absolute -left-px top-0 bottom-0 w-px origin-top ${className}`} />;
}
