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
      opacity: 0,
      y: 20,
      rotationX: -90,
      stagger: 0.02,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
        toggleActions: once
          ? "play none none none"
          : "play none none reverse",
      },
    });

    return () => split.revert();
  }, { scope: textRef });

  const Component = as;

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