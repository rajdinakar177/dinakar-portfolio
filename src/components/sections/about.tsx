import { aboutContent, aboutStats } from "@/data/about";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/motion-wrap";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="About me"
            heading="Building modern web applications"
          />
          <div className="flex flex-col gap-4">
            {aboutContent.intro.map((paragraph) => (
              <p key={paragraph} className="text-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <StaggerGroup className="grid grid-cols-2 gap-4 self-start">
          {aboutStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <Card>
                <CardContent className="flex flex-col gap-1">
                  <span className="text-hero text-3xl! sm:text-4xl!">
                    {stat.value}
                  </span>
                  <span className="text-small">{stat.label}</span>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
