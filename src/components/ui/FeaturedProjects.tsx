"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { buttonVariants } from "./button";
import { Terminal, Link } from "lucide-react";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "SponsorGrid",
    description: "Sponsorship management platform for college clubs. A complete SaaS solution to track leads, manage partnerships, and streamline funding efforts with an intuitive dashboard.",
    tech: ["Next.js", "Typescript", "Prisma", "Cloudinary","PostgreSQL"],
    demoLink: "https://trysponsorgrid.vercel.app/",
    githubLink: "https://github.com/guptakaran20/Sponsorship",
    featured: true,
  },
  {
    title: "StrangerBlogs",
    description: "Modern blogging platform focused on content experience. Features ultra-fast rendering, personalized reading modes, and a seamless authoring flow.",
    tech: ["React", "Javascript", "Appwrite", "Tailwind CSS"],
    demoLink: "https://stranger-blogs.vercel.app/",
    githubLink: "https://github.com/guptakaran20/StrangerBlogs",
    featured: false,
  },
  {
    title: "Arovia Vibes",
    description: "Premium eCommerce UI showcase highlighting advanced frontend interaction, micro-animations, and fluid design principles.",
    tech: ["Next.js", "Supabase", "Tailwind CSS","Framer Motion"],
    demoLink: "https://aroviavibes.vercel.app/",
    githubLink: "https://github.com/guptakaran20/AroviaVibes",
    featured: false,
  }
];

export function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const section = sectionRef.current;
    const container = containerRef.current;

    // Wait for a frame to ensure scrollWidth is accurate
    gsap.delayedCall(0.1, () => {
      const scrollWidth = section.scrollWidth;
      const amountToScroll = Math.max(0, scrollWidth - window.innerWidth);

      const tl = gsap.to(section, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
        },
      });

      // Force a refresh after setup
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill();
      });
    };
  }, { scope: containerRef, dependencies: [projects] });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#030303] z-10" 
      id="projects"
    >
      <div 
        ref={sectionRef} 
        className="flex flex-nowrap h-screen items-center will-change-transform relative bg-[#030303] py-20"
        style={{ width: "max-content" }}
      >
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />

        {/* Intro Screen */}
        <div className="w-[100vw] flex flex-col justify-center shrink-0 pr-20 md:pr-40 relative z-10">
          <div className="max-w-2xl px-10 sm:px-20 md:px-32">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 uppercase tracking-tighter leading-none">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-8">
              A selection of my most impactful work, blending technical excellence with cinematic design.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
          </div>
        </div>
        
        {/* Projects */}
        {projects.map((project, index) => (
          <div key={project.title} className="w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] flex items-center justify-center shrink-0 px-4 md:px-10">
            <div className="w-full max-w-5xl">
              <ProjectCard project={project} index={index} />
            </div>
          </div>
        ))}

        {/* Spacer for clean exit */}
        <div className="w-[20vw] shrink-0" />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!innerRef.current) return;

    const el = innerRef.current;
    
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 20;
      const yPct = (y / rect.height - 0.5) * -20;

      gsap.to(el, {
        rotateY: xPct,
        rotateX: yPct,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    el.addEventListener("mousemove", onMouseMove as any);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove as any);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, { scope: innerRef });

  return (
    <div ref={cardRef} className="h-full [perspective:1000px]">
      <div
        ref={innerRef}
        className={`group relative h-full bg-[#0a0a0a] rounded-2xl border p-5 sm:p-6 md:p-8 transition-colors duration-500 flex flex-col justify-between overflow-hidden cursor-pointer border-white/10 hover:border-white/20
          ${project.featured ? 'min-h-[280px] sm:min-h-[350px] md:min-h-[400px]' : 'min-h-[250px] sm:min-h-[300px] md:min-h-[350px]'}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 pointer-events-none transition-all duration-500" />

        <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col h-full">
          <div>
            {project.featured && (
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-semibold tracking-wider border border-indigo-500/30">
                PRIMARY PROJECT
              </span>
            )}
            <h3 className={`${project.featured ? 'text-xl sm:text-2xl md:text-4xl' : 'text-lg sm:text-xl md:text-2xl'} font-bold text-white mb-3 sm:mb-4`}>
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed mb-6 sm:mb-8">
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
      </div>
    </div>
  );
}
