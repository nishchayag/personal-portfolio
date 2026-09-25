"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** The card morph: physical, a touch of bounce, the same path both ways. */
export const MORPH = { type: "spring", bounce: 0.15, duration: 0.45 } as const;

/** Focus ring shared by every interactive element on the page. */
export const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2997ff]";

export const GREY = "text-[#86868b]";

/** Solid dark tile used by the bento, the cards and the process panel. */
export const TILE = "rounded-[28px] bg-[#111113] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]";

/** Pill buttons: one filled, one quiet. Both are 44px+ tall. */
export const BTN_PRIMARY = `inline-flex min-h-12 items-center gap-1.5 rounded-full bg-[#f5f5f7] px-6 text-[17px] font-medium text-black transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:bg-white ${FOCUS}`;
export const BTN_SECONDARY = `inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1c1c1e] px-6 text-[17px] font-medium text-[#f5f5f7] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:bg-[#2c2c2e] ${FOCUS}`;

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
      <span className="text-[#f5f5f7]">{lead}</span> <span className={GREY}>{rest}</span>
    </h2>
  );
}

/**
 * One-shot fade-up as content enters the viewport. Under reduced motion the
 * content is simply there (see .v6-reveal in v6.css), never waiting on a trigger.
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
      className={`v6-reveal ${className ?? ""}`}
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
