import dynamic from "next/dynamic";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import CursorFollower from "@/components/ui/CursorFollower";
import ScrollRefresh from "@/components/ui/ScrollRefresh";

// Hero is above the fold - load immediately
const About = dynamic(() => import("@/components/ui/About"));
const TechStack = dynamic(() => import("@/components/ui/TechStack").then(mod => mod.TechStack));
const FeaturedProjects = dynamic(() => import("@/components/ui/FeaturedProjects").then(mod => mod.FeaturedProjects));
const Terminal = dynamic(() => import("@/components/ui/Terminal"));
const GitHubActivity = dynamic(() => import("@/components/ui/GithubActivity"));
const Marquee = dynamic(() => import("@/components/ui/Marquee"));
const Contact = dynamic(() => import("@/components/ui/Contact").then(mod => mod.Contact));
const Footer = dynamic(() => import("@/components/ui/Footer").then(mod => mod.Footer));
const BottomNavBar = dynamic(() => import("@/components/ui/bottom-nav-bar").then(mod => mod.BottomNavBar));

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

      <div id="projects">
        <FeaturedProjects />
      </div>

      <div id="about">
        <About />
      </div>

      <div className="space-y-24 py-24">
        <div id="terminal">
          <Terminal />
        </div>
        <GitHubActivity darkMode={true} />
      </div>

      <div id="contact">
        <Contact />
      </div>
      <Footer />

      <BottomNavBar stickyBottom={true} />
    </main>
  );
}
