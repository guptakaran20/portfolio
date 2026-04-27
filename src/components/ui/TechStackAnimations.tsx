"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export function TechStackAnimations({ gridRef, leftRef, techDataCount }: { gridRef: React.RefObject<any>, leftRef: React.RefObject<any>, techDataCount: number }) {
  useGSAP(() => {
    // Floating animation for the whole container
    gsap.to(leftRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Category headers animation
    const headers = gridRef.current?.querySelectorAll('h3');
    if (headers) {
      headers.forEach((header: HTMLElement) => {
        gsap.fromTo(header, 
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }

    // Tech badges stagger
    gsap.fromTo(".tech-badge", 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.02, 
        ease: "power2.out", 
        scrollTrigger: { 
          trigger: gridRef.current, 
          start: "top 85%" 
        } 
      }
    );
    
    // Refresh ScrollTrigger after a short delay
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, { scope: gridRef, dependencies: [techDataCount] });

  return null;
}
