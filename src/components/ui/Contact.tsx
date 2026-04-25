"use client";

import { Terminal, Briefcase, Mail, Send } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { useGSAPScroll } from "@/lib/useGSAPScroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const leftRef = useGSAPScroll({ x: -50 });
  const rightRef = useGSAPScroll({ x: 50, delay: 0.2 });
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Floating background particles
    const particles = gsap.utils.toArray(".contact-particle");
    particles.forEach((particle: any) => {
      gsap.to(particle, {
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Magnetic effect for social links
    const links = gsap.utils.toArray(".contact-link");
    links.forEach((link: any) => {
      const content = link.querySelector(".link-content");
      const icon = link.querySelector(".link-icon");
      
      const onMouseMove = (e: MouseEvent) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(content, { x: x * 0.2, y: y * 0.2, duration: 0.4 });
        gsap.to(icon, { x: x * 0.4, y: y * 0.4, duration: 0.4 });
      };
      
      const onMouseLeave = () => {
        gsap.to([content, icon], { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      };
      
      link.addEventListener("mousemove", onMouseMove);
      link.addEventListener("mouseleave", onMouseLeave);
    });
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsSuccess(true);
      
      // Success animation
      gsap.fromTo(".success-message", 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full py-16 sm:py-24 md:py-32 bg-[#030303] z-30 overflow-hidden" id="contact">
      {/* Decorative Elements */}
      <div className="contact-particle absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="contact-particle absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-[50vh] bg-gradient-to-t from-cyan-900/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          
          <div ref={leftRef} className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Let&apos;s build something great together.
            </h2>
            <p className="text-gray-400 mb-6 sm:mb-10 text-sm sm:text-base md:text-lg">
              Have a project in mind or just want to chat? Drop me a message and I&apos;ll get back to you as soon as possible.
            </p>
            
            <div className="space-y-6">
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

          <div ref={rightRef}>
            <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-5 sm:p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col gap-4 sm:gap-6 relative">
              {isSuccess && (
                <div className="success-message absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-50 flex flex-center rounded-2xl flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                  <p className="text-gray-400">I&apos;ll get back to you shortly.</p>
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="Karan Gupta" 
                  className="bg-black/50 border-white/10 focus-visible:ring-cyan-500 text-white h-12" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <Input 
                  id="email" 
                  name="email" 
                  required 
                  type="email" 
                  placeholder="guptakaran0720@gmail.com" 
                  className="bg-black/50 border-white/10 focus-visible:ring-cyan-500 text-white h-12" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  required 
                  placeholder="Tell me about your project..." 
                  className="bg-black/50 border-white/10 focus-visible:ring-cyan-500 text-white min-h-[150px] resize-none" 
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className={`h-12 w-full transition-all duration-300 bg-white text-black hover:bg-gray-200`}
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    Send Message <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
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
