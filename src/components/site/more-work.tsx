import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/profile";
import { FOCUS, GREY, Reveal, SectionHeading } from "./ui";

/** A compact, quiet list: one row per project, each row a single link. */
export function MoreWork({ projects: otherProjects }: { projects: Project[] }) {
  if (otherProjects.length === 0) return null;

  return (
    <section aria-labelledby="more-heading" className="px-4 pt-32 sm:px-6 lg:pt-44">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
        <Reveal className="self-start lg:sticky lg:top-[92px]">
          <SectionHeading
            id="more-heading"
            className="!text-[clamp(2rem,3.6vw,3rem)]"
            lead="Also built."
            rest="Smaller products and browser experiments."
          />
        </Reveal>

        <Reveal>
          <ul className="overflow-hidden rounded-[28px] bg-[var(--tile)] shadow-[inset_0_0_0_1px_var(--tile-ring)]">
            {otherProjects.map((p, i) => {
              const href = p.demoUrl ?? p.githubUrl;
              const inner = (
                <>
                  <span className="relative hidden h-11 w-[70px] shrink-0 overflow-hidden rounded-[8px] bg-[var(--media-bg)] shadow-[inset_0_0_0_1px_rgb(var(--ink)/0.06)] sm:block">
                    {p.image ? (
                      <Image src={p.image} alt="" fill sizes="70px" className="object-cover object-top" />
                    ) : (
                      <span className={`flex h-full w-full items-center justify-center text-[15px] font-semibold ${GREY}`}>
                        {p.title.charAt(0)}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="text-[17px] font-semibold tracking-[-0.015em] text-[var(--fg)] transition-colors duration-150 [@media(hover:hover)]:group-hover/row:text-[var(--accent)]">
                        {p.title}
                      </span>
                      <span className={`text-[13px] ${GREY}`}>{p.kind}</span>
                    </span>
                    <span className={`mt-0.5 block text-[15px] leading-[1.45] text-pretty ${GREY}`}>{p.summary}</span>
                  </span>
                  {href ? (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 shrink-0 text-[var(--fg-2)] transition-[transform,color] duration-200 ease-out [@media(hover:hover)]:group-hover/row:-translate-y-0.5 [@media(hover:hover)]:group-hover/row:translate-x-0.5 [@media(hover:hover)]:group-hover/row:text-[var(--accent)]"
                    />
                  ) : null}
                </>
              );
              return (
                <li key={p.slug} className={i > 0 ? "border-t border-[rgb(var(--ink)/0.06)]" : ""}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/row flex min-h-[68px] items-center gap-4 px-5 py-4 transition-colors duration-150 [@media(hover:hover)]:hover:bg-[rgb(var(--ink)/0.03)] sm:px-6 ${FOCUS} focus-visible:-outline-offset-2`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex min-h-[68px] items-center gap-4 px-5 py-4 sm:px-6">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
