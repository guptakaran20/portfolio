"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { rooms, type Room, type Project } from "./data";
import { Arrow } from "./Hero";
import { ProjectPreview } from "../ui/previews/ProjectPreview";
import { RecognitionPreview } from "../ui/previews/RecognitionPreview";
import { OtaDeltaPreview } from "../ui/previews/OtaDeltaPreview";

const ANG = 70; // a door fully open, swung into the room
const HOVER_OPEN = 0.1; // hovering cracks it open

type Spring = { set: (t: number) => void; stop: () => void };
function spring(tension: number, friction: number, render: (x: number) => void): Spring {
  let x = 0, v = 0, target = 0, raf = 0;
  const step = () => {
    const dt = 1 / 60, a = tension * (target - x) - friction * v;
    v += a * dt;
    x += v * dt;
    render(x);
    if (Math.abs(target - x) < 0.001 && Math.abs(v) < 0.001) {
      x = target; v = 0; render(x); raf = 0;
      return;
    }
    raf = requestAnimationFrame(step);
  };
  render(0);
  return {
    set(t) { target = t; if (!raf) raf = requestAnimationFrame(step); },
    stop() { cancelAnimationFrame(raf); raf = 0; },
  };
}

export function Rooms() {
  const secRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const dinfoRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const unitRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [info, setInfo] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  // everything the imperative door code needs, kept off React's render path
  const api = useRef<{ openDoor: (i: number) => void; leave: (then?: () => void) => void }>({
    openDoor: () => {},
    leave: () => {},
  });

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    const sec = secRef.current!;
    const wall = wallRef.current!;
    const dinfo = dinfoRef.current!;
    const badge = cursorRef.current!;
    const units = unitRefs.current.filter(Boolean) as HTMLLIElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const root = document.documentElement;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    let busy = false, walkRaf = 0, cur = -1, pushed = false;

    const doors = units.map((u) => {
      const door = u.querySelector<HTMLElement>(".door")!;
      const s = spring(120, 14, (o) => {
        door.style.transform = `rotateY(${Math.max(0, o) * ANG}deg)`; // the frame's door stop: never swings outward
        u.style.setProperty("--o", Math.max(0, o).toFixed(4));
      });
      return { u, s, way: u.querySelector<HTMLButtonElement>(".doorway")! };
    });

    /* ----- the wall reveals itself: headline painted on, then the doors rise in ----- */
    let io: IntersectionObserver | null = null;
    sec.classList.remove("pre"); // never left hidden by an earlier run
    if (!reduced && sec.getBoundingClientRect().top > window.innerHeight * 0.82) {
      sec.classList.add("pre");
      io = new IntersectionObserver(
        (es) => {
          if (!es.some((e) => e.isIntersecting)) return;
          sec.classList.add("in");
          requestAnimationFrame(() => sec.classList.remove("pre"));
          io?.disconnect();
        },
        { threshold: 0.18 },
      );
      io.observe(sec);
    }

    /* ----- "Click to enter" badge that replaces the cursor over a door ----- */
    let over = false;
    const place = (e: PointerEvent) => {
      badge.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    const showBadge = (on: boolean) => {
      over = on;
      badge.classList.toggle("on", on);
    };

    /* ----- hovering a door: the others fade back and the work behind it is described beside it ----- */
    let active = -1, token = 0, px = -1, py = -1;
    const show = (i: number) => {
      const my = ++token;
      units.forEach((u, k) => u.classList.toggle("on", k === i));
      sec.classList.add("focus");
      const wr = wall.getBoundingClientRect(), r = units[i].getBoundingClientRect();
      const toRight = i < 2 && units[i + 2];
      const a = (toRight ? units[i + 1] : units[i - 2] || units[i - 1]).getBoundingClientRect();
      const b = (toRight ? units[i + 2] : units[i - 1]).getBoundingClientRect();
      const left = Math.min(a.left, b.left), right = Math.max(a.right, b.right);
      const placeInfo = () => {
        if (my !== token || active !== i) return; // something newer happened
        setInfo(i);
        requestAnimationFrame(() => {
          if (my !== token) return;
          const w = Math.min(right - left, 22 * 16);
          dinfo.style.width = w + "px";
          dinfo.style.left = left - wr.left + (right - left - w) / 2 + "px"; // centred in the space of the faded doors
          dinfo.style.top = r.top - wr.top + r.height * 0.5 - dinfo.offsetHeight / 2 + "px";
          dinfo.classList.add("on");
        });
      };
      if (dinfo.classList.contains("on")) {
        dinfo.classList.remove("on");
        later(placeInfo, 130);
      } else placeInfo();
    };
    const hide = () => {
      token++;
      sec.classList.remove("focus");
      units.forEach((u) => u.classList.remove("on"));
      dinfo.classList.remove("on");
    };
    const setHover = (i: number) => {
      if (busy) i = -1;
      if (i === active) return;
      active = i;
      if (i < 0) hide();
      else show(i);
    };
    const under = (el: Element | null) => {
      const w = el?.closest?.(".doorway");
      return w ? units.findIndex((u) => u.contains(w)) : -1;
    };

    const onMove = (e: PointerEvent) => {
      if (over) place(e);
      if (!canHover) return;
      px = e.clientX;
      py = e.clientY;
      setHover(under(e.target as Element));
    };
    const onScroll = () => {
      if (canHover && px >= 0) setHover(under(document.elementFromPoint(px, py)));
    };
    const onLeaveDoc = () => setHover(-1);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("pointerleave", onLeaveDoc);

    const cleanups: (() => void)[] = [];
    doors.forEach((d, i) => {
      const enterH = (e: PointerEvent) => {
        if (!canHover) return;
        place(e);
        if (!busy) { showBadge(true); d.s.set(HOVER_OPEN); }
      };
      const leaveH = () => {
        showBadge(false);
        if (!busy) d.s.set(0);
      };
      const focusH = () => { if (d.way.matches(":focus-visible")) setHover(i); };
      const blurH = () => { if (px < 0 || under(document.elementFromPoint(px, py)) !== i) setHover(-1); };
      const clickH = () => enter(i);
      d.way.addEventListener("pointerenter", enterH);
      d.way.addEventListener("pointerleave", leaveH);
      d.way.addEventListener("focus", focusH);
      d.way.addEventListener("blur", blurH);
      d.way.addEventListener("click", clickH);
      cleanups.push(() => {
        d.way.removeEventListener("pointerenter", enterH);
        d.way.removeEventListener("pointerleave", leaveH);
        d.way.removeEventListener("focus", focusH);
        d.way.removeEventListener("blur", blurH);
        d.way.removeEventListener("click", clickH);
      });
    });

    /* ----- clicking: the lever goes down, the door swings open, and you walk through ----- */
    function enter(i: number) {
      if (busy) return;
      busy = true;
      showBadge(false);
      setHover(-1);
      active = -1;
      hide();
      const d = doors[i];
      doors.forEach((o, k) => { if (k !== i) o.s.set(0); });
      d.u.classList.add("press");
      later(() => d.u.classList.remove("press"), 380);
      later(() => d.s.set(1), reduced ? 0 : 170);
      later(() => through(i), reduced ? 0 : 760);
    }

    // freeze scrolling without touching layout
    const swallow = (e: Event) => {
      // the room itself still scrolls; only the page behind it is held
      if ((e.target as Element | null)?.closest?.(".roomv")) return;
      e.preventDefault();
    };
    function holdScroll(on: boolean) {
      if (on) {
        lenisRef.current?.stop();
        window.addEventListener("wheel", swallow, { passive: false });
        window.addEventListener("touchmove", swallow, { passive: false });
      } else {
        lenisRef.current?.start();
        window.removeEventListener("wheel", swallow);
        window.removeEventListener("touchmove", swallow);
      }
    }

    // walking through: the wall of doors scales up around the dark gap beside the open door
    // until that darkness fills the screen; then the room fades up out of it
    function through(i: number) {
      const u = units[i];
      const r = u.querySelector(".opening")!.getBoundingClientRect();
      const dr = u.querySelector(".door")!.getBoundingClientRect();
      const gapL = Math.min(Math.max(dr.right, r.left), r.right - 6);
      const gw = Math.max(r.right - gapL, 10), gh = r.height;
      const cx = (gapL + r.right) / 2, cy = r.top + gh * 0.5;
      holdScroll(true);
      root.classList.add("walking");
      const sr = sec.getBoundingClientRect();
      sec.style.transformOrigin = `${cx - sr.left}px ${cy - sr.top}px`;
      sec.classList.add("through");
      const tx = window.innerWidth / 2 - cx, ty = window.innerHeight / 2 - cy;
      const sEnd = Math.max(window.innerWidth / gw, window.innerHeight / gh) * 1.15;
      const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      const t0 = performance.now(), D = reduced ? 1 : 1500;
      let handed = false;
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / D), e = ease(p), sc = Math.exp(Math.log(sEnd) * e); // even speed of approach
        const f = Math.min(1, e * 1.6); // drift the door to the centre early on
        sec.style.transform = `translate(${tx * f}px, ${ty * f}px) scale(${sc})`;
        // the moment the dark covers the whole screen, the room takes over
        if (!handed && (sc >= sEnd / 1.15 || p >= 1)) {
          handed = true;
          cur = i;
          setOpen(i);
          later(() => setEntered(true), 30);
          try {
            history.pushState({ room: i }, "", `#${rooms[i].id}`);
            pushed = true;
          } catch {
            pushed = false;
          }
        }
        if (p < 1) walkRaf = requestAnimationFrame(step);
      };
      walkRaf = requestAnimationFrame(step);
    }

    // leaving: the room sinks back into the dark, you back out of the doorway, the door swings shut
    let afterLeave: (() => void) | null = null;
    function leaveRoom() {
      if (cur < 0) return;
      const d = doors[cur];
      setEntered(false);
      later(() => {
        setOpen(null);
        later(() => {
          cancelAnimationFrame(walkRaf);
          const m = /translate\(([-\d.]+)px, ([-\d.]+)px\) scale\(([\d.]+)\)/.exec(sec.style.transform);
          const X = m ? +m[1] : 0, Y = m ? +m[2] : 0, S = m ? +m[3] : 1;
          const t0 = performance.now(), D = reduced ? 1 : 1300;
          const ease = (x: number) => 1 - Math.pow(1 - x, 3);
          const step = (now: number) => {
            const p = Math.min(1, (now - t0) / D), e = ease(p);
            const sc = Math.exp(Math.log(S) * (1 - e));
            sec.style.transform = `translate(${X * (1 - e)}px, ${Y * (1 - e)}px) scale(${sc})`;
            if (p < 1) walkRaf = requestAnimationFrame(step);
            else {
              sec.style.transform = "";
              sec.style.transformOrigin = "";
              sec.classList.remove("through");
              d.s.set(0);
              root.classList.remove("walking");
              busy = false;
              holdScroll(false);
              d.way.focus({ preventScroll: true });
              cur = -1;
              if (afterLeave) {
                const f = afterLeave;
                afterLeave = null;
                later(f, 60);
              }
            }
          };
          walkRaf = requestAnimationFrame(step);
        }, reduced ? 0 : 360);
      }, reduced ? 0 : 520);
    }
    const leave = (then?: () => void) => {
      if (cur < 0) return;
      afterLeave = then ?? null;
      if (pushed) {
        pushed = false;
        history.back(); // popstate does the rest
      } else leaveRoom();
    };
    const onPop = () => {
      if (cur >= 0 && !(history.state && history.state.room !== undefined)) {
        pushed = false;
        leaveRoom();
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && cur >= 0) leave(); };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);

    // from the nav or a link: go down to the doors, face the right one, then open it and walk in
    const openDoor = (i: number) => {
      if (busy) return;
      const top = sec.getBoundingClientRect().top + window.scrollY;
      if (Math.abs(window.scrollY - top) > 4) {
        if (lenisRef.current) lenisRef.current.scrollTo(top, { duration: 0.9, easing: (x: number) => 1 - Math.pow(1 - x, 3) });
        else window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      }
      const t0 = performance.now();
      const settle = () => {
        // open as the scroll lands, not after its tail
        if (Math.abs(window.scrollY - top) > 24 && performance.now() - t0 < 1500) return requestAnimationFrame(settle);
        enter(i);
      };
      requestAnimationFrame(settle);
    };
    const onDoor = (e: Event) => openDoor((e as CustomEvent<number>).detail);
    window.addEventListener("studio:door", onDoor);
    api.current = { openDoor, leave };

    return () => {
      io?.disconnect();
      sec.classList.remove("pre");
      timers.forEach(window.clearTimeout);
      cancelAnimationFrame(walkRaf);
      doors.forEach((d) => d.s.stop());
      cleanups.forEach((f) => f());
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("pointerleave", onLeaveDoc);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("studio:door", onDoor);
      window.removeEventListener("wheel", swallow);
      window.removeEventListener("touchmove", swallow);
      root.classList.remove("walking");
    };
  }, []);

  const r = rooms[info];

  return (
    <>
      <section ref={secRef} className="rooms" id="work" aria-labelledby="rooms-title">
        <div ref={wallRef} className="wrap rooms-wall">
          <h2 id="rooms-title" className="sr-only">
            My work, one door per field
          </h2>
          <p className="display paint" aria-hidden="true">
            Something&apos;s running
            <br />
            behind every door
          </p>
          <div ref={dinfoRef} className="dinfo" aria-live="polite" style={{ "--accent": r.door } as React.CSSProperties}>
            <h3>{r.title}</h3>
            <p className="mono">{r.tagline}</p>
            <ul>
              {r.checklist.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <ul className="doors">
            {rooms.map((room, i) => (
              <li
                key={room.id}
                ref={(el) => {
                  unitRefs.current[i] = el;
                }}
                className="unit"
                style={{ "--i": i, "--door": room.door, "--glow": room.glow } as React.CSSProperties}
              >
                <button className="doorway" aria-label={`Open the ${room.title} door: ${room.tagline}`}>
                  <span className="casing" />
                  <span className="opening">
                    <span className="room-dark" />
                    <span className="door">
                      <span className="door-flute" />
                      <span className="plate">{room.title}</span>
                      <span className="handle">
                        <span className="handle-lever" />
                        <span className="handle-lock" />
                      </span>
                      <span className="door-shade" />
                    </span>
                    <span className="sill" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div ref={cursorRef} className="door-cursor" aria-hidden="true">
        Click to enter
      </div>

      {open !== null && (
        <RoomView
          room={rooms[open]}
          index={open}
          entered={entered}
          onBack={() => api.current.leave()}
          onNext={() => {
            const n = (open + 1) % rooms.length;
            api.current.leave(() => api.current.openDoor(n));
          }}
        />
      )}
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
   Inside a room: the projects as cards stacked on top of each other, each with a desktop monitor
   --------------------------------------------------------------------------------------------- */

type Card = {
  meta: string;
  title: string;
  sub: string;
  desc?: string;
  list?: string[];
  tags: string[];
  live?: string;
  code?: string;
  phone?: boolean; // shown on a phone instead of a desktop monitor
  screen: React.ReactNode;
  companion?: React.ReactNode; // a phone standing in front of the monitor
  impact?: { metric: string; label: string }[];
};

// a full-page screenshot, scrolled on its screen by the room
function Page({ src, title }: { src: string; title: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="page" src={src} alt={`${title}: screenshot`} decoding="async" loading="lazy" />;
}

const PREVIEWS: Record<string, React.ReactNode> = {
  ILEED: <RecognitionPreview />,
  "XCEED Learning App": <OtaDeltaPreview />,
};

// a dashboard of the numbers that came out of the work
function ImpactScreen({ p }: { p: Project }) {
  return (
    <div className="impact-screen">
      <p className="mono">{p.title} · results</p>
      <div>
        {p.impact!.map((m) => (
          <div key={m.label}>
            <b>{m.metric}</b>
            <span>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function cardsFor(room: Room): Card[] {
  return room.projects.flatMap((p): Card[] => {
    const [first, ...rest] = p.kicker.split(" · ");
    // a real screenshot of the live site when there is one; it scrolls itself on the screen
    const shot = p.phone ?? p.shot;
    const screen = shot ? <Page src={shot} title={p.title} /> : PREVIEWS[p.title] ?? <ProjectPreview title={p.title} />;
    const where = [p.live && "Live", p.code && "Open source"].filter(Boolean).join(" · ");
    const main: Card = {
      meta: rest.length ? first : where || room.title,
      title: p.title,
      sub: rest.length ? rest.join(" · ") : p.kicker,
      desc: p.body,
      tags: p.tech.slice(0, 6),
      live: p.live,
      code: p.code,
      phone: !!p.phone,
      screen,
    };
    if (!p.points) return [main];
    // the bigger pieces of work get a second card: what shipped, next to the numbers it moved
    return [
      main,
      {
        meta: "What shipped",
        title: `Inside ${p.title}`,
        sub: first,
        list: p.points,
        tags: p.tech.slice(6),
        // more of the real product when there is a screenshot for it; otherwise the numbers it moved
        ...(p.inside?.shot
          ? {
              screen: <Page src={p.inside.shot} title={p.title} />,
              companion: p.inside.phone && <Page src={p.inside.phone} title={`${p.title} on a phone`} />,
              impact: p.impact,
            }
          : p.inside?.phone
            ? { phone: true, screen: <Page src={p.inside.phone} title={`${p.title} on a phone`} />, impact: p.impact }
            : { screen: p.impact ? <ImpactScreen p={p} /> : screen }),
      },
    ];
  });
}

function RoomView({
  room,
  index,
  entered,
  onBack,
  onNext,
}: {
  room: Room;
  index: number;
  entered: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const cards = cardsFor(room);
  const next = rooms[(index + 1) % rooms.length];

  useEffect(() => {
    if (entered) backRef.current?.focus({ preventScroll: true });
  }, [entered]);

  useEffect(() => {
    const scroller = scrollerRef.current!;
    const els = [...scroller.querySelectorAll<HTMLElement>(".card")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // arriving: each card's words rise in and its monitor slides across as it comes into view
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          e.target.classList.toggle("on", e.isIntersecting);
          if (e.isIntersecting) e.target.classList.add("seen");
        }),
      { root: scroller, threshold: 0.25 },
    );
    els.forEach((c) => io.observe(c));

    // stacking: as the next card slides over, the one beneath settles back a little
    let ticking = false, raf = 0;
    const stackFx = () => {
      ticking = false;
      els.forEach((c, i) => {
        const nextEl = els[i + 1];
        let p = 0;
        if (nextEl) {
          const top = parseFloat(getComputedStyle(c).top), h = c.offsetHeight;
          p = Math.min(1, Math.max(0, (top + h - nextEl.getBoundingClientRect().top) / h));
        }
        c.style.transform = p ? `scale(${(1 - p * 0.06).toFixed(4)})` : "";
        (c.lastElementChild as HTMLElement).style.opacity = (p * 0.28).toFixed(3);
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(stackFx);
      }
    };
    if (!reduced) {
      scroller.addEventListener("scroll", onScroll, { passive: true });
      stackFx();
    }

    // each live page scrolls itself top to bottom and back on its screen, while its card is on show
    const SPEED = 230, REST = 1100; // screen pixels a second, pause at each end (ms)
    const shots = els.flatMap((c, i) =>
      [...c.querySelectorAll<HTMLImageElement>("img.page")].map((img) => ({ c, i, img }))
    ).flatMap(({ c, i, img }) => {
      const scr = img.parentElement!;
      const s = { c, i, img, scr, pos: 0, dist: 0, dir: 1, wait: REST, hidden: true };
      const measure = () => {
        s.dist = Math.max(0, img.offsetHeight - scr.clientHeight);
        s.pos = Math.min(s.pos, s.dist);
        paint(s);
      };
      if (img.complete && img.naturalWidth) measure();
      else img.addEventListener("load", measure, { once: true });
      return [{ ...s, measure }];
    });
    function paint(s: { img: HTMLImageElement; pos: number }) {
      s.img.style.transform = `translate3d(0,${-s.pos.toFixed(1)}px,0)`;
    }
    // a screen that has been completely out of sight (or covered by the card stacked over it) starts again from the top
    const coverCheck = () =>
      shots.forEach((s) => {
        const r = s.scr.getBoundingClientRect();
        let hidden = r.bottom <= 0 || r.top >= window.innerHeight;
        if (!hidden)
          for (let k = s.i + 1; k < els.length; k++) {
            const n = els[k].getBoundingClientRect();
            if (n.top <= r.top + 1 && n.bottom >= r.bottom - 1) { hidden = true; break; }
          }
        if (hidden && !s.hidden) { s.pos = 0; s.dir = 1; s.wait = REST; paint(s); }
        s.hidden = hidden;
      });
    scroller.addEventListener("scroll", coverCheck, { passive: true });
    const onResize = () => shots.forEach((s) => s.measure());
    window.addEventListener("resize", onResize);
    coverCheck();
    let runRaf = 0, lastT = 0;
    const run = (t: number) => {
      const dt = Math.min(64, t - (lastT || t));
      lastT = t;
      if (!reduced)
        for (const s of shots) {
          if (s.hidden || !s.c.classList.contains("on") || !s.dist) continue;
          if (s.wait > 0) { s.wait -= dt; continue; }
          const left = s.dir > 0 ? s.dist - s.pos : s.pos;
          const ease = Math.min(1, 0.3 + left / 160) * Math.min(1, 0.35 + (s.dist - left) / 160); // eases in and out at each end
          s.pos += (s.dir * SPEED * ease * dt) / 1000;
          if (s.pos >= s.dist) { s.pos = s.dist; s.dir = -1; s.wait = REST; }
          else if (s.pos <= 0) { s.pos = 0; s.dir = 1; s.wait = REST; }
          paint(s);
        }
      runRaf = requestAnimationFrame(run);
    };
    runRaf = requestAnimationFrame(run);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(runRaf);
      scroller.removeEventListener("scroll", coverCheck);
      window.removeEventListener("resize", onResize);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [room]);

  return (
    <div
      ref={scrollerRef}
      className={`roomv ${entered ? "is-in" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${room.title} room`}
      data-lenis-prevent
    >
      <div className="roomv-wrap">
        <div className="roomv-top">
          <button ref={backRef} className="roomv-chip" onClick={onBack}>
            <span style={{ display: "inline-flex", transform: "scaleX(-1)" }}>
              <Arrow size={14} />
            </span>
            Back to the doors
          </button>
          <span className="mono">
            Room {String(index + 1).padStart(2, "0")} / {String(rooms.length).padStart(2, "0")}
          </span>
        </div>
        <section className="roomv-intro">
          <h1 className="display">{room.title}</h1>
          <p>{room.intro}</p>
          <span className="mono count">
            {room.projects.length} {room.projects.length === 1 ? "project" : "projects"} · {room.tagline}
          </span>
        </section>
        <section className="stack" aria-label="Projects">
          {cards.map((c, i) => (
            <article key={c.title} className={`card ${i % 2 ? "flip" : ""}`} style={{ "--i": i } as React.CSSProperties}>
              <div className="card-in">
                <div className="card-info">
                  <p className="card-meta">
                    <span>{c.meta}</span>
                  </p>
                  <h2>{c.title}</h2>
                  <p className="sub">{c.sub}</p>
                  {c.desc && <p className="desc">{c.desc}</p>}
                  {c.list && (
                    <ul className="card-list">
                      {c.list.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  )}
                  {c.impact && (
                    <div className="card-impact">
                      {c.impact.map((m) => (
                        <div key={m.label}>
                          <b>{m.metric}</b>
                          <span>{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {c.tags.length > 0 && (
                    <ul className="tags">
                      {c.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  {(c.live || c.code) && (
                    <div className="card-links">
                      {c.live && (
                        <a className="live" href={c.live} target="_blank" rel="noopener noreferrer">
                          Visit live site
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M7 17 17 7M8 7h9v9" />
                          </svg>
                        </a>
                      )}
                      {c.code && (
                        <a className="code" href={c.code} target="_blank" rel="noopener noreferrer">
                          Source on GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
                {c.phone ? (
                  <div className="stage stage-phone" aria-hidden="true">
                    <div className="phone">
                      <div className="phone-screen">
                        <span className="phone-island" />
                        {c.screen}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`stage ${c.companion ? "stage-combo" : ""}`} aria-hidden="true">
                    <div className="mon">
                      <div className="mon-body">
                        <div className="mon-screen">{c.screen}</div>
                      </div>
                      <div className="mon-neck" />
                      <div className="mon-foot" />
                    </div>
                    {c.companion && (
                      <div className="phone phone-companion">
                        <div className="phone-screen">
                          <span className="phone-island" />
                          {c.companion}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="card-dim" />
            </article>
          ))}
        </section>
        <div className="outro">
          <p>Next door</p>
          <button className="outro-next" onClick={onNext}>
            {next.title} <Arrow size={22} />
          </button>
        </div>
      </div>
      <div className="roomv-glow" aria-hidden="true" />
    </div>
  );
}
