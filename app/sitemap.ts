import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://scribtly.com",
      lastModified: new Date("2026-07-05"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://scribtly.com/templates/video-script-template",
      lastModified: new Date("2026-07-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
