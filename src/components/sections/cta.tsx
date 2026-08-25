import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ctaConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";
import { FadeUp } from "@/components/shared/motion-wrap";

export function CTA() {
  return (
    <Section glow className="text-center">
      <FadeUp className="mx-auto flex max-w-xl flex-col items-center gap-6">
        <h2 className="text-section-heading">{ctaConfig.heading}</h2>
        <p className="text-section-description">{ctaConfig.description}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={ctaConfig.primaryCta.href}>
              {ctaConfig.primaryCta.label}
              <ArrowRight />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={ctaConfig.secondaryCta.href}>
              {ctaConfig.secondaryCta.label}
            </Link>
          </Button>
        </div>
      </FadeUp>
    </Section>
  );
}
