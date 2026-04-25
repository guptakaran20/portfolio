"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type TextRevealProps = {
  className?: string;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  children: React.ReactNode;
};

export default function TextReveal({
  children,
  className = "",
  once = true,
  as = "h2",
}: TextRevealProps) {
  const textRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, {
      types: "chars,words",
    });

    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      rotateX: -90,
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
    <Component ref={textRef as any} className={className}>
      {children}
    </Component>
  );
}