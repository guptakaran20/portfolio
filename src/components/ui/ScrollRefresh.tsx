"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export default function ScrollRefresh() {
  useEffect(() => {
    // Initial refresh after a short delay to ensure all dynamic components have mounted
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // Refresh on window focus to handle tab switching
    const handleFocus = () => ScrollTrigger.refresh();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return null;
}
