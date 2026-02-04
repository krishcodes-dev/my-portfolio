import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import OrbitalSystem from "@/components/OrbitalSystem";
import FixedBackgroundCanvas from "@/components/orbital/FixedBackgroundCanvas";
import { TechInfoPanel } from "@/components/ui/TechInfoPanel";
import { TechStackTitle } from "@/components/ui/TechStackTitle";
import { TechIconsOverlay } from "@/components/ui/TechIconsOverlay";

import { StarBackground } from "@/components/canvas/StarBackground";
import { RocketCursor } from "@/components/ui/RocketCursor";

export default function Home() {
  return (
    <main className="w-full relative">
      <Navigation />
      <RocketCursor />
      <StarBackground />
      <FixedBackgroundCanvas />
      <Hero />
      <OrbitalSystem />
      <Projects />
      <Contact />
      <Footer />
      <TechStackTitle />
      <TechInfoPanel />
      <TechIconsOverlay />
    </main>
  );
}
