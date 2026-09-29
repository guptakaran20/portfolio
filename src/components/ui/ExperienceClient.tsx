"use client";

import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-in reveal for `.exp-reveal` elements and a count-up for `[data-count]` stats.
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

    gsap.utils.toArray<HTMLElement>("#experience [data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const counter = { value: 0 };
      el.textContent = "0" + suffix;
      gsap.to(counter, {
        value: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = Math.round(counter.value).toLocaleString("en-US") + suffix;
        },
      });
    });
  }, []);

  return null;
}
