import * as React from "react";

import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

/**
 * Centers content within a consistent max width with responsive
 * horizontal padding. The single layout primitive every section wraps
 * its content in.
 */
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-(--container-content) px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  );
}
