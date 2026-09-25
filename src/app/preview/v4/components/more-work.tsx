import { ArrowUpRight } from "lucide-react";
import { otherProjects } from "@/content/profile";
import { FOCUS, GREY, Reveal, SectionHeading } from "./ui";

export function MoreWork() {
  const items = otherProjects.filter((p) => p.demoUrl ?? p.githubUrl);
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="more-heading"
      className="border-t border-white/[0.08] px-4 py-28 sm:px-6 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
        <Reveal className="self-start lg:sticky lg:top-[92px]">
          <SectionHeading
            id="more-heading"
            className="!text-[clamp(2rem,3.6vw,3rem)]"
            lead="Also built."
            rest="Smaller products and browser experiments."
          />
        </Reveal>

        <ul className="border-t border-white/[0.1]">
          {items.map((project) => (
            <li key={project.slug} className="border-b border-white/[0.1]">
              <a
                href={project.demoUrl ?? project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex min-h-11 items-center gap-5 py-5 ${FOCUS} rounded-md`}
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[19px] font-semibold tracking-[-0.015em] transition-colors duration-150 [@media(hover:hover)]:group-hover:text-[#2997ff]">
                      {project.title}
                    </span>
                    <span className={`text-[13px] ${GREY}`}>{project.kind}</span>
                  </span>
                  <span className={`mt-1 block text-[15px] leading-[1.45] text-pretty ${GREY}`}>
                    {project.summary}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#86868b] transition-[transform,color] duration-200 ease-out [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:text-[#2997ff]"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
