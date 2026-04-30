"use client";

import React, { useRef, useState, useEffect } from "react";

export function LazyHydrate({
  children,
  fallback = null,
  rootMargin = "200px",
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHydrated(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  // Server render the children, but on client, wait until intersection to render
  // We use suppressHydrationWarning to avoid mismatch on the wrapper.
  return (
    <div ref={ref} suppressHydrationWarning>
      {isHydrated ? children : <div dangerouslySetInnerHTML={{ __html: "" }} suppressHydrationWarning />}
    </div>
  );
}
