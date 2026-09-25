"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** The card morph: physical, a touch of bounce, the same path both ways. */
export const MORPH = { type: "spring", bounce: 0.15, duration: 0.45 } as const;

/** Focus ring shared by every interactive element on the page. */
export const FOCUS =
  "outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export const GREY = "text-[var(--fg-2)]";

/** Apple's blue text link (paired links in the hero and the finale). */
export const TEXT_LINK = `group inline-flex min-h-11 items-center gap-0.5 rounded-md text-[17px] text-[var(--accent)] transition-transform duration-150 ease-out active:scale-[0.97] ${FOCUS}`;

/** Pill buttons: one filled, one quiet. Both are 44px+ tall. */
export const BTN_PRIMARY = `inline-flex min-h-12 items-center gap-1.5 rounded-full bg-[var(--btn-bg)] px-6 text-[17px] font-medium text-[var(--btn-fg)] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:bg-[var(--btn-bg-hover)] ${FOCUS}`;
export const BTN_SECONDARY = `inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--chip)] px-6 text-[17px] font-medium text-[var(--fg)] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:bg-[var(--chip-hover)] ${FOCUS}`;

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
      <span className="text-[var(--fg)]">{lead}</span> <span className={GREY}>{rest}</span>
    </h2>
  );
}

/**
 * One-shot fade-up as content enters the viewport. Under reduced motion the
 * content is simply there (see .site-reveal in globals.css), never waiting on a trigger.
 */
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
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      className={`site-reveal ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/** Eyebrow above a section headline. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={`text-[17px] font-semibold ${GREY}`}>{children}</p>;
}

export function hostOf(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}
