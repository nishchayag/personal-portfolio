"use client";

import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { IconBrandX } from "@tabler/icons-react";
import {
  experience,
  featuredProjects,
  otherProjects,
  profile,
  services,
} from "@/content/profile";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: IconBrandX,
} as const;

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-16">
      <h2
        id="work-heading"
        className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
      >
        Work
      </h2>

      <div className="mt-10 flex flex-col gap-16">
        {featuredProjects.map((project) => (
          <article
            key={project.slug}
            id={project.slug}
            className="scroll-mt-16 grid gap-6 rounded-[20px] border border-white/6 bg-[#141416] p-4 sm:p-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:p-8"
          >
              {project.image ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/6">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : null}

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {project.title}
                  </h3>
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/60">
                    {project.kind}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                  {project.summary}
                </p>

                {project.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-1.5">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-sm leading-relaxed text-white/70"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#8b5cf6]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 text-xs text-white/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#8b5cf6] px-5 text-sm font-medium text-white transition-transform duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
                    >
                      Live
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-white/5 active:scale-[0.97]"
                    >
                      Code
                      <Github className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MoreProjectsSection() {
  return (
    <section id="more-projects" aria-labelledby="more-projects-heading">
      <h2
        id="more-projects-heading"
        className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
      >
        More projects
      </h2>
      <ul className="mt-8 divide-y divide-white/6 border-y border-white/6">
        {otherProjects.map((project) => (
          <li key={project.slug}>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 flex-col gap-1 py-4 transition-colors duration-150 hover:text-[#8b5cf6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5cf6] sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span className="font-medium text-white">{project.title}</span>
              <span className="text-sm text-white/50">{project.summary}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
      >
        Experience
      </h2>
      <div className="mt-8 flex flex-col gap-6">
        {experience.map((role) => (
          <div
            key={`${role.role}-${role.org}`}
            className="rounded-[20px] border border-white/6 bg-[#141416] p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-white">
                {role.role} &middot; {role.org}
              </h3>
              <span className="text-sm text-white/50">{role.period}</span>
            </div>
            {role.points.length > 0 ? (
              <ul className="mt-3 space-y-1.5">
                {role.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2 text-sm leading-relaxed text-white/65"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#8b5cf6]" />
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading">
      <h2
        id="services-heading"
        className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
      >
        What I can build for you
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="h-full rounded-[20px] border border-white/6 bg-[#141416] p-6"
          >
            <h3 className="font-medium text-white">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {service.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16">
      <div className="rounded-[20px] border border-white/6 bg-[#141416] px-6 py-12 text-center sm:px-12">
        <h2
            id="contact-heading"
            className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            Let&apos;s build something
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/60 sm:text-base">
            {profile.availability}. Reach out and tell me about the project.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#8b5cf6] px-6 text-sm font-medium text-white transition-transform duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-white/5 active:scale-[0.97]"
            >
              Résumé
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            {profile.socials.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/25 hover:text-white"
                >
                  {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : social.label}
                </a>
              );
            })}
          </div>
      </div>
    </section>
  );
}
