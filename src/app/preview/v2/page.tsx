"use client";

import { MotionConfig } from "motion/react";
import { profile } from "@/content/profile";
import { BentoGrid } from "./components/BentoGrid";
import {
  ContactSection,
  ExperienceSection,
  MoreProjectsSection,
  ServicesSection,
  WorkSection,
} from "./components/Sections";

export default function BentoPreviewPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#09090b] text-white">
        <header className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold tracking-tight text-white">
            {profile.name}
          </span>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-white/5 active:scale-[0.97]"
          >
            Résumé
          </a>
        </header>

        <main className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 lg:px-8">
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="sr-only">
              Overview
            </h2>
            <BentoGrid />
          </section>

          <div className="mt-24 flex flex-col gap-24">
            <WorkSection />
            <MoreProjectsSection />
            <ExperienceSection />
            <ServicesSection />
            <ContactSection />
          </div>
        </main>

        <footer className="mx-auto max-w-[1400px] px-4 py-10 text-center text-xs text-white/40 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </MotionConfig>
  );
}
