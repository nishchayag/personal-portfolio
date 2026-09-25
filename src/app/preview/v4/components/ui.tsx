"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Focus ring shared by every interactive element on the page. */
export const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2997ff]";

export const GREY = "text-[#86868b]";

/**
 * Apple's two-tone section headline: a white statement, then a grey
 * continuation on the same line.
 */
export function SectionHeading({
  lead,
  rest,
  className = "",
  id,
}: {
  lead: string;
  rest: string;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={`max-w-[20ch] text-[clamp(2.5rem,5.6vw,5rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance ${className}`}
    >
      <span className="text-[#f5f5f7]">{lead}</span>{" "}
      <span className={GREY}>{rest}</span>
    </h2>
  );
}

/** One-shot fade-up as content enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function hostOf(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}
