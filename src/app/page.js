import Hero from "@/components/Hero";
import HowIThink from "@/components/HowIThink";
import CustomCursor from "@/components/Customcursor";
import WhatIBuild from "@/components/WhatIBuild";
import BeyondCode from "@/components/BeyondCode";
import Letter from "@/components/Letter";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <Hero />
      <HowIThink />
      <WhatIBuild />
      <BeyondCode />
      <Letter />
      <Contact />

    </main>
  );
}