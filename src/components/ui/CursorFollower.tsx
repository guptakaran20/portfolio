"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use quickTo for high-performance updates
    const xCursorTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yCursorTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });
    const xFollowerTo = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power2" });
    const yFollowerTo = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power2" });

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to batch updates
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        xCursorTo(e.clientX);
        yCursorTo(e.clientY);
        xFollowerTo(e.clientX);
        yFollowerTo(e.clientY);
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
    </>
  );
}

