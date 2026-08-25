import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { heroConfig, socialLinks } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";
import { FadeUp } from "@/components/shared/motion-wrap";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/icons";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: null,
} as const;

export function Hero() {
  return (
    <Section glow container={false} className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <Badge variant="accent" className="gap-1.5 px-3 py-1">
            <Sparkles className="size-3" />
            {heroConfig.badge}
          </Badge>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 className="text-hero text-balance">{heroConfig.heading}</h1>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-section-description mx-auto max-w-xl">
            {heroConfig.description}
          </p>
        </FadeUp>

        <FadeUp
          delay={0.15}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button size="lg" asChild>
            <Link href={heroConfig.primaryCta.href}>
              {heroConfig.primaryCta.label}
              <ArrowRight />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={heroConfig.secondaryCta.href}>
              {heroConfig.secondaryCta.label}
            </Link>
          </Button>
        </FadeUp>

        <FadeUp delay={0.2} className="flex items-center gap-2 pt-2">
          {socialLinks
            .filter((link) => link.icon !== "mail")
            .map((link) => {
              const Icon = socialIcons[link.icon];
              return (
                <Button key={link.href} variant="ghost" size="icon" asChild>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                  >
                    {Icon ? <Icon className="size-4" /> : null}
                  </Link>
                </Button>
              );
            })}
        </FadeUp>
      </div>
    </Section>
  );
}
