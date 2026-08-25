import { techStack } from "@/data/tech-stack";
import { Section } from "@/components/shared/section";
import { StaggerGroup, StaggerItem } from "@/components/shared/motion-wrap";

export function TechStrip() {
  return (
    <Section className="py-10 sm:py-12">
      <StaggerGroup className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
        {techStack.map((tech) => (
          <StaggerItem key={tech.name}>
            <span className="text-small font-medium transition-colors hover:text-foreground">
              {tech.name}
            </span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
