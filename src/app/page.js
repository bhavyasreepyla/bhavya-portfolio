import Hero from "@/components/Hero";
import HowIThink from "@/components/HowIThink";
import WhatIBuild from "@/components/WhatIBuild";
import HowIWork from "@/components/HowIWork";
import BeyondCode from "@/components/BeyondCode";
import Letter from "@/components/Letter";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowIThink />
      <WhatIBuild />
      <HowIWork />
      <BeyondCode />
      <Letter />
      <Contact />
    </main>
  );
}
