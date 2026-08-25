"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Thin wrapper around Framer Motion's reduced-motion detection so call
 * sites don't need to import directly from "framer-motion". Returns true
 * when the user has `prefers-reduced-motion: reduce` set.
 */
export function useReducedMotion() {
  return useFramerReducedMotion() ?? false;
}
