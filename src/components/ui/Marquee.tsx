"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import React, { useRef } from "react";

interface MarqueeProps {
  text: string;
  speed?: number;
  reverse?: boolean;
}

export default function Marquee({ text, speed = 20, reverse = false }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: reverse ? 100 : -100,
        duration: speed,
        repeat: -1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-10 bg-white/[0.02] border-y border-white/5">
      <div 
        ref={marqueeRef} 
        className="flex whitespace-nowrap will-change-transform"
      >
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center"
          >
            <span className="text-4xl md:text-6xl font-bold text-white/20 px-8 uppercase tracking-tighter">
              {text}
            </span>
            <span className="text-2xl text-rose-500/50">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

