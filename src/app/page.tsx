import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { HeroScrollAnimation } from "@/components/ui/hero-scroll-animation";
import { TechStack } from "@/components/ui/TechStack";
import { FeaturedProjects } from "@/components/ui/FeaturedProjects";
import About from "@/components/ui/About";
import { Contact } from "@/components/ui/Contact";
import { Footer } from "@/components/ui/Footer";
import { BottomNavBar } from "@/components/ui/bottom-nav-bar";
import GitHubActivity from "@/components/ui/GithubActivity"
import Terminal from '@/components/ui/Terminal';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#030303] text-foreground flex flex-col items-center pb-24 lg:pb-0 overflow-x-hidden">
      {/* Diagnostic View: Rendering components directly */}
      <section id="home" className="w-full">
        <HeroGeometric
          badge="Full Stack Developer"
          title1="Hi, I'm Karan"
          title2="I Build Modern Web Experiences"
          description="Crafting high-performance applications with a focus on cinematic UI, robust architecture, and seamless user experiences."
        />
      </section>

      <section id="skills" className="w-full">
        <TechStack />
      </section>
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
