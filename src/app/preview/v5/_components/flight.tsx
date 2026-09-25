"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "motion/react";

/**
 * progress: 0 → 1 as the hero windows fly from their floating positions into the Work bento.
 * flying:   slugs whose window actually docks into its card (the rest recede into depth);
 *           those cards reveal their screenshot the moment the window lands.
 */
export type Flight = { progress: MotionValue<number>; flying: MotionValue<ReadonlySet<string>> };

export const FlightContext = createContext<Flight | null>(null);

export function useFlight() {
  return useContext(FlightContext);
}
