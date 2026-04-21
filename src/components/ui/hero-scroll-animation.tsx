"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import React, { useRef, forwardRef } from "react";

interface HeroScrollAnimationProps {
  heroCmp: React.ReactNode;
  nextCmp: React.ReactNode;
}

const Section1: React.FC<{ scrollYProgress: MotionValue<number>; children: React.ReactNode }> = ({ scrollYProgress, children }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky top-0 h-screen w-full bg-[#030303] flex flex-col items-center justify-center text-white overflow-hidden origin-top"
    >
      {children}
    </motion.section>
  );
};

const Section2: React.FC<{ scrollYProgress: MotionValue<number>; children: React.ReactNode }> = ({ scrollYProgress, children }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="relative h-screen w-full bg-[#030303] text-white flex flex-col items-center justify-center overflow-hidden origin-bottom z-10 shadow-2xl"
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="w-full relative z-10 h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </motion.section>
  );
};

const HeroScrollAnimation = forwardRef<HTMLElement, HeroScrollAnimationProps>(({ heroCmp, nextCmp }, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className="relative h-[200vh] w-full bg-black">
      <Section1 scrollYProgress={scrollYProgress}>
        {heroCmp}
      </Section1>
      <Section2 scrollYProgress={scrollYProgress}>
        {nextCmp}
      </Section2>
    </main>
  );
});

HeroScrollAnimation.displayName = "HeroScrollAnimation";

export { HeroScrollAnimation };
