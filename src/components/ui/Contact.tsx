import { Terminal, Briefcase, Mail } from "lucide-react";
import { ContactAnimations, ContactFormClient } from "./ContactClient";

export default function Contact() {
  return (
    <section className="relative w-full py-16 sm:py-24 md:py-32 bg-[#030303] z-30 overflow-hidden" id="contact">
      <ContactAnimations />
      {/* Decorative Elements */}
      <div className="contact-particle absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="contact-particle absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-[50vh] bg-gradient-to-t from-cyan-900/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          
          <div id="contact-left-col" className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6" style={{ willChange: "transform, opacity" }}>
              Let&apos;s build something great together.
            </h2>
            <p className="text-gray-400 mb-6 sm:mb-10 text-sm sm:text-base md:text-lg" style={{ willChange: "transform, opacity" }}>
              Have a project in mind or just want to chat? Drop me a message and I&apos;ll get back to you as soon as possible.
            </p>
            
            <div className="space-y-6" style={{ willChange: "transform, opacity" }}>
              <ContactLink 
                href="mailto:guptakaran0720@gmail.com" 
                icon={<Mail className="w-5 h-5" />} 
                label="guptakaran0720@gmail.com" 
              />
              <ContactLink 
                href="https://github.com/guptakaran20" 
                icon={<Terminal className="w-5 h-5" />} 
                label="github.com/guptakaran20" 
              />
              <ContactLink 
                href="https://www.linkedin.com/in/guptakaran0720/" 
                icon={<Briefcase className="w-5 h-5" />} 
                label="linkedin.com/in/guptakaran0720" 
              />
            </div>
          </div>

          <div id="contact-right-col" style={{ willChange: "transform, opacity" }}>
            <ContactFormClient />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} className="contact-link group flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
      <div className="link-icon w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
        {icon}
      </div>
      <span className="link-content text-sm sm:text-base md:text-lg break-all sm:break-normal">{label}</span>
    </a>
  );
}
