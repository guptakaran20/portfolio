"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';

const commands: Record<string, string> = {
  hi: 'Hey 👋 Karan here — Full Stack Developer at XCEED and B.Tech ICE student at NIT Jalandhar. Type "help" to explore.',
  hello: 'Hello! I\'m Karan Gupta — I build real-time systems and AI-powered web and mobile apps. Try "experience" or "projects".',
  hey: 'Hey there! 🚀 Welcome to my dev terminal. Type "help" to see what I can do.',
  whoami: 'Karan Gupta — Full Stack Developer at XCEED, NIT Jalandhar. 145 PRs, 560+ commits, 1,000+ students served.',
  about: 'I build full-stack apps and distributed backends with Node.js, FastAPI, Next.js, Python and Redis. I enjoy system design, real-time data and keeping production fast and reliable.',
  experience: `Full Stack Developer @ XCEED, NIT Jalandhar (Jun 2026 – Present)
• ILEED: AI attendance platform for 1,000+ students across 30+ cameras — FAISS face recognition on live RTSP streams, ERP embedding automation, one-click deploys with auto-rollback.
• XCEED Learning App: Android & iOS on Capacitor — biometric sign-in, push notifications, delta OTA updates (21.6 MB → 0.41 MB).
• 145 PRs authored, 135 merged, 560+ commits.`,
  opensource: `• GSSoC'26 — merged advanced-level PR hardening auth validation in a MERN leave-management system
• Aarogya Club, NITJ — 9 merged PRs building a real-time quiz platform (WebSockets, QR tokens, anti-cheat)`,
  achievements: `• LeetCode Knight — 1870 rating, top 5.7% globally, 613 problems solved (88 Hard)
• 1,400+ GitHub contributions in the past year
• GSSoC'26 contributor`,
  skills: 'TypeScript, JavaScript, Python, C++, SQL, React, Next.js, Node.js, Express, FastAPI, gRPC, WebSockets, PostgreSQL, MongoDB, Redis, FAISS, Capacitor, Docker, AWS, GitHub Actions',
  techstack: `Frontend: React, Next.js, Tailwind CSS, TanStack Query
Backend: Node.js, Express, FastAPI (Python), gRPC, Socket.IO
Data: PostgreSQL, MongoDB, Redis Streams, Prisma, SQLAlchemy
AI & ML: FAISS, ONNX Runtime, Gemini API
Mobile: Capacitor, Firebase Cloud Messaging
DevOps: Docker, AWS EC2, Nginx, GitHub Actions, PM2, Prometheus, Grafana`,
  projects: 'EventFlow (workflow engine) • CodeArena (coding battles) • ImportlyAI (AI CSV import) • SponsorGrid (SaaS) • Arovia Vibes (eCommerce) • StrangerBlogs (blogging). Try "eventflow" or "codearena".',
  eventflow: 'Distributed workflow orchestration engine — DAG pipelines on Redis Streams workers with retries, a dead-letter queue and stuck-job recovery. Python, FastAPI, PostgreSQL, gRPC, Next.js, Docker.',
  project_eventflow: 'Distributed workflow orchestration engine — DAG pipelines on Redis Streams workers with retries, a dead-letter queue and stuck-job recovery. Python, FastAPI, PostgreSQL, gRPC, Next.js, Docker.',
  codearena: 'Real-time coding battles with Redis matchmaking, tournaments and live leaderboards — Next.js, Node.js, Socket.IO, Piston, AWS EC2.',
  project_codearena: 'Real-time coding battles with Redis matchmaking, tournaments and live leaderboards — Next.js, Node.js, Socket.IO, Piston, AWS EC2.',
  importlyai: 'AI-powered CSV import — a multi-stage Gemini pipeline mapping any CSV to a CRM schema, with 180+ benchmark tests. Next.js, Node.js, PapaParse.',
  project_importlyai: 'AI-powered CSV import — a multi-stage Gemini pipeline mapping any CSV to a CRM schema, with 180+ benchmark tests. Next.js, Node.js, PapaParse.',
  sponsorgrid: 'SaaS for club sponsorships — Next.js, Prisma, PostgreSQL, Zod, Cloudinary, Google OAuth.',
  project_sponsorgrid: 'SaaS for club sponsorships — Next.js, Prisma, PostgreSQL, Zod, Cloudinary, Google OAuth.',
  aroviavibes: 'eCommerce storefront with an admin panel and analytics — Next.js, Supabase, Tailwind, Framer Motion.',
  project_arovia: 'eCommerce storefront with an admin panel and analytics — Next.js, Supabase, Tailwind, Framer Motion.',
  strangerblogs: 'Blog platform with an Appwrite backend — React, Tailwind, Appwrite.',
  project_strangerblogs: 'Blog platform with an Appwrite backend — React, Tailwind, Appwrite.',
  currently_learning: 'Kubernetes • Microservices • System design at scale • AI agents and LLM integrations',
  tools: 'VS Code, Git, Docker, Postman, GitHub Actions, Vercel',
  leetcode: 'LeetCode Knight — 1870 rating (top 5.7%), 613 problems solved. https://leetcode.com/u/guptakaran0720/',
  github: 'github.com/guptakaran20',
  resume: 'Use the "Download Resume" button at the top, or open /resume.pdf',
  contact: 'Email: guptakaran0720@gmail.com',
  socials: 'GitHub: guptakaran20 | LinkedIn: guptakaran0720 | LeetCode: guptakaran0720',
  clear: 'Clearing terminal...',
  help: `Available commands:
whoami, about, experience, opensource, achievements,
skills, techstack, projects, eventflow, codearena, importlyai, sponsorgrid, aroviavibes, strangerblogs,
currently_learning, tools, leetcode, github, resume, contact, socials, clear`
};

export default function Terminal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Karan\'s terminal. Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFirstRender = useRef(true);

  // GSAP scroll-triggered entrance animations
  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !terminalRef.current) return;

    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(headingRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Terminal window entrance
      gsap.fromTo(terminalRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const response = commands[cmd];
    const newEntries = [{ type: 'input', text: cmd }];

    if (response) {
      newEntries.push({ type: 'output', text: response });
    } else {
      newEntries.push({ type: 'error', text: `Command not found: ${cmd}. Type "help" for available commands.` });
    }

    setHistory(prev => [...prev, ...newEntries]);
    setInput('');
  };

  return (
    <section id="terminal" className="relative bg-gray-50 dark:bg-transparent py-16 md:py-20 z-30 transition-colors duration-300">
      <div ref={sectionRef} className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white transition-colors">
            Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Terminal</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-base max-w-lg mx-auto transition-colors">
            Get to know me through the command line.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Terminal window */}
        <div
          ref={terminalRef}
          className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06] shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/5 bg-white dark:bg-[#080808] transition-colors duration-300 will-change-transform"
          style={{ opacity: 0 }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-white/[0.04] border-b border-slate-200 dark:border-white/[0.06] transition-colors">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="flex-1 text-center text-xs text-slate-600 dark:text-gray-400 font-mono transition-colors">
              karan@portfolio ~ zsh
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={bodyRef}
            className="terminal-body p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] max-h-[350px] overflow-y-auto font-mono text-xs sm:text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, i) => (
              <div key={i} className="mb-2">
                {entry.type === 'system' && (
                  <p className="text-slate-500 dark:text-gray-400 text-xs italic">{entry.text}</p>
                )}
                {entry.type === 'input' && (
                  <p>
                    <span className="text-emerald-500 dark:text-emerald-400">➜</span>{' '}
                    <span className="text-cyan-600 dark:text-accent">~</span>{' '}
                    <span className="text-slate-900 dark:text-gray-100">{entry.text}</span>
                  </p>
                )}
                {entry.type === 'output' && (
                  <p className="text-slate-600 dark:text-gray-400 pl-4 whitespace-pre-wrap">{entry.text}</p>
                )}
                {entry.type === 'error' && (
                  <p className="text-red-500 dark:text-red-400/80 pl-4">{entry.text}</p>
                )}
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleCommand} className="flex items-center gap-2">
              <span className="text-emerald-500 dark:text-emerald-400">➜</span>
              <span className="text-cyan-600 dark:text-accent">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Terminal command"
                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-gray-100 font-mono text-sm caret-cyan-500"
                spellCheck={false}
                autoComplete="off"
              />
            </form>
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </section>
  );
}

