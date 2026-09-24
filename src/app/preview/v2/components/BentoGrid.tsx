"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { IconBrandX } from "@tabler/icons-react";
import {
  experience,
  featuredProjects,
  profile,
  skills,
} from "@/content/profile";
import { RevealTile } from "./reveal";

const TILE =
  "group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/6 bg-[#141416]";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: IconBrandX,
} as const;

function ProjectTile({
  index,
  project,
}: {
  index: number;
  project: (typeof featuredProjects)[number];
}) {
  return (
    <RevealTile index={index} className="lg:col-span-3">
      <Link
        href={`#${project.slug}`}
        className={`${TILE} transition-colors duration-200 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5cf6]`}
      >
        <div className="relative h-40 w-full overflow-hidden lg:h-auto lg:flex-1">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-200 ease-out group-hover:scale-[1.02]"
            />
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <span className="truncate text-sm font-medium text-white">
            {project.title}
          </span>
          <span className="shrink-0 text-xs text-white/45">{project.kind}</span>
        </div>
      </Link>
    </RevealTile>
  );
}

export function BentoGrid() {
  const current = experience[0];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[190px]">
      {/* Intro */}
      <RevealTile index={0} className="sm:col-span-2 lg:col-span-6 lg:row-span-2">
        <div className={`${TILE} justify-center px-6 py-8 sm:px-9`}>
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-[#8b5cf6] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8b5cf6]" />
            </span>
            {profile.availability}
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-3 max-w-lg text-sm text-white/60 sm:text-base">
            {profile.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center rounded-full bg-[#8b5cf6] px-5 text-sm font-medium text-white transition-transform duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
            >
              Get in touch
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-white/5 active:scale-[0.97]"
            >
              Résumé
            </a>
          </div>
        </div>
      </RevealTile>

      {featuredProjects.map((project, i) => (
        <ProjectTile key={project.slug} index={i + 1} project={project} />
      ))}

      {/* Currently */}
      <RevealTile index={5} className="sm:col-span-2 lg:col-span-4">
        <div className={`${TILE} justify-center px-6 py-5`}>
          <h3 className="text-xs font-medium uppercase tracking-wide text-white/40">
            Currently
          </h3>
          <p className="mt-2 text-sm font-medium text-white">
            {current.role}
          </p>
          <p className="text-sm text-white/60">
            {current.org} &middot; {current.period}
          </p>
          {current.points[0] ? (
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              {current.points[0]}
            </p>
          ) : null}
        </div>
      </RevealTile>

      {/* Stack */}
      <RevealTile index={6} className="sm:col-span-2 lg:col-span-4">
        <div className={`${TILE} justify-center px-6 py-5`}>
          <h3 className="text-xs font-medium uppercase tracking-wide text-white/40">
            Stack
          </h3>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="min-w-0">
                <p className="truncate text-[11px] text-white/40">{group}</p>
                <p
                  className="truncate text-xs text-white/80"
                  title={items.join(", ")}
                >
                  {items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </RevealTile>

      {/* Location */}
      <RevealTile index={7} className="lg:col-span-2">
        <div className={`${TILE} justify-center px-5 py-5`}>
          <h3 className="text-xs font-medium uppercase tracking-wide text-white/40">
            Location
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-white">
            <MapPin className="h-4 w-4 shrink-0 text-white/50" aria-hidden="true" />
            <span>{profile.location}</span>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            {profile.availability}
          </p>
        </div>
      </RevealTile>

      {/* Contact */}
      <RevealTile index={8} className="lg:col-span-2">
        <div className={`${TILE} justify-center gap-2 px-5 py-5`}>
          <h3 className="text-xs font-medium uppercase tracking-wide text-white/40">
            Contact
          </h3>
          <a
            href={`mailto:${profile.email}`}
            className="mt-1 flex min-h-11 items-center gap-1.5 text-sm text-white underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#8b5cf6]"
          >
            <Mail className="h-4 w-4 shrink-0 text-white/50" aria-hidden="true" />
            <span className="truncate">{profile.email}</span>
          </a>
          <div className="flex items-center gap-2">
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
      </RevealTile>
    </div>
  );
}
