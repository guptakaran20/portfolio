import dynamic from "next/dynamic";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

// Dynamically import components below the fold to reduce initial bundle size
const TechStack = dynamic(() => import("@/components/ui/TechStack").then(m => m.TechStack), { ssr: true });
const FeaturedProjects = dynamic(() => import("@/components/ui/FeaturedProjects").then(m => m.FeaturedProjects), { ssr: true });
const About = dynamic(() => import("@/components/ui/About"), { ssr: true });
const Contact = dynamic(() => import("@/components/ui/Contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/ui/Footer").then(m => m.Footer), { ssr: true });
const BottomNavBar = dynamic(() => import("@/components/ui/bottom-nav-bar").then(m => m.BottomNavBar), { ssr: true });

import { TerminalClient, GithubActivityClient } from "@/components/ui/DynamicComponents";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030303] selection:bg-cyan-500/30 selection:text-cyan-200">
      <ScrollRefresh />
      
      {/* Above the fold */}
      <div id="home">
        <HeroGeometric />
      </div>
      
      <div id="skills">
        <TechStack />
      </div>

      <div id="projects" className="w-full">
        <FeaturedProjects />
      </div>
      

      <TerminalClient />
      <About />
      <GithubActivityClient darkMode={true} />
      <Contact />
      <Footer />

      <BottomNavBar stickyBottom={true} />
    </main>
  );
}
