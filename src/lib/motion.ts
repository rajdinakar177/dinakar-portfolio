import type { Variants } from "framer-motion";

/**
 * Reusable Framer Motion variants shared across sections. Keep additions
 * here purposeful — only animations that provide real value, per the
 * design system's "minimal visual noise" principle.
 */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/** Wrap a group of children with this to stagger their entrance. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Shared viewport config for scroll-triggered `whileInView` animations. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
