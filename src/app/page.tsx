import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClientCanvas from "@/components/ClientCanvas";
import DynamicOrbitalSystem from "@/components/orbital/DynamicOrbitalSystem";

export default function Home() {
  return (
    <main className="w-full relative">
      <Navigation />
      <ClientCanvas />
      <Hero />
      <DynamicOrbitalSystem />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
