import { Mail } from "lucide-react";
import {
  featuredProjects,
  otherProjects,
  experience,
  services,
  skills,
  profile,
} from "@/content/profile";
import { Reveal } from "./reveal";
import { ProjectCard } from "./project-card";

const HOW_WE_WORK = [
  {
    title: "Call",
    body: "A short call to talk through what you need and whether it's a fit.",
  },
  {
    title: "Scope & quote",
    body: "A clear scope, timeline and price before anything starts.",
  },
  {
    title: "Build & ship",
    body: "Regular updates while it's built, then a deployed, working product.",
  },
] as const;

const ALL_SKILLS = Object.values(skills).flat();

export function RightColumn() {
  return (
    <div className="flex flex-col py-10 lg:py-16">
      <section id="work" aria-labelledby="work-heading" className="scroll-mt-10">
        <h2 id="work-heading" className="text-xl font-semibold tracking-tight text-white">
          Work
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
          Selected case studies — what the product does, what I built, and how it&apos;s put
          together.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
            More projects
          </h3>
          <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {otherProjects.map((project) => (
              <li key={project.slug}>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 text-sm transition-colors duration-150 hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                >
                  <span className="font-medium text-white/90">{project.title}</span>
                  <span className="text-slate-500">{project.summary}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="mt-24 scroll-mt-10"
      >
        <h2
          id="experience-heading"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Experience
        </h2>
        <Reveal>
          <ol className="mt-8 flex flex-col gap-8 border-l border-white/10 pl-6">
            {experience.map((item) => (
              <li key={`${item.role}-${item.org}`} className="relative">
                <span
                  className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0d12] bg-teal-400"
                  aria-hidden="true"
                />
                <p className="text-xs uppercase tracking-wide text-slate-500">{item.period}</p>
                <h3 className="mt-1 text-base font-semibold text-white">{item.role}</h3>
                <p className="text-sm text-teal-300">{item.org}</p>
                {item.points.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-slate-400">
                        <span
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/30"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section id="services" aria-labelledby="services-heading" className="mt-24 scroll-mt-10">
        <h2 id="services-heading" className="text-xl font-semibold tracking-tight text-white">
          Services
        </h2>

        <Reveal>
          <div className="mt-8">
            <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
              How I can help
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <h4 className="text-base font-semibold text-white">{service.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
              How we&apos;d work
            </h3>
            <ol className="mt-4 grid gap-4 sm:grid-cols-3">
              {HOW_WE_WORK.map((step, index) => (
                <li key={step.title} className="rounded-xl border border-white/10 p-5">
                  <span className="text-xs font-medium text-teal-300">0{index + 1}</span>
                  <h4 className="mt-2 text-sm font-semibold text-white">{step.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10">
            <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Toolkit
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {ALL_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="mt-24 scroll-mt-10 pb-24">
        <h2 id="contact-heading" className="text-xl font-semibold tracking-tight text-white">
          Contact
        </h2>
        <Reveal>
          <div className="mt-6 max-w-xl">
            <p className="text-sm leading-relaxed text-slate-400">
              Whether you&apos;re hiring for a role or need something built for your business,
              I&apos;d like to hear about it — reach out and I&apos;ll get back to you.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-teal-400 px-5 text-sm font-semibold text-[#0b0d12] transition-colors duration-150 hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 active:scale-[0.97]"
            >
              <Mail size={16} aria-hidden="true" />
              Email {profile.email}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
