"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function AboutAnimations() {
  useGSAP(() => {
      const container = document.getElementById("about-container");
      if (!container) return;
      
      const elements = container.children.length > 0 
        ? container.children 
        : [container];

      gsap.fromTo(elements, 
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
  }, []);

  return null;
}

export const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered((prev) => !prev)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center
       dark:border-white/[0.2] max-w-[90vw] md:max-w-sm w-full mx-auto p-4 relative h-[16rem] sm:h-[22rem] md:h-[28rem] lg:h-[35rem] rounded-3xl "
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        <div
          className={`text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        transition duration-200 min-w-40 mx-auto flex items-center justify-center
        ${hovered ? "opacity-0 -translate-y-4" : "opacity-100"}`}
        >
          {icon}
        </div>
        <h2
          className={`dark:text-white text-center text-2xl md:text-3xl
         relative z-10 text-black mt-4 font-bold transition duration-200
         ${hovered ? "opacity-100 text-white -translate-y-2" : "opacity-0"}`}
        >
          {title}
        </h2>
        <p
          className={`text-xs md:text-sm relative z-10 mt-4 text-center transition duration-200
         ${hovered ? "opacity-100 text-white -translate-y-2" : "opacity-0"}`}
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
