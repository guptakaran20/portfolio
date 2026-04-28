"use client";

import { useState, useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

function TimeCounter() {
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

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useGSAP(() => {
    const el = footerRef.current;
    if (!el) return;

    gsap.fromTo(el.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: footerRef });

  return (
    <footer className="w-full pt-8 pb-24 md:pb-12 mb-6 border-t border-white/10 bg-[#030303]">
      <div ref={footerRef} className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-sm order-2 md:order-1">
          &copy; {currentYear} Made with ❤️ &amp; 💻 by Karan Gupta.
        </p>

        <TimeCounter />

        <div className="flex gap-6 order-3">
          <a href="https://www.linkedin.com/in/guptakaran0720/" className="text-gray-500 hover:text-white transition-colors text-sm">LinkedIn</a>
          <a href="https://github.com/guptakaran20" className="text-gray-500 hover:text-white transition-colors text-sm">GitHub</a>
          <a href="https://www.instagram.com/guptakaran0720/" className="text-gray-500 hover:text-white transition-colors text-sm">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

