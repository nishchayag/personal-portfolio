import dynamic from "next/dynamic";

// Lazy load heavy components for better performance
export const LazyProjects = dynamic(() => import("@/components/Projects"), {
  ssr: true,
});

export const LazySkillsSection = dynamic(
  () => import("@/components/SkillsSection"),
  {
    ssr: true,
  }
);

export const LazyAbout = dynamic(() => import("@/components/About"), {
  ssr: true,
});

export const LazyFloatingDock = dynamic(
  () =>
    import("@/components/ui/floating-dock").then((mod) => ({
      default: mod.FloatingDock,
    })),
  {
    ssr: false, // Dock is interactive, no need for SSR
  }
);
