"use client";

import { motion } from "framer-motion";
import { Code2, FileCode2, Zap, Atom, Server, Hexagon } from "lucide-react";
import { useState, useEffect } from "react";

export function TechStack() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const innerRadius = isMobile ? 100 : 190;
  const outerRadius = isMobile ? 150 : 260;
  const centerRadius = isMobile ? 70 : 140;

  return (
    <section id="skills" className="relative w-full py-32 min-h-[80vh] flex flex-col items-center justify-center bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent pointer-events-none" />

      <div className="text-center mb-20 z-10 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Technical Arsenal
        </h2>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          Modern technologies for building scalable, high-performance applications.
        </p>
      </div>

      <div
        className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Center */}
        <div className="absolute z-20 w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          <OrbitIcon icon={<FileCode2 className="w-5 h-5 text-orange-400" />} label="HTML/CSS" angle={0} radius={centerRadius} />
          <OrbitIcon icon={<Code2 className="w-5 h-5 text-yellow-400" />} label="JavaScript" angle={120} radius={centerRadius} />
          <OrbitIcon icon={<FileCode2 className="w-5 h-5 text-blue-400" />} label="TypeScript" angle={240} radius={centerRadius} />
        </div>

        {/* Inner Orbit */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full border border-white/5"
        >
          <OrbitIcon icon={<Atom className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />} label="React" angle={0} radius={innerRadius} reverse />
          <OrbitIcon icon={<Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />} label="Next.js" angle={90} radius={innerRadius} reverse />
          <OrbitIcon icon={<Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-300" />} label="Tailwind" angle={180} radius={innerRadius} reverse />
          <OrbitIcon icon={<Zap className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />} label="Framer Motion" angle={270} radius={innerRadius} reverse />
        </motion.div>

        {/* Outer Orbit */}
        <motion.div
          // animate={{ rotate: 360 }}
          // transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[320px] h-[320px] md:w-[520px] md:h-[520px] rounded-full border border-white/5"
        >
          <OrbitIcon icon={<Hexagon className="w-5 h-5 md:w-6 md:h-6 text-green-500" />} label="Node.js" angle={0} radius={outerRadius} />
          <OrbitIcon icon={<Hexagon className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />} label="Express" angle={90} radius={outerRadius} />
          <OrbitIcon icon={<Hexagon className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />} label="PostgreSQL" angle={180} radius={outerRadius} />
          <OrbitIcon icon={<Hexagon className="w-5 h-5 md:w-6 md:h-6 text-green-400" />} label="MongoDB" angle={270} radius={outerRadius} />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[320px] h-[320px] md:w-[520px] md:h-[520px] rounded-full border border-white/5"
        >
          <OrbitIcon icon={<Hexagon className="w-5 h-5 md:w-6 md:h-6 text-green-500" />} label="Supabase" angle={120} radius={outerRadius} reverse />
          <OrbitIcon icon={<Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-300" />} label="Git/Github" angle={240} radius={outerRadius} reverse />
          <OrbitIcon icon={<Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-300" />} label="Figma" angle={315} radius={outerRadius} reverse />
        </motion.div>
      </div>
    </section>
  );
}

function OrbitIcon({ icon, label, angle, radius, reverse = false }: { icon: React.ReactNode; label: string; angle: number; radius: number, reverse?: boolean }) {
  const rad = (angle * Math.PI) / 180;
  const x = Number((Math.cos(rad) * radius).toFixed(2));
  const y = Number((Math.sin(rad) * radius).toFixed(2));

  return (
    <div
      className="absolute flex items-center justify-center top-1/2 left-1/2 -ml-6 -mt-6"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <motion.div
        animate={{ rotate: reverse ? 360 : -360 }}
        transition={{ duration: reverse ? 40 : 25, repeat: Infinity, ease: "linear" }}
        className="group relative"
      >
        <div className="w-12 h-12 bg-[#030303] rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all cursor-pointer">
          {icon}
        </div>
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-md pointer-events-none whitespace-nowrap border border-white/10">
          {label}
        </div>
      </motion.div>
    </div>
  );
}
