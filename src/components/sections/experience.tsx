import { experience } from "@/data/experience";
import { ExperienceCard } from "@/components/portfolio/experience-card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/motion-wrap";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        heading="Where I've worked"
        description="A timeline of roles and the kind of work they involved."
      />

      <StaggerGroup className="relative mt-10 flex flex-col gap-6 sm:pl-8">
        {/* Timeline rail — hidden on the smallest screens to save space */}
        <div
          aria-hidden
          className="bg-border absolute top-2 bottom-2 left-3 hidden w-px sm:block"
        />

        {experience.map((entry) => (
          <StaggerItem key={`${entry.company}-${entry.role}`} className="relative">
            <span
              aria-hidden
              className="border-background bg-primary absolute top-6 -left-8 hidden size-3 rounded-full border-2 sm:block"
            />
            <ExperienceCard entry={entry} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
