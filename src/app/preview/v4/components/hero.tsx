"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { featuredProjects, profile, type Project } from "@/content/profile";
import { BrowserFrame } from "./browser-frame";
import { useMediaQuery, usePrefersReducedMotion } from "./hooks";
import { EASE_OUT, FOCUS, GREY } from "./ui";

const stackProjects = featuredProjects.filter((p) => p.image);

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

  const progress = useTransform<number, number>(
    [scrollYProgress, reduceMV],
    ([p, r]) => (r ? 1 : Math.min(1, p / 0.78)),
  );

  const introOpacity = useTransform<number, number>(
    [scrollYProgress, reduceMV],
    ([p, r]) => (r ? 1 : 1 - Math.min(1, p / 0.2)),
  );
  const introScale = useTransform(introOpacity, [0, 1], [0.94, 1]);

  return (
    <div ref={ref} className="relative">
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

        <motion.div
          {...rise(1)}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
        >
          <a
            href="#work"
            className={`inline-flex min-h-11 items-center rounded-full bg-[#f5f5f7] px-6 text-[17px] font-medium text-black transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:bg-white ${FOCUS}`}
          >
            See the work
          </a>
          <a
            href="#contact"
            className={`group inline-flex min-h-11 items-center gap-0.5 text-[17px] text-[#2997ff] transition-transform duration-150 ease-out active:scale-[0.97] ${FOCUS}`}
          >
            Get in touch
            <ChevronRight
              aria-hidden="true"
              className="size-[18px] transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        <motion.p
          {...rise(2)}
          className="mt-6 inline-flex items-center gap-2 text-[13px] text-[#86868b]"
        >
          <span className="size-1.5 rounded-full bg-[#30d158]" aria-hidden="true" />
          {profile.availability}
        </motion.p>
      </motion.header>

      {stackProjects.length > 0 ? (
        <ScreenshotStack progress={progress} projects={stackProjects} />
      ) : null}
    </div>
  );
}

/**
 * The hook: the featured screenshots start as a tilted deck just below the
 * fold, then straighten, fan out and scale up as the reader scrolls. Only the
 * stage and each card are transformed (transform + opacity only).
 */
function ScreenshotStack({
  progress,
  projects,
}: {
  progress: MotionValue<number>;
  projects: Project[];
}) {
  const wide = useMediaQuery("(min-width: 768px)");
  const n = projects.length;

  const rotateX = useTransform(progress, [0, 1], [26, 0]);
  const rotateZ = useTransform(progress, [0, 1], [-4, 0]);
  const scale = useTransform(progress, [0, 1], [0.74, 1]);

  return (
    <div
      aria-hidden="true"
      className="relative -mt-[70svh] h-[180svh] md:-mt-[60svh] md:h-[200svh] motion-reduce:!mt-0 motion-reduce:!h-auto"
    >
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden [perspective:1600px] motion-reduce:!relative motion-reduce:!h-[min(70svh,640px)]">
        <motion.div
          style={{ rotateX, rotateZ, scale }}
          className="relative w-[84vw] md:w-[min(44vw,660px)]"
        >
          {/* Placeholder that gives the stage its height; cards overlay it. */}
          <div className="invisible aspect-[16/10] pt-7" />
          {projects.map((project, i) => (
            <StackCard
              key={project.slug}
              project={project}
              index={i}
              count={n}
              spread={wide ? 58 : 24}
              progress={progress}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function StackCard({
  project,
  index,
  count,
  spread,
  progress,
}: {
  project: Project;
  index: number;
  count: number;
  spread: number;
  progress: MotionValue<number>;
}) {
  // Final layout: a centred row, in array order, with the middle cards in front.
  const slot = index - (count - 1) / 2;
  const depth = Math.abs(slot);
  const minDepth = count % 2 === 0 ? 0.5 : 0;
  const rank = depth - minDepth; // 0 = front row

  // Start: a deck, each card tucked a little higher and smaller than the last.
  const x = useTransform(progress, [0, 1], ["0%", `${slot * spread}%`]);
  const y = useTransform(progress, [0, 1], [`${-index * 7}%`, "0%"]);
  const scale = useTransform(
    progress,
    [0, 1],
    [1 - index * 0.04, 1 - rank * 0.1],
  );
  const dim = useTransform(progress, [0, 1], [index * 0.12, rank * 0.35]);

  return (
    <motion.div
      style={{ x, y, scale, zIndex: 20 - Math.round(rank * 2) * 2 - index }}
      className="absolute inset-0"
    >
      <BrowserFrame
        src={project.image!}
        alt=""
        url={project.demoUrl}
        sizes="(min-width: 768px) 660px, 84vw"
        priority={index < 2}
      />
      <motion.div
        style={{ opacity: dim }}
        className="pointer-events-none absolute inset-0 rounded-[12px] bg-black"
      />
    </motion.div>
  );
}
