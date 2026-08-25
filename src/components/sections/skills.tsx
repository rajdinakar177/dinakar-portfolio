import { skillCategories } from "@/data/skills";
import { SkillGroup } from "@/components/portfolio/skill-group";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/motion-wrap";

export function Skills() {
  return (
    <Section id="skills" className="bg-surface">
      <SectionHeading
        eyebrow="Skills"
        heading="Technologies I work with"
        description="A focused toolkit for building full stack web applications end to end."
      />
      <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((group) => (
          <StaggerItem key={group.category}>
            <SkillGroup group={group} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
