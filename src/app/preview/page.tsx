import Link from "next/link";

const variants = [
  { href: "/preview/v1", name: "Editorial", note: "Quiet, typographic, one accent colour" },
  { href: "/preview/v2", name: "Bento", note: "Everything at a glance in a tile grid" },
  { href: "/preview/v3", name: "Split", note: "Sticky intro column, scrolling case studies" },
  { href: "/preview/v4", name: "Keynote", note: "Apple product-page chapters, sticky screenshots" },
  { href: "/preview/v5", name: "Spatial", note: "Depth, glass and cards that morph open" },
  { href: "/preview/v6", name: "Combined", note: "Keynote hero + SignalHQ flagship + morphing cards" },
  { href: "/", name: "Current site", note: "For comparison" },
];

export default function PreviewIndex() {
  return (
    <main className="mx-auto max-w-xl px-4 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Redesign variants</h1>
      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {variants.map((v) => (
          <li key={v.href}>
            <Link
              href={v.href}
              className="flex min-h-11 items-baseline justify-between gap-4 py-4 transition-colors duration-150 hover:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="font-medium">{v.name}</span>
              <span className="text-sm text-white/60">{v.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
