"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollTransition() {
  return (
    <section className="relative w-full py-24 min-h-screen flex items-center bg-[#030303] overflow-hidden">
      {/* Grid overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Selected Work & Visual Highlights
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A glimpse into the digital experiences and interfaces I&apos;ve crafted, focusing on premium design and intuitive UX.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Using realistic generic images from Unsplash for visual highlights */}
          <ImageCard src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" delay={0.1} />
          <ImageCard src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" delay={0.2} />
          <ImageCard src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" delay={0.3} />
          <ImageCard src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964&auto=format&fit=crop" delay={0.4} />
          <ImageCard src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop" delay={0.5} />
          <ImageCard src="https://images.unsplash.com/photo-1607799279861-4dddf8b60ddb?q=80&w=2070&auto=format&fit=crop" delay={0.6} />
        </div>
      </div>
    </section>
  );
}

function ImageCard({ src, delay }: { src: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="group relative h-64 rounded-2xl overflow-hidden bg-white/5 border border-white/10"
    >
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${src})` }} />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
    </motion.div>
  );
}
