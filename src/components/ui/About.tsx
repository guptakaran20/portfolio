import React from "react";
import { AboutAnimations, Card } from "./AboutClient";
import { CanvasRevealEffectClient } from "./DynamicComponents";

const AceternityIcon = ({ order }: { order: string }) => {

  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px] ">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center 
        justify-center rounded-full bg-slate-950 px-5 py-2 text-purple backdrop-blur-3xl font-bold text-2xl"
        >
          {order}
        </span>
      </button>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="relative w-full py-16 sm:py-24 md:py-32 bg-[#030303] z-30">
      <AboutAnimations />
      <div 
        id="about-container"
        className="my-6 sm:my-10 flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8"
      >
        <div style={{ willChange: "transform, opacity" }}>
          <Card
            title="Foundation"
            icon={<AceternityIcon order="Foundation" />}
            des="Every project starts with understanding the “why”. I break down ideas, plan structure, and think through the logic before writing a single line of code."
          >
            <CanvasRevealEffectClient
              animationSpeed={5.1}
              containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
            />
          </Card>
        </div>
        
        <div style={{ willChange: "transform, opacity" }}>
          <Card
            title="Development"
            icon={<AceternityIcon order="Development" />}
            des="This is where things come to life. I build modern, scalable apps using tools like React, Next.js, and Node.js — focusing on clean code and smooth UI."
          >
            <CanvasRevealEffectClient
              animationSpeed={3}
              containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
              colors={[[255, 166, 158], [221, 255, 247]]}
              dotSize={2}
            />
          </Card>
        </div>

        <div style={{ willChange: "transform, opacity" }}>
          <Card
            title="Optimization"
            icon={<AceternityIcon order="Optimization" />}
            des="Polish makes the difference. From performance tweaks to deployment, I make sure everything runs fast, looks great, and works flawlessly."
          >
            <CanvasRevealEffectClient
              animationSpeed={3}
              containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
              colors={[[125, 211, 252]]}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
