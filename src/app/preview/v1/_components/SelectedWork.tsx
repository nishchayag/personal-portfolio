"use client";

import Image from "next/image";
import { featuredProjects, otherProjects } from "@/content/profile";
import { Reveal, RevealGroup, fadeUpVariants } from "./Reveal";
import { motion } from "motion/react";

function ProjectLinks({
  demoUrl,
  githubUrl,
}: {
  demoUrl?: string;
  githubUrl?: string;
}) {
  if (!demoUrl && !githubUrl) return null;
  return (
    <div className="mt-6 flex flex-wrap items-center gap-6">
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center text-sm font-medium text-white transition-colors duration-150 hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Live ↗
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center text-sm font-medium text-white/70 transition-colors duration-150 hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Code ↗
        </a>
      )}
    </div>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24 md:py-32">
      <Reveal>
        <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-white/50">
          Selected work
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-24 md:mt-16 md:gap-32">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug}>
            <article className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7">
                {project.image && (
                  <div className="relative aspect-[1440/900] w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover object-top"
                      priority={index === 0}
                    />
                  </div>
                )}
              </div>

              <div className="md:col-span-5">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                  {project.kind}
                </span>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {project.summary}
                </p>

                {project.highlights.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {project.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-white/60"
                      >
                        <span aria-hidden="true" className="text-white/30">
                          —
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-5 text-sm text-white/40">
                  {project.stack.join(" · ")}
                </p>

                <ProjectLinks demoUrl={project.demoUrl} githubUrl={project.githubUrl} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 md:mt-32">
        <Reveal>
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-white/50">
            Other projects
          </h3>
        </Reveal>

        <RevealGroup className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {otherProjects.map((project) => (
            <motion.div
              key={project.slug}
              variants={fadeUpVariants}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <div className="sm:w-1/3">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 w-fit items-center text-base font-medium transition-colors duration-150 hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:min-h-0"
                  >
                    {project.title} ↗
                  </a>
                ) : (
                  <span className="text-base font-medium">{project.title}</span>
                )}
              </div>
              <p className="text-sm text-white/60 sm:w-1/3">{project.summary}</p>
              <p className="text-sm text-white/40 sm:w-1/3 sm:text-right">
                {project.stack.join(" · ")}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
