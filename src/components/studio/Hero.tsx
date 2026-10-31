import { FlipCalendar } from "./FlipCalendar";
import { Portrait } from "./Portrait";
import { flipWords, profile } from "./data";

export function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow rise" style={{ "--d": 0 } as React.CSSProperties}>
            {profile.role} · {profile.org}
          </p>
          <h1 className="display">
            <span className="sr-only">Hi, I&apos;m Karan Gupta. I build {flipWords.join(", ")}.</span>
            <span aria-hidden="true" className="rise" style={{ "--d": 1, display: "block" } as React.CSSProperties}>
              Hi, I&apos;m {profile.first}.
            </span>
            <span aria-hidden="true" className="dim rise" style={{ "--d": 2 } as React.CSSProperties}>
              I build
            </span>
          </h1>
          <div className="rise cal-line" style={{ "--d": 3 } as React.CSSProperties}>
            <FlipCalendar words={flipWords} />
          </div>
          <div className="hero-actions rise" style={{ "--d": 4 } as React.CSSProperties}>
            <a href="#contact" className="btn btn-dark">
              Start a conversation
              <span className="btn-arrow">
                <Arrow />
              </span>
            </a>
            <a href="#work" className="btn btn-ghost">
              See my work
            </a>
          </div>
        </div>
      </div>
      <Portrait />
      <div className="hero-strip rise" style={{ "--d": 5 } as React.CSSProperties}>
        <div className="wrap mono">
          <span>Open to work</span>
          <span>{profile.place}</span>
          <span className="scroll-cue">
            Scroll to explore
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M5 1v8M1.5 5.5 5 9l3.5-3.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
