"use client";

import { Github, Linkedin, ArrowUpRight, Mail } from "lucide-react";
import { IconBrandX } from "@tabler/icons-react";
import { profile } from "@/content/profile";
import { SectionNav } from "./section-nav";
import { useActiveSection } from "./use-active-section";

const NAV_SECTIONS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;

const NAV_IDS = NAV_SECTIONS.map((s) => s.id);

// Icons are looked up by social label so new entries in profile.socials
// (beyond GitHub/LinkedIn/X) still render — falling back to a generic link glyph.
function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case "GitHub":
      return <Github size={18} aria-hidden="true" />;
    case "LinkedIn":
      return <Linkedin size={18} aria-hidden="true" />;
    case "X":
      return <IconBrandX size={18} aria-hidden="true" />;
    default:
      return <ArrowUpRight size={18} aria-hidden="true" />;
  }
}

export function LeftColumn() {
  const activeId = useActiveSection(NAV_IDS, NAV_SECTIONS[0].id);

  return (
    <div className="flex flex-col justify-between gap-12 py-10 lg:h-full lg:py-16">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-base text-teal-300">{profile.role}</p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
          {profile.tagline}
        </p>

        <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:absolute motion-safe:inline-flex motion-safe:h-full motion-safe:w-full motion-safe:animate-ping motion-safe:rounded-full motion-safe:bg-teal-400 motion-safe:opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          {profile.availability}
        </div>

        <div className="mt-10 hidden lg:block">
          <SectionNav sections={NAV_SECTIONS} activeId={activeId} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 text-sm font-medium text-white transition-colors duration-150 hover:border-teal-400/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 active:scale-[0.97]"
        >
          Résumé <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <div className="flex items-center gap-3">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-slate-400 transition-colors duration-150 hover:border-teal-400/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 active:scale-[0.97]"
            >
              <SocialIcon label={social.label} />
            </a>
          ))}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 underline-offset-4 transition-colors duration-150 hover:text-teal-300 hover:underline"
        >
          <Mail size={14} aria-hidden="true" />
          {profile.email}
        </a>
      </div>
    </div>
  );
}
