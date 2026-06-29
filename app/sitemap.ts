import type { MetadataRoute } from "next";

const baseUrl = "https://scribtly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-06-29"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/how-to-write-a-video-script`,
      lastModified: new Date("2026-06-29"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
