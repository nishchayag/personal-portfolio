"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { featuredProjects, otherProjects, type Project } from "@/content/profile";
import { useFlight } from "./flight";
import { Screen } from "./screen";
import { Reveal, SectionHeading } from "./sections";
import { FOCUS, MORPH } from "./tokens";

type Variant = "feature" | "half" | "wide";

// Varied bento rhythm: a full-bleed feature, then pairs, then a wide row — and repeat.
// A half that would be left without a partner is promoted to a wide row.
function variantFor(i: number, count: number): Variant {
  if (i === 0) return "feature";
  const pos = (i - 1) % 3;
  if (pos === 2) return "wide";
  if (pos === 0 && i === count - 1) return "wide";
  return "half";
}

const SPAN: Record<Variant, string> = {
  feature: "sm:col-span-6",
  half: "sm:col-span-3",
  wide: "sm:col-span-6",
};

export type CardHandlers = {
  openSlug: string | null;
  liftedSlug: string | null;
  onOpen: (slug: string) => void;
  registerCard: (slug: string, el: HTMLButtonElement | null) => void;
};

export function WorkSection(props: CardHandlers) {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 lg:scroll-mt-10">
      {/* Sits in front of the flight layer so the windows pass behind the heading. */}
      <div className="relative z-40">
        <SectionHeading id="work-heading" title="Selected work" lede="Open any project to see what went into it." />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-6 sm:gap-4">
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} variant={variantFor(i, featuredProjects.length)} index={i} {...props} />
        ))}
      </div>

      <MoreProjects />
    </section>
  );
}

function ProjectCard({
  project: p,
  variant,
  index,
  openSlug,
  liftedSlug,
  onOpen,
  registerCard,
}: { project: Project; variant: Variant; index: number } & CardHandlers) {
  const reduce = useReducedMotion();
  const flight = useFlight();
  const isOpen = openSlug === p.slug;
  // The screenshot appears the moment its flying window docks into this slot.
  const slotOpacity = useTransform(() => {
    if (!flight) return 1;
    // Read every motion value on every run: useTransform tracks what the first run touches.
    const progress = flight.progress.get();
    const flies = flight.flying.get().has(p.slug);
    if (reduce || !flies) return 1;
    return Math.min(1, Math.max(0, (progress - 0.86) / 0.14));
  });

  const media = p.image ? (
    <motion.div
      layoutId={`v5-media-${p.slug}`}
      transition={MORPH}
      data-v5-slot={p.slug}
      className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0d] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]"
      style={{ borderRadius: variant === "half" ? 14 : 18 }}
    >
      <motion.div className="absolute inset-0" style={{ opacity: slotOpacity }}>
        <Screen
          src={p.image}
          sizes="(min-width: 1024px) 900px, 100vw"
          priority={index === 0}
          zoomOnHover
        />
      </motion.div>
    </motion.div>
  ) : null;

  const title = (
    <h3 className="min-w-0">
      <button
        ref={(el) => registerCard(p.slug, el)}
        type="button"
        aria-haspopup="dialog"
        onClick={() => onOpen(p.slug)}
        className={`text-left outline-none after:absolute after:inset-0 after:z-10 after:rounded-[26px] after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[#8fb3ff]`}
      >
        <motion.span
          layoutId={`v5-title-${p.slug}`}
          transition={MORPH}
          className={`inline-block font-semibold tracking-[-0.025em] text-[#f5f5f7] ${
            variant === "feature" ? "text-[28px] sm:text-[36px]" : variant === "wide" ? "text-[24px] sm:text-[28px]" : "text-[19px] sm:text-[22px]"
          }`}
        >
          {p.title}
        </motion.span>
        <span className="sr-only">, open project details</span>
      </button>
    </h3>
  );

  const body = (
    <motion.div
      className="min-w-0"
      initial={false}
      animate={{ opacity: isOpen ? 0 : 1 }}
      transition={isOpen ? { duration: 0.1 } : { duration: 0.25, delay: 0.2 }}
    >
      <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8e8e93]">{p.kind}</p>
      <div className="mt-1.5">{title}</div>
      <p
        className={`mt-2 text-[15px] leading-relaxed text-[#8e8e93] ${
          variant === "half" ? "line-clamp-2 max-sm:text-[14px] sm:line-clamp-3" : "max-w-[38rem]"
        }`}
      >
        {p.summary}
      </p>
      {variant !== "half" && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${p.title} stack`}>
          {p.stack.map((s) => (
            <li key={s} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[12px] text-[#f5f5f7]/70">
              {s}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );

  const plus = (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[#f5f5f7]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:rotate-90"
    >
      <Plus size={17} />
    </span>
  );

  return (
    <article
      className={`group relative ${SPAN[variant]} transition-transform duration-150 ease-out active:scale-[0.985]`}
      style={{ zIndex: liftedSlug === p.slug ? 65 : undefined }}
    >
      <motion.div
        layoutId={`v5-surface-${p.slug}`}
        transition={MORPH}
        aria-hidden="true"
        className="absolute inset-0 border border-white/[0.06] bg-[#0f0f12] transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-white/[0.12]"
        style={{ borderRadius: 26 }}
      />

      {variant === "feature" && (
        <div className="relative grid gap-0 p-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:items-stretch sm:gap-2">
          <div className="sm:order-2">{media}</div>
          <div className="flex flex-col justify-between gap-6 px-3 pb-4 pt-5 sm:py-5 sm:pl-5 sm:pr-3">
            {body}
            <div className="hidden sm:block">{plus}</div>
          </div>
        </div>
      )}

      {variant === "half" && (
        <div className="relative grid grid-cols-[124px_minmax(0,1fr)] items-center gap-4 p-2 pr-4 sm:flex sm:h-full sm:flex-col sm:items-stretch sm:gap-0 sm:pr-2">
          {media}
          <div className="flex items-start justify-between gap-4 py-2 sm:px-3 sm:pb-4 sm:pt-5">
            {body}
            <div className="hidden pt-0.5 sm:block">{plus}</div>
          </div>
        </div>
      )}

      {variant === "wide" && (
        <div className="relative grid gap-0 p-2 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] sm:items-center sm:gap-6">
          {media}
          <div className="flex items-start justify-between gap-4 px-3 pb-4 pt-5 sm:px-2 sm:py-4 sm:pr-5">
            {body}
            <div className="hidden pt-1 sm:block">{plus}</div>
          </div>
        </div>
      )}
    </article>
  );
}

function MoreProjects() {
  const reduce = useReducedMotion();
  if (otherProjects.length === 0) return null;
  return (
    <Reveal className="mt-16 sm:mt-20">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#f5f5f7]">More projects</h3>
        <p className="text-[13px] text-[#8e8e93]">Smaller builds and experiments</p>
      </div>
      <ul className="mt-5 overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#0f0f12]">
        {otherProjects.map((p, i) => {
          const href = p.demoUrl ?? p.githubUrl;
          const inner = (
            <>
              <span className="relative hidden h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] sm:block">
                {p.image ? (
                  <Image src={p.image} alt="" fill sizes="64px" className="object-cover object-top" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[13px] font-semibold text-[#8e8e93]">
                    {p.title.charAt(0)}
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-medium tracking-[-0.01em] text-[#f5f5f7]">{p.title}</span>
                <span className="mt-0.5 block text-[14px] leading-snug text-[#8e8e93]">{p.summary}</span>
              </span>
              <span className="hidden shrink-0 text-[13px] text-[#8e8e93] md:block">{p.stack.join(" · ")}</span>
              {href && (
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 text-[#8e8e93] ${reduce ? "" : "transition-transform duration-200 ease-out"} [@media(hover:hover)_and_(pointer:fine)]:group-hover/row:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/row:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/row:text-[#f5f5f7]`}
                />
              )}
            </>
          );
          return (
            <li key={p.slug} className={i > 0 ? "border-t border-white/[0.06]" : ""}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/row flex min-h-[64px] items-center gap-4 px-5 py-3.5 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.03] ${FOCUS} focus-visible:-outline-offset-2`}
                >
                  {inner}
                </a>
              ) : (
                <div className="flex min-h-[64px] items-center gap-4 px-5 py-3.5">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}
