"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function TechBadgeInteractive({ children }: { children: React.ReactNode }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!badgeRef.current || !contentRef.current) return;
    
    const badge = badgeRef.current;
    const content = contentRef.current;
    
    const ctx = gsap.context(() => {
      // Icon pulse animation
      gsap.to(badge.querySelector(".tech-icon"), {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });

      // Magnetic Hover Effect
      const onMouseMove = (e: MouseEvent) => {
        const rect = badge.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(content, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.4,
          ease: "power2.out"
        });
        
        gsap.to(badge.querySelector(".glow"), {
          x: x * 0.3,
          y: y * 0.3,
          opacity: 1,
          duration: 0.4
        });
      };

      const onMouseLeave = () => {
        gsap.to(content, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
        
        gsap.to(badge.querySelector(".glow"), {
          x: 0,
          y: 0,
          opacity: 0,
          duration: 0.6
        });
      };

      badge.addEventListener("mousemove", onMouseMove, { passive: true });
      badge.addEventListener("mouseleave", onMouseLeave, { passive: true });
    }, badgeRef);

    return () => ctx.revert();
  }, { scope: badgeRef });

  return (
    <div ref={badgeRef} className="group relative">
      <div 
        ref={contentRef}
        className="relative flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:border-white/[0.15]"
      >
        <div className="glow absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-transparent opacity-0 pointer-events-none blur-xl" />
        {children}
      </div>
    </div>
  );
}

export function OrbitalSystem({ size, Atom, Hexagon, Database }: { size: number; Atom: any; Hexagon: any; Database: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Core pulse
      gsap.to(".core-pulse", {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative" style={{ width: size, height: size }}>
      {/* Center Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="core-pulse w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.2)]">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 blur-md" />
        </div>
      </div>

      {/* Orbits */}
      <Orbit size={size * 0.6} duration={25} angle={0}>
        <Atom className="w-5 h-5 text-cyan-400" />
      </Orbit>
      <Orbit size={size * 0.85} duration={35} angle={120} reverse>
        <Hexagon className="w-5 h-5 text-purple-400" />
      </Orbit>
      <Orbit size={size} duration={45} angle={240}>
        <Database className="w-5 h-5 text-blue-400" />
      </Orbit>

      {/* SVG Orbit Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={(size * 0.6) / 2} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx={size / 2} cy={size / 2} r={(size * 0.85) / 2} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx={size / 2} cy={size / 2} r={size / 2} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
      </svg>
    </div>
  );
}

function Orbit({ size, duration, children, angle, reverse = false }: { size: number, duration: number, children: React.ReactNode, angle: number, reverse?: boolean }) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbitRef.current, {
        rotate: reverse ? -360 : 360,
        duration: duration,
        repeat: -1,
        ease: "none"
      });
      gsap.to(iconRef.current, {
        rotate: reverse ? 360 : -360,
        duration: duration,
        repeat: -1,
        ease: "none"
      });
    }, orbitRef);
    return () => ctx.revert();
  }, { scope: orbitRef });

  return (
    <div
      ref={orbitRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <div
          ref={iconRef}
          className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm flex items-center justify-center relative group"
        >
          <div className="absolute inset-0 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors blur-xl" />
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
