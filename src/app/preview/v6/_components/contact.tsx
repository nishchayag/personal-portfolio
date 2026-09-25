"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Github, Linkedin } from "lucide-react";
import { IconBrandX } from "@tabler/icons-react";
import { profile } from "@/content/profile";
import { EASE_OUT, FOCUS, GREY, Reveal } from "./ui";

const socialIcons: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: IconBrandX as unknown as typeof Github,
};

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-[52px] border-t border-white/[0.08] px-4 pb-16 pt-32 sm:px-6 lg:pb-20 lg:pt-52"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-[clamp(3.25rem,9.4vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-balance"
          >
            Let’s build something.
          </h2>
          <p className={`mt-7 max-w-[40ch] text-[clamp(1.1875rem,1.9vw,1.5rem)] leading-[1.35] text-pretty ${GREY}`}>
            Have a project or a role in mind? I’m based in {profile.location}.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-14 lg:mt-20">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <a
              href={`mailto:${profile.email}`}
              className={`inline-flex min-h-11 min-w-0 items-center break-all text-[clamp(1.5rem,4.2vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#2997ff] transition-opacity duration-150 [@media(hover:hover)]:hover:opacity-80 ${FOCUS} rounded-md`}
            >
              {profile.email}
            </a>
            <CopyEmail />
          </div>

          <ul className="mt-12 flex items-center gap-2">
            {profile.socials.map((s) => {
              const Icon = socialIcons[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`flex size-12 items-center justify-center rounded-full bg-[#1c1c1e] text-[#f5f5f7] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:bg-[#2c2c2e] ${FOCUS}`}
                  >
                    {Icon ? (
                      <Icon aria-hidden="true" className="size-5" />
                    ) : (
                      <span className="text-[13px]">{s.label}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <footer className={`mt-32 flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-[12px] sm:flex-row sm:justify-between ${GREY}`}>
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            {profile.role} · {profile.location}
          </p>
        </footer>
      </div>
    </section>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1c1c1e] px-5 text-[15px] font-medium text-[#f5f5f7] transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:bg-[#2c2c2e] ${FOCUS}`}
    >
      <span className="relative size-4" aria-hidden="true">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="relative grid">
        <span aria-live="polite" className="col-start-1 row-start-1">
          {copied ? "Copied" : "Copy email"}
        </span>
        {/* Reserve the widest label so the pill never changes width. */}
        <span className="invisible col-start-1 row-start-1" aria-hidden="true">
          Copy email
        </span>
      </span>
    </button>
  );
}
