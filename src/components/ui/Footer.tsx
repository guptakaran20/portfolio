"use client";

import { useState, useEffect } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full pt-8 pb-24 md:pb-24 border-t border-white/10 bg-[#030303]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-sm order-2 md:order-1">
          &copy; {currentYear} Made with ❤️ & 💻 by Karan Gupta.
        </p>

        <div className="flex flex-col items-center order-1 md:order-2">
          <p className="text-gray-500 text-sm font-medium">Time Spent:</p>
          <p className="text-emerald-500 text-xl font-bold -mt-1">
            {timeSpent} <span className="text-sm font-normal text-emerald-500/80">sec</span>
          </p>
        </div>

        <div className="flex gap-6 order-3">
          <a href="https://www.linkedin.com/in/guptakaran0720/" className="text-gray-500 hover:text-white transition-colors text-sm">LinkedIn</a>
          <a href="https://github.com/guptakaran20" className="text-gray-500 hover:text-white transition-colors text-sm">GitHub</a>
          <a href="https://www.instagram.com/guptakaran20/" className="text-gray-500 hover:text-white transition-colors text-sm">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
