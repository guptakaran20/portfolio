"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Circle, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

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
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96] as any,
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
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
            </motion.div>
        </motion.div>
    );
}

function ParticleField() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(25)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{
                        opacity: Math.random() * 0.2,
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                    }}
                    animate={{
                        y: ["-10%", "110%"],
                        opacity: [0, 0.2, 0],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 20,
                    }}
                />
            ))}
        </div>
    );
}

function LightStreaks() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <motion.div
                animate={{
                    x: ["-100%", "100%"],
                    opacity: [0, 0.5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent blur-sm"
            />
            <motion.div
                animate={{
                    x: ["100%", "-100%"],
                    opacity: [0, 0.3, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent blur-sm"
            />
        </div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yContent = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacityContent = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const yBackground = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1] as any,
            },
        }),
    };

    return (
        <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            <motion.div 
                style={{ scale: scaleBackground, y: yBackground }}
                className="absolute inset-0 pointer-events-none"
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
                        className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                    />

                    <ElegantShape
                        delay={0.5}
                        width={500}
                        height={120}
                        rotate={-15}
                        gradient="from-rose-500/[0.15]"
                        className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                    />

                    <ElegantShape
                        delay={0.4}
                        width={300}
                        height={80}
                        rotate={-8}
                        gradient="from-violet-500/[0.15]"
                        className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                    />

                    <ElegantShape
                        delay={0.6}
                        width={200}
                        height={60}
                        rotate={20}
                        gradient="from-amber-500/[0.15]"
                        className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                    />

                    <ElegantShape
                        delay={0.7}
                        width={150}
                        height={40}
                        rotate={-25}
                        gradient="from-cyan-500/[0.15]"
                        className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                    />
                </div>
            </motion.div>

            <motion.div 
                style={{ y: yContent, opacity: opacityContent }}
                className="relative z-10 w-full px-4 md:px-6"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
                    >
                        <Circle className="h-2 w-2 fill-rose-500/80" />
                        <span className="text-sm text-white/60 tracking-wide">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight text-white">
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
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-sm sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                            {description}
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <a 
                            href="/resume.pdf" 
                            download 
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] group"
                        >
                            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                            Download Resume
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
        </div>
    );
}

export { HeroGeometric };

