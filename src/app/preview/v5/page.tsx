import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpatialShell } from "./_components/shell";
import "./v5.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Spatial — redesign preview",
  description:
    "Redesign variant 5: depth, glass materials and project cards that morph open.",
};

export default function PreviewV5Page() {
  return (
    <div className={`${inter.variable} v5-root`}>
      <SpatialShell />
    </div>
  );
}
