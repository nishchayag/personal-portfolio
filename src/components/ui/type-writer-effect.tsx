"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  stagger,
  useAnimate,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect } from "react";

interface WordSegment {
  text: string;
  className?: string;
}

export const TypewriterWithBreaks = ({
  words,
  className,
}: {
  words: WordSegment[];
  className?: string;
  cursorClassName?: string;
}) => {
  // Create segments splitting on \n
  const segments = words.flatMap((w) =>
    w.text.split("\n").flatMap((line, idx, arr) =>
      idx < arr.length - 1
        ? [
            { text: line, className: w.className },
            { text: "\n", className: "" },
          ]
        : [{ text: line, className: w.className }]
    )
  );

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      // Reduced motion: reveal immediately, don't wait on the (async)
      // IntersectionObserver-driven isInView — the hero is above the fold
      // anyway, so there's no meaningful "in view" gate to wait for here.
      animate(".tw-char", { opacity: 1 }, { duration: 0 });
      return;
    }

    if (!isInView) return;

    animate(
      ".tw-char",
      { opacity: 1 },
      { duration: 0.3, delay: stagger(0.05), ease: "easeInOut" }
    );
  }, [isInView, animate, shouldReduceMotion]);

  return (
    <h1
      className={cn(" lg:text-7xl  ", className)}
      aria-label="Hi, I am Nishchay Agarwal, a full-stack web developer"
    >
      <motion.div ref={scope} className="inline">
        {segments.map((seg, i) => {
          if (seg.text === "\n") {
            return <div key={`seg-${i}`} className="block" />;
          }

          const words2 = seg.text.split(" ");

          return (
            <div key={`seg-${i}`} className="inline-block">
              {words2.flatMap((word, wi) => {
                const wordSpan = (
                  <span
                    key={`word-${i}-${wi}`}
                    className="inline-block whitespace-nowrap"
                  >
                    {word.split("").map((char, ci) => (
                      <motion.span
                        aria-hidden="true"
                        key={`char-${i}-${wi}-${ci}`}
                        className={cn(
                          "tw-char dark:text-white text-black inline-block opacity-0",
                          seg.className
                        )}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                );

                // Keep the inter-word space out of the nowrap span so lines
                // can still wrap between words, just not mid-word.
                return wi < words2.length - 1 ? [wordSpan, " "] : [wordSpan];
              })}
            </div>
          );
        })}
      </motion.div>
    </h1>
  );
};
