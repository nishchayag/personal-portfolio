"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { vibes } from "@/content/profile";
import { ThemeToggle } from "@/components/site/theme";
import { BTN_PRIMARY, Eyebrow, GREY, TEXT_LINK } from "@/components/site/ui";

/** Client component because it reuses the site's button and link styles from ui.tsx. */
export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col justify-center px-4 py-24 sm:px-6">
      <div className="absolute right-2 top-2 sm:right-4 sm:top-3">
        <ThemeToggle />
      </div>
      <div className="mx-auto w-full max-w-[1200px]">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display mt-4 max-w-[14ch] text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.045em] text-balance">
          This page doesn’t exist<span className="text-[var(--accent)]">.</span>
        </h1>
        <p className={`mt-6 max-w-[40ch] text-[clamp(1.1875rem,1.9vw,1.5rem)] leading-[1.35] text-pretty ${GREY}`}>
          The link may be old or have a typo. Everything else is right where it was.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-2">
          <Link href="/" className={BTN_PRIMARY}>
            Back to the homepage
          </Link>
          {/* /vibes is a separate app behind a rewrite, so a plain link, not next/link. */}
          <a href={vibes.href} className={TEXT_LINK}>
            {vibes.heroCta}
            <ChevronRight aria-hidden="true" className="size-[18px]" />
          </a>
        </div>
      </div>
    </main>
  );
}
