"use client";

import { useEffect, useRef } from "react";
import { motion, useDragControls, useReducedMotion, type PanInfo } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import type { Project } from "@/content/profile";
import { Screen } from "./browser-frame";
import { BTN_PRIMARY, BTN_SECONDARY, EASE_OUT, FOCUS, GREY, MORPH } from "./ui";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The detail sheet a card morphs into. Centred modal on desktop, bottom sheet
 * with drag-to-dismiss on phones. The close button lives in its own header row
 * on a solid chip, so it never sits on top of the screenshot's own UI.
 */
export function ProjectSheet({
  project: p,
  onClose,
  bottomSheet,
}: {
  project: Project;
  onClose: () => void;
  bottomSheet: boolean;
}) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drag = useDragControls();
  const id = (part: string) => (reduce ? undefined : `v6-${part}-${p.slug}`);

  // Focus into the sheet, trap Tab inside it, close on Escape.
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const inside = dialogRef.current.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    // A flick is enough; a slow drag has to travel a bit further.
    if (info.offset.y > 140 || info.velocity.y > 550) onClose();
  };

  const radius = bottomSheet
    ? { borderTopLeftRadius: 28, borderTopRightRadius: 28, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
    : { borderRadius: 28 };

  const titleId = `v6-sheet-title-${p.slug}`;
  const content = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { delay: 0.14, duration: 0.35, ease: EASE_OUT } },
      };

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[60] bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        onClick={onClose}
      />

      <div
        className={`pointer-events-none fixed inset-0 z-[70] flex justify-center ${
          bottomSheet ? "items-end" : "items-center p-6"
        }`}
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`pointer-events-auto relative flex w-full flex-col ${
            bottomSheet ? "max-h-[92dvh]" : "max-h-[calc(100dvh-48px)] max-w-[880px]"
          }`}
          drag={bottomSheet ? "y" : false}
          dragControls={drag}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0.04, bottom: 0.9 }}
          onDragEnd={onDragEnd}
          // Reduced motion: no morph, a plain crossfade.
          initial={reduce ? { opacity: 0 } : undefined}
          animate={reduce ? { opacity: 1 } : undefined}
          exit={reduce ? { opacity: 0 } : undefined}
          transition={{ duration: 0.2 }}
        >
          {/* The card's surface, grown into a glass sheet. */}
          <motion.div
            layoutId={id("surface")}
            transition={MORPH}
            aria-hidden="true"
            className="v6-glass absolute inset-0 bg-[#161618]/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl backdrop-saturate-150"
            style={radius}
          />

          {/* Header row: grabber (phones), kind, and the close chip. Never over the image. */}
          <div
            onPointerDown={bottomSheet ? (e) => drag.start(e) : undefined}
            className={`relative z-10 shrink-0 ${bottomSheet ? "cursor-grab touch-none active:cursor-grabbing" : ""}`}
          >
            {bottomSheet ? (
              <div className="flex h-5 items-end justify-center" aria-hidden="true">
                <span className="h-[5px] w-10 rounded-full bg-white/25" />
              </div>
            ) : null}
            <div className={`flex items-center justify-between gap-4 ${bottomSheet ? "px-5 pb-2 pt-2" : "px-6 pb-3 pt-4 sm:px-7"}`}>
              <motion.p
                className={`text-[14px] font-semibold ${GREY}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.24, duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
              >
                {p.kind}
              </motion.p>
              <motion.button
                ref={closeRef}
                type="button"
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close project details"
                className={`-mr-1.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-[#2c2c2e] text-[#f5f5f7] transition-[transform,background-color] duration-150 ease-out active:scale-[0.94] [@media(hover:hover)]:hover:bg-[#3a3a3c] ${FOCUS}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.26, duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
              >
                <X className="size-[18px]" aria-hidden="true" />
              </motion.button>
            </div>
          </div>

          <motion.div
            layoutScroll
            className={`relative min-h-0 flex-1 overflow-y-auto overscroll-contain ${
              bottomSheet ? "px-2.5 pb-[max(20px,env(safe-area-inset-bottom))]" : "px-3 pb-3"
            }`}
          >
            {p.image ? (
              <motion.div
                layoutId={id("media")}
                transition={MORPH}
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0d]"
                style={{ borderRadius: 18 }}
              >
                <Screen src={p.image} sizes="(min-width: 1024px) 860px, 100vw" />
              </motion.div>
            ) : null}

            <div className="px-3.5 pb-6 pt-7 sm:px-5 sm:pb-8">
              <h2 id={titleId}>
                <motion.span
                  layoutId={id("title")}
                  transition={MORPH}
                  className="inline-block text-[36px] font-semibold leading-[1.05] tracking-[-0.035em] text-[#f5f5f7] sm:text-[48px]"
                >
                  {p.title}
                </motion.span>
              </h2>

              <motion.div {...content} exit={{ opacity: 0, transition: { duration: 0.1 } }}>
                <p className="mt-4 max-w-[52ch] text-[19px] leading-[1.5] text-[#f5f5f7]/85 text-pretty">{p.summary}</p>

                {p.highlights.length > 0 ? (
                  <div className="mt-10">
                    <h3 className="text-[14px] font-semibold text-[#f5f5f7]">What I built</h3>
                    <ul className="mt-4 space-y-4">
                      {p.highlights.map((h) => (
                        <li
                          key={h}
                          className="border-l border-white/15 pl-4 text-[17px] leading-[1.5] text-[#f5f5f7] text-pretty"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-10">
                  <h3 className="text-[14px] font-semibold text-[#f5f5f7]">Built with</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[14px] text-[#f5f5f7]/85">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {p.demoUrl || p.githubUrl ? (
                  <div className="mt-10 flex flex-wrap gap-3">
                    {p.demoUrl ? (
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                        Visit live site
                        <ArrowUpRight className="size-[18px]" aria-hidden="true" />
                      </a>
                    ) : null}
                    {p.githubUrl ? (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className={`${BTN_SECONDARY} !bg-white/[0.08] [@media(hover:hover)]:hover:!bg-white/[0.14]`}>
                        <IconBrandGithub className="size-[18px]" aria-hidden="true" />
                        View code
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
