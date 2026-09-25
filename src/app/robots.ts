import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/preview",
    },
    sitemap: "https://www.nishchayag.com/sitemap.xml",
  };
}
