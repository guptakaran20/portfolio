"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface TypingTextProps {
  texts: string[];
  delay?: number;
  repeatDelay?: number;
}

export default function TypingText({ texts, delay = 0, repeatDelay = 2 }: TypingTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      delay: delay,
    });

    texts.forEach((text) => {
      tl.to(textRef.current, {
        duration: text.length * 0.1,
        text: text,
        ease: "none",
      })
      .to({}, { duration: repeatDelay }) // Pause at end
      .to(textRef.current, {
        duration: text.length * 0.05,
        text: "",
        ease: "none",
      });
    });

    // Cursor blink
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [texts, delay, repeatDelay]);

  return (
    <span className="inline-flex items-center">
      <span ref={textRef} className="min-h-[1em]"></span>
      <span ref={cursorRef} className="w-[2px] h-[0.8em] bg-rose-500 ml-1"></span>
    </span>
  );
}
