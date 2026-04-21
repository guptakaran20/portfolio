"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Code2, Zap, Atom, Server, Hexagon, 
  Database, Layout, Terminal, Box
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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

const techData = [
  {
    category: "Programming Languages",
    items: [
      { name: "JavaScript", icon: <Code2 className="w-4 h-4 text-yellow-400" /> },
      { name: "TypeScript", icon: <FileCodeIcon className="w-4 h-4 text-blue-400" /> },
      { name: "Python", icon: <Box className="w-4 h-4 text-blue-500" /> },
      { name: "C++", icon: <Code2 className="w-4 h-4 text-blue-600" /> },
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: <Atom className="w-4 h-4 text-cyan-400" /> },
      { name: "Next.js", icon: <Zap className="w-4 h-4 text-white" /> },
      { name: "Tailwind CSS", icon: <Layout className="w-4 h-4 text-cyan-300" /> },
      { name: "Framer Motion", icon: <Zap className="w-4 h-4 text-purple-400" /> },
      { name: "HTML/CSS", icon: <FileCodeIcon className="w-4 h-4 text-orange-400" /> },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: <Hexagon className="w-4 h-4 text-green-500" /> },
      { name: "Express", icon: <Server className="w-4 h-4 text-gray-400" /> },
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: <Database className="w-4 h-4 text-blue-500" /> },
      { name: "MongoDB", icon: <Database className="w-4 h-4 text-green-400" /> },
      { name: "Supabase", icon: <Zap className="w-4 h-4 text-emerald-500" /> },
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
      { name: "Figma", icon: <FigmaIcon className="w-4 h-4 text-pink-500" /> },
      { name: "Terminal", icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
    ]
  }
];


export function TechStack() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="skills" className="relative w-full py-24 md:py-32 bg-[#030303] overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-blue-950/5 to-[#030303] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          
          {/* Left Side: Categories */}
          <div className="flex-1 w-full space-y-10">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold text-white mb-4"
              >
                Technical Arsenal
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg max-w-xl"
              >
                A curated selection of tools and technologies I use to bring modern digital experiences to life.
              </motion.p>
            </div>

            <div className="space-y-8">
              {techData.map((category, idx) => (
                <div key={category.category} className="space-y-4">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold"
                  >
                    {category.category}
                  </motion.h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((tech, techIdx) => (
                      <TechBadge key={tech.name} tech={tech} categoryIdx={idx} techIdx={techIdx} />
                    ))}
                  </div>
                  {idx !== techData.length - 1 && (
                    <div className="w-full h-px bg-white/5 mt-6" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Refined Orbital Animation (Hidden on mobile) */}
          {!isMobile && (
            <div className="lg:w-[40%] sticky top-32 flex items-center justify-center">
              <OrbitalSystem size={380} />
            </div>
          )}

          {/* Mobile Divider */}
          {isMobile && (
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-8" />
          )}
        </div>
      </div>
    </section>
  );
}

function TechBadge({ tech, categoryIdx, techIdx }: { tech: typeof techData[0]['items'][0], categoryIdx: number, techIdx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (categoryIdx * 0.1) + (techIdx * 0.05) }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="group relative"
    >
      <div className="relative flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.06]">
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {tech.icon}
        </span>
        <span className="relative z-10 text-sm font-medium text-white/60 group-hover:text-white transition-colors duration-300">
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
}

function OrbitalSystem({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Center Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.2)]"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 blur-md animate-pulse" />
        </motion.div>
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
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
    >
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <motion.div
          animate={{ rotate: reverse ? 360 : -360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm flex items-center justify-center relative group"
        >
          {/* Trail Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors blur-xl" />
          
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            {children}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

