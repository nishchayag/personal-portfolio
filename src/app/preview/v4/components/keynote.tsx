"use client";

import { MotionConfig } from "motion/react";
import { Contact } from "./contact";
import { Glance } from "./glance";
import { Hero } from "./hero";
import { LocalNav } from "./local-nav";
import { MoreWork } from "./more-work";
import { Services } from "./services";
import { WorkChapters } from "./work-chapters";

export function Keynote() {
  return (
    <MotionConfig reducedMotion="user">
      <div id="top">
        <Hero />
        <LocalNav />
        <main>
          <WorkChapters />
          <Glance />
          <Services />
          <MoreWork />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}
