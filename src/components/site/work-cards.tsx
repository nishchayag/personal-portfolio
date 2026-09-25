"use client";

import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import type { Project } from "@/content/profile";
import { Screen } from "./browser-frame";
import { Eyebrow, GREY, MORPH, Reveal, SectionHeading } from "./ui";

type Variant = "feature" | "half" | "wide";

// Varied rhythm: a full-width feature, then pairs, then a wide row, repeating.
// A half that would be left without a partner is promoted to a wide row.
function variantFor(i: number, count: number): Variant {
  if (i === 0) return "feature";
  const pos = (i - 1) % 3;
  if (pos === 2) return "wide";
  if (pos === 0 && i === count - 1) return "wide";
  return "half";
}

const SPAN: Record<Variant, string> = {
  feature: "md:col-span-6",
  half: "md:col-span-3",
  wide: "md:col-span-6",
};

export type CardHandlers = {
  openSlug: string | null;
  liftedSlug: string | null;
  onOpen: (slug: string) => void;
  registerCard: (slug: string, el: HTMLButtonElement | null) => void;
};

export function WorkCards({ projects, ...handlers }: { projects: Project[] } & CardHandlers) {
  if (projects.length === 0) return null;
  return (
    <section id="projects" aria-labelledby="projects-heading" className="px-4 pt-32 sm:px-6 lg:pt-48">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <Eyebrow>More work</Eyebrow>
          <SectionHeading
            id="projects-heading"
            className="mt-3"
            lead="Selected work."
            rest="Open any project to see what went into it."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4 lg:mt-20">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i === 0 ? 0 : 0.06 * ((i - 1) % 2)} className={SPAN[variantFor(i, projects.length)]}>
              <ProjectCard project={p} variant={variantFor(i, projects.length)} {...handlers} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The whole card is ONE button (the title's button stretches over the card
 * with ::after). Its surface, screenshot and title carry layoutIds that the
 * sheet picks up, so opening morphs the card into the sheet and closing
 * reverses the same path. Under reduced motion the ids are dropped and the
 * sheet simply crossfades.
 */
function ProjectCard({
  project: p,
  variant,
  openSlug,
  liftedSlug,
  onOpen,
  registerCard,
}: { project: Project; variant: Variant } & CardHandlers) {
  const reduce = useReducedMotion();
  const isOpen = openSlug === p.slug;
  const id = (part: string) => (reduce ? undefined : `v6-${part}-${p.slug}`);

  const media = p.image ? (
    <motion.div
      layoutId={id("media")}
      transition={MORPH}
      className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--media-bg)]"
      style={{ borderRadius: 18 }}
    >
      <Screen src={p.image} sizes={variant === "half" ? "(min-width: 768px) 600px, 100vw" : "(min-width: 1024px) 720px, 100vw"} />
    </motion.div>
  ) : null;

  const title = (
    <h3 className="min-w-0">
      <button
        ref={(el) => registerCard(p.slug, el)}
        type="button"
        aria-haspopup="dialog"
        onClick={() => onOpen(p.slug)}
        className="text-left outline-none after:absolute after:inset-0 after:z-10 after:rounded-[28px] after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--accent)]"
      >
        <motion.span
          layoutId={id("title")}
          transition={MORPH}
          className={`inline-block font-semibold tracking-[-0.03em] text-[var(--fg)] ${
            variant === "feature" ? "text-[32px] lg:text-[44px]" : "text-[28px] lg:text-[32px]"
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
      <p className={`text-[14px] font-semibold ${GREY}`}>{p.kind}</p>
      <div className="mt-2">{title}</div>
      <p className={`mt-3 text-[17px] leading-[1.5] text-pretty ${GREY} ${variant === "feature" ? "max-w-[34ch]" : "max-w-[40ch]"}`}>
        {p.summary}
      </p>
    </motion.div>
  );

  const plus = (
    <span
      aria-hidden="true"
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--tile-chip)] text-[var(--fg)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:rotate-90"
    >
      <Plus className="size-[18px]" />
    </span>
  );

  return (
    <article
      className="group relative h-full transition-transform duration-150 ease-out active:scale-[0.985]"
      style={{ zIndex: liftedSlug === p.slug ? 65 : undefined }}
    >
      <motion.div
        layoutId={id("surface")}
        transition={MORPH}
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--tile)] shadow-[inset_0_0_0_1px_var(--tile-ring)] transition-shadow duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:shadow-[inset_0_0_0_1px_var(--tile-ring-hover)]"
        style={{ borderRadius: 28 }}
      />

      {variant === "feature" ? (
        <div className="relative grid gap-0 p-2.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:items-stretch lg:gap-2.5">
          <div className="lg:order-2">{media}</div>
          <div className="flex flex-col justify-between gap-6 px-3.5 pb-5 pt-6 lg:py-7 lg:pl-7 lg:pr-4">
            {body}
            <div className="hidden lg:block">{plus}</div>
          </div>
        </div>
      ) : variant === "wide" ? (
        <div className="relative grid gap-0 p-2.5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
          {media}
          <div className="flex items-start justify-between gap-4 px-3.5 pb-5 pt-6 lg:px-0 lg:pr-7">
            {body}
            <div className="hidden pt-1 lg:block">{plus}</div>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full flex-col p-2.5">
          {media}
          <div className="flex flex-1 items-start justify-between gap-4 px-3.5 pb-5 pt-6 lg:pb-6">
            {body}
            <div className="hidden pt-1 lg:block">{plus}</div>
          </div>
        </div>
      )}
    </article>
  );
}
