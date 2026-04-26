"use client";

import {
  Code2, Zap, Atom, Server, Hexagon,
  Database, Layout, Terminal, Box } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGSAPScroll } from "@/lib/useGSAPScroll";

// Custom Icon Components for missing lucide-react icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FigmaIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
);

const FileCodeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 13-2 2 2 2" />
    <path d="m15 13 2 2-2 2" />
  </svg>
);

const LeetcodeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.332-4.363c.467-.467 1.112-.662 1.824-.662s1.356.195 1.823.662l2.697 2.606c.514.515 1.335.515 1.849 0 .514-.513.514-1.334 0-1.848l-2.697-2.606" />
    <path d="M11.67 12.901V1.757" />
  </svg>
);

const VercelIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2L24 22H0L12 2Z" />
  </svg>
);

const techData = [
  {
    category: "Programming Languages",
    items: [
      { name: "JavaScript", icon: <Code2 className="w-4 h-4 text-yellow-400" /> },
      { name: "TypeScript", icon: <FileCodeIcon className="w-4 h-4 text-blue-400" /> },
      { name: "Python", icon: <Box className="w-4 h-4 text-blue-500" /> },
      { name: "C/C++", icon: <Code2 className="w-4 h-4 text-blue-600" /> },
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: <Atom className="w-4 h-4 text-cyan-400" /> },
      { name: "Next.js", icon: <Zap className="w-4 h-4 text-white" /> },
      { name: "Tailwind CSS", icon: <Layout className="w-4 h-4 text-cyan-300" /> },
      // { name: "Framer Motion", icon: <Zap className="w-4 h-4 text-purple-400" /> },
      { name: "HTML/CSS", icon: <FileCodeIcon className="w-4 h-4 text-orange-400" /> },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: <Hexagon className="w-4 h-4 text-green-500" /> },
      { name: "Express", icon: <Server className="w-4 h-4 text-gray-400" /> },
      { name: "REST API", icon: <Zap className="w-4 h-4 text-purple-400" /> },
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: <Database className="w-4 h-4 text-blue-500" /> },
      { name: "MongoDB", icon: <Database className="w-4 h-4 text-green-400" /> },
      { name: "MySQL", icon: <Database className="w-4 h-4 text-red-500" /> },
    ]
  },
  {
    category: "Version Control",
    items: [
      { name: "Git/GitHub", icon: <GithubIcon className="w-4 h-4 text-white" /> },
    ]
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "VS Code", icon: <Terminal className="w-4 h-4 text-blue-400" /> },
      { name: "Vercel", icon: <VercelIcon className="w-4 h-4 text-emerald-400" /> },
      { name: "Leetcode", icon: <LeetcodeIcon className="w-4 h-4 text-emerald-400" /> },
    ]
  }
];

export function TechStack() {
  const [isMobile, setIsMobile] = useState(false);
  const leftRef = useGSAPScroll({ x: -50 });
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Floating animation for the whole container
    gsap.to(leftRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Category header scan effect
    techData.forEach((_, i) => {
      gsap.to(`.category-header-${i}`, {
        opacity: 1,
        duration: 1,
        delay: i * 0.2,
        scrollTrigger: {
          trigger: `.category-header-${i}`,
          start: "top 90%"
        }
      });
    });

    gsap.fromTo(".tech-badge", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power2.out", scrollTrigger: { trigger: gridRef.current, start: "top 85%" } }
    );
  }, { scope: gridRef });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="skills" className="relative w-full min-h-screen py-16 sm:py-20 md:py-24 lg:py-32 bg-[#030303] flex flex-col justify-start">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-blue-950/5 to-[#030303] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-8 sm:gap-10 lg:gap-20">

          <div ref={leftRef} className="flex-1 w-full space-y-6 sm:space-y-8 lg:space-y-10">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tight">
                Technical Arsenal
              </h2>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl">
                A curated selection of tools and technologies I use to bring modern digital experiences to life.
              </p>
            </div>

            <div ref={gridRef} className="space-y-5 sm:space-y-6 lg:space-y-8">
              {techData.map((category, idx) => (
                <div key={category.category} className="space-y-4">
                  <h3 className={`category-header-${idx} text-xs uppercase tracking-[0.2em] text-white/40 font-semibold opacity-0`}>
                    {category.category}
                  </h3>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.items.map((tech) => (
                      <div key={tech.name} className="tech-badge">
                        <TechBadge tech={tech} />
                      </div>
                    ))}
                  </div>
                  {idx !== techData.length - 1 && (
                    <div className="w-full h-px bg-gradient-to-r from-white/5 via-white/10 to-transparent mt-4 sm:mt-6" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div className="lg:w-[40%] sticky top-32 py-64 flex items-center justify-center">
              <OrbitalSystem size={320} />
            </div>
          )}

          {isMobile && (
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-8" />
          )}
        </div>
      </div>
    </section>
  );
}

function TechBadge({ tech }: { tech: typeof techData[0]['items'][0] }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!badgeRef.current || !contentRef.current) return;
    
    const badge = badgeRef.current;
    const content = contentRef.current;
    
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

    badge.addEventListener("mousemove", onMouseMove);
    badge.addEventListener("mouseleave", onMouseLeave);
    
    return () => {
      badge.removeEventListener("mousemove", onMouseMove);
      badge.removeEventListener("mouseleave", onMouseLeave);
    };
  }, { scope: badgeRef });

  return (
    <div ref={badgeRef} className="group relative">
      <div 
        ref={contentRef}
        className="relative flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:border-white/[0.15]"
      >
        <div className="glow absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-transparent opacity-0 pointer-events-none blur-xl" />
        <span className="tech-icon relative z-10 transition-colors duration-300 group-hover:text-white">
          {tech.icon}
        </span>
        <span className="relative z-10 text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">
          {tech.name}
        </span>
      </div>
    </div>
  );
}

function OrbitalSystem({ size }: { size: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Core pulse
    gsap.to(".core-pulse", {
      scale: 1.1,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
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

