"use client";

import { profile } from "@/content/profile";
import { RevealGroup, fadeUpVariants } from "./Reveal";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-32 md:pb-32">
      <RevealGroup className="max-w-4xl">
        <motion.h1
          variants={fadeUpVariants}
          className="text-6xl font-semibold leading-[0.95] tracking-[-0.035em] text-balance md:text-8xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          className="mt-6 flex items-center gap-2.5 text-sm text-white/60"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[var(--accent)]"
          />
          <span>{profile.availability}</span>
        </motion.div>

        <motion.div
          variants={fadeUpVariants}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="flex min-h-11 items-center rounded-full bg-[var(--accent)] px-6 text-sm font-medium text-[#0a0a0a] transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            View work
          </a>
          <a
            href="#contact"
            className="flex min-h-11 items-center rounded-full border border-white/20 px-6 text-sm font-medium text-white transition-colors duration-150 hover:border-white/40 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Get in touch
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center border-b border-white/30 text-sm font-medium text-white/80 transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            Résumé ↗
          </a>
        </motion.div>
      </RevealGroup>
    </section>
  );
}
