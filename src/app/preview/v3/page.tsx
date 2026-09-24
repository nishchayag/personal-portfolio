import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PageShell } from "./components/page-shell";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Split — redesign preview",
  description:
    "Redesign variant 3: a sticky intro column paired with scrolling case studies, experience and services.",
};

export default function PreviewV3Page() {
  return (
    <div className={`${inter.className} min-h-dvh bg-[#0b0d12] text-white`}>
      <PageShell />
    </div>
  );
}
