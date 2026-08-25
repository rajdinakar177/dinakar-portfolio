import * as React from "react";

import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/shared/motion-wrap";

type SectionHeadingProps = {
  /** Short uppercase label above the heading, e.g. "ABOUT ME". */
  eyebrow?: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  /** Horizontal alignment. Defaults to left. */
  align?: "left" | "center";
  className?: string;
};

/**
 * Reusable heading block used at the top of every major section:
 * eyebrow label, heading, and optional supporting description.
 */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <FadeUp
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? <span className="text-label">{eyebrow}</span> : null}
      <h2 className="text-section-heading">{heading}</h2>
      {description ? (
        <p className="text-section-description">{description}</p>
      ) : null}
    </FadeUp>
  );
}
