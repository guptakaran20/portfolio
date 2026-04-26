"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "html",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div 
      ref={progressRef}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-indigo-500 to-cyan-500 z-[100] origin-left scale-x-0 will-change-transform"
    />
  );
}
