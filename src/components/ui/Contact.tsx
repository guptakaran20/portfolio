"use client";

import { Terminal, Briefcase, Mail, Send } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { useGSAPScroll } from "@/lib/useGSAPScroll";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const leftRef = useGSAPScroll({ x: -50 });
  const rightRef = useGSAPScroll({ x: 50, delay: 0.2 });

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
      const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsSuccess(true);
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
    <section className="relative w-full py-16 sm:py-24 md:py-32 bg-[#030303] z-30" id="contact">
      <div className="absolute top-1/2 left-0 w-full h-[50vh] bg-gradient-to-t from-cyan-900/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 overflow-hidden">
          
          <div ref={leftRef} className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Let&apos;s build something great together.
            </h2>
            <p className="text-gray-400 mb-6 sm:mb-10 text-sm sm:text-base md:text-lg">
              Have a project in mind or just want to chat? Drop me a message and I&apos;ll get back to you as soon as possible.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:guptakaran0720@gmail.com" className="group flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base md:text-lg break-all sm:break-normal">guptakaran0720@gmail.com</span>
              </a>
              <a href="https://github.com/guptakaran20" className="group flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base md:text-lg break-all sm:break-normal">github.com/guptakaran20</span>
              </a>
              <a href="https://www.linkedin.com/in/guptakaran0720/" className="group flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base md:text-lg break-all sm:break-normal">linkedin.com/in/guptakaran0720</span>
              </a>
            </div>
          </div>

          <div ref={rightRef}>
            <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-5 sm:p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col gap-4 sm:gap-6">
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
                className={`h-12 w-full transition-all duration-300 ${isSuccess ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
              >
                {isSuccess ? (
                  "Message Sent!"
                ) : (
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
