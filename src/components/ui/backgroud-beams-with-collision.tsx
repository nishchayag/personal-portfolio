"use client";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import React, { useMemo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type Beam = {
  leftPercent: number;
  heightPx: number;
  durationS: number;
  delayS: number;
};

const DESKTOP_BEAM_COUNT = 15;
const MOBILE_BEAM_COUNT = 6;

const BEAM_KEYFRAMES = `
@keyframes beam-fall {
  from {
    transform: translate3d(0, -400px, 0);
  }
  to {
    transform: translate3d(0, 110vh, 0);
  }
}
`;

function generateBeams(count: number): Beam[] {
  return Array.from({ length: count }, () => ({
    leftPercent: Math.random() * 100,
    heightPx: Math.floor(Math.random() * 160) + 40, // 40px - 200px
    durationS: Math.random() * 8 + 8, // 8s - 16s
    delayS: Math.random() * 10, // 0s - 10s
  }));
}

const subscribeNoop = () => () => {};

/** True only once hydrated on the client; false during SSR and the initial
 * client render, so the beams (which need `Math.random` + `document`) never
 * run during render and never mismatch between server and client. */
function useIsClient() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  extendToFooter?: boolean;
}) => {
  const isClient = useIsClient();
  const prefersReducedMotion = useReducedMotion();
  const showBeams = isClient && !prefersReducedMotion;

  const beams = useMemo(
    () => (showBeams ? generateBeams(DESKTOP_BEAM_COUNT) : null),
    [showBeams]
  );

  return (
    <>
      {isClient &&
        beams &&
        createPortal(
          <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
            <style>{BEAM_KEYFRAMES}</style>
            {beams.map((beam, index) => (
              <div
                key={index}
                className={cn(
                  "absolute top-0 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
                  index >= MOBILE_BEAM_COUNT && "hidden md:block"
                )}
                style={{
                  left: `${beam.leftPercent}%`,
                  height: `${beam.heightPx}px`,
                  animation: `beam-fall ${beam.durationS}s linear ${beam.delayS}s infinite`,
                  willChange: "transform",
                }}
              />
            ))}
          </div>,
          document.body
        )}
      <div
        className={cn(
          "h-full bg-transparent relative flex items-center w-full justify-center overflow-hidden flex-wrap",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
