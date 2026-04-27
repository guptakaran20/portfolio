"use client";

import {
  Code2, Zap, Atom, Server, Hexagon,
  Database, Layout, Terminal, Box } from "lucide-react";
import { TechBadgeInteractive, OrbitalSystem } from "./TechStackInteractive";
import { TechStackAnimations } from "./TechStackAnimations";
import { useRef } from "react";

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
  const leftRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="relative w-full min-h-screen py-16 sm:py-20 md:py-24 lg:py-32 bg-[#030303] flex flex-col justify-start">
      <TechStackAnimations gridRef={gridRef} leftRef={leftRef} techDataCount={techData.length} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-blue-950/5 to-[#030303] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-8 sm:gap-10 lg:gap-20">

          <div ref={leftRef} className="flex-1 w-full space-y-6 sm:space-y-8 lg:space-y-10 will-change-transform">
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
                  <h3 className={`category-header-${idx} text-xs uppercase tracking-[0.2em] text-white/40 font-semibold`}>
                    {category.category}
                  </h3>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.items.map((tech) => (
                      <div key={tech.name} className="tech-badge">
                        <TechBadgeInteractive>
                          <span className="tech-icon relative z-10 transition-colors duration-300 group-hover:text-white">
                            {tech.icon}
                          </span>
                          <span className="relative z-10 text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">
                            {tech.name}
                          </span>
                        </TechBadgeInteractive>
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

          <div className="hidden lg:flex lg:w-[40%] sticky top-32 py-64 items-center justify-center">
            <OrbitalSystem size={320} Atom={Atom} Hexagon={Hexagon} Database={Database} />
          </div>

          <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-8" />
        </div>
      </div>
    </section>
  );
}

