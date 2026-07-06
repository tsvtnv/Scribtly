import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://scribtly.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date("2026-07-06"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/blog/what-is-a-video-hook`,
      lastModified: new Date("2026-07-06"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  return staticRoutes;
}
