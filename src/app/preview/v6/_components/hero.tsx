"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { featuredProjects, profile, type Project } from "@/content/profile";
import { BrowserFrame } from "./browser-frame";
import { useMediaQuery, usePrefersReducedMotion } from "./hooks";
import { ThemeToggle } from "./theme";
import { BTN_PRIMARY, EASE_OUT, GREY, TEXT_LINK } from "./ui";

// The flagship leads the deck and lands front and centre; the rest fan out behind it.
const withImages = featuredProjects.filter((p) => p.image);
const stackProjects = [
  ...withImages.filter((p) => p.flagship),
  ...withImages.filter((p) => !p.flagship),
];

/** Entrance for everything after the name: rises in, 60ms apart. */
function rise(step: number) {
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE_OUT, delay: 0.42 + step * 0.06 },
  };
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  // 0 at the top of the page, 1 once the stage has finished its sticky run.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Reduced motion pins every scroll-linked value to its settled state.
  const reduceMV = useMotionValue(0);
  useEffect(() => {
    reduceMV.set(reduce ? 1 : 0);
  }, [reduce, reduceMV]);

  const progress = useTransform<number, number>([scrollYProgress, reduceMV], ([p, r]) =>
    r ? 1 : Math.min(1, p / 0.78),
  );

  const introOpacity = useTransform<number, number>([scrollYProgress, reduceMV], ([p, r]) =>
    r ? 1 : 1 - Math.min(1, p / 0.2),
  );
  const introScale = useTransform(introOpacity, [0, 1], [0.94, 1]);

  return (
    <div ref={ref} className="relative">
      <Aurora opacity={introOpacity} />

      {/* The sub-nav only arrives after the hero, so the toggle lives here too. */}
      <div className="absolute right-2 top-2 z-20 sm:right-4 sm:top-3">
        <ThemeToggle />
      </div>

      <motion.header
        style={{ opacity: introOpacity, scale: introScale }}
        className="relative z-10 flex min-h-svh flex-col items-center justify-start px-4 pt-[20svh] text-center sm:px-6 lg:pt-[18svh]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.12 }}
          className="text-[clamp(3.5rem,10.4vw,9rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-balance"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          {...rise(0)}
          className={`mt-7 max-w-[34ch] text-[clamp(1.1875rem,1.9vw,1.5rem)] leading-[1.35] tracking-[-0.01em] text-pretty ${GREY}`}
        >
          {profile.tagline}
        </motion.p>

        {/* One filled button; the two text links pair up beside it (their own centred row on phones). */}
        <motion.div
          {...rise(1)}
          className="mt-9 flex flex-col items-center gap-y-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8"
        >
          <a href="#work" className={`${BTN_PRIMARY} !min-h-11`}>
            See the work
          </a>
          <div className="flex items-center justify-center gap-x-8">
            <a href="#contact" className={TEXT_LINK}>
              Get in touch
              <ChevronRight
                aria-hidden="true"
                className="size-[18px] transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
              />
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
              Résumé
              <ArrowUpRight
                aria-hidden="true"
                className="size-[18px] transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5"
              />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </motion.div>

        <motion.p {...rise(2)} className="mt-6 inline-flex items-center gap-2 text-[13px] text-[var(--fg-2)]">
          <span className="size-1.5 rounded-full bg-[var(--ok)]" aria-hidden="true" />
          {profile.availability}
        </motion.p>
      </motion.header>

      {stackProjects.length > 0 ? <ScreenshotStack progress={progress} projects={stackProjects} /> : null}
    </div>
  );
}

// ---- Aurora ----------------------------------------------------------------

// Very low-contrast, and only behind the hero: it fades with the intro copy.
const BLOBS: Array<{ style: CSSProperties; vars: Record<string, string> }> = [
  {
    style: {
      left: "-14vmax",
      top: "-26vmax",
      width: "64vmax",
      height: "64vmax",
      background: "radial-gradient(closest-side, var(--aurora-1), transparent 70%)",
    },
    vars: { "--dur": "52s", "--dx": "6%", "--dy": "4%" },
  },
  {
    style: {
      right: "-18vmax",
      top: "-18vmax",
      width: "58vmax",
      height: "58vmax",
      background: "radial-gradient(closest-side, var(--aurora-2), transparent 70%)",
    },
    vars: { "--dur": "60s", "--dx": "-5%", "--dy": "6%", "--delay": "-12s" },
  },
];

function Aurora({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-svh overflow-hidden"
    >
      {BLOBS.map((b, i) => (
        <div key={i} className="v6-aurora-blob" style={{ ...b.style, ...(b.vars as CSSProperties) }} />
      ))}
      {/* Keeps the lower edge the page colour where the stack begins. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,var(--bg)_100%)]" />
    </motion.div>
  );
}

// ---- Screenshot stack --------------------------------------------------------

/**
 * The hook: the featured screenshots start as a tilted deck just below the
 * fold, then straighten and fan out as the reader scrolls. The flagship stays
 * in front, centred and full size; the others spread symmetrically behind it.
 */
function ScreenshotStack({ progress, projects }: { progress: MotionValue<number>; projects: Project[] }) {
  const wide = useMediaQuery("(min-width: 768px)");

  const rotateX = useTransform(progress, [0, 1], [26, 0]);
  const rotateZ = useTransform(progress, [0, 1], [-4, 0]);
  const scale = useTransform(progress, [0, 1], [0.74, 1]);

  const others = projects.length - 1;

  return (
    <div
      aria-hidden="true"
      className="relative -mt-[70svh] h-[160svh] md:-mt-[60svh] md:h-[200svh] motion-reduce:!mt-0 motion-reduce:!h-auto"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden [perspective:1600px] motion-reduce:!relative motion-reduce:!h-[min(70svh,640px)]">
        <motion.div style={{ rotateX, rotateZ, scale }} className="relative w-[80vw] md:w-[min(46vw,700px)]">
          {/* Placeholder that gives the stage its height; cards overlay it. */}
          <div className="invisible aspect-[16/10] pt-7" />
          {projects.map((project, i) => {
            // -1..1 across the cards behind the flagship.
            const pos = i === 0 ? 0 : others === 1 ? 1 : ((i - 1) / (others - 1)) * 2 - 1;
            return (
              <StackCard
                key={project.slug}
                project={project}
                index={i}
                pos={pos}
                spread={wide ? 62 : 22}
                progress={progress}
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function StackCard({
  project,
  index,
  pos,
  spread,
  progress,
}: {
  project: Project;
  index: number;
  pos: number;
  spread: number;
  progress: MotionValue<number>;
}) {
  const front = index === 0;
  // Final: the flagship at centre; the others fan out behind it on a shallow arc.
  const endX = front ? "0%" : `${pos * spread}%`;
  const endY = front ? "4%" : `${-(1 - Math.abs(pos)) * 22 - 2}%`;
  const endScale = front ? 1 : 0.8 - (1 - Math.abs(pos)) * 0.06;

  // Start: a deck, each card tucked a little higher and smaller than the last.
  const x = useTransform(progress, [0, 1], ["0%", endX]);
  const y = useTransform(progress, [0, 1], [`${-index * 7}%`, endY]);
  const scale = useTransform(progress, [0, 1], [1 - index * 0.04, endScale]);
  const dim = useTransform(progress, [0, 1], [index * 0.12, front ? 0 : 0.45]);

  // Outer cards sit above the middle one, all of them behind the flagship.
  const z = front ? 30 : 10 + Math.round(Math.abs(pos) * 10) - index;

  return (
    <motion.div style={{ x, y, scale, zIndex: z }} className="absolute inset-0">
      <BrowserFrame
        src={project.image!}
        url={project.demoUrl}
        sizes="(min-width: 768px) 700px, 80vw"
        priority={index < 2}
      />
      {/* Cards behind recede into the page colour; light mode fogs them less so screenshots stay crisp. */}
      <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 rounded-[12px] bg-[var(--bg)] opacity-[var(--recede)]" />
      </motion.div>
    </motion.div>
  );
}
