"use client";

import Script from "next/script";

import { siteConfig, socialLinks } from "@/config/site";

/**
 * LinkedIn's official "Profile Badge" embed — a public widget (no OAuth,
 * no Partner Program access required) that renders your photo, name,
 * headline, and a "View profile" button, pulled live from LinkedIn.
 *
 * Docs: https://developer.linkedin.com/plugins/profile-badge
 *
 * LinkedIn's widget script scans the page for elements with the
 * `LI-profile-badge` class on mount and replaces their content with the
 * live badge iframe. Until that script loads (or if it's blocked, e.g.
 * by an ad blocker), the div stays empty — the fallback link below
 * covers that case so the section never looks broken.
 */
export function LinkedInBadge() {
  const linkedInHref =
    socialLinks.find((link) => link.icon === "linkedin")?.href ??
    "https://linkedin.com";

  return (
    <div className="flex flex-col items-start gap-3">
      <div
        className="LI-profile-badge"
        data-version="v1"
        data-size="medium"
        data-locale="en_US"
        data-type="vertical"
        data-theme="dark"
        data-vanity={siteConfig.linkedinVanityName}
      />

      {/* Always-visible fallback in case the widget script doesn't load */}
      <a
        href={linkedInHref}
        target="_blank"
        rel="noreferrer"
        className="text-nav-link"
      >
        View LinkedIn profile
      </a>

      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
        async
        defer
        type="text/javascript"
      />
    </div>
  );
}
