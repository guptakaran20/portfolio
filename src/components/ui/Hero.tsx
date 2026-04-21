"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-screen"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-gray-300 backdrop-blur-sm">
            Full Stack Developer • Building SponsorGrid
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          Hi, I&apos;m Karan <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 block mt-2">
            I Build Modern Web Experiences
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          I design and develop high-performance web applications focused on clean UI, scalability, and real-world impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-4"
        >
          <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 w-full sm:w-auto text-base h-12 px-8">
            View Projects
          </Button>
          <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/10 w-full sm:w-auto text-base h-12 px-8 backdrop-blur-sm">
            Contact Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
