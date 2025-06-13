"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";

interface WordSegment {
  text: string;
  className?: string;
}

export const TypewriterWithBreaks = ({
  words,
  className,
  cursorClassName,
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

  const animateSegments = segments.map((seg) => ({
    ...seg,
    chars: seg.text === "\n" ? ["\n"] : seg.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.3, delay: stagger(0.05), ease: "easeInOut" }
      );
    }
  }, [isInView, animate]);

  return (
    <div className={cn(" lg:text-7xl  ", className)}>
      <motion.div ref={scope} className="inline">
        {animateSegments.map((seg, i) => (
          <div
            key={`seg-${i}`}
            className={seg.text === "\n" ? "block" : "inline-block"}
          >
            {seg.chars.map((char, ci) => {
              if (char === "\n") return null;

              const displayChar = char === " " ? "\u00A0" : char;

              return (
                <motion.span
                  initial={{}}
                  key={`char-${i}-${ci}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    seg.className
                  )}
                >
                  {displayChar}
                </motion.span>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
