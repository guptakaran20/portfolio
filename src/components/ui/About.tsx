import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="relative w-full py-16 sm:py-24 md:py-32 bg-gray-50 dark:bg-transparent z-30 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column - Bio */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">About Me</h2>
              <div className="w-12 h-1 bg-cyan-500 rounded-full mb-6" />
              <p className="text-slate-600 dark:text-white/70 text-base md:text-lg leading-relaxed mb-6 transition-colors">
                I'm a second-year B.Tech student at NIT Jalandhar and a passionate Full-Stack Web Developer. I specialize in building modern web applications using Next.js, React, Node.js, MongoDB, Redis, and TypeScript. With a strong interest in problem-solving and software engineering, I enjoy creating scalable, high-performance applications that deliver exceptional user experiences.
              </p>
              <p className="text-slate-600 dark:text-white/70 text-base md:text-lg leading-relaxed transition-colors">
                Currently, I'm focused on strengthening my expertise in full-stack development, Data Structures & Algorithms, and system design while building projects that solve real-world challenges and help me grow as an engineer.
              </p>
            </div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Work Experience */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-8 text-slate-900 dark:text-white">
                <Briefcase className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                Work Experience
              </h2>
              
              <div className="relative border-l border-slate-200 dark:border-white/10 ml-3 md:ml-4 space-y-10 transition-colors">
                {/* Item 1 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] dark:shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Intern</h3>
                  <p className="text-slate-500 dark:text-white/60 text-md mt-1 font-medium transition-colors">XCEED - NIT Jalandhar</p>
                  <p className="text-slate-400 dark:text-white/40 text-sm mt-1 mb-4 transition-colors">June 2026 - Present</p>
                  <p className="text-slate-600 dark:text-white/70 text-md leading-relaxed max-w-xl transition-colors">
                    Contributing to the backend development of an Intelligent Attendance Management System (iAMS).
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-8 text-slate-900 dark:text-white">
                <GraduationCap className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                Education
              </h2>
              
              <div className="relative border-l border-slate-200 dark:border-white/10 ml-3 md:ml-4 space-y-10 transition-colors">
                {/* Item 1 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 dark:bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)] dark:shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Dr B R Ambedkar National Institute of Technology, Jalandhar</h3>
                  <p className="text-slate-500 dark:text-white/60 text-md mt-1 font-medium transition-colors">Bachelor of Technology</p>
                  <p className="text-slate-400 dark:text-white/40 text-sm mt-1 mb-2 transition-colors">2025 - 2029</p>
                  <p className="text-slate-400 dark:text-white/40 text-md mt-1 mb-2 transition-colors">Instrumentation and Control Engineering</p>
                </div>

                {/* Item 2 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20 transition-colors" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Dayanand Model Sr. Sec. School, Jalandhar</h3>
                  <p className="text-slate-500 dark:text-white/60 text-md mt-1 font-medium transition-colors">High School (12th Grade) Non-Medical</p>
                  <p className="text-slate-400 dark:text-white/40 text-sm mt-1 mb-2 transition-colors">Graduated 2025</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
