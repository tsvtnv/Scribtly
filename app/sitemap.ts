import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://scribtly.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-06-24"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-06-24"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/how-to-write-scripts-in-a-clients-voice`,
      lastModified: new Date("2026-06-24"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
