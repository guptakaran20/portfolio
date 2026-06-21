import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="relative w-full py-16 sm:py-24 md:py-32 bg-[#030303] z-30 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column - Bio */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
              <div className="w-12 h-1 bg-cyan-500 rounded-full mb-6" />
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                I build scalable full-stack applications with modern tools like Next.js, Node.js, and MongoDB. Passionate about clean UI, performance, and real-world problem solving.
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Currently, I am a Second-Year B.Tech student at NIT Jalandhar, constantly exploring new technologies and building projects that push my boundaries as a developer.
              </p>
            </div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Work Experience */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 text-cyan-400" />
                Work Experience
              </h2>
              
              <div className="relative border-l border-white/10 ml-3 md:ml-4 space-y-10">
                {/* Item 1 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <h3 className="text-xl font-semibold text-white">Software Development Intern</h3>
                  <p className="text-white/60 text-sm mt-1 font-medium">XCEED - NIT Jalandhar</p>
                  <p className="text-white/40 text-xs mt-1 mb-4">Present</p>
                  <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                    Contributing to the Intelligence Attendance Management System. Developing full-stack features, integrating APIs, and managing database systems to improve platform efficiency.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-8">
                <GraduationCap className="w-6 h-6 text-purple-400" />
                Education
              </h2>
              
              <div className="relative border-l border-white/10 ml-3 md:ml-4 space-y-10">
                {/* Item 1 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                  <h3 className="text-xl font-semibold text-white">Dr B R Ambedkar National Institute of Technology, Jalandhar</h3>
                  <p className="text-white/60 text-sm mt-1 font-medium">Bachelor of Technology</p>
                  <p className="text-white/40 text-xs mt-1 mb-2">2024 - 2028</p>
                </div>

                {/* Item 2 */}
                <div className="relative pl-8">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/20" />
                  <h3 className="text-xl font-semibold text-white">High School</h3>
                  <p className="text-white/60 text-sm mt-1 font-medium">12th Grade (Non-Medical)</p>
                  <p className="text-white/40 text-xs mt-1 mb-2">Graduated 2024</p>
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
