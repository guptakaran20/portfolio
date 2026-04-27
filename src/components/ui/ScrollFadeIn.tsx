"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = elementRef.current;
      if (!element) return;

      const offsets = {
        up: { y: 30 },
        down: { y: -30 },
        left: { x: 30 },
        right: { x: -30 },
      };

      const offset = offsets[direction];

      gsap.fromTo(
        element,
        {
          opacity: 0,
          ...offset,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: elementRef }
  );

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollFadeIn;
