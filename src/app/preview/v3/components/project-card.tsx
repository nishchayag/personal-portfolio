import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/content/profile";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-colors duration-150 hover:border-teal-400/30 hover:bg-white/[0.04]">
      {project.image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-black">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="p-5 sm:p-6">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {project.kind}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.summary}</p>

        {project.highlights.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xs font-medium uppercase tracking-wide text-slate-500">
              What I built
            </h4>
            <ul className="mt-2 flex flex-col gap-1.5">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2 text-sm text-slate-300">
                  <span
                    className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-teal-400"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-5 text-sm">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-medium text-teal-300 transition-colors duration-150 hover:text-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              Live <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-slate-400 transition-colors duration-150 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              Code <Github size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
