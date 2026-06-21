"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setIsHoverDevice(true);
      
      // Initialize cursor positions off-screen
      gsap.set(cursorRef.current, { x: -100, y: -100 });

      const onMouseMove = (e: MouseEvent) => {
        // No delay, direct follow for arrow cursor to feel responsive
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0,
        });
      };

      const handleMouseEnter = () => {
        gsap.to(cursorRef.current, { scale: 1.25, duration: 0.2 });
      };

      const handleMouseLeave = () => {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
      };

      const handleWindowMouseLeave = () => {
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
      };

      const handleWindowMouseEnter = () => {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });
      };

      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", handleWindowMouseLeave);
      document.addEventListener("mouseenter", handleWindowMouseEnter);

      // Bind hover events to interactive elements dynamically
      const observer = new MutationObserver(() => {
        const interactives = document.querySelectorAll("a:not([data-cursor-bound]), button:not([data-cursor-bound]), [role='button']:not([data-cursor-bound])");
        interactives.forEach((el) => {
          el.setAttribute("data-cursor-bound", "true");
          el.addEventListener("mouseenter", handleMouseEnter);
          el.addEventListener("mouseleave", handleMouseLeave);
        });
      });
      
      // Initial bind
      const interactives = document.querySelectorAll("a, button, [role='button']");
      interactives.forEach((el) => {
        el.setAttribute("data-cursor-bound", "true");
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", handleWindowMouseLeave);
        document.removeEventListener("mouseenter", handleWindowMouseEnter);
        observer.disconnect();
      };
    }
  }, []);

  if (!isHoverDevice) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        body, a, button, [role="button"], input, textarea, select { cursor: none !important; }
      `}} />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] text-white"
        style={{ transformOrigin: "0 0" }} // Scale from the tip of the cursor
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="white" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          <path 
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L6.35 3.21a.5.5 0 0 0-.85.35Z" 
            stroke="black" 
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
