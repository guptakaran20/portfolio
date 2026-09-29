import React from "react";
import { ArrowUpRight, Camera, Smartphone, GitMerge, GitPullRequest, Trophy, Flame } from "lucide-react";
import { ExperienceAnimations } from "./ExperienceClient";
import { TiltCard } from "./TiltCard";
import { RecognitionPreview } from "./previews/RecognitionPreview";
import { OtaDeltaPreview } from "./previews/OtaDeltaPreview";

const stats = [
  { value: 145, suffix: "", label: "Pull requests authored" },
  { value: 135, suffix: "", label: "Merged into main" },
  { value: 560, suffix: "+", label: "Commits shipped" },
  { value: 1000, suffix: "+", label: "Students served" },
];

const workstreams = [
  {
    icon: Camera,
    preview: RecognitionPreview,
    title: "ILEED",
    subtitle: "Intelligent Learning Engagement and Entity Detection",
    meta: "140 PRs · 131 merged · Jun – Sep 2026",
    points: [
      "Real-time student identification from live RTSP streams and video uploads, on a FAISS vector index with RetinaFace (ONNX) detection.",
      "Automated ERP face-embedding generation, nightly embedding rebuilds, and active learning from students' backup photos.",
      "Moved RTSP recording to the Node.js backend: scheduled recordings, FFmpeg audio extraction, and live-preview auto-retry.",
      "One-click deploys with health checks and automatic rollback, a GPU dashboard with MIG/VRAM telemetry, and uptime alerting.",
    ],
    impact: [
      { metric: "2.0s → 915ms", label: "ERP list load" },
      { metric: "11.3%", label: "timeout error rate resolved" },
      { metric: "91% heap", label: "stream memory leak fixed" },
    ],
    tech: ["Node.js", "Express", "React", "Python", "MongoDB", "FAISS", "ONNX", "FFmpeg", "PM2"],
  },
  {
    icon: Smartphone,
    preview: OtaDeltaPreview,
    title: "XCEED Learning App",
    subtitle: "Android & iOS app for the AMS platform",
    meta: "291 commits · 5 PRs · Aug – Sep 2026",
    points: [
      "Built the app from the first commit on Capacitor: PIN and biometric sign-in, deep links, and multi-account switching.",
      "Delta over-the-air updates published through GitHub Actions, shipping only the files a release changed.",
      "Automated web → app code sync with custom merge drivers, keeping mobile-only code behind override seams.",
      "Push notifications with Firebase Cloud Messaging and offline-first caching with TanStack Query.",
    ],
    impact: [
      { metric: "21.6 → 0.41 MB", label: "per small OTA release" },
      { metric: "75", label: "automated web → app syncs" },
      { metric: "Android + iOS", label: "from one codebase" },
    ],
    tech: ["Capacitor", "React", "Vite", "Firebase Cloud Messaging", "TanStack Query", "GitHub Actions"],
  },
];

const highlights = [
  {
    icon: GitMerge,
    eyebrow: "GSSoC'26 · level: advanced",
    title: "Merged open-source PR",
    body: "Hardened auth validation and standardised API responses in a MERN leave-management system.",
    href: "https://github.com/Abhishek-Verma0/Employee-Leave-Management-System/pull/65",
  },
  {
    icon: GitPullRequest,
    eyebrow: "Aarogya Club, NIT Jalandhar",
    title: "9 merged PRs",
    body: "Real-time orientation quiz: WebSockets, rotating QR tokens, anti-cheat, and rate limiting.",
    href: "https://github.com/AarogyaClubNITJ/aarogya/pulls?q=is%3Apr+author%3Aguptakaran20",
  },
  {
    icon: Trophy,
    eyebrow: "LeetCode Knight",
    title: "1870 rating · top 5.7%",
    body: "613 problems solved, including 88 Hard; best contest rank 2,171.",
    href: "https://leetcode.com/u/guptakaran0720/",
  },
  {
    icon: Flame,
    eyebrow: "GitHub",
    title: "1,400+ contributions",
    body: "In the past year, across organisation, open-source and personal repositories.",
    href: "https://github.com/guptakaran20",
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 text-xs rounded-md transition-colors">
      {children}
    </span>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative w-full py-16 md:py-20 bg-gray-50 dark:bg-transparent z-30 text-slate-900 dark:text-white transition-colors duration-300"
    >
      <ExperienceAnimations />
      <div className="absolute top-24 right-0 w-[40vw] h-[40vw] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <div className="exp-reveal mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-cyan-700 dark:text-cyan-400 mb-3">
            Where I ship
          </p>
          <h2 id="experience-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Experience</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 text-base md:text-lg max-w-3xl">
            Building and running XCEED&apos;s AI attendance platform, 30+ live cameras, and its Android &amp; iOS app at NIT Jalandhar.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mt-6" />
        </div>

        {/* Stats */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="exp-reveal flex flex-col-reverse rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-4 sm:p-5 shadow-sm dark:shadow-none transition-colors"
            >
              <dt className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-gray-400">{s.label}</dt>
              <dd
                className="text-3xl sm:text-4xl font-bold tracking-tight tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500"
                data-count={s.value}
                data-suffix={s.suffix}
              >
                {s.value.toLocaleString("en-US")}
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>

        {/* Role */}
        <article className="exp-reveal rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-5 sm:p-6 md:p-8 shadow-md dark:shadow-none transition-colors">
          <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 md:mb-8">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">Full Stack Developer</h3>
              <a
                href="https://xceed.nitj.ac.in/ams-manual"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1 text-base font-medium text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                XCEED, NIT Jalandhar <ArrowUpRight className="w-4 h-4" aria-hidden />
              </a>
            </div>
            <span className="self-start inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden />
              Jun 2026 – Present
            </span>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {workstreams.map((w) => {
              const Icon = w.icon;
              const Preview = w.preview;
              return (
                <TiltCard key={w.title} max={4} className="h-full">
                <div
                  className="relative h-full flex flex-col rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0c] p-5 md:p-6 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_24px_60px_-24px_rgba(6,182,212,0.35)] hover:border-slate-300 dark:hover:border-white/20 transition-[box-shadow,border-color] duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 group-hover/tilt:from-indigo-500/[0.06] group-hover/tilt:to-cyan-500/[0.06] transition-colors duration-500 pointer-events-none" aria-hidden />
                  <div className="relative flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300">
                      <Icon className="w-5 h-5" aria-hidden />
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight">{w.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-gray-400">{w.subtitle}</p>
                      <p className="text-xs text-slate-500 dark:text-white/60 mt-1 tabular-nums">{w.meta}</p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <Preview />
                  </div>

                  <ul className="space-y-2.5 mb-5">
                    {w.points.map((pt) => (
                      <li key={pt} className="relative pl-4 text-sm md:text-[15px] leading-relaxed text-slate-600 dark:text-white/70">
                        <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 rounded-full bg-cyan-500" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
                    {w.impact.map((m) => (
                      <div key={m.label} className="flex items-baseline gap-2 sm:block rounded-lg border border-cyan-500/20 bg-cyan-500/[0.06] px-3 py-2 sm:px-2.5">
                        <p className="shrink-0 text-sm font-semibold text-slate-900 dark:text-white tabular-nums leading-tight">{m.metric}</p>
                        <p className="text-xs sm:text-[11px] leading-snug text-slate-600 dark:text-gray-400 sm:mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {w.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                  </div>
                  </div>
                </div>
                </TiltCard>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-slate-500 dark:text-white/60">
            Organisation repositories are private; numbers come from my authored PRs and commits.
          </p>
        </article>

        {/* Open source & achievements */}
        <div className="mt-12 sm:mt-16">
          <h3 className="exp-reveal text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-5 sm:mb-6">
            Open Source &amp; Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <TiltCard key={h.title} max={5} lift={4} className="h-full">
                <a
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exp-reveal group relative h-full flex flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-5 hover:border-slate-300 dark:hover:border-white/25 hover:shadow-lg dark:hover:shadow-[0_20px_50px_-24px_rgba(6,182,212,0.35)] transition-[box-shadow,border-color] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-cyan-700 dark:text-cyan-400">
                      <Icon className="w-[18px] h-[18px]" aria-hidden />
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" aria-hidden />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-white/60">{h.eyebrow}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{h.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">{h.body}</p>
                </a>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
