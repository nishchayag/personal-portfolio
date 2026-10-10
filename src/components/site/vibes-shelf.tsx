import Image from "next/image";
import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import { vibes } from "@/content/profile";
import { BTN_PRIMARY, FOCUS, GREY, Reveal, SectionHeading, TEXT_LINK } from "./ui";

type VibeStyle = (typeof vibes.styles)[number];

const half = Math.ceil(vibes.styles.length / 2);
const ROWS: Array<{ dir: "left" | "right"; dur: string; styles: VibeStyle[] }> = [
  { dir: "left", dur: "150s", styles: vibes.styles.slice(0, half) },
  { dir: "right", dur: "170s", styles: vibes.styles.slice(half) },
];

/**
 * "Pick a vibe": two rows of the vibe-menu samples drifting in opposite directions
 * (see .site-marquee in globals.css). Hover or focus pauses a row; reduced motion
 * turns it into a still row you scroll yourself. Cards link into the menu, a separate
 * app served at /vibes, so they're plain <a> tags, not next/link.
 */
export function VibesShelf() {
  return (
    <section
      id="vibes"
      aria-labelledby="vibes-heading"
      className="scroll-mt-[52px] border-t border-[rgb(var(--ink)/0.08)] py-28 lg:py-44"
    >
      <div className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <Reveal>
            <p className="site-eyebrow">{vibes.eyebrow}</p>
            <SectionHeading id="vibes-heading" className="mt-3" lead={vibes.lead} rest={vibes.rest} />
          </Reveal>
          <Reveal delay={0.06}>
            <p className={`max-w-[42ch] text-[17px] leading-[1.5] text-pretty ${GREY}`}>{vibes.body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-2">
              <a href={vibes.href} className={BTN_PRIMARY}>
                {vibes.cta}
              </a>
              <a href={vibes.quizHref} className={TEXT_LINK}>
                {vibes.quizCta}
                <ChevronRight
                  aria-hidden="true"
                  className="size-[18px] transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-14 grid gap-6 lg:mt-20 lg:gap-8">
        {ROWS.map((row) => (
          <div
            key={row.dir}
            className="site-marquee"
            data-dir={row.dir}
            style={{ "--dur": row.dur } as CSSProperties}
          >
            <ul aria-label={row.dir === "left" ? "Website styles" : "More website styles"} className="site-marquee-track flex w-max py-1">
              {row.styles.map((style) => (
                <VibeCard key={style.slug} style={style} />
              ))}
              {/* The second copy only exists to make the loop seamless; it's hidden from assistive tech and tabbing. */}
              {row.styles.map((style) => (
                <VibeCard key={`${style.slug}-dup`} style={style} duplicate />
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function VibeCard({ style, duplicate }: { style: VibeStyle; duplicate?: boolean }) {
  return (
    <li
      className="w-[64vw] max-w-[360px] shrink-0 pr-4 sm:w-[360px] sm:pr-5 sm:max-w-none"
      data-dup={duplicate ? "" : undefined}
      aria-hidden={duplicate || undefined}
    >
      <a
        href={vibes.styleHref(style.slug)}
        tabIndex={duplicate ? -1 : undefined}
        className={`group block rounded-[20px] ${FOCUS}`}
      >
        <span className="relative block aspect-[1200/760] overflow-hidden rounded-[18px] bg-[var(--media-bg)]">
          <Image
            src={`/vibes/${style.slug}.jpg`}
            alt=""
            fill
            sizes="(max-width: 640px) 64vw, 360px"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 rounded-[18px] shadow-[inset_0_0_0_1px_rgb(var(--ink)/0.08)]" aria-hidden="true" />
        </span>
        <span className="mt-3.5 flex items-baseline justify-between gap-3 px-1">
          <span className="min-w-0 truncate text-[17px] font-semibold tracking-[-0.015em] text-[var(--fg)] transition-colors duration-150 [@media(hover:hover)]:group-hover:text-[var(--accent)]">
            {style.name}
          </span>
          <span className={`hidden shrink-0 text-[13px] sm:inline ${GREY}`}>{style.family}</span>
        </span>
      </a>
    </li>
  );
}
