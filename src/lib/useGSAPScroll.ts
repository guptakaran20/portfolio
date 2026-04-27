"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface GSAPScrollOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  once?: boolean;
  start?: string;
}

export const useGSAPScroll = (options: GSAPScrollOptions = {}) => {
  const {
    y = 50,
    x = 0,
    opacity = 0,
    duration = 1,
    delay = 0,
    stagger = 0.2,
    once = true,
    start = "top 85%",
  } = options;

  const elementRef = useRef<any>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      const elements = elementRef.current.children.length > 0 
        ? elementRef.current.children 
        : [elementRef.current];

      gsap.from(elements, {
        y,
        x,
        opacity,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, { scope: elementRef });

  return elementRef;
};

