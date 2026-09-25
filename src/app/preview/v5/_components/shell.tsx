"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, useMotionValue } from "motion/react";
import { featuredProjects, profile } from "@/content/profile";
import { Aurora } from "./aurora";
import { OrnamentPanel, TopBar } from "./chrome";
import { FlightContext } from "./flight";
import { FlightLayer, Hero } from "./hero";
import { useMediaQuery } from "./hooks";
import { ContactSection, ExperienceSection, GlanceSection, ServicesSection } from "./sections";
import { ProjectSheet } from "./sheet";
import { WorkSection } from "./work";

export function SpatialShell() {
  // Starts at 1 so cards are fully visible before hydration / without JS.
  const progress = useMotionValue(1);
  const flying = useMotionValue<ReadonlySet<string>>(new Set());
  const [flight] = useState(() => ({ progress, flying }));
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [liftedSlug, setLiftedSlug] = useState<string | null>(null);
  const cards = useRef(new Map<string, HTMLButtonElement>());
  const liftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottomSheet = useMediaQuery("(max-width: 767px)");

  const registerCard = useCallback((slug: string, el: HTMLButtonElement | null) => {
    if (el) cards.current.set(slug, el);
    else cards.current.delete(slug);
  }, []);

  const onOpen = useCallback((slug: string) => {
    if (liftTimer.current) clearTimeout(liftTimer.current);
    setLiftedSlug(null);
    setOpenSlug(slug);
  }, []);

  const openRef = useRef<string | null>(null);
  useEffect(() => {
    openRef.current = openSlug;
  }, [openSlug]);

  const onClose = useCallback(() => {
    const current = openRef.current;
    if (!current) return;
    // Lift the card above the fading scrim while it morphs back into place.
    setLiftedSlug(current);
    setOpenSlug(null);
    if (liftTimer.current) clearTimeout(liftTimer.current);
    liftTimer.current = setTimeout(() => setLiftedSlug(null), 700);
    const card = cards.current.get(current);
    requestAnimationFrame(() => card?.focus({ preventScroll: true }));
  }, []);

  // Keep the scrollbar gutter stable so locking scroll never reflows the bento mid-morph.
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

  useEffect(() => () => {
    if (liftTimer.current) clearTimeout(liftTimer.current);
  }, []);

  const open = featuredProjects.find((p) => p.slug === openSlug) ?? null;

  return (
    <MotionConfig reducedMotion="user">
      <FlightContext.Provider value={flight}>
        <LayoutGroup id="v5">
          <Aurora />
          <TopBar />

          <div inert={open ? true : undefined}>
            <Hero />
            <FlightLayer progress={progress} flying={flying} />

            <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:grid lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-12 lg:px-8 xl:grid-cols-[288px_minmax(0,1fr)] xl:gap-16">
              <aside aria-label="Profile" className="hidden lg:block">
                <div className="sticky top-6 z-[35] h-[calc(100dvh-3rem)] max-h-[780px]">
                  <OrnamentPanel />
                </div>
              </aside>

              <main className="flex min-w-0 flex-col gap-28 pb-20 sm:gap-36">
                <WorkSection
                  openSlug={openSlug}
                  liftedSlug={liftedSlug}
                  onOpen={onOpen}
                  registerCard={registerCard}
                />
                <ExperienceSection />
                <GlanceSection />
                <ServicesSection />
                <ContactSection />
              </main>
            </div>

            <footer className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 border-t border-white/[0.06] px-4 py-8 text-[13px] text-[#8e8e93] sm:px-6 lg:px-8">
              <p>
                © {new Date().getFullYear()} {profile.name}
              </p>
              <p>{profile.location}</p>
            </footer>
          </div>

          <AnimatePresence>
            {open && <ProjectSheet key={open.slug} project={open} onClose={onClose} bottomSheet={bottomSheet} />}
          </AnimatePresence>
        </LayoutGroup>
      </FlightContext.Provider>
    </MotionConfig>
  );
}
