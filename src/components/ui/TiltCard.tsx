"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Card that tilts toward the pointer and lifts on hover, matching the project cards.
 * Mouse/trackpad only; skipped on touch devices and when reduced motion is requested.
 */
export function TiltCard({
  children,
  className,
  max = 6,
  lift = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!finePointer || reduced) return;

      gsap.set(el, { transformPerspective: 1100, transformOrigin: "center" });
      const rotX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
      const rotY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
      const posY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        rotY(x * max * 2);
        rotX(-y * max * 2);
      };
      const onEnter = () => posY(-lift);
      const onLeave = () => {
        rotX(0);
        rotY(0);
        posY(0);
      };

      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseenter", onEnter, { passive: true });
      el.addEventListener("mouseleave", onLeave, { passive: true });
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("group/tilt relative will-change-transform", className)}>
      {children}
    </div>
  );
}
