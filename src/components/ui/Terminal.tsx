"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';

const commands: Record<string, string> = {
  hi: 'Hey 👋 Karan here — Full-Stack Developer & BTech ICE student at NIT Jalandhar. Type "help" to explore.',
  hello: 'Hello! I\'m Karan Gupta — building modern full-stack apps. Try "projects" or "skills".',
  hey: 'Hey there! 🚀 Welcome to my dev terminal. Type "help" to see what I can do.',
  whoami: 'Karan Gupta — Full-Stack Developer specializing in modern web apps',
  about: 'I build scalable full-stack applications with modern tools like Next.js. Passionate about clean UI, performance, and real-world problem solving.',
  skills: 'Next.js, React, TypeScript, Node.js, Express, Tailwind CSS, PostgreSQL, Appwrite, Prisma, Docker, MongoDB,Redis',
  techstack: 'Frontend: React, Next.js, Tailwind\nBackend: Node.js, Express\nDatabase: PostgreSQL,MongoDB,Redis\nTools: Docker, Git, Vercel,Postman',
  projects: 'CodeArena (Coding Battle Platform) • SponsorGrid (SaaS Platform) • StrangerBlogs (Blogging Platform) • Arovia Vibes (Frontend UI Showcase)',
  codearena: 'Real-time Coding Battle Platform for Interview Preparation — built with Next.js, Node.js, Socket.io, Docker',
  project_codearena: 'Real-time Coding Battle Platform for Interview Preparation — built with Next.js, Node.js, Socket.io, Docker',
  sponsorgrid: 'SaaS platform for managing sponsorships — built with Next.js, Prisma, PostgreSQL, Cloudinary',
  aroviavibes: 'Modern UI showcase with animations — built using Next.js, Tailwind, Framer Motion',
  strangerblogs: 'Blog platform with Appwrite backend — React, Tailwind, Appwrite',
  experience: 'Built multiple full-stack applications with authentication, APIs, and database integration ,Currently working as Intern in XCEED-NITJ contibruting in Intelligence Attendance Managment System',
  achievements: 'Created scalable SaaS apps, implemented authentication systems, worked with modern full-stack architectures',
  currently_learning: 'Advanced Backend Systems • System Design • Scaling applications, currently working as Intern in XCEED-NITJ contibruting in Intelligence Attendance Managment System',
  tools: 'VS Code, Git, Docker, Vercel, Postman',
  leetcode: 'Solved more than 250+ Questions on leetcode Check here - https://leetcode.com/guptakaran0720/',
  github: 'github.com/guptakaran20',
  resume: 'Check at home section',
  contact: 'Email: guptakaran0720@gmail.com',
  socials: 'GitHub: guptakaran20 | LinkedIn: guptakaran0720',
  clear: 'Clearing terminal...',
  help: `Available commands:
whoami, about, skills, techstack, projects,
project_codearena, project_sponsorgrid, project_arovia, project_strangerblogs,
experience, achievements, currently_learning,
tools, github, resume, contact, socials, clear`
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
    <section id="terminal" className="relative bg-gray-50 dark:bg-transparent py-16 sm:py-24 md:py-32 z-30 transition-colors duration-300">
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
            <span className="flex-1 text-center text-xs text-slate-500 dark:text-gray-500 font-mono transition-colors">
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
                  <p className="text-slate-500 dark:text-gray-500 text-xs italic">{entry.text}</p>
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

