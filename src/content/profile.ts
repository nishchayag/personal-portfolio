// Single source of truth for portfolio content, used by the redesign variants.
// Facts come from the résumé; anything marked TODO still needs confirming.

export const profile = {
  name: "Nishchay Agarwal",
  role: "Full-stack developer",
  tagline:
    "I build full-stack web apps with React, Next.js and TypeScript — from auth and data models to the last pixel.",
  location: "Jaipur, India",
  availability: "Open to freelance projects and full-time roles",
  email: "nishchay.agar@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1SWiz35qvTJNOflGthhbLyDTNTIjni5Rd/view?usp=sharing",
  socials: [
    { label: "GitHub", href: "https://github.com/nishchayag" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nishchay-agarwal/" },
    { label: "X", href: "https://x.com/nishchay_agar" },
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  highlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  kind: "Product" | "Client work" | "Experiment";
  /** "owner/name" on GitHub. When set, getProjects() overlays live content and facts from that repo. */
  repo?: string;
  /** The one project to lead with and give the deepest treatment. */
  flagship?: boolean;
  /** Longer, verified detail for the flagship case study. */
  details?: { label: string; body: string }[];
  facts?: { label: string; value: string }[];
  /** Extra screenshots (1440x900) for the flagship chapter. */
  gallery?: { src: string; alt: string }[];
};

export const featuredProjects: Project[] = [
  {
    slug: "signalhq",
    title: "SignalHQ",
    flagship: true,
    summary:
      "Anonymous feedback for teams. Organisations, teams and questions get shareable links, so people can say what they really think without signing up.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "NextAuth", "Resend", "Mistral AI", "Zod"],
    highlights: [
      "Multi-tenant model: organisations, teams and questions with full CRUD management and email invitations",
      "Public no-signup pages for anonymous submissions, with independent feedback threads per team",
      "AI features on Mistral: insight summaries, suggested messages and automated moderation",
    ],
    details: [
      { label: "Multi-tenant by design", body: "Users create organisations, invite teammates by email and organise feedback into teams and questions, each with its own shareable public link." },
      { label: "Anonymous, but safe", body: "Responders never need an account. Submissions pass a profanity filter and an AI moderation model before they reach the team, and API routes are rate-limited." },
      { label: "AI where it helps", body: "One isolated AI module on Mistral powers insight summaries, suggested messages and moderation, with the whole feature switchable off when no key is configured." },
      { label: "Keeps teams in the loop", body: "Email verification, password resets and notifications run on Resend with React Email templates, including a daily digest sent by a scheduled job." },
    ],
    facts: [
      { label: "Test files", value: "74" },
      { label: "Commits", value: "130+" },
      { label: "Since", value: "Jul 2025" },
    ],
    demoUrl: "https://signal.nishchayag.com",
    githubUrl: "https://github.com/nishchayag/signalhq",
    repo: "nishchayag/signalhq",
    image: "/work/signalhq.png",
    gallery: [
      { src: "/work/signalhq-features.png", alt: "SignalHQ feature overview: anonymous by design, teams and roles, email invites" },
      { src: "/work/signalhq-flow.png", alt: "SignalHQ onboarding flow: create an organisation, share your link, read the signal" },
    ],
    kind: "Product",
  },
  {
    slug: "doxiqo",
    title: "Doxiqo",
    summary:
      "AI documentation generator that turns uploaded files and media into Markdown docs using the Google Gemini API.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "Gemini API"],
    highlights: [
      "File and media uploads piped into Gemini to generate structured Markdown documentation",
      "User authentication with a per-user generation history so past documents can be revisited",
    ],
    demoUrl: "https://doxiqo.nishchayag.com",
    githubUrl: "https://github.com/nishchayag/doxiqo",
    repo: "nishchayag/doxiqo",
    image: "/work/doxiqo.png",
    kind: "Product",
  },
  {
    slug: "notesify",
    title: "Notesify",
    summary:
      "Full-stack notes app with secure authentication, email-based account verification and password change flows.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Full CRUD for notes behind secure user authentication",
      "Email verification and password change flows",
    ],
    demoUrl: "https://notesify.nishchayag.com",
    githubUrl: "https://github.com/nishchayag/notesify",
    repo: "nishchayag/notesify",
    image: "/work/notesify.png",
    kind: "Product",
  },
  {
    slug: "kaizenn",
    title: "Kaizen",
    summary:
      "Portfolio and lead-generation site designed and built for a freelance client.",
    stack: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    highlights: [
      "Service showcase and lead-generation forms",
      "Fully responsive, shipped to the client's own domain",
    ],
    demoUrl: "https://kaizenn.in/",
    image: "/work/kaizenn.png",
    kind: "Client work",
  },
];

export const otherProjects: Project[] = [
  {
    slug: "feedbacker",
    title: "Feedbacker.io",
    summary:
      "Anonymous feedback platform: create a shareable link and collect honest feedback without revealing who sent it.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Shareable public links that accept submissions without sign-up",
      "Privacy-first design — senders stay anonymous",
    ],
    demoUrl: "https://feedbackerio.nishchayag.com",
    githubUrl: "https://github.com/nishchayag/feedbacker.io",
    repo: "nishchayag/feedbacker.io",
    image: "/work/feedbacker.png",
    kind: "Product",
  },
  { slug: "currency-converter", title: "Currency Converter", summary: "Live exchange-rate converter.", stack: ["JavaScript"], highlights: [], demoUrl: "https://nishchayag.github.io/currency-converter/", kind: "Experiment" },
  { slug: "digital-signature", title: "Digital Signature App", summary: "Draw and download a signature in the browser.", stack: ["JavaScript", "Canvas"], highlights: [], demoUrl: "https://nishchayag.github.io/Digital-Signature-App/", kind: "Experiment" },
  { slug: "connect-4", title: "Connect 4", summary: "Two-player Connect 4 in the browser.", stack: ["JavaScript"], highlights: [], demoUrl: "https://nishchayag.github.io/Connect-4/", kind: "Experiment" },
  { slug: "password-generator", title: "Password Generator", summary: "Configurable random password generator.", stack: ["JavaScript"], highlights: [], demoUrl: "https://nishchayag.github.io/password-generator/", kind: "Experiment" },
  { slug: "newspaper", title: "Newspaper App", summary: "News headlines reader.", stack: ["JavaScript"], highlights: [], demoUrl: "https://nishchayag.github.io/Newspaper-App/", kind: "Experiment" },
  { slug: "key-logger", title: "Key Logger", summary: "Visualises keyboard events as you type.", stack: ["JavaScript"], highlights: [], demoUrl: "https://nishchayag.github.io/Key-Logger/", kind: "Experiment" },
];

export const experience = [
  {
    role: "Software Development Intern",
    org: "Zoolarity Labs",
    period: "Jun 2026 – Present",
    points: [
      "Building web application features in React and Next.js with the engineering team",
      "Coordinated a PostgreSQL 17 migration from a self-managed GCP VM to Cloud SQL to fix recurring connectivity issues",
      "Wrote the migration's technical brief: pg_dump/pg_restore, Cloud SQL Auth Proxy, Private IP and sequence resets",
    ],
  },
  {
    role: "B.Tech, Computer Science and Engineering",
    org: "Manipal University Jaipur",
    period: "Aug 2023 – May 2027",
    points: [],
  },
];

export const skills = {
  Languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS"],
  "Backend & data": ["MongoDB", "Mongoose", "PostgreSQL", "FastAPI", "REST APIs", "Authentication", "Sanity CMS", "Gemini API"],
  Cloud: ["Google Cloud Platform (VM instances, Cloud SQL)"],
  Tools: ["Git", "GitHub", "Claude Code"],
} as const;

export const services = [
  { title: "Full-stack web apps", body: "Auth, databases, APIs and a polished front end — built and deployed end to end." },
  { title: "MVPs for founders", body: "Take an idea to a working, deployed product you can put in front of users." },
  { title: "Sites for small businesses", body: "Fast, responsive marketing sites with lead capture, like the one I built for Kaizen." },
];
