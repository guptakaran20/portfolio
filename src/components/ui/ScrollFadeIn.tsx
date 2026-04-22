"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollFadeIn({ children, className }: ScrollFadeInProps) {
  const { scrollY } = useScroll();

  // Fade in as user scrolls through the transition zone (matches HeroScrollAnimation timing)
  const opacity = useTransform(scrollY, [500, 1000], [0, 1]);
  const y = useTransform(scrollY, [500, 1000], [40, 0]);
  const scale = useTransform(scrollY, [500, 1000], [0.98, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
