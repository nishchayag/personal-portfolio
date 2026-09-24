"use client";

import { experience, skills } from "@/content/profile";
import { Reveal, RevealGroup, fadeUpVariants } from "./Reveal";
import { motion } from "motion/react";

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-16 border-t border-white/10 px-6 py-24 md:py-32"
    >
      <Reveal>
        <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-white/50">
          Experience
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 max-w-3xl divide-y divide-white/10 md:mt-16">
        {experience.map((item) => (
          <motion.div
            key={`${item.org}-${item.role}`}
            variants={fadeUpVariants}
            className="grid grid-cols-1 gap-2 py-8 first:pt-0 sm:grid-cols-[10rem_1fr] sm:gap-8"
          >
            <p className="text-sm text-white/40">{item.period}</p>
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.01em]">
                {item.role}
              </h3>
              <p className="mt-1 text-sm text-white/60">{item.org}</p>
              {item.points.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-white/60"
                    >
                      <span aria-hidden="true" className="text-white/30">
                        —
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </RevealGroup>

      <Reveal className="mt-16 max-w-3xl md:mt-20">
        <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-white/50">
          Toolkit
        </h3>
        <dl className="mt-6 space-y-3">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <dt className="text-white/40">{category}</dt>
              <dd className="text-white/70">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
