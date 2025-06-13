import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import Projects from "@/components/Projects";
import About from "@/components/About";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <SkillsSection />
      <Projects />
      <About />
    </div>
  );
}
