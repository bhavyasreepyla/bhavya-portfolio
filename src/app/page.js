import Hero from "@/components/Hero";
import GlyphField from "@/components/GlyphField";
import HUD from "@/components/HUD";
import HowIThink from "@/components/HowIThink";
import WhatIBuild from "@/components/WhatIBuild";
import Experience from "@/components/Experience";
import BeyondCode from "@/components/BeyondCode";
import Letter from "@/components/Letter";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <GlyphField />
      <HUD />
      <CustomCursor />
      <Hero />
      <HowIThink />
      <WhatIBuild />
      <Experience />
      <BeyondCode />
      <Letter />
      <Contact />
    </main>
  );
}