"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { gsap, useGSAP } from "@/lib/gsap";

type Build = (tl: gsap.core.Timeline, q: (selector: string) => Element[]) => void;

/**
 * A looping GSAP timeline scoped to one preview.
 * - plays only while the preview is on screen (works inside the pinned horizontal scroller too)
 * - with prefers-reduced-motion it jumps to the finished state and never animates
 * Timelines should reset their own starting state with tl.set(..., 0) so every loop starts clean.
 */
export function usePreviewTimeline(build: Build, options: { repeatDelay?: number } = {}) {
  const scope = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [reduced, setReduced] = useState(false);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.35 });

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      scope.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  useGSAP(
    () => {
      if (!scope.current) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setReduced(prefersReduced);
      const q = gsap.utils.selector(scope.current);
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: options.repeatDelay ?? 1.4 });
      build(tl, q);
      if (prefersReduced) tl.progress(1).pause();
      tlRef.current = tl;
      return () => {
        tl.kill();
      };
    },
    { scope },
  );

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || reduced) return;
    if (inView) tl.play();
    else tl.pause();
  }, [inView, reduced]);

  return setRef;
}
