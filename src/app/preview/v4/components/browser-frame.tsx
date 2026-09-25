import Image from "next/image";
import { hostOf } from "./ui";

/**
 * A quiet browser window: hairline border, a thin neutral chrome bar with the
 * site's host, 12px radius. Pale screenshots still read as objects because the
 * dark chrome and hairline give them an edge against the black page.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  url?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
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
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
