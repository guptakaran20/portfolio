"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import {GitHubCalendar} from 'react-github-calendar';
import { Code2 } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';

const customTheme = {
  light: ['#ebedf0', '#c6d3f7', '#9db5f0', '#6366f1', '#4f46e5'],
  dark: ['#161b22', '#1e3a5f', '#3b5998', '#6366f1', '#818cf8'],
};

export default function GitHubActivity({ darkMode }: { darkMode: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [calendarScale, setCalendarScale] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const calendarCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarWrapRef = useRef<HTMLDivElement>(null);

  const recalcScale = useCallback(() => {
    if (!containerRef.current || !calendarWrapRef.current) return;
    const containerW = containerRef.current.offsetWidth;
    const calendarW = calendarWrapRef.current.scrollWidth;
    if (calendarW > containerW) {
      setCalendarScale(containerW / calendarW);
    } else {
      setCalendarScale(1);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Wait a tick for the calendar to render
    const timer = setTimeout(recalcScale, 500);
    window.addEventListener('resize', recalcScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', recalcScale);
    };
  }, [mounted, recalcScale]);

  // GSAP scroll-triggered entrance animations
  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current || !calendarCardRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered heading entrance
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
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Calendar card entrance
      gsap.fromTo(calendarCardRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: calendarCardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  if (!mounted) {
    return (
      <section className="relative min-h-[300px]">
        <div className="max-w-6xl mx-auto flex items-center justify-center h-full">
          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 sm:py-24 md:py-32">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            My contribution graph from GitHub.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Calendar */}
        <div
          ref={calendarCardRef}
          className="flex justify-center p-2 sm:p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:shadow-lg hover:shadow-indigo-500/5 transition-shadow duration-500"
        >
          <div
            ref={containerRef}
            className="bg-[#0a0a0a] p-2 sm:p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl overflow-hidden w-full"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
              <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-white">Contribution Graph</h3>
            </div>
            <div
              className="w-full overflow-hidden"
              style={{
                height: calendarScale < 1
                  ? `${(calendarWrapRef.current?.scrollHeight ?? 200) * calendarScale}px`
                  : 'auto',
              }}
            >
              <div
                ref={calendarWrapRef}
                style={{
                  transform: `scale(${calendarScale})`,
                  transformOrigin: 'top left',
                }}
              >
                <GitHubCalendar
                  username="guptakaran20"
                  colorScheme={darkMode ? 'dark' : 'light'}
                  theme={customTheme}
                  fontSize={14}
                  blockSize={12}
                  blockMargin={5}
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

