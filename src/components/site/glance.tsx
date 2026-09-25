"use client";

import { useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import { GraduationCap } from "lucide-react";
import { experience, profile, skills } from "@/content/profile";
import { FOCUS, GREY, Reveal, SectionHeading } from "./ui";

const TIME_ZONE = "Asia/Kolkata";

/**
 * A bento with hierarchy rather than a uniform grid: one hero tile for the
 * current role, a live clock, availability, a quiet stack list, education.
 */
export function Glance() {
  const [current, ...education] = experience;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="site-alt scroll-mt-[52px] bg-[var(--bg-alt)] px-4 py-28 sm:px-6 lg:py-44"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className={`text-[17px] font-semibold ${GREY}`}>About</p>
          <SectionHeading
            id="about-heading"
            className="mt-3"
            lead="At a glance."
            rest="Where I am, what I use and when I’m free."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 lg:gap-4">
          {current ? (
            <Tile className="sm:col-span-2 lg:col-span-4 lg:row-span-2" delay={0}>
              <div className="flex h-full flex-col p-7 sm:p-10">
                <p className={`text-[14px] font-semibold ${GREY}`}>Now</p>
                <p className="mt-auto pt-14 text-[clamp(2.25rem,4.4vw,3.75rem)] font-semibold leading-[1] tracking-[-0.035em]">
                  {current.org}
                </p>
                <p className="mt-3 text-[19px] leading-snug text-[var(--fg)]">
                  {current.role}{" "}
                  <span className={GREY}>· {current.period}</span>
                </p>
                {current.points.length > 0 ? (
                  <ul className={`mt-8 space-y-3 border-t border-[rgb(var(--ink)/0.08)] pt-7 text-[15px] leading-[1.5] ${GREY}`}>
                    {current.points.map((point) => (
                      <li key={point} className="text-pretty">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Tile>
          ) : null}

          <Tile className="lg:col-span-2" delay={0.06}>
            <ClockTile />
          </Tile>

          <Tile className="lg:col-span-2" delay={0.12}>
            <div className="flex h-full flex-col p-7">
              <p className={`text-[14px] font-semibold ${GREY}`}>Availability</p>
              <p className="mt-auto flex items-start gap-2.5 pt-10 text-[21px] font-semibold leading-[1.2] tracking-[-0.015em] text-pretty">
                <span className="mt-[9px] size-2 shrink-0 rounded-full bg-[var(--ok)]" aria-hidden="true" />
                {profile.availability}
              </p>
              <a
                href={`mailto:${profile.email}`}
                className={`mt-3 inline-flex min-h-11 w-fit items-center text-[15px] text-[var(--accent)] ${FOCUS} rounded-md`}
              >
                Start a conversation ›
              </a>
            </div>
          </Tile>

          <Tile className="sm:col-span-2 lg:col-span-4" delay={0.18}>
            <div className="p-7 sm:p-10">
              <p className={`text-[14px] font-semibold ${GREY}`}>Toolkit</p>
              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group} className="min-w-0">
                    <dt className={`text-[12px] font-semibold uppercase tracking-[0.06em] ${GREY}`}>{group}</dt>
                    <dd className="mt-2.5 space-y-1.5 text-[15px] leading-[1.4] text-[var(--fg)]">
                      {items.map((item) => (
                        <span key={item} className="block text-pretty [overflow-wrap:anywhere]">
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Tile>

          {education.length > 0 ? (
            <Tile className="sm:col-span-2 lg:col-span-2" delay={0.24}>
              <EducationTile items={education} />
            </Tile>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Pointer-follow highlight: CSS variables on the tile itself, mouse only. */
function Tile({
  children,
  className = "",
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
}) {
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Reveal delay={delay} className={className}>
      <div
        onPointerMove={onPointerMove}
        className="group/tile relative h-full overflow-hidden rounded-[28px] bg-[var(--tile)] shadow-[inset_0_0_0_1px_var(--tile-ring)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover/tile:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--spot), transparent 65%)",
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </Reveal>
  );
}

// ---- Education ---------------------------------------------------------------

type ExperienceItem = (typeof experience)[number];

/** "Aug 2023 – May 2027" -> ["Aug 2023", "May 2027"]; falls back to the raw text. */
function splitPeriod(period: string): [string, string] | null {
  const parts = period.split(/\s+[–—-]\s+/);
  return parts.length === 2 ? [parts[0], parts[1]] : null;
}

/**
 * Content anchored top and bottom so the tile reads as designed at any
 * height: the school up top, the period as a two-point track at the base.
 */
function EducationTile({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="flex h-full flex-col p-7 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <p className={`text-[14px] font-semibold ${GREY}`}>Education</p>
        <span
          aria-hidden="true"
          className="-mr-1 -mt-1 flex size-10 items-center justify-center rounded-full bg-[var(--tile-chip)] text-[var(--fg)]"
        >
          <GraduationCap className="size-[18px]" />
        </span>
      </div>
      <ul className="flex flex-1 flex-col gap-10">
        {items.map((item) => {
          const range = splitPeriod(item.period);
          return (
            <li key={item.org} className="flex flex-1 flex-col">
              <p className="mt-6 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-pretty">
                {item.org}
              </p>
              <p className={`mt-3 text-[15px] leading-[1.45] text-pretty ${GREY}`}>{item.role}</p>
              {range ? (
                <div className="mt-auto pt-10">
                  <div className="relative flex items-center" aria-hidden="true">
                    <span className="size-2 rounded-full bg-[var(--fg)]" />
                    <span className="h-px flex-1 bg-gradient-to-r from-[rgb(var(--ink)/0.5)] to-[rgb(var(--ink)/0.15)]" />
                    <span className="size-2 rounded-full border border-[rgb(var(--ink)/0.4)]" />
                  </div>
                  <dl className="mt-4 flex justify-between gap-4 tabular-nums">
                    <div>
                      <dt className={`text-[12px] font-semibold uppercase tracking-[0.06em] ${GREY}`}>From</dt>
                      <dd className="mt-1 text-[17px] font-semibold tracking-[-0.01em] text-[var(--fg)]">{range[0]}</dd>
                    </div>
                    <div className="text-right">
                      <dt className={`text-[12px] font-semibold uppercase tracking-[0.06em] ${GREY}`}>To</dt>
                      <dd className="mt-1 text-[17px] font-semibold tracking-[-0.01em] text-[var(--fg)]">{range[1]}</dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <p className={`mt-auto pt-8 text-[13px] tabular-nums ${GREY}`}>{item.period}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ---- Clock -----------------------------------------------------------------

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  weekday: "long",
});
const zoneFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  timeZoneName: "shortOffset",
});

// Shared minute ticker: one timer for every subscriber, aligned to the minute.
let minuteNow = 0;
function subscribeMinute(onChange: () => void) {
  let interval: ReturnType<typeof setInterval> | undefined;
  const tick = () => {
    minuteNow = Math.floor(Date.now() / 60000);
    onChange();
  };
  const timeout = setTimeout(() => {
    tick();
    interval = setInterval(tick, 60000);
  }, 60000 - (Date.now() % 60000));
  return () => {
    clearTimeout(timeout);
    if (interval) clearInterval(interval);
  };
}
function getMinute() {
  if (minuteNow === 0) minuteNow = Math.floor(Date.now() / 60000);
  return minuteNow;
}

function ClockTile() {
  // Server snapshot is null, so the time only ever renders on the client.
  const minute = useSyncExternalStore(subscribeMinute, getMinute, () => null);
  const date = minute === null ? null : new Date(minute * 60000);
  const zone =
    date === null
      ? ""
      : (zoneFormatter.formatToParts(date).find((p) => p.type === "timeZoneName")?.value ?? "");

  return (
    <div className="flex h-full flex-col p-7">
      <p className={`text-[14px] font-semibold ${GREY}`}>
        Local time in {profile.location.split(",")[0]}
      </p>
      <p className="mt-auto pt-10 text-[clamp(3.25rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
        {date === null ? (
          <span className="text-[rgb(var(--ink)/0.15)]">--:--</span>
        ) : (
          <time dateTime={date.toISOString()}>{formatter.format(date)}</time>
        )}
      </p>
      <p className={`mt-3 h-5 text-[15px] ${GREY}`}>
        {date === null ? "" : `${dayFormatter.format(date)} · ${zone}`}
      </p>
    </div>
  );
}
