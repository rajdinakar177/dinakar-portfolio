import Link from "next/link";
import { Mail } from "lucide-react";

import { navLinks, siteConfig, socialLinks } from "@/config/site";
import { Container } from "@/components/shared/container";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/icons";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: Mail,
} as const;

/**
 * Site footer: identity + description, nav links, social links, and
 * copyright. Content comes from src/config/site.ts — nothing here is
 * hardcoded so it only ever needs to change in one place.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 border-t">
      <Container className="grid gap-10 py-12 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </Link>
          <p className="text-small max-w-sm">{siteConfig.description}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-label">Navigate</span>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-label">Connect</span>
          <div className="flex flex-col gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.icon === "mail" ? undefined : "_blank"}
                rel={link.icon === "mail" ? undefined : "noreferrer"}
                className="text-nav-link inline-flex items-center gap-2"
              >
                {(() => {
                  const Icon = socialIcons[link.icon];
                  return <Icon className="size-3.5" />;
                })()}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <Container className="border-border/60 border-t py-4">
        <p className="text-small">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
