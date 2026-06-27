import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://scribtly.com";

  return [
    {
      url: base,
      lastModified: new Date("2026-06-27"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/templates/linkedin-outreach-message-templates`,
      lastModified: new Date("2026-06-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
