"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { fadeUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type MotionWrapProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts. */
  delay?: number;
};

/**
 * Fades and slides content up into view once, when it enters the
 * viewport. Falls back to a plain wrapper (no motion) when the user
 * prefers reduced motion.
 */
export function FadeUp({ children, className, delay = 0 }: MotionWrapProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Same as FadeUp but scales in slightly instead of sliding. */
export function ScaleIn({ children, className, delay = 0 }: MotionWrapProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={scaleIn}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggers the entrance of direct children. Wrap each child in
 * `<StaggerItem>` (or any element using the `fadeUp` variant) so it picks
 * up the parent's stagger timing.
 */
export function StaggerGroup({
  children,
  className,
}: Omit<MotionWrapProps, "delay">) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

/** A single item inside a `<StaggerGroup>`. */
export function StaggerItem({
  children,
  className,
}: Omit<MotionWrapProps, "delay">) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
