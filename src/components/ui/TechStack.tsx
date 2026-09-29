import {
  Code2, Zap, Atom, Server, Hexagon,
  Database, Layout, Box, Network, Brain, Cpu, Sparkles,
  Smartphone, BellRing, Cloud, Workflow, Gauge, Activity, Layers, Radio } from "lucide-react";
import { TechStackAnimations, TechBadge } from "./TechStackClient";
import { StackOrbit } from "./StackOrbit";
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
      { name: "SQL", icon: <Database className="w-4 h-4 text-sky-500" /> },
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: <Atom className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> },
      { name: "Next.js", icon: <Zap className="w-4 h-4 text-slate-900 dark:text-white" /> },
      { name: "Tailwind CSS", icon: <Layout className="w-4 h-4 text-cyan-500 dark:text-cyan-300" /> },
      { name: "TanStack Query", icon: <Layers className="w-4 h-4 text-rose-400" /> },
      { name: "HTML/CSS", icon: <FileCodeIcon className="w-4 h-4 text-orange-500 dark:text-orange-400" /> },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: <Hexagon className="w-4 h-4 text-green-500" /> },
      { name: "Express", icon: <Server className="w-4 h-4 text-gray-400" /> },
      { name: "FastAPI", icon: <Zap className="w-4 h-4 text-teal-400" /> },
      { name: "gRPC", icon: <Network className="w-4 h-4 text-emerald-400" /> },
      { name: "REST API", icon: <Zap className="w-4 h-4 text-purple-400" /> },
      { name: "WebSockets", icon: <Network className="w-4 h-4 text-cyan-400" /> },
      { name: "Socket.IO", icon: <Radio className="w-4 h-4 text-slate-500 dark:text-slate-300" /> },
    ]
  },
  {
    category: "Databases & Cache",
    items: [
      { name: "PostgreSQL", icon: <Database className="w-4 h-4 text-blue-500" /> },
      { name: "MongoDB", icon: <Database className="w-4 h-4 text-green-400" /> },
      { name: "Redis", icon: <Database className="w-4 h-4 text-red-600" /> },
      { name: "MySQL", icon: <Database className="w-4 h-4 text-red-500" /> },
      { name: "Prisma", icon: <Database className="w-4 h-4 text-indigo-400" /> },
      { name: "SQLAlchemy", icon: <Database className="w-4 h-4 text-red-400" /> },
    ]
  },
  {
    category: "AI & ML",
    items: [
      { name: "FAISS", icon: <Brain className="w-4 h-4 text-violet-400" /> },
      { name: "ONNX Runtime", icon: <Cpu className="w-4 h-4 text-slate-500 dark:text-slate-300" /> },
      { name: "Gemini API", icon: <Sparkles className="w-4 h-4 text-blue-400" /> },
    ]
  },
  {
    category: "Mobile",
    items: [
      { name: "Capacitor", icon: <Smartphone className="w-4 h-4 text-sky-400" /> },
      { name: "Firebase Cloud Messaging", icon: <BellRing className="w-4 h-4 text-amber-400" /> },
      { name: "Android & iOS", icon: <Smartphone className="w-4 h-4 text-emerald-400" /> },
    ]
  },
  {
    category: "DevOps & Cloud",
    items: [
      { name: "Docker", icon: <Box className="w-4 h-4 text-blue-500" /> },
      { name: "AWS EC2", icon: <Cloud className="w-4 h-4 text-orange-400" /> },
      { name: "Nginx", icon: <Server className="w-4 h-4 text-green-500" /> },
      { name: "GitHub Actions", icon: <Workflow className="w-4 h-4 text-slate-500 dark:text-slate-300" /> },
      { name: "PM2", icon: <Activity className="w-4 h-4 text-cyan-400" /> },
      { name: "Prometheus & Grafana", icon: <Gauge className="w-4 h-4 text-orange-500" /> },
      { name: "Git/GitHub", icon: <GithubIcon className="w-4 h-4 text-slate-900 dark:text-white" /> },
      { name: "Vercel", icon: <VercelIcon className="w-4 h-4 text-slate-900 dark:text-white" /> },
    ]
  }
];

// One icon per layer for the orbit on the right.
const layerMeta: Record<string, { short: string; icon: React.ReactNode }> = {
  "Programming Languages": { short: "Languages", icon: <Code2 className="w-5 h-5 text-yellow-500" /> },
  Frontend: { short: "Frontend", icon: <Layout className="w-5 h-5 text-cyan-500" /> },
  Backend: { short: "Backend", icon: <Server className="w-5 h-5 text-green-500" /> },
  "Databases & Cache": { short: "Databases", icon: <Database className="w-5 h-5 text-blue-500" /> },
  "AI & ML": { short: "AI & ML", icon: <Brain className="w-5 h-5 text-violet-500" /> },
  Mobile: { short: "Mobile", icon: <Smartphone className="w-5 h-5 text-sky-500" /> },
  "DevOps & Cloud": { short: "DevOps & Cloud", icon: <Cloud className="w-5 h-5 text-orange-500" /> },
};

export function TechStack() {
  return (
    <section id="skills" className="relative w-full py-16 md:py-20 bg-gray-50 dark:bg-transparent flex flex-col justify-start transition-colors duration-300">
      <TechStackAnimations />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:from-[#030303] via-transparent dark:via-blue-950/5 to-transparent dark:to-[#030303] pointer-events-none transition-colors" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none transition-colors" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] pointer-events-none transition-colors" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 sm:gap-10 lg:gap-14">

          <div id="tech-left-column" className="flex-1 w-full space-y-6 sm:space-y-8 lg:space-y-10" style={{ willChange: "transform" }}>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4 tracking-tight transition-colors">
                Technical Arsenal
              </h2>
              <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl transition-colors">
                The tools I use to build real-time systems, AI features and web and mobile apps.
              </p>
            </div>

            <div id="tech-grid" className="space-y-5 sm:space-y-6 lg:space-y-8">
              {techData.map((category, idx) => (
                <div key={category.category} data-layer={idx} data-active={idx === 0 ? "true" : "false"} className="group/layer space-y-4">
                  <h3 className={`category-header-${idx} flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-white/60 group-data-[active=true]/layer:text-cyan-700 dark:group-data-[active=true]/layer:text-cyan-400 font-semibold opacity-0 transition-colors`} style={{ willChange: "opacity" }}>
                    <span className="font-mono text-[10px] tracking-normal opacity-70">{String(idx + 1).padStart(2, "0")}</span>
                    {category.category}
                  </h3>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.items.map((tech) => (
                      <div key={tech.name} className="tech-badge" style={{ willChange: "transform, opacity" }}>
                        <TechBadge tech={tech} />
                      </div>
                    ))}
                  </div>
                  {idx !== techData.length - 1 && (
                    <div className="w-full h-px bg-gradient-to-r from-slate-200 via-slate-300 dark:from-white/5 dark:via-white/10 to-transparent mt-4 sm:mt-6 transition-colors" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* The column stretches to the list's height; only the orbit itself is sticky, centred in the
              viewport, so it stays put while every category scrolls past and releases at the last one. */}
          <div className="hidden lg:block lg:w-[46%] self-stretch">
            <div
              className="sticky flex items-center justify-center"
              style={{ ["--orbit" as string]: "min(580px, calc(100vh - 9rem))", top: "calc((100vh - var(--orbit)) / 2)" } as React.CSSProperties}
            >
            <StackOrbit
              layers={techData.map((c) => ({
                category: c.category,
                short: layerMeta[c.category]?.short ?? c.category,
                icon: layerMeta[c.category]?.icon,
                tools: c.items.map((t) => t.name),
              }))}
            />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
