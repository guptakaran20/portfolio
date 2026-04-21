"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Code2,
  Briefcase,
  User,
  Mail,
  Terminal,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, href: "#home" },
  { label: "Skills", icon: Code2, href: "#skills" },
  { label: "Projects", icon: Briefcase, href: "#projects" },
  { label: "Terminal", icon: Terminal, href: "#terminal" },
  { label: "About", icon: User, href: "#about" },
  { label: "Contact", icon: Mail, href: "#contact" },
];

const MOBILE_LABEL_WIDTH = 72;

type BottomNavBarProps = {
  className?: string;
  defaultIndex?: number;
  stickyBottom?: boolean;
};

export function BottomNavBar({
  className,
  defaultIndex = 0,
  stickyBottom = false,
}: BottomNavBarProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleNavClick = (idx: number, href: string) => {
    setActiveIndex(idx);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      navItems.forEach((item, idx) => {
        const section = document.querySelector(item.href);
        if (section) {
          const { offsetTop, offsetHeight } = section as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveIndex(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Bottom Navigation"
      className={cn(
        "bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-full flex items-center p-1 shadow-2xl space-x-0.5 md:space-x-1 max-w-[95vw] h-12 md:h-[52px]",
        stickyBottom && "fixed inset-x-0 bottom-4 md:bottom-6 mx-auto z-50 w-fit",
        className,
      )}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeIndex === idx;

        return (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center gap-0 px-2.5 md:px-3 py-1.5 md:py-2 rounded-full transition-all duration-300 relative h-9 md:h-10 min-w-[36px] md:min-w-[44px]",
              isActive
                ? "bg-white/10 text-white gap-1 md:gap-2 ring-1 ring-white/20"
                : "bg-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5",
              "focus:outline-none focus-visible:ring-0",
            )}
            onClick={() => handleNavClick(idx, item.href)}
            aria-label={item.label}
            type="button"
          >
            <Icon
              size={20}
              strokeWidth={isActive ? 2.5 : 2}
              aria-hidden
              className="transition-colors duration-200"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `auto` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "4px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.15 },
              }}
              className={cn("overflow-hidden flex items-center")}
            >
              <span
                className={cn(
                  "font-semibold text-[10px] md:text-xs whitespace-nowrap select-none",
                )}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

export default BottomNavBar;
