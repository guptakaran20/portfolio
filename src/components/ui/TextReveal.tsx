"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  as?: React.ElementType;
}

export default function TextReveal({ text, className = "", once = true, as: Component = "h2" }: TextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: "chars,words" });

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
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      split.revert();
    };
  }, { scope: textRef });

  return (
    <Component ref={textRef} className={className}>
      {text}
    </Component>
  );
}
