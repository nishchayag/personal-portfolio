"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
  extendToFooter = false,
}: {
  children: React.ReactNode;
  className?: string;
  extendToFooter?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const beams = [
    {
      initialX: Math.random() * 200 + 10,
      translateX: Math.random() * 200 + 10,
      duration: extendToFooter ? Math.random() * 8 + 10 : Math.random() * 4 + 5,
      repeatDelay: extendToFooter
        ? Math.random() * 4 + 2
        : Math.random() * 2 + 1,
      delay: Math.random() * 8,
      className: `h-${Math.floor(Math.random() * 16) + 4}`, // h-4 to h-20
    },
    {
      initialX: Math.random() * 200 + 220,
      translateX: Math.random() * 200 + 220,
      duration: extendToFooter ? Math.random() * 10 + 8 : Math.random() * 5 + 4,
      repeatDelay: extendToFooter
        ? Math.random() * 5 + 2
        : Math.random() * 3 + 1,
      delay: Math.random() * 6,
      className: `h-${Math.floor(Math.random() * 12) + 6}`, // h-6 to h-18
    },
    {
      initialX: Math.random() * 200 + 440,
      translateX: Math.random() * 200 + 440,
      duration: extendToFooter ? Math.random() * 12 + 9 : Math.random() * 6 + 3,
      repeatDelay: extendToFooter
        ? Math.random() * 4 + 3
        : Math.random() * 2 + 1,
      delay: Math.random() * 7,
      className: `h-${Math.floor(Math.random() * 14) + 5}`, // h-5 to h-19
    },
    {
      initialX: Math.random() * 200 + 660,
      translateX: Math.random() * 200 + 660,
      duration: extendToFooter ? Math.random() * 9 + 11 : Math.random() * 4 + 6,
      repeatDelay: extendToFooter
        ? Math.random() * 5 + 3
        : Math.random() * 3 + 2,
      delay: Math.random() * 5,
      className: `h-${Math.floor(Math.random() * 16) + 4}`, // h-4 to h-20
    },
    {
      initialX: Math.random() * 200 + 880,
      translateX: Math.random() * 200 + 880,
      duration: extendToFooter ? Math.random() * 11 + 8 : Math.random() * 5 + 4,
      repeatDelay: extendToFooter
        ? Math.random() * 6 + 2
        : Math.random() * 3 + 1,
      delay: Math.random() * 9,
      className: `h-${Math.floor(Math.random() * 18) + 3}`, // h-3 to h-21
    },
    {
      initialX: Math.random() * 200 + 1100,
      translateX: Math.random() * 200 + 1100,
      duration: extendToFooter ? Math.random() * 13 + 7 : Math.random() * 6 + 5,
      repeatDelay: extendToFooter
        ? Math.random() * 4 + 4
        : Math.random() * 2 + 2,
      delay: Math.random() * 6,
      className: `h-${Math.floor(Math.random() * 15) + 5}`, // h-5 to h-20
    },
    {
      initialX: Math.random() * 200 + 1320,
      translateX: Math.random() * 200 + 1320,
      duration: extendToFooter ? Math.random() * 10 + 9 : Math.random() * 4 + 6,
      repeatDelay: extendToFooter
        ? Math.random() * 5 + 3
        : Math.random() * 3 + 1,
      delay: Math.random() * 8,
      className: `h-${Math.floor(Math.random() * 17) + 4}`, // h-4 to h-21
    },
    {
      initialX: Math.random() * 200 + 1540,
      translateX: Math.random() * 200 + 1540,
      duration: extendToFooter ? Math.random() * 14 + 6 : Math.random() * 7 + 4,
      repeatDelay: extendToFooter
        ? Math.random() * 6 + 2
        : Math.random() * 3 + 1,
      delay: Math.random() * 7,
      className: `h-${Math.floor(Math.random() * 13) + 6}`, // h-6 to h-19
    },
    // Additional random beams
    {
      initialX: Math.random() * 150 + 50,
      translateX: Math.random() * 150 + 50,
      duration: extendToFooter ? Math.random() * 15 + 8 : Math.random() * 8 + 3,
      repeatDelay: extendToFooter
        ? Math.random() * 6 + 2
        : Math.random() * 4 + 1,
      delay: Math.random() * 10,
      className: `h-${Math.floor(Math.random() * 12) + 8}`, // h-8 to h-20
    },
    {
      initialX: Math.random() * 180 + 300,
      translateX: Math.random() * 180 + 300,
      duration: extendToFooter
        ? Math.random() * 12 + 10
        : Math.random() * 6 + 5,
      repeatDelay: extendToFooter
        ? Math.random() * 5 + 3
        : Math.random() * 3 + 1,
      delay: Math.random() * 5,
      className: `h-${Math.floor(Math.random() * 16) + 4}`, // h-4 to h-20
    },
    {
      initialX: Math.random() * 160 + 520,
      translateX: Math.random() * 160 + 520,
      duration: extendToFooter ? Math.random() * 11 + 9 : Math.random() * 5 + 4,
      repeatDelay: extendToFooter
        ? Math.random() * 4 + 3
        : Math.random() * 2 + 1,
      delay: Math.random() * 8,
      className: `h-${Math.floor(Math.random() * 14) + 5}`, // h-5 to h-19
    },
    {
      initialX: Math.random() * 190 + 740,
      translateX: Math.random() * 190 + 740,
      duration: extendToFooter ? Math.random() * 16 + 5 : Math.random() * 8 + 3,
      repeatDelay: extendToFooter
        ? Math.random() * 6 + 2
        : Math.random() * 3 + 1,
      delay: Math.random() * 6,
      className: `h-${Math.floor(Math.random() * 18) + 3}`, // h-3 to h-21
    },
    {
      initialX: Math.random() * 170 + 960,
      translateX: Math.random() * 170 + 960,
      duration: extendToFooter ? Math.random() * 13 + 8 : Math.random() * 6 + 5,
      repeatDelay: extendToFooter
        ? Math.random() * 5 + 3
        : Math.random() * 3 + 1,
      delay: Math.random() * 9,
      className: `h-${Math.floor(Math.random() * 15) + 6}`, // h-6 to h-21
    },
    {
      initialX: Math.random() * 200 + 1180,
      translateX: Math.random() * 200 + 1180,
      duration: extendToFooter ? Math.random() * 14 + 7 : Math.random() * 7 + 4,
      repeatDelay: extendToFooter
        ? Math.random() * 4 + 3
        : Math.random() * 3 + 2,
      delay: Math.random() * 7,
      className: `h-${Math.floor(Math.random() * 17) + 4}`, // h-4 to h-21
    },
    {
      initialX: Math.random() * 150 + 1400,
      translateX: Math.random() * 150 + 1400,
      duration: extendToFooter
        ? Math.random() * 10 + 10
        : Math.random() * 5 + 5,
      repeatDelay: extendToFooter
        ? Math.random() * 6 + 1
        : Math.random() * 4 + 1,
      delay: Math.random() * 8,
      className: `h-${Math.floor(Math.random() * 13) + 7}`, // h-7 to h-20
    },
  ];

  // Portal beams for full-page extension
  const PortalBeams = () => {
    if (!mounted || !extendToFooter) return null;

    return createPortal(
      <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
        {beams.map((beam, index) => (
          <ExtendedCollisionMechanism
            key={`extended-beam-${index}`}
            beamOptions={beam}
          />
        ))}
      </div>,
      document.body
    );
  };

  return (
    <>
      <PortalBeams />
      <div
        ref={parentRef}
        className={cn(
          "h-full bg-transparent relative flex items-center w-full justify-center overflow-hidden flex-wrap",
          // h-screen if you want bigger
          className
        )}
      >
        {!extendToFooter &&
          beams.map((beam) => (
            <CollisionMechanism
              key={beam.initialX + "beam-idx"}
              beamOptions={beam}
              containerRef={containerRef}
              parentRef={parentRef}
              extendToFooter={extendToFooter}
            />
          ))}

        {children}
        <div
          ref={containerRef}
          className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
          style={{
            boxShadow:
              "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
          }}
        ></div>
      </div>
    </>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    extendToFooter?: boolean;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(
  (
    { parentRef, containerRef, beamOptions = {}, extendToFooter = false },
    _ref
  ) => {
    const beamRef = useRef<HTMLDivElement>(null);
    const [collision, setCollision] = useState<{
      detected: boolean;
      coordinates: { x: number; y: number } | null;
    }>({
      detected: false,
      coordinates: null,
    });
    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
      const checkCollision = () => {
        if (
          beamRef.current &&
          containerRef.current &&
          parentRef.current &&
          !cycleCollisionDetected
        ) {
          const beamRect = beamRef.current.getBoundingClientRect();

          let targetRect;
          if (extendToFooter) {
            // Target the footer/contact section
            const footerElement =
              document.querySelector("#contact") ||
              document.querySelector("footer") ||
              document.querySelector("[data-footer]");
            if (footerElement) {
              targetRect = footerElement.getBoundingClientRect();
            } else {
              targetRect = containerRef.current.getBoundingClientRect();
            }
          } else {
            targetRect = containerRef.current.getBoundingClientRect();
          }

          const parentRect = parentRef.current.getBoundingClientRect();

          if (beamRect.bottom >= targetRect.top) {
            const relativeX =
              beamRect.left - parentRect.left + beamRect.width / 2;
            const relativeY = extendToFooter
              ? targetRect.top - parentRect.top
              : beamRect.bottom - parentRect.top;

            setCollision({
              detected: true,
              coordinates: {
                x: relativeX,
                y: relativeY,
              },
            });
            setCycleCollisionDetected(true);
          }
        }
      };

      const animationInterval = setInterval(checkCollision, 50);

      return () => clearInterval(animationInterval);
    }, [cycleCollisionDetected, containerRef, parentRef, extendToFooter]);
    useEffect(() => {
      if (collision.detected && collision.coordinates) {
        setTimeout(() => {
          setCollision({ detected: false, coordinates: null });
          setCycleCollisionDetected(false);
        }, 2000);

        setTimeout(() => {
          setBeamKey((prevKey) => prevKey + 1);
        }, 2000);
      }
    }, [collision]);

    return (
      <>
        <motion.div
          key={beamKey}
          ref={beamRef}
          animate="animate"
          initial={{
            translateY: beamOptions.initialY || "-400px",
            translateX: beamOptions.initialX || "0px",
            rotate: beamOptions.rotate || 0,
          }}
          variants={{
            animate: {
              translateY: extendToFooter
                ? "200vh"
                : beamOptions.translateY || "1800px",
              translateX: beamOptions.translateX || "0px",
              rotate: beamOptions.rotate || 0,
            },
          }}
          transition={{
            duration: beamOptions.duration || 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: beamOptions.delay || 0,
            repeatDelay: beamOptions.repeatDelay || 0,
          }}
          className={cn(
            "absolute m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
            extendToFooter ? "left-0 top-0 z-50" : "left-0 top-0",
            beamOptions.className
          )}
        />
      </>
    );
  }
);

CollisionMechanism.displayName = "CollisionMechanism";

// Extended collision mechanism for full-page beams (no explosions)
const ExtendedCollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ beamOptions = {} }, _ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [beamKey, setBeamKey] = useState(0);

  // Simple beam reset cycle without explosions
  useEffect(() => {
    const resetInterval = setTimeout(() => {
      setBeamKey((prevKey) => prevKey + 1);
    }, (beamOptions.duration || 8) * 1000 + (beamOptions.repeatDelay || 0) * 1000);

    return () => clearTimeout(resetInterval);
  }, [beamKey, beamOptions.duration, beamOptions.repeatDelay]);

  return (
    <motion.div
      key={beamKey}
      ref={beamRef}
      animate="animate"
      initial={{
        translateY: beamOptions.initialY || "-400px",
        translateX: beamOptions.initialX || "0px",
        rotate: beamOptions.rotate || 0,
      }}
      variants={{
        animate: {
          translateY: "200vh",
          translateX: beamOptions.translateX || "0px",
          rotate: beamOptions.rotate || 0,
        },
      }}
      transition={{
        duration: beamOptions.duration || 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        delay: 0,
        repeatDelay: beamOptions.repeatDelay || 0,
      }}
      className={cn(
        "absolute left-0 top-0 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent z-10",
        beamOptions.className
      )}
    />
  );
});

ExtendedCollisionMechanism.displayName = "ExtendedCollisionMechanism";
