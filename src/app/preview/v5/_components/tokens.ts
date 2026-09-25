// Visual + motion tokens for the Spatial variant. One place to tune the feel.

export const ACCENT = "#8fb3ff"; // soft cyan-violet: availability dot, nav indicator, focus rings only

export const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fb3ff]";

/** Glass material — only for surfaces that float over the aurora (panel, top bar, sheet). */
export const GLASS =
  "v5-glass border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_24px_60px_-20px_rgba(0,0,0,0.6)]";

/** The card morph: physical, slight bounce, same path both ways. */
export const MORPH = { type: "spring", bounce: 0.15, duration: 0.45 } as const;

/** Nav indicator: critically damped. */
export const NAV_SPRING = { type: "spring", bounce: 0, duration: 0.35 } as const;

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "glance", label: "At a glance" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const;
