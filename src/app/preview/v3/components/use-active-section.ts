"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is "active" using an IntersectionObserver band
 * around the vertical center of the viewport, so the nav highlights whatever
 * section the reader is actually looking at rather than whatever is merely
 * on screen.
 */
export function useActiveSection(ids: string[], initialId: string) {
  const [activeId, setActiveId] = useState(initialId);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return activeId;
}
