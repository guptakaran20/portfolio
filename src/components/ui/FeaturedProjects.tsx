import React from "react";
import { buttonVariants } from "./button";
import { Terminal, Link } from "lucide-react";
import { FeaturedProjectsClient } from "./FeaturedProjectsClient";
import { ProjectPreview } from "./previews/ProjectPreview";

const projects = [
  {
    title: "EventFlow",
    description: "Distributed workflow orchestration engine that runs graph-based (DAG) pipelines across Redis Streams workers, with retries, a dead-letter queue, heartbeat-based stuck-job recovery (XPENDING/XCLAIM), gRPC transport, live WebSocket updates, JWT auth and rate limiting. CI runs pytest, ruff and mypy.",
    tech: ["Python", "FastAPI", "Redis Streams", "PostgreSQL", "SQLAlchemy", "gRPC", "WebSockets", "Next.js", "Docker"],
    demoLink: "https://goeventflow.vercel.app/",
    githubLink: "https://github.com/guptakaran20/EventFlow",
    featured: true,
  },
  {
    title: "CodeArena",
    description: "Real-time 1v1 coding battles with Redis matchmaking, tournaments and live leaderboards synced over Socket.IO. Sandboxed multi-language execution with Piston, JWT and Google OAuth, deployed on AWS EC2 behind Nginx with Prometheus and Grafana monitoring.",
    tech: ["TypeScript", "Next.js", "Node.js", "Express", "MongoDB", "Redis", "Socket.IO", "Docker", "Nginx", "AWS EC2"],
    demoLink: "https://codearenabattle.vercel.app/",
    githubLink: "https://github.com/guptakaran20/CodeBattle",
    featured: false,
  },
  {
    title: "ImportlyAI",
    description: "Maps any CSV onto a standard CRM schema with a multi-stage Gemini pipeline for schema inference, validation and field mapping, streaming live progress over Server-Sent Events. Backed by a benchmark suite of 180+ tests.",
    tech: ["Next.js", "TypeScript", "Node.js", "Express", "Gemini API", "PapaParse"],
    demoLink: "https://importlyai.vercel.app",
    githubLink: "https://github.com/guptakaran20/ImportlyAI",
    featured: false,
  },
  {
    title: "SponsorGrid",
    description: "SaaS for college clubs to track sponsor leads, deals and funding. HttpOnly-cookie auth with CSRF protection, Google OAuth, Zod-validated APIs, Cloudinary uploads and GitHub Actions CI.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Zod", "Cloudinary"],
    demoLink: "https://trysponsorgrid.vercel.app/",
    githubLink: "https://github.com/guptakaran20/Sponsorship",
    featured: false,
  },
  {
    title: "Arovia Vibes",
    description: "eCommerce storefront with an admin panel, sales analytics and transactional email, finished with fluid micro-animations.",
    tech: ["Next.js", "Supabase", "Resend", "Tailwind CSS", "Framer Motion"],
    demoLink: "https://aroviavibes.vercel.app/",
    githubLink: "https://github.com/guptakaran20/AroviaVibes",
    featured: false,
  },
  {
    title: "StrangerBlogs",
    description: "Blogging platform focused on the reading experience, with fast rendering, personalised reading modes and a smooth authoring flow.",
    tech: ["React", "JavaScript", "Appwrite", "Tailwind CSS"],
    demoLink: "https://stranger-blogs.vercel.app/",
    githubLink: "https://github.com/guptakaran20/StrangerBlogs",
    featured: false,
  }
];

export function FeaturedProjects() {
  return (
    <>
      <FeaturedProjectsClient />

      {/* Mobile: vertical stacked layout */}
      <section
        className="md:hidden relative w-full bg-gray-50 dark:bg-transparent transition-colors duration-300 z-10 py-16 px-4"
        id="projects-mobile"
      >
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-tighter leading-none transition-colors">
              Featured Projects
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-base max-w-lg mb-6 transition-colors">
              Systems I have designed, built and shipped. Every one is live.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
          </div>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={project.title} className="project-card-mobile" style={{ willChange: "transform, opacity" }}>
                <ProjectCard project={project} isMobile={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: horizontal scroll layout */}
      <section 
        className="hidden md:block relative w-full bg-gray-50 dark:bg-transparent transition-colors duration-300 z-10 desktop-container" 
        id="projects-desktop"
      >
        <div 
          className="flex flex-nowrap h-screen items-center relative py-20 desktop-section"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {/* Background Blobs */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />

          {/* Intro Screen */}
          <div className="w-[100vw] flex flex-col justify-center shrink-0 pr-20 md:pr-40 relative z-10">
            <div className="max-w-2xl px-10 sm:px-20 md:px-32">
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-none transition-colors">
                Featured Projects
              </h2>
              <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-lg mb-8 transition-colors">
                Systems I have designed, built and shipped. Every one is live.
              </p>
              <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
            </div>
          </div>
          
          {/* Projects */}
          {projects.map((project, index) => (
            <div key={project.title} className="project-card-desktop w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[55vw] flex items-center justify-center shrink-0 px-4 md:px-10" style={{ willChange: "transform, opacity" }}>
              <div className="w-full max-w-5xl">
                <ProjectCard project={project} isMobile={false} />
              </div>
            </div>
          ))}

          {/* Spacer for clean exit */}
          <div className="w-[20vw] shrink-0" />
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project, isMobile }: { project: typeof projects[0]; isMobile: boolean }) {
  return (
    <div className={isMobile ? "" : "h-full [perspective:1000px]"}>
      <div
        className={`group relative h-full bg-white dark:bg-[#0a0a0a] rounded-2xl border p-5 sm:p-6 md:p-8 transition-colors duration-500 flex flex-col justify-between overflow-hidden border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-md dark:shadow-none ${isMobile ? "" : "tilt-card-inner"}
          ${project.featured ? 'min-h-[280px] sm:min-h-[350px] md:min-h-[400px]' : 'min-h-[250px] sm:min-h-[300px] md:min-h-[350px]'}`}
        style={isMobile ? {} : { transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 pointer-events-none transition-all duration-500" />

        <div className="relative z-10 flex flex-col h-full z-layer">
          <div>
            <div className="mb-5 sm:mb-6">
              <ProjectPreview title={project.title} />
            </div>
            {project.featured && (
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-[10px] md:text-xs font-semibold tracking-wider border border-indigo-500/20 dark:border-indigo-500/30">
                PRIMARY PROJECT
              </span>
            )}
            <h3 className={`${project.featured ? 'text-xl sm:text-2xl md:text-4xl' : 'text-lg sm:text-xl md:text-2xl'} font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 transition-colors`}>
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed mb-6 sm:mb-8 transition-colors">
              {project.description}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 text-xs sm:text-sm rounded-md transition-colors">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} className={buttonVariants({ variant: "default", className: "bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-gray-200 text-sm transition-colors" })}>
                Live Demo <Link className="w-4 h-4 ml-2" />
              </a>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className={buttonVariants({ variant: "outline", className: "border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white text-sm transition-colors" })}>
                GitHub <Terminal className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

