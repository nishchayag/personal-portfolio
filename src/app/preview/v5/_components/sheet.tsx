"use client";

import { useEffect, useRef } from "react";
import { motion, useDragControls, useReducedMotion, type PanInfo } from "motion/react";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { Project } from "@/content/profile";
import { Screen } from "./screen";
import { EASE_OUT, FOCUS, MORPH } from "./tokens";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
    ? { borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
    : { borderRadius: 30 };

  const titleId = `v5-sheet-title-${p.slug}`;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[60] bg-[#020203]/65"
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
          // Reduced motion: the morph is replaced by a plain crossfade.
          initial={reduce ? { opacity: 0 } : undefined}
          animate={reduce ? { opacity: 1 } : undefined}
          exit={reduce ? { opacity: 0 } : undefined}
          transition={{ duration: 0.2 }}
        >
          {/* The card's surface, grown into a glass sheet. */}
          <motion.div
            layoutId={`v5-surface-${p.slug}`}
            transition={MORPH}
            aria-hidden="true"
            className="v5-glass absolute inset-0 border border-white/[0.1] bg-[#16161a]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
            style={radius}
          />

          {bottomSheet && (
            <div
              onPointerDown={(e) => drag.start(e)}
              className="relative z-10 flex h-7 shrink-0 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
              aria-hidden="true"
            >
              <span className="h-[5px] w-10 rounded-full bg-white/25" />
            </div>
          )}

          <motion.button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className={`absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#050507]/55 text-[#f5f5f7] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-transform duration-150 active:scale-[0.94] ${
              bottomSheet ? "top-9" : "top-5 right-5"
            } ${FOCUS}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
          >
            <X size={18} aria-hidden="true" />
          </motion.button>

          <motion.div
            layoutScroll
            className={`relative min-h-0 flex-1 overflow-y-auto overscroll-contain ${bottomSheet ? "px-2 pb-[max(20px,env(safe-area-inset-bottom))]" : "p-3"}`}
          >
            {p.image && (
              <motion.div
                layoutId={`v5-media-${p.slug}`}
                transition={MORPH}
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0d]"
                style={{ borderRadius: bottomSheet ? 22 : 20 }}
              >
                <Screen src={p.image} sizes="(min-width: 1024px) 900px, 100vw" />
              </motion.div>
            )}

            <div className="px-4 pb-6 pt-7 sm:px-8 sm:pb-9">
              <motion.p
                className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#8e8e93]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.25 } }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
              >
                {p.kind}
              </motion.p>
              <h2 id={titleId} className="mt-2">
                <motion.span
                  layoutId={`v5-title-${p.slug}`}
                  transition={MORPH}
                  className="inline-block text-[34px] font-semibold leading-[1.05] tracking-[-0.035em] text-[#f5f5f7] sm:text-[44px]"
                >
                  {p.title}
                </motion.span>
              </h2>

              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(10px)" }}
                animate={
                  reduce
                    ? { opacity: 1, transition: { duration: 0.2 } }
                    : { opacity: 1, transform: "translateY(0px)", transition: { delay: 0.14, duration: 0.35, ease: EASE_OUT } }
                }
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#f5f5f7]/80">{p.summary}</p>

                {p.highlights.length > 0 && (
                  <div className="mt-9">
                    <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#8e8e93]">What I built</h3>
                    <ul className="mt-4 space-y-3">
                      {p.highlights.map((h) => (
                        <li key={h} className="relative pl-5 text-[16px] leading-relaxed text-[#f5f5f7]/85">
                          <span className="absolute left-0 top-[11px] h-1.5 w-1.5 rounded-full bg-white/35" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-9">
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#8e8e93]">Stack</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[13px] text-[#f5f5f7]/80">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {(p.demoUrl || p.githubUrl) && (
                  <div className="mt-10 flex flex-wrap gap-3">
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-12 items-center gap-1.5 rounded-full bg-[#f5f5f7] px-6 text-[15px] font-semibold text-[#050507] transition-transform duration-150 ease-out active:scale-[0.97] ${FOCUS}`}
                      >
                        Visit live site
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 text-[15px] font-semibold text-[#f5f5f7] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.1] ${FOCUS}`}
                      >
                        <Github size={16} aria-hidden="true" />
                        View code
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
