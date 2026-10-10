"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { vibes } from "@/content/profile";
import { BTN_PRIMARY, FOCUS, GREY, Reveal, SectionHeading, TEXT_LINK } from "./ui";

// The track bleeds to the viewport edges but its first card lines up with the 1200px content column.
const GUTTER = "px-[max(1rem,calc((100%-1200px)/2))] sm:px-[max(1.5rem,calc((100%-1200px)/2))]";
const SNAP_PAD = "scroll-px-[max(1rem,calc((100%-1200px)/2))] sm:scroll-px-[max(1.5rem,calc((100%-1200px)/2))]";

/**
 * Apple-style shelf of the 22 vibe-menu styles. Each card links into the menu
 * (a separate app served at /vibes), so these are plain <a> tags, not next/link.
 */
export function VibesShelf() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const page = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      id="vibes"
      aria-labelledby="vibes-heading"
      className="scroll-mt-[52px] border-t border-[rgb(var(--ink)/0.08)] py-28 lg:py-44"
    >
      <div className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <Reveal>
            <p className={`text-[17px] font-semibold ${GREY}`}>{vibes.eyebrow}</p>
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

      <Reveal delay={0.1} className="mt-14 lg:mt-20">
        <ul
          ref={track}
          aria-label="Website styles"
          className={`flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${GUTTER} ${SNAP_PAD}`}
        >
          {vibes.styles.map((style, i) => (
            <li key={style.slug} className="w-[78vw] max-w-[440px] shrink-0 snap-start sm:w-[400px]">
              <a href={vibes.styleHref(style.slug)} className={`group block rounded-[22px] p-1 -m-1 ${FOCUS}`}>
                <span className="relative block aspect-[1200/760] overflow-hidden rounded-[18px] bg-[var(--media-bg)]">
                  <Image
                    src={`/vibes/${style.slug}.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 78vw, 400px"
                    loading={i < 3 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 rounded-[18px] shadow-[inset_0_0_0_1px_rgb(var(--ink)/0.08)]" aria-hidden="true" />
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-3 px-1">
                  <span className="text-[19px] font-semibold tracking-[-0.015em] text-[var(--fg)] transition-colors duration-150 [@media(hover:hover)]:group-hover:text-[var(--accent)]">
                    {style.name}
                  </span>
                  <span className={`shrink-0 text-[14px] ${GREY}`}>{style.family}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-8 hidden px-4 sm:block sm:px-6">
        <div className="mx-auto flex max-w-[1200px] justify-end gap-3">
          {([-1, 1] as const).map((dir) => {
            const Icon = dir === -1 ? ChevronLeft : ChevronRight;
            const disabled = dir === -1 ? edge.start : edge.end;
            return (
              <button
                key={dir}
                type="button"
                onClick={() => page(dir)}
                disabled={disabled}
                aria-label={dir === -1 ? "Previous styles" : "More styles"}
                className={`flex size-11 items-center justify-center rounded-full bg-[var(--chip)] text-[var(--fg)] transition-[transform,background-color,opacity] duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-35 [@media(hover:hover)]:hover:bg-[var(--chip-hover)] ${FOCUS}`}
              >
                <Icon aria-hidden="true" className="size-5" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
