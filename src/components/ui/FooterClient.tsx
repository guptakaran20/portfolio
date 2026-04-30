"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function FooterAnimations() {
  useGSAP(() => {
    const footer = document.getElementById("footer-content");
    if (!footer) return;

      gsap.fromTo(footer.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
  }, []);

  return null;
}

export function TimeSpent() {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center order-1 md:order-2">
      <p className="text-gray-500 text-sm font-medium">Time Spent:</p>
      <p className="text-emerald-500 text-xl font-bold -mt-1">
        {timeSpent} <span className="text-sm font-normal text-emerald-500/80">sec</span>
      </p>
    </div>
  );
}
