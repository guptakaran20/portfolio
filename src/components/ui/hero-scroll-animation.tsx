"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import React, { useRef, forwardRef } from "react";

interface HeroScrollAnimationProps {
  heroCmp: React.ReactNode;
  nextCmp: React.ReactNode;
}

const HeroScrollAnimation = forwardRef<HTMLDivElement, HeroScrollAnimationProps>(({ heroCmp, nextCmp }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use the forwarded ref if provided, otherwise use local ref
  const activeRef = (ref as React.RefObject<HTMLDivElement>) || containerRef;

  const { scrollYProgress } = useScroll({
    target: activeRef,
    offset: ["start start", "end end"],
  });

  // Hero section transforms (fading out and moving up)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  // Next section transforms (fading in and scaling up)
  const nextOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const nextScale = useTransform(scrollYProgress, [0.3, 0.6], [0.98, 1]);
  const nextY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);

  return (
    <div ref={activeRef} className="relative w-full bg-[#030303]">
      {/* Hero Section Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        <motion.div 
          style={{ 
            opacity: heroOpacity, 
            y: heroY,
            scale: heroScale,
          }}
          className="h-full w-full flex items-center justify-center"
        >
          {heroCmp}
        </motion.div>
      </div>

      {/* Next Section (Tech Stack) */}
      <motion.div
        style={{
          opacity: nextOpacity,
          scale: nextScale,
          y: nextY,
        }}
        className="relative min-h-screen w-full z-20 bg-[#030303]"
      >
        {nextCmp}
      </motion.div>
    </div>
  );
});


HeroScrollAnimation.displayName = "HeroScrollAnimation";

export { HeroScrollAnimation };

