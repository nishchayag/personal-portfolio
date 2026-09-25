"use client";

import { motion } from "motion/react";
import { profile } from "@/content/profile";
import { useActiveSection } from "./hooks";
import { FOCUS } from "./ui";

export const NAV_SECTIONS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

const IDS = NAV_SECTIONS.map((s) => s.id);

/**
 * Apple-style product sub-nav. It sits in the flow right after the hero and
 * sticks once it reaches the top, so it "arrives" exactly when the story
 * starts. The only translucent material on the page lives here.
 */
export function LocalNav() {
  const active = useActiveSection(IDS);

  return (
    <nav
      aria-label="Sections"
      className="v6-glass sticky top-0 z-40 border-b border-white/[0.08] bg-black/60 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto flex h-[52px] max-w-[1248px] items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#top"
          className={`hidden min-h-11 items-center text-[19px] font-semibold tracking-[-0.02em] sm:flex ${FOCUS} rounded-md`}
        >
          {profile.name}
        </a>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-1 sm:flex-none sm:justify-end sm:gap-3">
          <ul className="flex items-center">
            {NAV_SECTIONS.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative flex h-[52px] min-w-11 items-center justify-center px-2 text-[13px] transition-colors duration-150 sm:px-3 sm:text-[12px] ${
                      isActive
                        ? "text-[#f5f5f7]"
                        : "text-[#86868b] [@media(hover:hover)]:hover:text-[#f5f5f7]"
                    } ${FOCUS} focus-visible:-outline-offset-4 rounded-md`}
                  >
                    {section.label}
                    {isActive ? (
                      <motion.span
                        layoutId="v6-nav-indicator"
                        transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                        className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-[#f5f5f7] sm:inset-x-3"
                        aria-hidden="true"
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 shrink-0 items-center py-2 ${FOCUS} rounded-full active:scale-[0.97] transition-transform duration-150 ease-out`}
          >
            <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-[12px] font-medium text-black">
              Résumé
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
