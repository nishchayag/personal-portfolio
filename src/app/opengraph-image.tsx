import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#ff5b1f";

/** The share card, in the site's signature look: expanded Archivo, the badge, one orange dot. */
export default async function Image() {
  // Satori can't use a variable font's width axis, so these are static Archivo instances.
  const [expanded, regular] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/archivo-expanded-800.ttf")),
    readFile(join(process.cwd(), "src/app/_og/archivo-400.ttf")),
  ]);
  const [first, ...rest] = profile.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "72px 88px",
          fontFamily: "Archivo",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="30" fill="#111113" stroke="#3a3a3c" strokeWidth="1" />
          <g fill="#f5f5f7">
            <rect x="19" y="19" width="7.5" height="26" />
            <rect x="37.5" y="19" width="7.5" height="26" />
            <path d="M19 19H26.5L45 45H37.5Z" />
          </g>
          <circle cx="50" cy="14" r="6" fill={ACCENT} />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Archivo Expanded",
              fontSize: 118,
              lineHeight: 0.95,
              letterSpacing: -5,
              color: "#f5f5f7",
            }}
          >
            <span>{first}</span>
            <span style={{ display: "flex" }}>
              {rest.join(" ")}
              <span style={{ color: ACCENT }}>.</span>
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 36, maxWidth: 860, fontSize: 32, lineHeight: 1.3, color: "#86868b" }}>
            {profile.intro}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo Expanded", data: expanded, weight: 800, style: "normal" },
      ],
    },
  );
}
