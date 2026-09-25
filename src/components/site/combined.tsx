"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig } from "motion/react";
import { featuredProjects } from "@/content/profile";
import { Contact } from "./contact";
import { Flagship } from "./flagship";
import { Glance } from "./glance";
import { Hero } from "./hero";
import { useMediaQuery } from "./hooks";
import { LocalNav } from "./local-nav";
import { MoreWork } from "./more-work";
import { Services } from "./services";
import { ProjectSheet } from "./sheet";
import { ThemeSync } from "./theme";
import { WorkCards } from "./work-cards";

const flagship = featuredProjects.find((p) => p.flagship) ?? null;
const cardProjects = featuredProjects.filter((p) => p !== flagship);

export function Combined() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [liftedSlug, setLiftedSlug] = useState<string | null>(null);
  const cards = useRef(new Map<string, HTMLButtonElement>());
  const liftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRef = useRef<string | null>(null);
  const bottomSheet = useMediaQuery("(max-width: 767px)");

  const registerCard = useCallback((slug: string, el: HTMLButtonElement | null) => {
    if (el) cards.current.set(slug, el);
    else cards.current.delete(slug);
  }, []);

  const onOpen = useCallback((slug: string) => {
    if (liftTimer.current) clearTimeout(liftTimer.current);
    setLiftedSlug(null);
    openRef.current = slug;
    setOpenSlug(slug);
  }, []);

  const onClose = useCallback(() => {
    const current = openRef.current;
    if (!current) return;
    openRef.current = null;
    // Lift the card above the fading scrim while it morphs back into place.
    setLiftedSlug(current);
    setOpenSlug(null);
    if (liftTimer.current) clearTimeout(liftTimer.current);
    liftTimer.current = setTimeout(() => setLiftedSlug(null), 700);
    // The page stops being inert on the next commit; focus the card after it.
    const card = cards.current.get(current);
    requestAnimationFrame(() => card?.focus({ preventScroll: true }));
  }, []);

  // Stable scrollbar gutter so locking scroll never reflows the cards mid-morph.
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollbarGutter;
    html.style.scrollbarGutter = "stable";
    return () => {
      html.style.scrollbarGutter = prev;
    };
  }, []);

  useEffect(() => {
    if (!openSlug) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [openSlug]);

  useEffect(
    () => () => {
      if (liftTimer.current) clearTimeout(liftTimer.current);
    },
    [],
  );

  const open = cardProjects.find((p) => p.slug === openSlug) ?? null;

  return (
    <MotionConfig reducedMotion="user">
      <ThemeSync />
      <LayoutGroup id="site">
        <div id="top" inert={open ? true : undefined}>
          <Hero />
          <LocalNav />
          <main>
            <div id="work" className="scroll-mt-[52px]">
              {flagship ? <Flagship project={flagship} /> : null}
              <WorkCards
                projects={cardProjects}
                openSlug={openSlug}
                liftedSlug={liftedSlug}
                onOpen={onOpen}
                registerCard={registerCard}
              />
              <MoreWork />
            </div>
            <Glance />
            <Services />
            <Contact />
          </main>
        </div>

        <AnimatePresence>
          {open ? <ProjectSheet key={open.slug} project={open} onClose={onClose} bottomSheet={bottomSheet} /> : null}
        </AnimatePresence>
      </LayoutGroup>
    </MotionConfig>
  );
}
