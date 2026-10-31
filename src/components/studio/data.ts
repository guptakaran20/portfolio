// Every fact on the page lives here, so a resume update is a one-file change.

export const profile = {
  first: "Karan",
  name: "Karan Gupta",
  role: "Full Stack Developer & App Lead",
  org: "XCEED, NIT Jalandhar",
  place: "Jalandhar, India",
  timeZone: "Asia/Kolkata",
  email: "guptakaran0720@gmail.com",
  resume: "/resume.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/guptakaran20" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/guptakaran0720/" },
    { label: "LeetCode", href: "https://leetcode.com/u/guptakaran0720/" },
  ],
};

// Words on the flip calendar in the hero: "I build ___"
// kept short so the calendar page stays as big as the headline
export const flipWords = ["AI Systems", "Backends", "Mobile Apps", "Real-Time Apps", "Full Stack"];

export type Project = {
  title: string;
  kicker: string;
  body: string;
  points?: string[];
  impact?: { metric: string; label: string }[];
  tech: string[];
  live?: string;
  code?: string;
  shot?: string; // a full-page screenshot of the live site, scrolled on a monitor
  phone?: string; // a phone-width screenshot, shown on a phone instead
  inside?: { shot?: string; phone?: string }; // screens for the second, "Inside" card: a monitor, a phone, or both
};

export type Room = {
  id: string;
  plaque: [string, string];
  title: string;
  tagline: string;
  intro: string; // the opening line inside the room
  checklist: string[];
  door: string; // door paint
  glow: string; // light spilling out when it opens
  projects: Project[];
};

export const rooms: Room[] = [
  {
    id: "ai",
    plaque: ["AI", "SYSTEMS"],
    title: "AI Systems",
    tagline: "Face recognition on 30+ live cameras",
    intro: "The face-recognition attendance platform behind 30+ live cameras at NIT Jalandhar, and the AI tools that turn lectures into notes and quizzes.",
    checklist: [
      "RetinaFace → AdaFace → FAISS, live on RTSP",
      "Anti-spoofing on ONNX Runtime",
      "Active learning & nightly index rebuilds",
      "LLM notes and quizzes with Claude & Gemini",
      "GPU telemetry, health checks, rollbacks",
    ],
    door: "#24324f",
    glow: "#ffcf8a",
    projects: [
      {
        title: "ILEED",
        shot: "/projects/ileed.jpg",
        inside: { shot: "/projects/xceed-home.jpg", phone: "/projects/xceed-app.jpg" },
        kicker: "XCEED · 219 PRs · 205 merged · Jun – Oct 2026",
        body: "Intelligent Learning Engagement and Entity Detection: the AI attendance platform for 1,000+ students at NIT Jalandhar.",
        points: [
          "Integrated a FAISS vector index with the Node.js backend for live RTSP identification, running RetinaFace detection, AdaFace IR-50 embeddings and MiniFASNetV2 anti-spoofing on ONNX Runtime.",
          "Per-frame voting after DBSCAN clustering, recovering 29 students across 9 periods who were marked absent when neighbouring faces merged.",
          "Active learning that keeps only clear face crops (sharpness, head pose, detector score, runner-up margin), with automated ERP embeddings and nightly FAISS rebuilds.",
          "Split the Node.js server into an IPC-routed pool of quiz and learning workers that replaces frozen processes on its own.",
          "AI Studio: notes and quizzes from lecture transcripts and PDF/PPTX slides with Claude and Gemini, reserving each call's worst-case cost so credit limits hold.",
          "One-click deploys with health checks and automatic rollback, a GPU dashboard with MIG/VRAM telemetry, and uptime alerting.",
        ],
        impact: [
          { metric: "2.0s → 915ms", label: "ERP list load" },
          { metric: "29", label: "students recovered from cluster merges" },
          { metric: "0 of 60", label: "requests dropped when a worker is killed" },
        ],
        tech: ["Node.js", "Express", "React", "Python", "MongoDB", "FAISS", "ONNX Runtime", "FFmpeg", "Claude API", "Gemini API"],
        live: "https://xceed.nitj.ac.in/ams-manual",
      },
    ],
  },
  {
    id: "mobile",
    plaque: ["MOBILE", "APPS"],
    title: "Mobile Apps",
    tagline: "One codebase, Android and iOS",
    intro: "The Android & iOS app for XCEED's attendance platform, built on Capacitor from the first commit and live on Google Play.",
    checklist: [
      "Built on Capacitor from the first commit",
      "Delta over-the-air updates",
      "PIN, biometrics, deep links",
      "SOS alerts with live location",
      "Push notifications & offline-first cache",
    ],
    door: "#3d2c3a",
    glow: "#ffb4a2",
    projects: [
      {
        title: "XCEED Learning App",
        phone: "/projects/xceed-login.jpg",
        inside: { phone: "/projects/xceed-help-m.jpg" },
        kicker: "App Lead · 420 commits · 14 PRs · Aug – Oct 2026",
        body: "The Android & iOS app for the AMS platform, live on Google Play, which I lead.",
        points: [
          "Built the app from the first commit on Capacitor: PIN and biometric sign-in, deep links, and multi-account switching.",
          "Delta over-the-air updates published through GitHub Actions, shipping only the files a release changed.",
          "Automated web → app code sync with custom merge drivers, keeping mobile-only code behind override seams.",
          "An SOS alert that notifies every admin and shares the sender's live location every 30s, even with the app closed.",
          "Push notifications with Firebase Cloud Messaging, offline-first caching, and an iOS build with Universal Links, now in App Store review.",
        ],
        impact: [
          { metric: "21.6 → 0.41 MB", label: "per small OTA release" },
          { metric: "100+", label: "automated web → app syncs" },
          { metric: "2 stores", label: "from one codebase" },
        ],
        tech: ["Capacitor", "React", "Vite", "Firebase Cloud Messaging", "TanStack Query", "GitHub Actions"],
      },
    ],
  },
  {
    id: "systems",
    plaque: ["DISTRIBUTED", "SYSTEMS"],
    title: "Distributed Systems",
    tagline: "Queues, workers and real-time state",
    intro: "Systems that keep work moving under load: queues, workers, retries and real-time state, built and deployed end to end.",
    checklist: [
      "DAG pipelines over Redis Streams",
      "Retries, dead-letter queue, XCLAIM recovery",
      "gRPC transport & live WebSockets",
      "Redis matchmaking & Socket.IO leaderboards",
      "AWS EC2, Nginx, Prometheus",
    ],
    door: "#5f7461",
    glow: "#d9ffb8",
    projects: [
      {
        title: "EventFlow",
        shot: "/projects/eventflow.jpg",
        kicker: "Workflow orchestration engine",
        body: "Runs graph-based (DAG) pipelines across Redis Streams workers, with retries, a dead-letter queue, heartbeat-based stuck-job recovery (XPENDING/XCLAIM), gRPC transport, live WebSocket updates, JWT auth and rate limiting. CI runs pytest, ruff and mypy.",
        tech: ["Python", "FastAPI", "Redis Streams", "PostgreSQL", "SQLAlchemy", "gRPC", "WebSockets", "Next.js", "Docker"],
        live: "https://goeventflow.vercel.app/",
        code: "https://github.com/guptakaran20/EventFlow",
      },
      {
        title: "CodeArena",
        shot: "/projects/codearena.jpg",
        kicker: "Real-time 1v1 coding battles",
        body: "Redis matchmaking, tournaments and live leaderboards synced over Socket.IO. Sandboxed multi-language execution with Piston, JWT and Google OAuth, deployed on AWS EC2 behind Nginx with Prometheus metrics.",
        tech: ["TypeScript", "Next.js", "Node.js", "Express", "MongoDB", "Redis", "Socket.IO", "Docker", "Nginx", "AWS EC2"],
        live: "https://codearenabattle.vercel.app/",
        code: "https://github.com/guptakaran20/CodeBattle",
      },
    ],
  },
  {
    id: "web",
    plaque: ["FULL STACK", "PRODUCTS"],
    title: "Full Stack Products",
    tagline: "From schema to storefront, all shipped",
    intro: "Full stack products, from LLM-powered data tools to a storefront and a reading app. Every one of them is live.",
    checklist: [
      "LLM pipelines streamed over SSE",
      "Cookie auth with CSRF & OAuth",
      "Zod-validated APIs, Prisma, Postgres",
      "Admin panels & sales analytics",
      "Every one of them is live",
    ],
    door: "#a9552f",
    glow: "#ffe1a8",
    projects: [
      {
        title: "ImportlyAI",
        shot: "/projects/importlyai.jpg",
        kicker: "CSV → CRM, mapped by Gemini",
        body: "Maps any CSV onto a standard CRM schema with a multi-stage Gemini pipeline for schema inference, validation and field mapping, streaming live progress over Server-Sent Events. Backed by a benchmark suite of 180+ tests.",
        tech: ["Next.js", "TypeScript", "Node.js", "Express", "Gemini API", "PapaParse"],
        live: "https://importlyai.vercel.app",
        code: "https://github.com/guptakaran20/ImportlyAI",
      },
      {
        title: "SponsorGrid",
        shot: "/projects/sponsorgrid.jpg",
        kicker: "Sponsorship CRM for college clubs",
        body: "Track sponsor leads, deals and funding. HttpOnly-cookie auth with CSRF protection, Google OAuth, Zod-validated APIs, Cloudinary uploads and GitHub Actions CI.",
        tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Zod", "Cloudinary"],
        live: "https://trysponsorgrid.vercel.app/",
        code: "https://github.com/guptakaran20/Sponsorship",
      },
      {
        title: "Arovia Vibes",
        shot: "/projects/arovia.jpg",
        kicker: "eCommerce storefront",
        body: "A storefront with an admin panel, sales analytics and transactional email, finished with fluid micro-animations.",
        tech: ["Next.js", "Supabase", "Resend", "Tailwind CSS", "Framer Motion"],
        live: "https://aroviavibes.vercel.app/",
        code: "https://github.com/guptakaran20/AroviaVibes",
      },
      {
        title: "StrangerBlogs",
        shot: "/projects/strangerblogs.jpg",
        kicker: "Blogging, built for reading",
        body: "Fast rendering, personalised reading modes and a smooth authoring flow.",
        tech: ["React", "JavaScript", "Appwrite", "Tailwind CSS"],
        live: "https://stranger-blogs.vercel.app/",
        code: "https://github.com/guptakaran20/StrangerBlogs",
      },
    ],
  },
];

export type Chapter = {
  year: string;
  range: string;
  title: string;
  where: string;
  points: string[];
  tint: string; // colour of the light behind this chapter
};

export const story: Chapter[] = [
  {
    year: "2026",
    range: "JUN 2026 — NOW",
    title: "Full Stack Developer",
    where: "XCEED, NIT Jalandhar",
    points: [
      "Building the face-recognition attendance platform for 1,000+ students across 30+ cameras.",
      "233 pull requests authored, 219 merged into main, across Python, Node.js and the AI Studio.",
    ],
    tint: "#e7a77c",
  },
  {
    year: "2026",
    range: "AUG 2026 — NOW",
    title: "App Lead",
    where: "XCEED Learning App",
    points: [
      "Took the Android & iOS app from its first commit to Google Play, with iOS in App Store review.",
      "Cut a small over-the-air release from 21.6 MB to 0.41 MB with delta updates.",
    ],
    tint: "#c99ab4",
  },
  {
    year: "2026",
    range: "GSSOC '26",
    title: "Open-source contributor",
    where: "GirlScript Summer of Code · advanced",
    points: [
      "Merged a PR that hardened auth validation and standardised API responses in a MERN leave-management system.",
      "1,890+ GitHub contributions in the past year, with a 111-day streak.",
    ],
    tint: "#9fb79a",
  },
  {
    year: "2025",
    range: "2025 — 2029",
    title: "B.Tech, Instrumentation & Control",
    where: "Dr B R Ambedkar NIT Jalandhar · CGPA 8.49",
    points: [
      "Where the code moved from contest problems to production systems.",
      "LeetCode Knight: 1870 rating, top 5.7%, 639 problems solved including 88+ Hard.",
    ],
    tint: "#9db0d6",
  },
  {
    year: "2025",
    range: "GRADUATED 2025",
    title: "Senior Secondary, Non-Medical",
    where: "Dayanand Model Sr. Sec. School, Jalandhar",
    points: [
      "Physics, chemistry and maths, and the first programs written for fun.",
      "Where it all started.",
    ],
    tint: "#e6c58a",
  },
];

// The split-flap board
export const numbers = [
  { value: "233", label: "Pull requests authored" },
  { value: "219", label: "Merged into main" },
  { value: "740+", label: "Commits shipped" },
  { value: "1000+", label: "Students served" },
  { value: "1870", label: "LeetCode rating" },
  { value: "1890+", label: "Contributions this year" },
];

// The keyboard
export const toolbox: { row: string; keys: string[] }[] = [
  { row: "Languages", keys: ["TypeScript", "JavaScript", "Python", "C/C++", "SQL"] },
  { row: "Frontend", keys: ["React", "Next.js", "Tailwind", "HTML/CSS"] },
  { row: "Backend", keys: ["Node.js", "Express", "FastAPI", "gRPC", "WebSockets"] },
  { row: "Data", keys: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "SQLAlchemy"] },
  { row: "AI / ML", keys: ["FAISS", "ONNX Runtime", "Face Recognition", "Claude API", "Gemini API"] },
  { row: "Ship it", keys: ["Capacitor", "FCM", "Docker", "Nginx", "AWS EC2", "GitHub Actions"] },
];
