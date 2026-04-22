"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import React, { useRef, forwardRef } from "react";

interface HeroScrollAnimationProps {
  heroCmp: React.ReactNode;
  nextCmp: React.ReactNode;
}

const HeroScrollAnimation = forwardRef<HTMLDivElement, HeroScrollAnimationProps>(({ heroCmp, nextCmp }, ref) => {
  const { scrollY } = useScroll();

  // Mapping global scroll pixels to transforms
  // Hero fades and moves between 0 and 400px
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -40]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.98]);

  // Next section fades and moves between 500px and 1000px
  const nextOpacity = useTransform(scrollY, [500, 1000], [0, 1]);
  const nextY = useTransform(scrollY, [500, 1000], [40, 0]);
  const nextScale = useTransform(scrollY, [500, 1000], [0.98, 1]);

  // Pointer events and visibility management
  const heroDisplay = useTransform(scrollY, (pos) => pos > 600 ? "none" : "flex");
  const nextDisplay = useTransform(scrollY, (pos) => pos < 400 ? "none" : "flex");

  return (
    <div className="relative w-full h-[250vh] bg-[#030303]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-visible">
        {/* Hero Section Container */}
        <motion.div 
          style={{ 
            opacity: heroOpacity, 
            y: heroY,
            scale: heroScale,
            display: heroDisplay,
            zIndex: 10,
            width: "100%",
            height: "100%"
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-full h-full pointer-events-auto">
            {heroCmp}
          </div>
        </motion.div>

        {/* Next Section Container */}
        <motion.div 
          style={{ 
            opacity: nextOpacity,
            y: nextY,
            scale: nextScale,
            display: nextDisplay,
            zIndex: 20,
            width: "100%",
            height: "100%"
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-full h-full pointer-events-auto">
            {nextCmp}
          </div>
        </motion.div>
      </div>
    </div>
  );
});







HeroScrollAnimation.displayName = "HeroScrollAnimation";

export { HeroScrollAnimation };

