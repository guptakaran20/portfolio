"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturedProjectsClient() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        // Mobile: vertical stacked layout with stagger animations
        const cards = gsap.utils.toArray<HTMLElement>(".project-card-mobile");
        cards.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });

      mm.add("(min-width: 768px)", () => {
        // Desktop: horizontal scroll
        const section = document.querySelector(".desktop-section") as HTMLElement;
        const container = document.querySelector(".desktop-container") as HTMLElement;
        if (!section || !container) return;

        const scrollWidth = section.scrollWidth;
        const amountToScroll = Math.max(0, scrollWidth - window.innerWidth);

        const tl = gsap.to(section, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${amountToScroll}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            pinSpacing: true,
          },
        });

        // Animate each card as it enters the viewport during horizontal scroll
        const cards = gsap.utils.toArray<HTMLElement>(".project-card-desktop");
        cards.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 40, scale: 0.92 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: "left 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // Tilt effect for desktop cards
        const tiltCards = gsap.utils.toArray<HTMLElement>(".tilt-card-inner");
        tiltCards.forEach((el) => {
          const zLayer = el.querySelector(".z-layer");
          if (zLayer) {
            gsap.set(zLayer, { z: 50 });
          }

          const xTo = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power2.out" });
          const yTo = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power2.out" });

          gsap.set(el, {
            transformPerspective: 1000,
            transformOrigin: "center",
            force3D: true
          });

          const onMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPct = (x / rect.width - 0.5) * 12;
            const yPct = (y / rect.height - 0.5) * -12;

            xTo(xPct);
            yTo(yPct);
          };

          const onMouseLeave = () => {
            xTo(0);
            yTo(0);
          };

          el.addEventListener("mousemove", onMouseMove, { passive: true });
          el.addEventListener("mouseleave", onMouseLeave, { passive: true });
          
          (el as any)._cleanupTilt = () => {
            el.removeEventListener("mousemove", onMouseMove);
            el.removeEventListener("mouseleave", onMouseLeave);
          };
        });
      });

      return () => {
        const tiltCards = gsap.utils.toArray<HTMLElement>(".tilt-card-inner");
        tiltCards.forEach((el) => {
          if ((el as any)._cleanupTilt) (el as any)._cleanupTilt();
        });
      };
  }, []);

  return null;
}
