import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div>
      <section id="home" className="relative z-20">
        <HeroSection />
      </section>
      <section id="skills" className="relative z-20">
        <SkillsSection />
      </section>
      <section id="projects" className="relative z-20">
        <Projects />
      </section>
      <section id="about" className="relative z-20">
        <About />
      </section>
      <section id="contact" className="relative z-20">
        <Contact />
      </section>
    </div>
  );
}
