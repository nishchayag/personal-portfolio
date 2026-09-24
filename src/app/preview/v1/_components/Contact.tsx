import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-16 border-t border-white/10 px-6 py-24 md:py-32"
    >
      <Reveal>
        <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-white/50">
          Contact
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 flex w-fit max-w-full items-center break-all text-3xl font-semibold tracking-[-0.02em] transition-colors duration-150 hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:text-5xl md:text-6xl"
        >
          {profile.email}
        </a>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
          Job opportunities and freelance enquiries are both welcome —
          {" "}
          {profile.availability.toLowerCase()}.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          {profile.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center border-b border-white/30 text-sm font-medium text-white/80 transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              {social.label}
            </a>
          ))}
        </div>
      </Reveal>

      <div className="mt-24 flex flex-col gap-2 border-t border-white/10 pt-8 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {profile.name} — {profile.location}
        </p>
        <p>{profile.role}</p>
      </div>
    </section>
  );
}
