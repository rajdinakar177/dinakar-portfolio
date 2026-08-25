import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Wrap children in the shared Container. Default true. */
  container?: boolean;
  /** Render a subtle radial glow behind the section content. */
  glow?: boolean;
};

/**
 * Full-width section wrapper with consistent vertical spacing. Content is
 * centered via Container by default.
 */
export function Section({
  className,
  container = true,
  glow = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full scroll-mt-16 py-16 sm:py-20 lg:py-28",
        glow && "bg-glow",
        className
      )}
      {...props}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}
