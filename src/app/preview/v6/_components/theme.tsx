"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { THEME_KEY, V6_ROOT_ID } from "./theme-script";
import { FOCUS } from "./ui";

type Theme = "light" | "dark";

function root() {
  return document.getElementById(V6_ROOT_ID);
}

function readStored(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Sets data-theme on the wrapper. With `animate`, the page crossfades through
 * a view transition (250ms, see v6.css); otherwise it switches instantly.
 */
function applyTheme(theme: Theme, animate: boolean) {
  const el = root();
  if (!el || el.getAttribute("data-theme") === theme) return;
  const run = () => el.setAttribute("data-theme", theme);
  const canTransition =
    animate &&
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (canTransition) document.startViewTransition(run);
  else run();
}

// The DOM attribute is the source of truth; components subscribe to it.
function subscribe(onChange: () => void) {
  const el = root();
  if (!el) return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return root()?.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function useTheme() {
  // Server snapshot matches the server-rendered default; the real value lands right after hydration.
  return useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
}

/** With no stored choice, follow the OS live. Mount once. */
export function ThemeSync() {
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStored() === null) applyTheme(systemTheme(), true);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return null;
}

/**
 * 44x44 icon button. The glyph swap is pure CSS keyed off data-theme
 * (.v6-theme-icon in v6.css), so the first paint is already correct.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage can be blocked; the switch still applies for this visit.
    }
    applyTheme(next, true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      aria-pressed={theme === "dark"}
      data-v6-theme-toggle=""
      className={`relative inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[var(--fg)] transition-[transform,background-color] duration-150 ease-out active:scale-[0.94] [@media(hover:hover)]:hover:bg-[rgb(var(--ink)/0.08)] ${FOCUS} ${className}`}
    >
      <span className="relative size-[18px]" aria-hidden="true">
        <Sun data-icon="sun" className="v6-theme-icon size-[18px]" strokeWidth={1.75} />
        <Moon data-icon="moon" className="v6-theme-icon size-[18px]" strokeWidth={1.75} />
      </span>
    </button>
  );
}
