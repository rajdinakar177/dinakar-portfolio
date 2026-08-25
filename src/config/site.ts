/**
 * Central site configuration.
 *
 * Placeholder copy — swap in real name/links/content whenever it's ready.
 * Every component that needs this content imports it from here, so it
 * only ever needs to change in one place.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

export const siteConfig = {
  name: "DINAKAR RAJU KOTHULAPUR",
  title: "Full Stack Developer",
  description:
    "Full stack developer building modern, scalable web applications with React, Next.js, Node.js and MongoDB.",
  url: "http://localhost:3000",
  /**
   * The slug from your LinkedIn profile URL, e.g. for
   * linkedin.com/in/jane-doe-123 this is "jane-doe-123". Used by
   * LinkedIn's official Profile Badge widget (see LinkedInBadge) — it's
   * their own public embed, not a custom API integration, so no OAuth or
   * Partner Program access is required.
   */
  linkedinVanityName: "https://www.linkedin.com/in/kothulapuram-dinakar-raju-77025d/",
} as const;

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/rajdinakar177", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kothulapuram-dinakar-raju-77025d/", icon: "linkedin" },
  { label: "Email", href: "mailto:rajdinakar177@gmail.com", icon: "mail" },
];

export const heroConfig = {
  badge: "Available for opportunities",
  heading: "Full Stack Developer building modern digital experiences.",
  description:
    "I build modern web applications, scalable backend systems, and clean, responsive interfaces — production-ready solutions from first commit to launch.",
  primaryCta: { label: "Let's Work Together", href: "#contact" },
  secondaryCta: { label: "View My Work", href: "#projects" },
} as const;

export const ctaConfig = {
  heading: "Have a project in mind?",
  description: "Let's build something useful, fast and scalable.",
  primaryCta: { label: "Contact Me", href: "#contact" },
  secondaryCta: { label: "View Projects", href: "#projects" },
} as const;

export const contactConfig = {
  eyebrow: "Contact",
  heading: "Let's work together",
  description:
    "Have a project, an idea, or just a question? Send a few details and I'll get back to you.",
} as const;
