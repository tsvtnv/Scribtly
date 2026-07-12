import type { MetadataRoute } from "next";

const BASE_URL = "https://scribtly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-07-12"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/glossary/what-is-a-video-hook`,
      lastModified: new Date("2026-07-12"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
