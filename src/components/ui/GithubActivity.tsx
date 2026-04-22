"use client";
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {GitHubCalendar} from 'react-github-calendar';
import { Code2 } from 'lucide-react';

const customTheme = {
    dark: ['#161b22', '#1e3a5f', '#3b5998', '#6366f1', '#818cf8'],
};

const lightTheme = {
    light: ['#ebedf0', '#c6d3f7', '#9db5f0', '#6366f1', '#4f46e5'],
};

export default function GitHubActivity({ darkMode }: { darkMode: boolean }) {
    const [mounted, setMounted] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        setMounted(true);
    }, []);

    const isLightMode = darkMode === false;

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
            <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
                        GitHub <span className="gradient-text">Activity</span>
                    </h2>
                    <p className="text-gray-400 text-base max-w-lg mx-auto">
                        My contribution graph from GitHub.
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4" />
                </motion.div>

                {/* Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center p-4 sm:p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:shadow-lg hover:shadow-indigo-500/5 transition-shadow duration-500"
                >
                    <div className="bg-[#0a0a0a] p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl overflow-hidden w-full">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
                            <Code2 className="w-6 h-6 text-indigo-400" />
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">Contribution Graph</h3>
                        </div>
                        <div className="overflow-x-auto w-full pb-4 scrollbar-hide">
                            <div className="min-w-[800px] md:min-w-0">
                                <GitHubCalendar
                                    username="guptakaran20"
                                    colorScheme={isLightMode ? 'light' : 'dark'}
                                    theme={isLightMode ? lightTheme : customTheme}
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
                </motion.div>
            </div>
        </section>
    );
}
