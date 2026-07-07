import type { MetadataRoute } from "next";

const BASE_URL = "https://scribtly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-07-07"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/youtube-script-generator`,
      lastModified: new Date("2026-07-07"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
