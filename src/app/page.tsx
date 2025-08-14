import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div>
      <section id="home">
        <HeroSection />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
