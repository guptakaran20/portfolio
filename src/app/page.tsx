import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { TechStack } from "@/components/ui/TechStack";
import { FeaturedProjects } from "@/components/ui/FeaturedProjects";
import About from "@/components/ui/About";
import { Contact } from "@/components/ui/Contact";
import { Footer } from "@/components/ui/Footer";
import { BottomNavBar } from "@/components/ui/bottom-nav-bar";
import GitHubActivity from "@/components/ui/GithubActivity"
import Terminal from '@/components/ui/Terminal';
import Marquee from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#030303] text-foreground flex flex-col items-center pb-24 lg:pb-0">

      <div id="home" className="w-full">
        <HeroGeometric />
      </div>
      <div id="skills" className="w-full">
        <TechStack />
      </div>

      <FeaturedProjects />
      

      <Terminal />
      <About />
      <GitHubActivity darkMode={true} />
      <Contact />
      <Footer />
      <BottomNavBar stickyBottom={true} />
    </main>
  );
}
