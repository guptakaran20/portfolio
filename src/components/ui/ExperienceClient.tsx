"use client";

import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-in reveal for `.exp-reveal` elements.
 * Skipped entirely when the visitor prefers reduced motion, so content is always visible.
 */
export function ExperienceAnimations() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = gsap.utils.toArray<HTMLElement>("#experience .exp-reveal");
    gsap.set(items, { opacity: 0, y: 32 });
    ScrollTrigger.batch(items, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", overwrite: true }),
    });
  }, []);

  return null;
}
