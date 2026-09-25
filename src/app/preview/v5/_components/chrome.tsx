"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { IconBrandX } from "@tabler/icons-react";
import { profile } from "@/content/profile";
import { useActiveSection } from "./hooks";
import { FOCUS, GLASS, NAV_SPRING, SECTIONS } from "./tokens";

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function SocialIcon({ label, size = 18 }: { label: string; size?: number }) {
  switch (label) {
    case "GitHub":
      return <Github size={size} aria-hidden="true" />;
    case "LinkedIn":
      return <Linkedin size={size} aria-hidden="true" />;
    case "X":
      return <IconBrandX size={size} aria-hidden="true" />;
    default:
      return <ArrowUpRight size={size} aria-hidden="true" />;
  }
}

/** The floating visionOS-style ornament that rides alongside the content on lg+. */
export function OrnamentPanel() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <div
      className={`${GLASS} flex h-full flex-col justify-between rounded-3xl p-6 xl:p-7`}
    >
      <div>
        <p className="text-[22px] font-semibold leading-tight tracking-[-0.025em] text-[#f5f5f7]">
          {profile.name}
        </p>
        <p className="mt-1 text-[15px] text-[#8e8e93]">{profile.role}</p>
        <p className="mt-4 flex items-center gap-2 text-[13px] text-[#f5f5f7]/80">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8fb3ff] shadow-[0_0_8px_rgba(143,179,255,0.9)]"
            aria-hidden="true"
          />
          {profile.availability}
        </p>

        <nav aria-label="Sections" className="mt-9">
          <ul className="flex flex-col gap-0.5">
            {SECTIONS.map((s) => {
              const isActive = s.id === active;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative flex min-h-11 items-center rounded-xl px-3.5 text-[15px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[#f5f5f7]"
                        : "text-[#8e8e93] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#f5f5f7]"
                    } ${FOCUS}`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="v5-nav-indicator"
                        transition={NAV_SPRING}
                        className="absolute inset-0 rounded-xl bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                        aria-hidden="true"
                      >
                        <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-[#8fb3ff] shadow-[0_0_10px_rgba(143,179,255,0.8)]" />
                      </motion.span>
                    )}
                    <span className="relative">{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#f5f5f7] px-5 text-[15px] font-semibold text-[#050507] transition-transform duration-150 ease-out active:scale-[0.97] ${FOCUS}`}
        >
          Résumé
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <div className="-ml-2.5 flex items-center gap-1">
          {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-[#8e8e93] transition-[color,background-color,transform] duration-150 active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#f5f5f7] ${FOCUS}`}
              >
                <SocialIcon label={s.label} />
              </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.email}`}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-[#8e8e93] transition-[color,background-color,transform] duration-150 active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#f5f5f7] ${FOCUS}`}
          >
            <Mail size={18} aria-hidden="true" />
          </a>
        </div>
        <p className="truncate text-[13px] text-[#8e8e93]">{profile.email}</p>
      </div>
    </div>
  );
}

/** Mobile/tablet: compact top bar whose material fades in once content scrolls beneath it. */
export function TopBar() {
  const { scrollY } = useScroll();
  const material = useTransform(scrollY, [40, 220], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:hidden">
      <motion.div
        aria-hidden="true"
        className="v5-glass absolute inset-0 border-b border-white/[0.08] bg-[#0b0b0f]/[0.82] backdrop-blur-2xl"
        style={{ opacity: material }}
      />
      <div className="relative mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        <a
          href="#v5-hero"
          className={`-ml-2 inline-flex min-h-11 items-center rounded-full px-2 text-[15px] font-semibold tracking-[-0.015em] text-[#f5f5f7] ${FOCUS}`}
        >
          {profile.name}
        </a>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-4 text-[14px] font-semibold text-[#f5f5f7] transition-transform duration-150 active:scale-[0.97] ${FOCUS}`}
        >
          Résumé
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
