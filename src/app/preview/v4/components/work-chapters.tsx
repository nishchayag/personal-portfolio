"use client";

import { ArrowUpRight } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { featuredProjects, type Project } from "@/content/profile";
import { BrowserFrame } from "./browser-frame";
import { FOCUS, GREY, Reveal, SectionHeading } from "./ui";

export function WorkChapters() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-[52px]">
      <div className="mx-auto max-w-[1248px] px-4 pt-28 sm:px-6 lg:pt-44">
        <Reveal>
          <p className={`text-[17px] font-semibold ${GREY}`}>Work</p>
          <div className="mt-3">
            <SectionHeading
              id="work-heading"
              lead="Selected work."
              rest="Products designed, built and shipped end to end."
            />
          </div>
        </Reveal>
      </div>

      <ol className="mt-16 lg:mt-8">
        {featuredProjects.map((project, i) => (
          <Chapter
            key={project.slug}
            project={project}
            index={i}
            total={featuredProjects.length}
          />
        ))}
      </ol>
    </section>
  );
}

/**
 * One project = one chapter. On large screens the framed screenshot is pinned
 * while three text beats scroll past it, then the next chapter takes over. On
 * small screens it is a plain stacked card.
 */
function Chapter({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <li className="mx-auto max-w-[1248px] px-4 sm:px-6">
      <article
        aria-labelledby={`${project.slug}-title`}
        className="border-t border-white/[0.08] py-14 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16 lg:border-t-0 lg:py-0 xl:gap-20"
      >
        {/* Screenshot: sticky on desktop, simple block on mobile */}
        <div className="lg:sticky lg:top-[52px] lg:flex lg:h-[calc(100svh-52px)] lg:items-center">
          {project.image ? (
            <Reveal className="w-full">
              <BrowserFrame
                src={project.image}
                alt={`${project.title} screenshot`}
                url={project.demoUrl}
                sizes="(min-width: 1024px) 760px, calc(100vw - 32px)"
              />
            </Reveal>
          ) : null}
        </div>

        {/* Three beats that scroll past the pinned screenshot */}
        <div className="lg:py-[18svh]">
          <Beat>
            <p className={`flex items-center gap-3 text-[14px] ${GREY}`}>
              <span className="font-semibold text-[#f5f5f7]">{project.kind}</span>
              <span aria-hidden="true" className="h-3 w-px bg-white/20" />
              <span className="tabular-nums">{counter}</span>
            </p>
            <h3
              id={`${project.slug}-title`}
              className="mt-4 text-[clamp(2.5rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.035em]"
            >
              {project.title}
            </h3>
            <p className={`mt-5 max-w-[36ch] text-[19px] leading-[1.45] text-pretty ${GREY}`}>
              {project.summary}
            </p>
          </Beat>

          {project.highlights.length > 0 ? (
            <Beat>
              <h4 className="text-[14px] font-semibold text-[#f5f5f7]">What I built</h4>
              <ul className="mt-5 space-y-5">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="border-l border-white/15 pl-4 text-[19px] leading-[1.45] tracking-[-0.005em] text-[#f5f5f7] text-pretty"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </Beat>
          ) : null}

          <Beat last>
            <h4 className="text-[14px] font-semibold text-[#f5f5f7]">Built with</h4>
            <p className={`mt-3 text-[17px] leading-[1.6] ${GREY}`}>
              {project.stack.join(" · ")}
            </p>
            <ProjectLinks project={project} />
          </Beat>
        </div>
      </article>
    </li>
  );
}

function Beat({ children, last = false }: { children: React.ReactNode; last?: boolean }) {
  return (
    <div
      className={`pt-10 first:pt-10 lg:flex lg:min-h-[46svh] lg:flex-col lg:justify-center lg:pt-0 ${
        last ? "lg:min-h-[44svh]" : ""
      }`}
    >
      <Reveal>{children}</Reveal>
    </div>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  if (!project.demoUrl && !project.githubUrl) return null;
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2">
      {project.demoUrl ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex min-h-11 items-center gap-1 text-[17px] text-[#2997ff] transition-transform duration-150 ease-out active:scale-[0.97] ${FOCUS} rounded-md`}
        >
          Visit {project.title}
          <ArrowUpRight
            aria-hidden="true"
            className="size-[18px] transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5"
          />
        </a>
      ) : null}
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center gap-1.5 text-[17px] text-[#2997ff] transition-transform duration-150 ease-out active:scale-[0.97] ${FOCUS} rounded-md`}
        >
          <IconBrandGithub aria-hidden="true" className="size-[18px]" />
          Source code
        </a>
      ) : null}
    </div>
  );
}
