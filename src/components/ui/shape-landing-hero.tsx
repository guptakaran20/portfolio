"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Circle, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import TypingText from "./TypingText";

gsap.registerPlugin(ScrollTrigger);

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    const shapeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!shapeRef.current) return;
        
        // Entrance
        gsap.fromTo(shapeRef.current, 
            { opacity: 0, y: -150, rotate: rotate - 15 },
            { 
                opacity: 1, 
                y: 0, 
                rotate: rotate, 
                duration: 2.4, 
                delay, 
                ease: "power4.out" 
            }
        );

        // Floating animation
        gsap.to(shapeRef.current.firstChild, {
            y: 15,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        // Parallax
        gsap.to(shapeRef.current, {
            y: 100,
            scrollTrigger: {
                trigger: shapeRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }, { scope: shapeRef });

    return (
        <div ref={shapeRef} className={cn("absolute will-change-transform", className)}>
            <div
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </div>
        </div>
    );
}

function ParticleField() {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(() => {
        if (!mounted || !containerRef.current) return;
        
        const particles = containerRef.current.children;
        Array.from(particles).forEach((p) => {
            gsap.to(p, {
                y: "1100%",
                opacity: 0,
                duration: Math.random() * 25 + 25,
                repeat: -1,
                ease: "none",
                delay: Math.random() * -20,
            });
        });
    }, { scope: containerRef, dependencies: [mounted] });

    const particles = useRef<{ left: string; top: string }[]>([]);
    
    if (particles.current.length === 0) {
        particles.current = [...Array(15)].map(() => ({
            left: Math.random() * 100 + "%",
            top: "-5%",
        }));
    }

    if (!mounted) return null;

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.current.map((p, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-0 will-change-transform"
                    style={{
                        left: p.left,
                        top: p.top,
                    }}
                />
            ))}
        </div>
    );
}

function LightStreaks() {
    const streak1Ref = useRef<HTMLDivElement>(null);
    const streak2Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(streak1Ref.current, {
            x: "200%",
            duration: 8,
            repeat: -1,
            ease: "power1.inOut",
        });
        gsap.to(streak2Ref.current, {
            x: "-200%",
            duration: 12,
            repeat: -1,
            ease: "power1.inOut",
            delay: 2,
        });
    });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div
                ref={streak1Ref}
                className="absolute top-1/4 -left-full w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent blur-sm will-change-transform"
            />
            <div
                ref={streak2Ref}
                className="absolute top-2/3 left-full w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent blur-sm will-change-transform"
            />
        </div>
    );
}

function HeroGeometric({
    badge = "Full Stack Developer",
    title1 = "Hi, I'm Karan",
    title2 = "I Build Modern Web Experiences",
    description = "Crafting high-performance applications with a focus on cinematic UI, robust architecture, and seamless user experiences.",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!contentRef.current) return;

        const children = contentRef.current.children;
        gsap.fromTo(children, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                stagger: 0.2, 
                duration: 1.2, 
                ease: "power3.out",
                delay: 0.5 
            }
        );

        // Parallax background
        gsap.to(backgroundRef.current, {
            y: 100,
            scale: 1.1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

        // Parallax content
        gsap.to(contentRef.current, {
            y: -50,
            opacity: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            <div 
                ref={backgroundRef}
                className="absolute inset-0 pointer-events-none will-change-transform"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
                <ParticleField />
                <LightStreaks />
                
                <div className="absolute inset-0 overflow-hidden">
                    <ElegantShape
                        delay={0.3}
                        width={600}
                        height={140}
                        rotate={12}
                        gradient="from-indigo-500/[0.15]"
                        className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%] scale-50 sm:scale-75 md:scale-100"
                    />

                    <ElegantShape
                        delay={0.5}
                        width={500}
                        height={120}
                        rotate={-15}
                        gradient="from-rose-500/[0.15]"
                        className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%] scale-50 sm:scale-75 md:scale-100"
                    />

                    <ElegantShape
                        delay={0.4}
                        width={300}
                        height={80}
                        rotate={-8}
                        gradient="from-violet-500/[0.15]"
                        className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%] scale-50 sm:scale-75 md:scale-100"
                    />

                    <ElegantShape
                        delay={0.6}
                        width={200}
                        height={60}
                        rotate={20}
                        gradient="from-amber-500/[0.15]"
                        className="right-[15%] md:right-[20%] top-[10%] md:top-[15%] scale-75 md:scale-100"
                    />

                    <ElegantShape
                        delay={0.7}
                        width={150}
                        height={40}
                        rotate={-25}
                        gradient="from-cyan-500/[0.15]"
                        className="left-[20%] md:left-[25%] top-[5%] md:top-[10%] scale-75 md:scale-100"
                    />
                </div>
            </div>

            <div 
                ref={contentRef}
                className="relative z-10 w-full px-4 sm:px-6 md:px-8"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12">
                        <Circle className="h-2 w-2 fill-rose-500/80" />
                        <span className="text-sm text-white/60 tracking-wide uppercase">
                            <TypingText texts={["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver"]} />
                        </span>
                    </div>

                    <div>
                        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tight text-white leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </div>

                    <div>
                        <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-2 sm:px-4">
                            {description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="/resume.pdf" 
                            download 
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] group hover:scale-105"
                        >
                            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                            Download Resume
                        </a>
                        <a 
                            href="#projects" 
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-white/10 text-white font-medium hover:bg-white/5 transition-all group hover:scale-105"
                        >
                            View Projects
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
        </div>
    );
}

export { HeroGeometric };

