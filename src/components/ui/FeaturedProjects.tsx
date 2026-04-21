"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, Terminal } from "lucide-react";
import React from "react";
import { buttonVariants } from "./button";

const projects = [
  {
    title: "SponsorGrid",
    description: "Sponsorship management platform for college clubs. A complete SaaS solution to track leads, manage partnerships, and streamline funding efforts with an intuitive dashboard.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    demoLink: "https://trysponsorgrid.vercel.app/",
    githubLink: "https://github.com/guptakaran20/Sponsorship",
    featured: true,
  },
  {
    title: "StrangerBlogs",
    description: "Modern blogging platform focused on content experience. Features ultra-fast rendering, personalized reading modes, and a seamless authoring flow.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    demoLink: "https://stranger-blogs.vercel.app/",
    githubLink: "https://github.com/guptakaran20/StrangerBlogs",
    featured: false,
  },
  {
    title: "Arovia Vibes",
    description: "Premium eCommerce UI showcase highlighting advanced frontend interaction, micro-animations, and fluid design principles.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    demoLink: "https://aroviavibes.vercel.app/",
    githubLink: "https://github.com/guptakaran20/AroviaVibes",
    featured: false,
  }
];

export function FeaturedProjects() {
  return (
    <section className="relative w-full py-32 bg-[#030303] overflow-hidden" id="projects">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={project.title} className={project.featured ? "lg:col-span-2" : "col-span-1"}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: "1000px" }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`group relative h-full bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 md:p-8 hover:border-white/20 transition-colors duration-500 flex flex-col justify-between overflow-hidden ${project.featured ? 'min-h-[350px] md:min-h-[400px]' : 'min-h-[300px] md:min-h-[350px]'}`}
      >
        {/* Hover subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 transition-colors duration-500 pointer-events-none" />

        <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col h-full">
          <div>
            {project.featured && (
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-semibold tracking-wider border border-indigo-500/30">
                PRIMARY PROJECT
              </span>
            )}
            <h3 className={`${project.featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} font-bold text-white mb-4`}>
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8">
              {project.description}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-md">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "default", className: "bg-white text-black hover:bg-gray-200" })}>
                Live Demo <Link className="w-4 h-4 ml-2" />
              </a>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "border-white/20 hover:bg-white/10 text-white" })}>
                GitHub <Terminal className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
