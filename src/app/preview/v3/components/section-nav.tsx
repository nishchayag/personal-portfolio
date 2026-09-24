"use client";

import { motion } from "motion/react";

type Section = { id: string; label: string };

export function SectionNav({
  sections,
  activeId,
}: {
  sections: readonly Section[];
  activeId: string;
}) {
  return (
    <nav aria-label="Section navigation">
      <ul className="flex flex-col gap-1">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id} className="relative">
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className="relative flex min-h-11 items-center rounded-md pl-4 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60"
              >
                {isActive && (
                  <motion.span
                    layoutId="v3-nav-indicator"
                    className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-teal-400"
                    transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                  />
                )}
                <span
                  className={
                    isActive
                      ? "text-white"
                      : "text-slate-500 transition-colors duration-150 hover:text-slate-300"
                  }
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
