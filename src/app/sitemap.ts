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
  ];
}
