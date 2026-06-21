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
    <div className="flex flex-col items-center md:items-start md:text-left text-center">
      <p className="text-slate-900 dark:text-white text-base">Time Spent:</p>
      <p className="text-emerald-500 text-lg font-semibold -mt-0.5">
        {timeSpent} <span className="text-base font-normal text-emerald-500">sec</span>
      </p>
    </div>
  );
}
