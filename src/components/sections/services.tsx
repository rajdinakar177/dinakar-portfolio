import { Layers, MonitorSmartphone, Server, Workflow } from "lucide-react";

import { services, type Service } from "@/data/services";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/motion-wrap";

const serviceIcons: Record<Service["icon"], typeof Layers> = {
  Layers,
  MonitorSmartphone,
  Server,
  Workflow,
};

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        heading="What I can help you build"
        description="From a single feature to a full application, here's where I typically add the most value."
      />

      <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <StaggerItem key={service.title}>
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardHeader>
                  <div className="bg-accent flex size-10 items-center justify-center rounded-lg">
                    <Icon className="text-primary size-5" />
                  </div>
                  <CardTitle className="mt-3">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
