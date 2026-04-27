"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SplitType from "split-type";

interface TextRevealProps {
  text: string;
  className?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = new SplitType(textRef.current, {
        types: "chars,words",
        tagName: "span",
      });

      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
        opacity: 0.2,
        stagger: 0.1,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`py-20 ${className}`}>
      <h2
        ref={textRef}
        className="text-4xl md:text-6xl font-bold text-white leading-tight"
      >
        {text}
      </h2>
    </div>
  );
};