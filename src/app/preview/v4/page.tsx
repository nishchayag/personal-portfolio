import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Keynote } from "./components/keynote";

// Inter is only the fallback: Apple devices render SF Pro via -apple-system.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Keynote — redesign preview",
  description:
    "Redesign variant 4: an Apple product-page style portfolio told in chapters, with sticky screenshots and a scroll-linked hero.",
};

export default function PreviewV4Page() {
  return (
    <div
      className={`${inter.variable} min-h-dvh overflow-x-clip bg-black text-[#f5f5f7] antialiased`}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", var(--font-inter), system-ui, sans-serif',
      }}
    >
      <Keynote />
    </div>
  );
}
