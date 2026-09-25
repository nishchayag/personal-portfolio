import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Combined } from "./_components/combined";
import "./v6.css";

// Inter is only the fallback: Apple devices render SF Pro via -apple-system.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Combined — redesign preview",
  description:
    "Redesign variant 6: the Keynote hero and flagship chapter, with project cards that morph open into a detail sheet.",
};

export default function PreviewV6Page() {
  return (
    <div className={`${inter.variable} v6-root`}>
      <Combined />
    </div>
  );
}
