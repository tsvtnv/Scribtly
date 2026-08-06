import type { MetadataRoute } from "next";

const BASE_URL = "https://scribtly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-07-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog/how-to-write-linkedin-connection-requests`,
      lastModified: new Date("2026-07-22"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare/scribtly-vs-expandi`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare/scribtly-vs-dripify`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
