import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter } from "next/font/google";
import { MotionRoot } from "./_components/MotionRoot";
import { TopBar } from "./_components/TopBar";
import { Hero } from "./_components/Hero";
import { SelectedWork } from "./_components/SelectedWork";
import { Experience } from "./_components/Experience";
import { Services } from "./_components/Services";
import { Contact } from "./_components/Contact";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Editorial — Nishchay Agarwal",
};

// One accent colour: a warm, muted terracotta against near-black. Kept out of
// the blue -> purple gradient territory on purpose.
const accentStyle = { "--accent": "#c9744f" } as CSSProperties;

export default function PreviewV1() {
  return (
    <div
      className={`${inter.className} min-h-screen bg-[#0a0a0a] text-[#f2f0ec] selection:bg-[var(--accent)] selection:text-[#0a0a0a]`}
      style={accentStyle}
    >
      <MotionRoot>
        <TopBar />
        <main>
          <Hero />
          <SelectedWork />
          <Experience />
          <Services />
          <Contact />
        </main>
      </MotionRoot>
    </div>
  );
}
