'use client'
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const commands: Record<string, string> = {
    whoami: 'Karan Gupta — Full-Stack Developer (soon)',
    skills: 'Python, C++, JavaScript, React, Node.js, Tailwind, Git',
    currently_learning: 'Full Stack Development • Building real-world projects',
    education: 'Computer Science Student • Passionate about technology',
    contact: 'guptakaran0720@gmail.com • github.com/guptakaran20',
    help: 'Available commands: whoami, skills, currently_learning, education, contact, help, clear',
};

export default function Terminal() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [history, setHistory] = useState([
        { type: 'system', text: 'Welcome to Karan\'s terminal. Type "help" for available commands.' },
    ]);
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        if (!cmd) return;

        const newHistory = [...history, { type: 'input', text: cmd }];

        if (cmd === 'clear') {
            setHistory([]);
            setInput('');
            return;
        }

        const response = commands[cmd];
        if (response) {
            newHistory.push({ type: 'output', text: response });
        } else {
            newHistory.push({ type: 'error', text: `Command not found: ${cmd}. Type "help" for available commands.` });
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <section id="terminal" className="relative bg-surface-dark py-16 sm:py-24 md:py-32">
            <div ref={sectionRef} className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                        Developer <span className="gradient-text">Terminal</span>
                    </h2>
                    <p className="text-text-secondary text-base max-w-lg mx-auto">
                        Get to know me through the command line.
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4" />
                </motion.div>

                {/* Terminal window */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-indigo-500/5"
                >
                    {/* Title bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/[0.06]">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="flex-1 text-center text-xs text-text-secondary font-mono">
                            karan@portfolio ~ zsh
                        </span>
                    </div>

                    {/* Terminal body */}
                    <div
                        className="terminal-body p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] max-h-[350px] overflow-y-auto font-mono text-xs sm:text-sm cursor-text"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {history.map((entry, i) => (
                            <div key={i} className="mb-2">
                                {entry.type === 'system' && (
                                    <p className="text-text-secondary/70 text-xs italic">{entry.text}</p>
                                )}
                                {entry.type === 'input' && (
                                    <p>
                                        <span className="text-emerald-400">➜</span>{' '}
                                        <span className="text-accent">~</span>{' '}
                                        <span className="text-text-primary">{entry.text}</span>
                                    </p>
                                )}
                                {entry.type === 'output' && (
                                    <p className="text-text-secondary pl-4">{entry.text}</p>
                                )}
                                {entry.type === 'error' && (
                                    <p className="text-red-400/80 pl-4">{entry.text}</p>
                                )}
                            </div>
                        ))}

                        {/* Input line */}
                        <form onSubmit={handleCommand} className="flex items-center gap-2">
                            <span className="text-emerald-400">➜</span>
                            <span className="text-accent">~</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono text-sm caret-primary"
                                spellCheck={false}
                                autoComplete="off"
                            />
                        </form>
                        <div ref={endRef} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
