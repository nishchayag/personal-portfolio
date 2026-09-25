import Image from "next/image";
import type { ReactNode } from "react";
import { hostOf } from "./ui";

/**
 * A quiet browser window: hairline border, a thin neutral chrome bar with the
 * site's host, 12px radius. Pale screenshots still read as objects because the
 * dark chrome and hairline give them an edge against the black page.
 * Pass `children` to replace the single screenshot (the flagship crossfade).
 */
export function BrowserFrame({
  src,
  alt = "",
  url,
  sizes = "100vw",
  priority = false,
  className = "",
  children,
}: {
  src?: string;
  alt?: string;
  url?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const host = hostOf(url);
  return (
    <div
      className={`overflow-hidden rounded-[12px] bg-[#1c1c1e] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_30px_80px_-20px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex h-7 items-center gap-3 border-b border-white/[0.06] px-3">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        {host ? (
          <span className="mx-auto max-w-[60%] truncate rounded-[5px] bg-white/[0.06] px-3 py-0.5 text-center text-[10px] leading-4 text-white/45">
            {host}
          </span>
        ) : null}
        <span className="w-[42px] shrink-0" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] bg-black">
        {children ??
          (src ? (
            <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
          ) : null)}
      </div>
    </div>
  );
}

/** A bare screenshot (no chrome) for the morphing cards and the sheet. */
export function Screen({ src, sizes, priority }: { src: string; sizes: string; priority?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0a0d]">
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className="select-none object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
    </div>
  );
}
