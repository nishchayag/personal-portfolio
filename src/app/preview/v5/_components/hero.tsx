"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { featuredProjects, profile } from "@/content/profile";
import { Screen } from "./screen";
import { FOCUS } from "./tokens";

/* ------------------------------------------------------------------ */
/* Hero copy                                                           */
/* ------------------------------------------------------------------ */

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // The copy recedes (fades, shrinks, softens) as the windows start to move.
  const opacity = useTransform(scrollY, [0, 380], [1, 0]);
  const scale = useTransform(scrollY, [0, 380], [1, 0.94]);
  const blur = useTransform(scrollY, [0, 380], [0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const transform = useTransform(scale, (s) => `scale(${s})`);

  return (
    <section
      id="v5-hero"
      aria-labelledby="v5-name"
      className="pointer-events-none relative z-40 flex h-[100svh] min-h-[640px] items-center justify-center px-4 sm:px-6"
    >
      <motion.div
        className="pointer-events-auto flex max-w-5xl flex-col items-center text-center"
        style={reduce ? undefined : { opacity, filter, transform }}
      >
        <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-3 pr-4 text-[13px] font-medium tracking-[0.005em] text-[#f5f5f7]/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="v5-pulse absolute inset-0 rounded-full bg-[#8fb3ff]" />
            <span className="relative h-2 w-2 rounded-full bg-[#8fb3ff] shadow-[0_0_10px_rgba(143,179,255,0.8)]" />
          </span>
          {profile.availability}
        </p>

        <h1
          id="v5-name"
          className="mt-7 text-[clamp(3.25rem,9.2vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-[#f5f5f7] [text-wrap:balance]"
        >
          {profile.name}
        </h1>

        <p className="mt-4 text-[clamp(1.05rem,1.6vw,1.3rem)] font-medium tracking-[-0.01em] text-[#f5f5f7]/90">
          {profile.role} · {profile.location}
        </p>
        <p className="mt-3 max-w-[34rem] text-[15px] leading-relaxed text-[#8e8e93] [text-wrap:pretty] sm:text-[17px]">
          {profile.tagline}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#work"
            className={`inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f5f5f7] px-6 text-[15px] font-semibold text-[#050507] transition-transform duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white ${FOCUS}`}
          >
            See my work
            <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className={`inline-flex min-h-12 items-center rounded-full border border-white/15 bg-white/[0.06] px-6 text-[15px] font-semibold text-[#f5f5f7] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.1] ${FOCUS}`}
          >
            Get in touch
          </a>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-[11px] sm:block font-medium uppercase tracking-[0.18em] text-[#8e8e93]/80"
        style={reduce ? undefined : { opacity }}
      >
        Scroll
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Flying windows                                                      */
/* ------------------------------------------------------------------ */

// Where each window floats in the hero: centre (fraction of hero box), width (fraction of
// viewport width) and depth (1 = nearest). Cycles if there are more projects than slots.
const DESKTOP_SPOTS = [
  { x: 0.155, y: 0.2, w: 0.2, d: 0.95 },
  { x: 0.855, y: 0.22, w: 0.17, d: 0.55 },
  { x: 0.13, y: 0.82, w: 0.16, d: 0.4 },
  { x: 0.85, y: 0.8, w: 0.21, d: 0.8 },
  { x: 0.5, y: 0.08, w: 0.11, d: 0.2 },
  { x: 0.5, y: 0.94, w: 0.11, d: 0.25 },
];
const MOBILE_SPOTS = [
  { x: 0.3, y: 0.155, w: 0.46, d: 0.9 },
  { x: 0.82, y: 0.2, w: 0.34, d: 0.5 },
  { x: 0.2, y: 0.86, w: 0.34, d: 0.45 },
  { x: 0.74, y: 0.9, w: 0.44, d: 0.8 },
  { x: 0.5, y: 0.06, w: 0.2, d: 0.2 },
  { x: 0.5, y: 0.96, w: 0.2, d: 0.2 },
];

type Geo = {
  slug: string;
  src: string;
  left: number; // landing slot (card media) in layer coordinates
  top: number;
  w: number;
  h: number;
  hx: number; // floating position in the hero
  hy: number;
  hw: number;
  depth: number;
  tiltX: number; // degrees, faces the window toward the centre of the scene
  tiltY: number;
  flies: boolean; // docks into its card, or recedes into depth if its card lands off-screen
};

const flyers = featuredProjects.filter((p): p is typeof p & { image: string } => Boolean(p.image));

export function FlightLayer({
  progress,
  flying,
}: {
  progress: MotionValue<number>;
  flying: MotionValue<ReadonlySet<string>>;
}) {
  const reduce = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const [geos, setGeos] = useState<Geo[]>([]);
  const distance = useRef(1);
  const reduceRef = useRef(reduce);
  useEffect(() => {
    reduceRef.current = reduce;
  }, [reduce]);
  const { scrollY } = useScroll();

  const measure = useCallback(() => {
    const layer = layerRef.current;
    const hero = document.getElementById("v5-hero");
    if (!layer || !hero) return;
    const origin = layer.getBoundingClientRect();
    const h = hero.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 640;
    const spots = mobile ? MOBILE_SPOTS : DESKTOP_SPOTS;
    // The formation completes when the first slot reaches this offset from the viewport top.
    const landAt = mobile ? 88 : 196;

    const next: Geo[] = [];
    flyers.forEach((p, i) => {
      const slot = document.querySelector<HTMLElement>(`[data-v5-slot="${p.slug}"]`);
      if (!slot) return;
      const r = slot.getBoundingClientRect();
      const spot = spots[i % spots.length];
      next.push({
        slug: p.slug,
        src: p.image,
        left: r.left - origin.left,
        top: r.top - origin.top,
        w: r.width,
        h: r.height,
        hx: h.left - origin.left + spot.x * h.width,
        hy: h.top - origin.top + spot.y * h.height,
        hw: Math.min(spot.w * vw, 420),
        depth: spot.d,
        tiltY: -(spot.x - 0.5) * 2 * 16,
        tiltX: (spot.y - 0.5) * 2 * 7,
        flies: false,
      });
    });

    const dist = next.length ? Math.max(1, next[0].top - landAt) : 1;
    // Only windows whose card is on screen when the formation completes make the trip.
    for (const g of next) g.flies = g.top - dist < vh - 48 && (!mobile || g === next[0]);
    distance.current = dist;
    setGeos(next);
    flying.set(new Set(next.filter((g) => g.flies).map((g) => g.slug)));
    progress.set(
      next.length && !reduceRef.current ? Math.min(1, Math.max(0, window.scrollY / dist)) : 1,
    );
  }, [progress, flying]);

  useLayoutEffect(() => {
    // ResizeObserver fires once on observe, which gives us the initial measurement.
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (reduce) return;
    progress.set(Math.min(1, Math.max(0, y / distance.current)));
  });

  // Reduced motion: no flight — windows stay put in the hero, slots show their screenshots.
  useEffect(() => {
    if (reduce) progress.set(1);
  }, [reduce, progress]);

  // Pointer parallax (desktop pointers only).
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 70, damping: 20, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 70, damping: 20, mass: 0.6 });
  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, rawX, rawY]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-30 h-0 w-full"
    >
      {geos.map((g, i) => (
        <FlyingWindow
          key={g.slug}
          geo={g}
          index={i}
          progress={progress}
          px={px}
          py={py}
          still={Boolean(reduce)}
        />
      ))}
    </div>
  );
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function FlyingWindow({
  geo: g,
  index,
  progress,
  px,
  py,
  still,
}: {
  geo: Geo;
  index: number;
  progress: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
  still: boolean;
}) {
  const s0 = g.hw / g.w;
  // In reduced motion the windows are frozen at their hero spot (t = 0).
  const t = () => {
    const p = progress.get(); // always read, so useTransform keeps its subscription
    return still ? 0 : p;
  };
  // Flyers travel to their slot; the rest stay in the scene and recede as it scrolls away.
  const travel = (p: number) => (g.flies ? p : 0);
  const recede = (p: number) => (g.flies ? 0 : clamp01(p / 0.45));
  const scaleAt = (p: number) => (g.flies ? s0 + (1 - s0) * p : s0 * (1 - 0.12 * recede(p)));

  const transform = useTransform(() => {
    const p = t();
    const k = travel(p);
    const mx = px.get();
    const my = py.get();
    const amp = still ? 0 : 12 * g.depth * (1 - k);
    const tx = (g.hx - (g.left + g.w / 2)) * (1 - k) + mx * amp;
    const ty = (g.hy - (g.top + g.h / 2)) * (1 - k) + my * amp - recede(p) * 60 * (1 - g.depth);
    const flat = 1 - k;
    const ry = (g.tiltY + (still ? 0 : mx * 4)) * flat;
    const rx = (g.tiltX - (still ? 0 : my * 3)) * flat;
    return `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${scaleAt(p).toFixed(4)}) perspective(${Math.round(g.w * 2.2)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  });

  const opacity = useTransform(() => {
    const p = t();
    const base = 0.42 + 0.58 * g.depth;
    if (!g.flies) return base * (1 - recede(p));
    const rise = base + (1 - base) * clamp01(p / 0.5);
    const dock = p < 0.94 ? 1 : Math.max(0, 1 - (p - 0.94) / 0.06);
    return rise * dock;
  });

  const visibility = useTransform(() => {
    const p = t();
    return (g.flies ? p >= 1 : recede(p) >= 1) ? "hidden" : "visible";
  });

  // Depth of field: far windows are softer; flyers sharpen as they dock, the rest soften away.
  // Values are divided by the current scale so the *visual* amount stays as designed.
  const filter = useTransform(() => {
    const p = t();
    const b = g.flies
      ? (1 - g.depth) * 3 * Math.max(0, 1 - p / 0.6)
      : (1 - g.depth) * 3 + recede(p) * 6;
    return b > 0.05 ? `blur(${(b / scaleAt(p)).toFixed(2)}px)` : "none";
  });

  const visualRadius = (p: number) => 22 + (18 - 22) * travel(p);
  const radius = useTransform(() => {
    const p = t();
    return `${(visualRadius(p) / scaleAt(p)).toFixed(2)}px`;
  });

  // Glass bezel + shadow that belong to the floating state and melt away on landing.
  const bezelOpacity = useTransform(() => Math.max(0, 1 - travel(t()) / 0.8));
  const bezelInset = useTransform(() => `${(-7 / scaleAt(t())).toFixed(2)}px`);
  const bezelRadius = useTransform(() => {
    const p = t();
    return `${((visualRadius(p) + 7) / scaleAt(p)).toFixed(2)}px`;
  });
  const bezelBorder = useTransform(() => `${(1 / scaleAt(t())).toFixed(3)}px solid rgba(255,255,255,0.14)`);
  const bezelShadow = useTransform(() => {
    const k = 1 / scaleAt(t());
    const d = 0.5 + g.depth * 0.5;
    return `0 ${(30 * d * k).toFixed(1)}px ${(80 * d * k).toFixed(1)}px ${(-10 * k).toFixed(1)}px rgba(0,0,0,0.7), inset 0 ${(1 * k).toFixed(2)}px 0 rgba(255,255,255,0.12)`;
  });

  return (
    <motion.div
      className="absolute origin-center will-change-transform"
      style={{
        left: g.left,
        top: g.top,
        width: g.w,
        height: g.h,
        transform,
        opacity,
        visibility,
        filter,
        zIndex: Math.round(g.depth * 10) + index,
      }}
    >
      <motion.div
        className="absolute bg-white/[0.045]"
        style={{
          inset: bezelInset,
          borderRadius: bezelRadius,
          border: bezelBorder,
          boxShadow: bezelShadow,
          opacity: bezelOpacity,
        }}
      />
      <motion.div className="absolute inset-0 overflow-hidden" style={{ borderRadius: radius }}>
        <Screen src={g.src} sizes="(min-width: 1024px) 900px, 100vw" priority={index < 2} />
      </motion.div>
    </motion.div>
  );
}
