import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { DroneSection } from "@/components/DroneSection";
import { Projects } from "@/components/Projects";
import { PhilosophyBand } from "@/components/PhilosophyBand";
import { ResearchLab } from "@/components/ResearchLab";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <DroneSection />
      <Projects />
      <PhilosophyBand />
      <ResearchLab />
      <Footer />
    </>
  );
}
