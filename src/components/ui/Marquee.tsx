"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

interface MarqueeProps {
  text: string;
  speed?: number;
  reverse?: boolean;
}

export default function Marquee({ text, speed = 20, reverse = false }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!marqueeRef.current || !textRef.current) return;

    const width = textRef.current.offsetWidth;
    
    gsap.to(marqueeRef.current, {
      x: reverse ? width : -width,
      duration: speed,
      repeat: -1,
      ease: "none",
    });
  }, { scope: marqueeRef });

  return (
    <div className="relative w-full overflow-hidden py-10 bg-white/[0.02] border-y border-white/5">
      <div 
        ref={marqueeRef} 
        className="flex whitespace-nowrap"
        style={{ x: reverse ? "-100%" : "0" }}
      >
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            ref={i === 0 ? textRef : null}
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
