"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { profile, rooms } from "./data";

type NavItem = { label: string; href?: string; door?: number };

const nav: NavItem[] = [
  { label: "Home", href: "#top" },
  ...rooms.map((r, i) => ({ label: r.title, door: i })),
  { label: "My story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const first = window.setTimeout(() => setNow(new Date()), 0);
    const id = window.setInterval(() => setNow(new Date()), 10_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  if (!now) return { time: "--:--", date: "" };

  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: profile.timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(now)
    .replace(/\s/g, "")
    .toLowerCase();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: profile.timeZone,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return { time, date: `${get("day")} ${get("month")}, ${get("year")}` };
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState("#top");
  const lenis = useLenis();
  const { time, date } = useClock();
  const compactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // the link for the section in the middle of the screen stays lit
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(`#${e.target.id}`);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    ["top", "work", "story", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  // the dropdown unfolds from the pill's exact footprint
  useEffect(() => {
    const el = compactRef.current;
    const btn = el?.querySelector("button");
    if (!el || !btn) return;
    const measure = () => el.style.setProperty("--pill-w", `${btn.offsetWidth}px`);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(btn);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!compactRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const go = (item: NavItem) => {
    setOpen(false);
    if (item.door !== undefined) {
      window.dispatchEvent(new CustomEvent("studio:door", { detail: item.door }));
    } else if (item.href === "#top") {
      lenis?.scrollTo(0);
    } else if (item.href) {
      lenis?.scrollTo(item.href, { offset: -60 });
    }
  };

  const isCurrent = (item: NavItem) => (item.door !== undefined ? current === "#work" : current === item.href);

  const links = (cls: string) =>
    nav.map((item, i) => (
      <li key={item.label} style={{ "--i": i } as React.CSSProperties}>
        <a
          href={item.href ?? "#work"}
          className={cls}
          aria-current={isCurrent(item) && item.door === undefined ? "true" : undefined}
          onClick={(e) => {
            e.preventDefault();
            go(item);
          }}
        >
          <span>{item.label}</span>
        </a>
      </li>
    ));

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap">
        <nav className="nav" aria-label="Primary">
          <ul>{links("nav-link")}</ul>
        </nav>

        <div ref={compactRef} className={`nav-compact ${open ? "is-open" : ""}`}>
          <button
            className="pill menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="nav-drop"
          >
            <span className="burger" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="menu-word">{open ? "Close" : "Menu"}</span>
          </button>
          <div id="nav-drop" className="nav-drop" inert={!open}>
            <ul>{links("drop-link")}</ul>
            <div className="drop-foot mono">
              <a href={`mailto:${profile.email}`}>Email</a>
              {profile.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="pill clock" aria-label={`Local time in Jalandhar: ${time}`}>
          <span className="clock-label">Local time</span>
          <b>{time}</b>
          <span className="sep" aria-hidden="true" />
          <span className="clock-date">{date}</span>
        </p>
      </div>
    </header>
  );
}
