import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Combined } from "./_components/combined";
import { THEME_SCRIPT, V6_ROOT_ID } from "./_components/theme-script";
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
    // data-theme is a server default; the inline script below corrects it before first paint.
    <div id={V6_ROOT_ID} data-theme="dark" suppressHydrationWarning className={`${inter.variable} v6-root`}>
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      <Combined />
    </div>
  );
}
