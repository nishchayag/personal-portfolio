"use client";

import { MotionConfig } from "motion/react";
import { LeftColumn } from "./left-column";
import { RightColumn } from "./right-column";

export function PageShell() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex max-w-6xl flex-col px-5 sm:px-8 lg:grid lg:grid-cols-[340px_1fr] lg:gap-16 lg:px-10 xl:grid-cols-[380px_1fr]">
        <header className="lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto">
          <LeftColumn />
        </header>
        <main>
          <RightColumn />
        </main>
      </div>
    </MotionConfig>
  );
}
