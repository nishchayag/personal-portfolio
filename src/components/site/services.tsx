import { ChevronRight } from "lucide-react";
import { services, vibes } from "@/content/profile";
import { GREY, Reveal, SectionHeading, TEXT_LINK } from "./ui";

// Process copy only describes how an engagement runs; it makes no claims.
const STEPS = [
  {
    title: "Talk it through",
    body: "You tell me what you need. I come back with a clear scope and a plan we both agree on.",
  },
  {
    title: "Build",
    body: "I design and build it end to end, and you see it take shape as it goes.",
  },
  {
    title: "Launch",
    body: "We ship it to your domain, and you get the code and everything needed to run it.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-[52px] border-t border-[rgb(var(--ink)/0.08)] px-4 py-28 sm:px-6 lg:py-44"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className={`text-[17px] font-semibold ${GREY}`}>Services</p>
          <SectionHeading
            id="services-heading"
            className="mt-3"
            lead="Ideas, shipped."
            rest="What I can build for you, from first idea to a live product."
          />
        </Reveal>

        <ul className="mt-16 grid gap-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-10">
          {services.map((service, i) => (
            <li key={service.title}>
              <Reveal delay={i * 0.06}>
                <div className="h-px w-full bg-[rgb(var(--ink)/0.12)]" aria-hidden="true" />
                <h3 className="mt-7 text-[28px] font-semibold leading-[1.1] tracking-[-0.025em] text-balance">
                  {service.title}
                </h3>
                <p className={`mt-4 max-w-[34ch] text-[17px] leading-[1.5] text-pretty ${GREY}`}>
                  {service.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-28 lg:mt-40">
          <div className="h-px w-full bg-[rgb(var(--ink)/0.12)]" aria-hidden="true" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div>
              <h3 className="max-w-[26ch] text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-balance">
                {vibes.lead} <span className={GREY}>{vibes.rest}</span>
              </h3>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Some of the styles">
                {vibes.examples.map((name) => (
                  <li key={name} className="rounded-full bg-[var(--chip)] px-3.5 py-1.5 text-[14px] text-[var(--fg)]">
                    {name}
                  </li>
                ))}
                <li className={`px-1.5 py-1.5 text-[14px] ${GREY}`}>{vibes.more}</li>
              </ul>
            </div>
            <div className="flex flex-col items-start gap-y-1">
              <a href={vibes.href} className={TEXT_LINK}>
                {vibes.cta}
                <ChevronRight
                  aria-hidden="true"
                  className="size-[18px] transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
                />
              </a>
              <a href={vibes.quizHref} className={TEXT_LINK}>
                {vibes.quizCta}
                <ChevronRight
                  aria-hidden="true"
                  className="size-[18px] transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-28 rounded-[28px] bg-[var(--tile)] p-7 shadow-[inset_0_0_0_1px_var(--tile-ring)] sm:p-10 lg:mt-40 lg:p-14">
          <Reveal>
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              How we’d work. <span className={GREY}>Three steps, no surprises.</span>
            </h3>
          </Reveal>
          <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.06}>
                  <span className="text-[56px] font-semibold leading-none tracking-[-0.04em] text-[rgb(var(--ink)/0.2)] tabular-nums">
                    {i + 1}
                  </span>
                  <h4 className="mt-5 text-[21px] font-semibold tracking-[-0.015em]">
                    {step.title}
                  </h4>
                  <p className={`mt-2.5 text-[17px] leading-[1.5] text-pretty ${GREY}`}>
                    {step.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
