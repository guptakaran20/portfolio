import { Loader } from "@/components/studio/Loader";
import { Header } from "@/components/studio/Header";
import { PullCord } from "@/components/studio/PullCord";
import { Hero } from "@/components/studio/Hero";
import { Rooms } from "@/components/studio/Rooms";
import { Story } from "@/components/studio/Story";
import { Board } from "@/components/studio/Board";
import { Toolbox } from "@/components/studio/Toolbox";
import { Contact } from "@/components/studio/Contact";
import { BackToTop, Reveals } from "@/components/studio/Chrome";

export default function Home() {
  return (
    <>
      <Loader />
      <Header />
      <PullCord />
      <main>
        <Hero />
        <Rooms />
        <Story />
        <Board />
        <Toolbox />
        <Contact />
      </main>
      <BackToTop />
      <Reveals />
    </>
  );
}
