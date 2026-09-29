"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function FooterAnimations() {
  useGSAP(() => {
    const footer = document.getElementById("footer-content");
    if (!footer) return;

      gsap.fromTo(footer.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
  }, []);

  return null;
}

export function TimeSpent() {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center md:items-start md:text-left text-center">
      <p className="text-slate-900 dark:text-white text-base">Time Spent:</p>
      <p className="text-emerald-700 dark:text-emerald-400 text-lg font-semibold -mt-0.5">
        {timeSpent} <span className="text-base font-normal">sec</span>
      </p>
    </div>
  );
}

// Visitor counter backed by Abacus (free, open-source CountAPI replacement; no key needed).
// Each browser is counted once. Local development uses a separate "-dev" counter so testing
// never inflates the real number.
const COUNTER_URL = "https://abacus.jasoncameron.dev";
const COUNTER_NS = "guptakaran0720-portfolio";
const SEEN_KEY = "kg:visited";

async function readCounter(action: "hit" | "get", key: string, signal: AbortSignal) {
  const r = await fetch(`${COUNTER_URL}/${action}/${COUNTER_NS}/${key}`, { signal });
  if (r.status === 404) return null; // counter not created yet
  if (!r.ok) throw new Error(String(r.status));
  const data: { value?: number } = await r.json();
  if (typeof data.value !== "number") throw new Error("bad payload");
  return data.value;
}

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
    const key = isLocal ? "visitors-dev" : "visitors";
    const seenKey = `${SEEN_KEY}:${key}`;
    let seen = false;
    try {
      seen = localStorage.getItem(seenKey) === "1";
    } catch {
      seen = true; // storage blocked: only read, never double count
    }
    const markSeen = () => {
      try {
        localStorage.setItem(seenKey, "1");
      } catch {
        /* ignore */
      }
    };
    const ctrl = new AbortController();

    (async () => {
      try {
        let value = await readCounter(seen ? "get" : "hit", key, ctrl.signal);
        if (!seen) markSeen();
        // First ever visit on this counter: "get" 404s, so create it with a hit.
        if (value === null) {
          value = await readCounter("hit", key, ctrl.signal);
          markSeen();
        }
        if (value === null) throw new Error("counter unavailable");
        setCount(value);
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") setFailed(true);
      }
    })();

    return () => ctrl.abort();
  }, []);

  if (failed) return null;

  return (
    <div className="flex flex-col items-center md:items-start md:text-left text-center">
      <p className="text-slate-900 dark:text-white text-base">Visitors:</p>
      <p className="text-emerald-700 dark:text-emerald-400 text-lg font-semibold -mt-0.5 tabular-nums min-w-[3ch]">
        {count === null ? "…" : count.toLocaleString("en-IN")}
      </p>
    </div>
  );
}
