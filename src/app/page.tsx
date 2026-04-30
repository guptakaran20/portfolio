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
    <main className="min-h-screen w-full bg-[#030303] text-foreground flex flex-col items-center pb-24 lg:pb-0">

      <div id="home" className="w-full">
        <HeroGeometric />
      </div>
      <div id="skills" className="w-full">
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
