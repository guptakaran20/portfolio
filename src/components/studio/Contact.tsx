"use client";

import { useState } from "react";
import { profile, rooms } from "./data";
import { Arrow } from "./Hero";
import { useClock } from "./Header";

export function Contact() {
  const { time } = useClock();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="reveal">
          <p className="eyebrow is-live">Open to work &amp; hard problems</p>
          <h2 id="contact-title" className="display">
            Got a problem?
            <span className="dim">Let&apos;s ship the fix.</span>
          </h2>
        </div>
        <div className="contact-grid">
          <div className="contact-copy reveal">
            <p>
              Hiring, building something interesting, or just want to talk systems? Tell me what you&apos;re
              working on and I&apos;ll reply soon.
            </p>
            <div className="hero-actions">
              <a href={`mailto:${profile.email}`} className="btn btn-dark">
                Write to me
                <span className="btn-arrow">
                  <Arrow />
                </span>
              </a>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Download resume
              </a>
            </div>
          </div>

          <form className="form reveal" onSubmit={onSubmit}>
            <label>
              <span className="mono">Your name</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              <span className="mono">Email</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              <span className="mono">What are we building?</span>
              <textarea name="message" rows={3} required />
            </label>
            <button className="btn btn-dark" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
              <span className="btn-arrow">
                <Arrow />
              </span>
            </button>
            <p className="form-note" role="status">
              {status === "sent" && "Got it. I'll be in touch soon."}
              {status === "error" && `That didn't go through. Try ${profile.email}.`}
            </p>
          </form>
        </div>

        <footer className="footer">
          <div className="footer-cols">
            <div>
              <h4 className="mono">The rooms</h4>
              <ul className="footer-rooms">
                {rooms.map((r) => (
                  <li key={r.id}>
                    <a href="#work">{r.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mono">Navigate</h4>
              <ul>
                <li><a href="#top">Home</a></li>
                <li><a href="#story">My story</a></li>
                <li><a href="#toolbox">Toolbox</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mono">Elsewhere</h4>
              <ul>
                {profile.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mono">Status</h4>
              <ul>
                <li>Open to work</li>
                <li>{profile.place}</li>
                <li>Local time {time}</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Karan Gupta. Designed and built by Karan.</span>
            <a href="#top">Back to top ↑</a>
          </div>
          <p className="footer-sign" aria-hidden="true">
            Karan Gupta
          </p>
        </footer>
      </div>
    </section>
  );
}
