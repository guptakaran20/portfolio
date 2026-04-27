"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useInView } from "react-intersection-observer";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export default function LazySection({ 
  children, 
  fallback = <div className="min-h-[50vh]" />, 
  threshold = 0.05,
  rootMargin = "200px" 
}: LazySectionProps) {
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasBeenInView) {
      // Use requestIdleCallback to further defer hydration if possible
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => setHasBeenInView(true));
      } else {
        setTimeout(() => setHasBeenInView(true), 1);
      }
    }
  }, [inView, hasBeenInView]);

  return (
    <div ref={ref}>
      {hasBeenInView ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
