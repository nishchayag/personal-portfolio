import type { Metadata } from "next";
import { Combined } from "@/components/site/combined";

export const metadata: Metadata = {
  title: "Combined — redesign preview",
  description:
    "Redesign variant 6: the Keynote hero and flagship chapter, with project cards that morph open into a detail sheet.",
};

// The approved redesign now lives at "/" (see src/app/(site)/page.tsx). This
// route is kept as a thin re-export so v1–v5 stay comparable against it.
export default function PreviewV6Page() {
  return <Combined />;
}
