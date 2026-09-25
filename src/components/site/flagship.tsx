"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import type { Project } from "@/content/profile";
import { BrowserFrame } from "./browser-frame";
import { BTN_PRIMARY, BTN_SECONDARY, EASE_OUT, GREY, Reveal } from "./ui";

/** Split "Statement. The rest of it." into a two-tone headline. */
function splitSummary(summary: string) {
  const i = summary.indexOf(". ");
  if (i === -1) return { lead: summary, rest: "" };
  return { lead: summary.slice(0, i + 1), rest: summary.slice(i + 2) };
}

/**
 * The flagship chapter: a pinned, browser-framed screenshot that crossfades
 * through the product's screens while its detail blocks scroll past.
 * Below `lg` it becomes a plain stack: images first, then the details.
 */
export function Flagship({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const { lead, rest } = splitSummary(project.summary);
  const details = project.details ?? [];
  const facts = project.facts ?? [];
  const images = [
    ...(project.image ? [{ src: project.image, alt: `${project.title} home page` }] : []),
    ...(project.gallery ?? []),
  ];

  // Which detail block is on the reading line (desktop only matters visually).
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-detail]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.getAttribute("data-detail")));
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Spread the images evenly across the details: 4 details, 3 images -> 0,1,1,2.
  const imageFor = (i: number) =>
    details.length <= 1 || images.length <= 1
      ? 0
      : Math.round((i * (images.length - 1)) / (details.length - 1));
  const activeImage = imageFor(active);
  const fade = { duration: reduce ? 0.2 : 0.6, ease: EASE_OUT };

  const titleId = `${project.slug}-flagship-title`;
  const headingId = `${project.slug}-flagship-heading`;

  return (
    <section
      id="flagship"
      aria-labelledby={`${titleId} ${headingId}`}
      className="scroll-mt-[52px] px-4 pt-28 sm:px-6 lg:pt-44"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className={`flex items-center gap-3 text-[17px] font-semibold ${GREY}`}>
            <span>Flagship project</span>
            <span aria-hidden="true" className="h-4 w-px bg-[rgb(var(--ink)/0.2)]" />
            <span id={titleId} className="text-[var(--fg)]">
              {project.title}
            </span>
          </p>
          <h2
            id={headingId}
            className="mt-4 max-w-[30ch] text-[clamp(1.75rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance"
          >
            <span className="text-[var(--fg)]">{lead}</span> {rest ? <span className={GREY}>{rest}</span> : null}
          </h2>
        </Reveal>

        {/* Mobile and tablet: the screens stacked above the details. */}
        {images.length > 0 ? (
          <div className="mt-14 lg:hidden">
            <Reveal>
              <BrowserFrame src={images[0].src} alt={images[0].alt} url={project.demoUrl} sizes="calc(100vw - 32px)" />
            </Reveal>
            {images.length > 1 ? (
              <ul className="mt-3 grid grid-cols-2 gap-3">
                {images.slice(1).map((img, i) => (
                  <li key={img.src}>
                    <Reveal delay={i * 0.06}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-[var(--chrome)] shadow-[var(--frame-shadow)]">
                        <Image src={img.src} alt={img.alt} fill sizes="50vw" className="object-cover object-top" />
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div className="lg:-mt-10 lg:grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          {/* Desktop: pinned frame that crossfades through the screens. */}
          <div className="hidden lg:sticky lg:top-[52px] lg:flex lg:h-[calc(100svh-52px)] lg:flex-col lg:justify-center">
            <BrowserFrame url={project.demoUrl}>
              {images.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={false}
                  animate={{ opacity: i === activeImage ? 1 : 0 }}
                  transition={fade}
                  aria-hidden={i === activeImage ? undefined : true}
                  data-flagship-image={i}
                  className="absolute inset-0"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1280px) 760px, 60vw"
                    priority={i === 0}
                    className="object-cover object-top"
                  />
                </motion.div>
              ))}
            </BrowserFrame>
            {images.length > 1 ? (
              <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
                {images.map((img, i) => (
                  <span key={img.src} className="relative h-1 w-6 overflow-hidden rounded-full bg-[rgb(var(--ink)/0.15)]">
                    <motion.span
                      initial={false}
                      animate={{ opacity: i === activeImage ? 1 : 0 }}
                      transition={fade}
                      className="absolute inset-0 rounded-full bg-[var(--fg)]"
                    />
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Detail blocks that scroll past the pinned frame. */}
          <ol ref={listRef} className="mt-14 space-y-12 lg:mt-0 lg:space-y-0 lg:py-[22svh]">
            {details.map((d, i) => (
              <li
                key={d.label}
                data-detail={i}
                className="lg:flex lg:min-h-[56svh] lg:flex-col lg:justify-center"
              >
                <Reveal>
                  <motion.div
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0.4 }}
                    transition={fade}
                    className="max-lg:!opacity-100"
                  >
                    <span className={`text-[14px] font-semibold tabular-nums ${GREY}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-[clamp(1.625rem,2.4vw,2.125rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-balance">
                      {d.label}
                    </h3>
                    <p className={`mt-4 max-w-[38ch] text-[17px] leading-[1.5] text-pretty lg:text-[19px] ${GREY}`}>{d.body}</p>
                  </motion.div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {facts.length > 0 ? (
          <Reveal className="mt-20 lg:mt-12">
            <dl className="grid grid-cols-1 border-t border-[rgb(var(--ink)/0.12)] sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-4 border-b border-[rgb(var(--ink)/0.08)] py-5 last:border-b-0 sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-2 sm:border-b-0 sm:py-8 sm:pr-6"
                >
                  <dt className={`text-[15px] ${GREY}`}>{f.label}</dt>
                  <dd className="text-[clamp(2.25rem,4.6vw,4rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}

        <Reveal className="mt-14 flex flex-col gap-10 border-t border-[rgb(var(--ink)/0.08)] pt-10 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-[var(--fg)]">Built with</h3>
            <ul className="mt-4 flex max-w-[640px] flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full bg-[var(--chip)] px-3.5 py-1.5 text-[14px] text-[var(--fg)]/85">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          {project.demoUrl || project.githubUrl ? (
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              {project.demoUrl ? (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARY} justify-center`}>
                  Visit {project.title}
                  <ArrowUpRight aria-hidden="true" className="size-[18px]" />
                </a>
              ) : null}
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`${BTN_SECONDARY} justify-center`}>
                  <IconBrandGithub aria-hidden="true" className="size-[18px]" />
                  Source code
                </a>
              ) : null}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
