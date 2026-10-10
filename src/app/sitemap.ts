import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.nishchayag.com";

  // Single-page site: /about, /projects, /skills are in-page anchors on "/",
  // not separate routes, so they don't belong in the sitemap.
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // The vibe menu is its own app, served here through a rewrite (see next.config.ts).
    {
      url: `${baseUrl}/vibes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
