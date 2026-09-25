import Image from "next/image";

/**
 * A screenshot in a dark bezel. The inner ring + bottom falloff keep pale screenshots
 * (Doxiqo is almost white) from glaring against the near-black page.
 */
export function Screen({
  src,
  sizes,
  priority,
  className = "",
  zoomOnHover = false,
}: {
  src: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  zoomOnHover?: boolean;
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#0a0a0d] ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className={`object-cover object-top select-none ${
          zoomOnHover
            ? "transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.025]"
            : ""
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgba(5,5,7,0.28))]" />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
    </div>
  );
}
