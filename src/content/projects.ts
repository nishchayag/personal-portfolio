// Overlays live, remote content onto the local project data in profile.ts.
//
// Each project can opt in by setting `repo` (an "owner/name" GitHub slug). When
// it does, we fetch a `portfolio.json` manifest from that repo's default branch
// and shallow-merge whatever validates over the local project. The local data
// in profile.ts is always the fallback: a missing repo, a 404, a timeout, or an
// invalid manifest all just mean "use the local copy".
//
// The flagship project additionally gets a few "live facts" (commit count,
// first-commit date, test file count) pulled from the GitHub REST API.

import { featuredProjects, otherProjects, type Project } from "./profile";

const REVALIDATE_SECONDS = 86400;
const FETCH_TIMEOUT_MS = 5000;
const PROJECTS_TAG = "projects";
const TEST_FILE_RE = /\.(test|spec)\.[cm]?[jt]sx?$/;

function isOffline() {
  return process.env.PORTFOLIO_OFFLINE === "1";
}

function warnDev(repo: string, message: string) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[projects] ${repo}: ${message}`);
  }
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

// ---- portfolio.json manifest -----------------------------------------------

type RemoteManifest = {
  title?: string;
  summary?: string;
  highlights?: string[];
  stack?: string[];
  details?: { label: string; body: string }[];
  demoUrl?: string;
  kind?: Project["kind"];
};

const ALLOWED_KINDS: Project["kind"][] = ["Product", "Client work", "Experiment"];

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function isDetailArray(value: unknown): value is { label: string; body: string }[] {
  return (
    Array.isArray(value) &&
    value.every(
      (d) =>
        typeof d === "object" &&
        d !== null &&
        typeof (d as Record<string, unknown>).label === "string" &&
        typeof (d as Record<string, unknown>).body === "string",
    )
  );
}

/**
 * Hand-written type guard for the portfolio.json manifest. Unknown fields are
 * simply never read (so they're implicitly ignored); a *known* field with the
 * wrong shape fails the whole file, so we never merge a half-valid manifest.
 */
function isRemoteManifest(value: unknown): value is RemoteManifest {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  if (v.title !== undefined && typeof v.title !== "string") return false;
  if (v.summary !== undefined && typeof v.summary !== "string") return false;
  if (v.highlights !== undefined && !isStringArray(v.highlights)) return false;
  if (v.stack !== undefined && !isStringArray(v.stack)) return false;
  if (v.details !== undefined && !isDetailArray(v.details)) return false;
  if (v.demoUrl !== undefined && typeof v.demoUrl !== "string") return false;
  if (v.kind !== undefined && !ALLOWED_KINDS.includes(v.kind as Project["kind"])) return false;
  return true;
}

async function fetchManifest(repo: string): Promise<RemoteManifest | null> {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${repo}/HEAD/portfolio.json`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [PROJECTS_TAG] },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) {
      warnDev(repo, `portfolio.json fetch failed (${res.status})`);
      return null;
    }
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      warnDev(repo, "portfolio.json is not valid JSON");
      return null;
    }
    if (!isRemoteManifest(data)) {
      warnDev(repo, "portfolio.json failed validation");
      return null;
    }
    return data;
  } catch (err) {
    warnDev(repo, `portfolio.json fetch threw: ${errorMessage(err)}`);
    return null;
  }
}

/** Shallow-merges valid remote fields over the local project. slug, image, gallery, flagship and repo never change. */
export function mergeProject(local: Project, remote: RemoteManifest): Project {
  return {
    ...local,
    ...(remote.title !== undefined ? { title: remote.title } : {}),
    ...(remote.summary !== undefined ? { summary: remote.summary } : {}),
    ...(remote.highlights !== undefined ? { highlights: remote.highlights } : {}),
    ...(remote.stack !== undefined ? { stack: remote.stack } : {}),
    ...(remote.details !== undefined ? { details: remote.details } : {}),
    ...(remote.demoUrl !== undefined ? { demoUrl: remote.demoUrl } : {}),
    ...(remote.kind !== undefined ? { kind: remote.kind } : {}),
    slug: local.slug,
    image: local.image,
    gallery: local.gallery,
    flagship: local.flagship,
    repo: local.repo,
  };
}

// ---- Flagship live facts (GitHub REST API) ---------------------------------

function buildGithubHeaders(): Record<string, string> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function fetchGithub(url: string, headers: Record<string, string>) {
  return fetch(url, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS, tags: [PROJECTS_TAG] },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

/** Reads the page number of the rel="last" URL out of a GitHub Link header. */
function parseLastPage(link: string | null): number | null {
  if (!link) return null;
  for (const part of link.split(",")) {
    const match = part.match(/<([^>]+)>;\s*rel="last"/);
    if (!match) continue;
    try {
      const page = new URL(match[1]).searchParams.get("page");
      return page ? Number.parseInt(page, 10) : null;
    } catch {
      return null;
    }
  }
  return null;
}

function firstCommitDate(commits: unknown): string | null {
  if (!Array.isArray(commits) || commits.length === 0) return null;
  const entry = commits[0] as { commit?: { author?: { date?: unknown }; committer?: { date?: unknown } } } | undefined;
  const date = entry?.commit?.author?.date ?? entry?.commit?.committer?.date;
  return typeof date === "string" ? date : null;
}

function countTestFiles(tree: unknown): number {
  const entries = (tree as { tree?: unknown[] } | undefined)?.tree;
  if (!Array.isArray(entries)) return 0;
  return entries.filter((entry) => {
    const path = (entry as { path?: unknown } | undefined)?.path;
    return typeof path === "string" && TEST_FILE_RE.test(path);
  }).length;
}

function roundDownCommits(count: number): string {
  return `${Math.floor(count / 10) * 10}+`;
}

function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
}

/**
 * Live commit count, first-commit date and test-file count for the flagship
 * project, mapped onto its local `facts` labels. Any failure — per fact —
 * keeps that fact's local value.
 */
async function computeFlagshipFacts(project: Project): Promise<Project["facts"]> {
  const localFacts = project.facts ?? [];
  if (!project.repo) return localFacts;

  const repo = project.repo;
  const byLabel = new Map(localFacts.map((f) => [f.label, f.value] as const));
  const issues: string[] = [];
  const headers = buildGithubHeaders();

  let lastPage: number | null = null;
  try {
    const res = await fetchGithub(`https://api.github.com/repos/${repo}/commits?per_page=1`, headers);
    if (!res.ok) throw new Error(`commits ${res.status}`);
    lastPage = parseLastPage(res.headers.get("link"));
    if (lastPage == null) throw new Error("no rel=\"last\" link header");
    byLabel.set("Commits", roundDownCommits(lastPage));
  } catch (err) {
    issues.push(`commit count: ${errorMessage(err)}`);
  }

  if (lastPage != null) {
    try {
      const res = await fetchGithub(`https://api.github.com/repos/${repo}/commits?per_page=1&page=${lastPage}`, headers);
      if (!res.ok) throw new Error(`last page ${res.status}`);
      const commits = await res.json();
      const date = firstCommitDate(commits);
      if (!date) throw new Error("missing commit date");
      byLabel.set("Since", formatMonthYear(new Date(date)));
    } catch (err) {
      issues.push(`first commit date: ${errorMessage(err)}`);
    }
  }

  try {
    const res = await fetchGithub(`https://api.github.com/repos/${repo}/git/trees/HEAD?recursive=1`, headers);
    if (!res.ok) throw new Error(`tree ${res.status}`);
    const tree = await res.json();
    byLabel.set("Test files", String(countTestFiles(tree)));
  } catch (err) {
    issues.push(`test file count: ${errorMessage(err)}`);
  }

  if (issues.length > 0) warnDev(repo, `facts fallback — ${issues.join("; ")}`);

  if (localFacts.length > 0) {
    return localFacts.map((f) => ({ label: f.label, value: byLabel.get(f.label) ?? f.value }));
  }
  const order = ["Test files", "Commits", "Since"];
  return order.filter((label) => byLabel.has(label)).map((label) => ({ label, value: byLabel.get(label)! }));
}

// ---- Public API --------------------------------------------------------------

async function resolveProject(project: Project): Promise<Project> {
  let resolved = project;

  if (project.repo) {
    const manifest = await fetchManifest(project.repo);
    if (manifest) resolved = mergeProject(resolved, manifest);
  }

  if (project.flagship && project.repo) {
    resolved = { ...resolved, facts: await computeFlagshipFacts(resolved) };
  }

  return resolved;
}

export async function getProjects(): Promise<{ featured: Project[]; other: Project[] }> {
  if (isOffline()) {
    return { featured: featuredProjects, other: otherProjects };
  }

  const [featured, other] = await Promise.all([
    Promise.all(featuredProjects.map(resolveProject)),
    Promise.all(otherProjects.map(resolveProject)),
  ]);

  return { featured, other };
}
