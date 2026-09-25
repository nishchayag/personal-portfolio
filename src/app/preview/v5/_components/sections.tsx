"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { experience, profile, services, skills } from "@/content/profile";
import { SocialIcon } from "./chrome";
import { EASE_OUT, FOCUS } from "./tokens";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(18px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ id, title, lede }: { id: string; title: string; lede?: string }) {
  return (
    <Reveal>
      <h2 id={id} className="text-[clamp(2.1rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#f5f5f7]">
        {title}
      </h2>
      {lede && <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-[#8e8e93]">{lede}</p>}
    </Reveal>
  );
}

const CARD = "rounded-[26px] border border-white/[0.06] bg-[#0f0f12]";
const EYEBROW = "text-[12px] font-medium uppercase tracking-[0.08em] text-[#8e8e93]";

const EDU = /universit|college|school|institute|b\.?\s?tech|bachelor|degree/i;
const education = experience.filter((e) => EDU.test(`${e.org} ${e.role}`));
const roles = experience.filter((e) => !education.includes(e));

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 lg:scroll-mt-10">
      <SectionHeading id="experience-heading" title="Experience" />
      <Reveal className={`${CARD} mt-10 p-6 sm:p-9`}>
        <ol>
          {experience.map((e, i) => {
            const last = i === experience.length - 1;
            return (
              <li key={`${e.role}-${e.org}`} className={`relative grid grid-cols-[18px_minmax(0,1fr)] gap-x-5 ${last ? "" : "pb-10"}`}>
                <div className="relative flex justify-center" aria-hidden="true">
                  <span
                    className={`relative z-10 mt-[7px] h-2.5 w-2.5 rounded-full ${
                      i === 0 ? "bg-[#f5f5f7] shadow-[0_0_0_4px_rgba(245,245,247,0.08)]" : "border border-white/30 bg-[#0f0f12]"
                    }`}
                  />
                  {!last && <span className="absolute bottom-[-6px] top-[22px] w-px bg-white/10" />}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-[#f5f5f7]">{e.role}</h3>
                    <p className="shrink-0 text-[14px] tabular-nums text-[#8e8e93]">{e.period}</p>
                  </div>
                  <p className="mt-0.5 text-[15px] text-[#f5f5f7]/75">{e.org}</p>
                  {e.points.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {e.points.map((pt) => (
                        <li key={pt} className="relative pl-4 text-[15px] leading-relaxed text-[#8e8e93]">
                          <span className="absolute left-0 top-[11px] h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* At a glance                                                         */
/* ------------------------------------------------------------------ */

export function GlanceSection() {
  const current = roles[0] ?? experience[0];
  const groups = Object.entries(skills);

  return (
    <section id="glance" aria-labelledby="glance-heading" className="scroll-mt-24 lg:scroll-mt-10">
      <SectionHeading id="glance-heading" title="At a glance" />
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-6 sm:gap-4">
        {current && (
          <Reveal className={`${CARD} p-6 sm:col-span-3 sm:p-7`}>
            <h3 className={EYEBROW}>Currently</h3>
            <p className="mt-3 text-[21px] font-semibold leading-snug tracking-[-0.02em] text-[#f5f5f7]">{current.role}</p>
            <p className="mt-1 text-[15px] text-[#8e8e93]">
              {current.org} · <span className="tabular-nums">{current.period}</span>
            </p>
          </Reveal>
        )}

        <Reveal className={`${CARD} p-6 sm:col-span-3 sm:p-7`} delay={0.05}>
          <h3 className={EYEBROW}>Availability</h3>
          <p className="mt-3 flex items-start gap-2.5 text-[21px] font-semibold leading-snug tracking-[-0.02em] text-[#f5f5f7]">
            <span className="relative mt-[11px] flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="v5-pulse absolute inset-0 rounded-full bg-[#8fb3ff]" />
              <span className="relative h-2 w-2 rounded-full bg-[#8fb3ff]" />
            </span>
            {profile.availability}
          </p>
          <p className="mt-1 pl-[18px] text-[15px] text-[#8e8e93]">Based in {profile.location}</p>
        </Reveal>

        <Reveal className={`${CARD} p-6 sm:col-span-6 sm:p-7`} delay={0.05}>
          <h3 className={EYEBROW}>Stack</h3>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 xl:grid-cols-5">
            {groups.map(([group, items]) => (
              <div key={group} className="min-w-0">
                <h4 className="text-[13px] font-semibold text-[#f5f5f7]">{group}</h4>
                <ul className="mt-2 space-y-1">
                  {items.map((item) => (
                    <li key={item} className="text-[14px] leading-snug text-[#8e8e93]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {education.map((e) => (
          <Reveal key={e.org} className={`${CARD} p-6 sm:col-span-6 sm:p-7`} delay={0.05}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className={EYEBROW}>Education</h3>
                <p className="mt-3 text-[21px] font-semibold leading-snug tracking-[-0.02em] text-[#f5f5f7]">{e.role}</p>
                <p className="mt-1 text-[15px] text-[#8e8e93]">{e.org}</p>
              </div>
              <p className="text-[14px] tabular-nums text-[#8e8e93]">{e.period}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services + process                                                  */
/* ------------------------------------------------------------------ */

const STEPS = [
  { title: "Call", body: "A short call to talk through what you need and whether it's a fit." },
  { title: "Scope & quote", body: "A clear scope, timeline and price before anything starts." },
  { title: "Build & ship", body: "Regular updates while it's built, then a deployed, working product." },
] as const;

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-24 lg:scroll-mt-10">
      <SectionHeading id="services-heading" title="What I can build for you" lede="For founders, small businesses and teams that need a product shipped end to end." />
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {services.map((s, i) => (
          <Reveal key={s.title} className={`${CARD} flex flex-col p-6 sm:p-7`} delay={i * 0.05}>
            <span className="text-[13px] font-semibold tabular-nums text-[#8e8e93]" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[19px] font-semibold sm:mt-6 tracking-[-0.02em] text-[#f5f5f7]">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#8e8e93]">{s.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#f5f5f7]">How we&apos;d work</h3>
        <ol className="relative mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
          <span aria-hidden="true" className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10 sm:left-4 sm:right-4 sm:top-[15px] sm:bottom-auto sm:h-px sm:w-auto" />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-4 sm:block">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#050507] text-[13px] font-semibold tabular-nums text-[#f5f5f7]">
                {i + 1}
              </span>
              <div className="sm:mt-5 sm:pr-4">
                <h4 className="text-[17px] font-semibold tracking-[-0.015em] text-[#f5f5f7]">{step.title}</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#8e8e93]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact finale                                                      */
/* ------------------------------------------------------------------ */

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      window.location.href = `mailto:${profile.email}`;
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`relative inline-flex min-h-12 min-w-[176px] items-center justify-center overflow-hidden rounded-full bg-[#f5f5f7] px-6 text-[15px] font-semibold text-[#050507] transition-transform duration-150 ease-out active:scale-[0.97] ${FOCUS}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "copied" : "copy"}
          className="inline-flex items-center gap-2"
          initial={{ opacity: 0, filter: "blur(4px)", transform: "scale(0.96)" }}
          animate={{ opacity: 1, filter: "blur(0px)", transform: "scale(1)" }}
          exit={{ opacity: 0, filter: "blur(4px)", transform: "scale(0.96)" }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
        >
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          {copied ? "Copied" : "Copy email"}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 lg:scroll-mt-10">
      <Reveal className={`${CARD} relative overflow-hidden px-6 py-16 sm:px-12 sm:py-24`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_20%_0%,rgba(88,110,255,0.16),transparent_70%),radial-gradient(50%_60%_at_90%_100%,rgba(56,189,222,0.1),transparent_70%)]"
        />
        <div className="relative">
          <p className={EYEBROW}>Contact</p>
          <h2
            id="contact-heading"
            className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-[#f5f5f7] [text-wrap:balance]"
          >
            Let&apos;s build something.
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#8e8e93]">
            {profile.availability}. Tell me what you&apos;re making.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CopyEmailButton />
            <a
              href={`mailto:${profile.email}`}
              className={`inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 text-[15px] font-semibold text-[#f5f5f7] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.1] ${FOCUS}`}
            >
              <Mail size={16} aria-hidden="true" />
              Email me
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-12 items-center gap-1.5 rounded-full px-4 text-[15px] font-semibold text-[#f5f5f7]/85 transition-[transform,color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#f5f5f7] ${FOCUS}`}
            >
              Résumé
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.07] pt-6">
            <p className="text-[15px] text-[#f5f5f7]/80 [overflow-wrap:anywhere]">{profile.email}</p>
            <div className="flex items-center gap-1 sm:ml-auto">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-[#8e8e93] transition-[color,background-color,transform] duration-150 active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/[0.06] [@media(hover:hover)_and_(pointer:fine)]:hover:text-[#f5f5f7] ${FOCUS}`}
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
