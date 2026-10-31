"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { profile, toolbox } from "./data";
import { click } from "./sound";
import { useClock } from "./Header";

// app icons for the phone home screen: [label on the icon, tile colour, text colour]
const ICONS: Record<string, [string, string, string?]> = {
  TypeScript: ["TS", "#3178c6"],
  JavaScript: ["JS", "#f0d93a", "#1c1b1a"],
  Python: ["Py", "#3a6ea5"],
  "C/C++": ["C++", "#00599c"],
  SQL: ["SQL", "#d9822b"],
  React: ["⚛", "#20232a", "#61dafb"],
  "Next.js": ["N", "#0b0b0b"],
  Tailwind: ["tw", "#0ea5c6"],
  "HTML/CSS": ["</>", "#e34f26"],
  "Node.js": ["JS", "#3c873a"],
  Express: ["ex", "#3a3836"],
  FastAPI: ["⚡", "#009688"],
  gRPC: ["gR", "#244c5a"],
  WebSockets: ["ws", "#5b4fcf"],
  PostgreSQL: ["Pg", "#336791"],
  MongoDB: ["Mg", "#13aa52"],
  Redis: ["R", "#d82c20"],
  MySQL: ["My", "#00758f"],
  SQLAlchemy: ["SA", "#b2341c"],
  FAISS: ["Fa", "#0467df"],
  "ONNX Runtime": ["ox", "#4b4b4b"],
  "Face Recognition": ["☺", "#7b5cff"],
  "Claude API": ["✳", "#d97757"],
  "Gemini API": ["✦", "#4285f4"],
  Capacitor: ["Ca", "#119eff"],
  FCM: ["🔔", "#ffca28", "#1c1b1a"],
  Docker: ["Dk", "#2496ed"],
  Nginx: ["Nx", "#009639"],
  "AWS EC2": ["aws", "#ff9900", "#1c1b1a"],
  "GitHub Actions": ["▶", "#2088ff"],
};

// two fields to a screen, so each home screen is full
const SCREENS = Array.from({ length: Math.ceil(toolbox.length / 2) }, (_, i) => toolbox.slice(i * 2, i * 2 + 2));

/** On phones the stack is a phone: a few home screens to swipe between, each app one tool. */
function HomeScreen({ down, lit, press, onTalk }: { down: Set<string>; lit: Set<string>; press: (k: string[]) => void; onTalk: () => void }) {
  const { time } = useClock();
  const [page, setPage] = useState(0);
  const pagesRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = pagesRef.current;
    if (el) setPage(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (i: number) => {
    const el = pagesRef.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="hs reveal">
      <div className="hs-screen">
        <div className="hs-status" aria-hidden="true">
          <span>{time.replace(/(am|pm)$/, "")}</span>
          <span className="hs-island" />
          <span className="hs-sys">
            <i className="hs-signal" />
            <i className="hs-battery" />
          </span>
        </div>
        <div ref={pagesRef} className="hs-pages" onScroll={onScroll} data-lenis-prevent>
          {SCREENS.map((rows, i) => (
            <div key={i} className="hs-page">
              {rows.map((row) => (
                <section key={row.row} className="hs-group" aria-label={row.row}>
                  <p className="hs-title">{row.row}</p>
                  <div className="hs-grid">
                    {row.keys.map((k) => {
                      const [abbr, bg, fg] = ICONS[k] ?? [k.slice(0, 2), "#5b5652"];
                      return (
                        <button
                          key={k}
                          className={`hs-app ${down.has(k) ? "is-down" : ""} ${lit.has(k) ? "is-lit" : ""}`}
                          onPointerDown={() => press([k])}
                          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && press([k])}
                        >
                          <span
                            className={`hs-icon ${[...abbr].length === 1 ? "is-glyph" : ""}`}
                            style={{ background: bg, color: fg ?? "#fff" }}
                            aria-hidden="true"
                          >
                            {abbr}
                          </span>
                          <span className="hs-label">{k}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          ))}
        </div>
        <div className="hs-dots" role="tablist" aria-label="Home screens">
          {SCREENS.map((rows, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={page === i}
              aria-label={rows.map((r) => r.row).join(" and ")}
              className={page === i ? "on" : ""}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="hs-dock">
          <a className="hs-app" href={profile.links[0].href} target="_blank" rel="noopener noreferrer">
            <span className="hs-icon" style={{ background: "#1c1b1a" }} aria-hidden="true">gh</span>
            <span className="hs-label">GitHub</span>
          </a>
          <a className="hs-app" href={profile.links[1].href} target="_blank" rel="noopener noreferrer">
            <span className="hs-icon" style={{ background: "#0a66c2" }} aria-hidden="true">in</span>
            <span className="hs-label">LinkedIn</span>
          </a>
          <a className="hs-app" href={`mailto:${profile.email}`}>
            <span className="hs-icon" style={{ background: "#e8693c" }} aria-hidden="true">✉</span>
            <span className="hs-label">Mail</span>
          </a>
          <button className="hs-app" onClick={onTalk}>
            <span className="hs-icon" style={{ background: "#7bc46b" }} aria-hidden="true">↵</span>
            <span className="hs-label">Let&apos;s talk</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/** The stack as a keyboard. Click the keys, or type: every key starting with that letter goes down. */
export function Toolbox() {
  const [down, setDown] = useState<Set<string>>(new Set());
  const [lit, setLit] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLElement>(null);
  const visible = useRef(false);
  const lenis = useLenis();

  const press = (keys: string[]) => {
    if (!keys.length) return;
    click("key");
    setDown(new Set(keys));
    // pressing a lit key again switches its light off
    setLit((l) => {
      const n = new Set(l);
      keys.forEach((k) => (n.has(k) ? n.delete(k) : n.add(k)));
      return n;
    });
    window.setTimeout(() => setDown(new Set()), 130);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!visible.current || e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      const k = e.key.toLowerCase();
      press(toolbox.flatMap((r) => r.keys).filter((name) => name.toLowerCase().startsWith(k)));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section ref={ref} className="toolbox" id="toolbox" aria-labelledby="toolbox-title">
      <div className="wrap">
        <div className="toolbox-head reveal">
          <div>
            <p className="eyebrow">The toolbox</p>
            <h2 id="toolbox-title" className="display">
              Tools I reach for
              <br />
              <em>without looking.</em>
            </h2>
          </div>
          <p className="mono">
            <span className="hint-desk">Go on, type a letter ⌨</span>
            <span className="hint-phone">Swipe between screens, tap an app</span>
          </p>
        </div>
        <div className="kbd reveal">
          {toolbox.map((row, r) => (
            <div key={row.row} className="kbd-row">
              <span className="key is-mod" aria-hidden="true">
                {row.row}
              </span>
              {row.keys.map((k) => (
                <button
                  key={k}
                  className={`key ${down.has(k) ? "is-down" : ""} ${lit.has(k) ? "is-lit" : ""}`}
                  onPointerDown={() => press([k])}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && press([k])}
                >
                  {k}
                </button>
              ))}
              {r === toolbox.length - 1 && (
                <button
                  className="key is-enter"
                  onClick={() => {
                    click("key");
                    lenis?.scrollTo("#contact", { offset: -40 });
                  }}
                >
                  <span>Let&apos;s talk</span>
                  <span aria-hidden="true">↵</span>
                </button>
              )}
            </div>
          ))}
        </div>
        <HomeScreen
          down={down}
          lit={lit}
          press={press}
          onTalk={() => {
            click("key");
            lenis?.scrollTo("#contact", { offset: -40 });
          }}
        />
      </div>
    </section>
  );
}
