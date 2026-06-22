import type { MetadataRoute } from "next";

const BASE_URL = "https://scribtly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/how-to-write-a-video-script`,
      lastModified: new Date("2026-06-22"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
