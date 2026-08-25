"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { navLinks, siteConfig, socialLinks } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/icons";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: null,
} as const;

/**
 * Visual foundation for the site navbar. Only the mobile-menu open/close
 * state is implemented here — active-link tracking, scroll effects, etc.
 * belong to a later module.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight"
          onClick={() => setMobileOpen(false)}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {socialLinks
            .filter((link) => link.icon !== "mail")
            .map((link) => {
              const Icon = socialIcons[link.icon];
              return (
                <Button key={link.href} variant="ghost" size="icon" asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                  >
                    {Icon ? <Icon className="size-4" /> : null}
                  </a>
                </Button>
              );
            })}
          <ThemeToggle />
          <Button size="sm" asChild>
            <Link href="#contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "border-border/60 grid overflow-hidden border-b transition-[grid-template-rows] duration-200 md:hidden",
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <Container className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="w-full" asChild>
              <Link href="#contact" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </Button>
          </Container>
        </div>
      </div>
    </header>
  );
}
