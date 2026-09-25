"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Low-contrast mesh: oversized radial gradients, drifting via transform only.
const BLOBS: Array<{ style: CSSProperties; vars: Record<string, string> }> = [
  {
    style: {
      left: "-18vmax",
      top: "-22vmax",
      width: "70vmax",
      height: "70vmax",
      background: "radial-gradient(closest-side, rgba(88, 110, 255, 0.28), rgba(88, 110, 255, 0) 70%)",
    },
    vars: { "--dur": "52s", "--dx": "6%", "--dy": "4%" },
  },
  {
    style: {
      right: "-20vmax",
      top: "-8vmax",
      width: "64vmax",
      height: "64vmax",
      background: "radial-gradient(closest-side, rgba(56, 189, 222, 0.18), rgba(56, 189, 222, 0) 70%)",
    },
    vars: { "--dur": "60s", "--dx": "-5%", "--dy": "6%", "--delay": "-12s" },
  },
  {
    style: {
      left: "18vmax",
      top: "22vmax",
      width: "58vmax",
      height: "58vmax",
      background: "radial-gradient(closest-side, rgba(150, 100, 255, 0.2), rgba(150, 100, 255, 0) 70%)",
    },
    vars: { "--dur": "44s", "--dx": "4%", "--dy": "-5%", "--delay": "-20s" },
  },
];

export function Aurora() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Full strength behind the hero, then settles to a quiet ambient glow the glass can refract.
  const opacity = useTransform(scrollY, [0, 900], [1, 0.5]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ opacity: reduce ? 0.8 : opacity }}
    >
      {BLOBS.map((b, i) => (
        <div key={i} className="v5-aurora-blob" style={{ ...b.style, ...(b.vars as CSSProperties) }} />
      ))}
      {/* Grain-free vignette keeps the edges truly black. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_40%,#050507_100%)]" />
    </motion.div>
  );
}
