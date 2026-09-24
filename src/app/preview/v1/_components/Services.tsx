"use client";

import { services } from "@/content/profile";
import { Reveal, RevealGroup, fadeUpVariants } from "./Reveal";
import { motion } from "motion/react";

export function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-6xl scroll-mt-16 border-t border-white/10 px-6 py-24 md:py-32"
    >
      <Reveal>
        <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-white/50">
          How I work
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
        {services.map((service, index) => (
          <motion.div key={service.title} variants={fadeUpVariants}>
            <span className="text-sm text-[var(--accent)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em]">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {service.body}
            </p>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
