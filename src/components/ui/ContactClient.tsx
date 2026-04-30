"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function ContactAnimations() {
  useGSAP(() => {
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
        
        link.addEventListener("mousemove", onMouseMove, { passive: true });
        link.addEventListener("mouseleave", onMouseLeave, { passive: true });
        
        link._cleanup = () => {
          link.removeEventListener("mousemove", onMouseMove);
          link.removeEventListener("mouseleave", onMouseLeave);
        };
      });

      // Entry animations
      const leftCol = document.getElementById("contact-left-col");
      const rightCol = document.getElementById("contact-right-col");
      
      if (leftCol) {
        gsap.from(leftCol.children, {
          x: -50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftCol,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      }
      
      if (rightCol) {
        gsap.from(rightCol, {
          x: 50,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightCol,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      }
  }, []);

  return null;
}

export function ContactFormClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
  );
}
