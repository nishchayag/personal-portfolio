"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Strong ease-out — matches the rest of the site's motion language. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Bento tile entrance: fades + rises in once on load, staggered by index.
 * Not scroll-triggered — this only wraps first-screen content.
 */
export function RevealTile({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT, delay: index * 0.04 }}
    >
      {children}
    </motion.div>
  );
}
