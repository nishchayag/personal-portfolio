import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate?secret=...
 *
 * Lets a project repo (or a manual curl) ask Vercel to refresh the cached
 * `portfolio.json` / GitHub facts right away, instead of waiting for the
 * daily ISR revalidation. Requires REVALIDATE_SECRET to be set and matched;
 * without it (or with a wrong value) the endpoint always 401s.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.nextUrl.searchParams.get("secret");

  if (!secret || !provided || provided !== secret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  // "max" clears the tag immediately regardless of the fetch's own revalidate window.
  revalidateTag("projects", "max");
  return NextResponse.json({ revalidated: true });
}
