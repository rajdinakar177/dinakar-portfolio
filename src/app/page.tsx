import { Hero } from "@/components/sections/hero";
import { TechStrip } from "@/components/sections/tech-strip";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { CTA } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";
import { Certificates } from "@/components/sections/certificates";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStrip />
      <About />
      <Skills />
      <Experience />
        <Certificates />
      <Projects />
      <Services />
      <CTA />
      <Contact />
    </>
  );
}
