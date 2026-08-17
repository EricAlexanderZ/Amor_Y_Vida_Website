import type { MetadataRoute } from "next";
import { site, serviceAreas } from "@/lib/site";

/**
 * Static routes carry a higher priority than the city pages; the city pages are
 * numerous and exist to catch long-tail local queries, not to outrank the home
 * page. lastModified uses build time, which is accurate for a static site.
 */
const ROUTES = [
  { path: "", priority: 1.0 },
  { path: "/services", priority: 0.9 },
  { path: "/activities", priority: 0.9 },
  { path: "/gallery", priority: 0.8 },
  { path: "/videos", priority: 0.8 },
  { path: "/about", priority: 0.8 },
  { path: "/eligibility", priority: 0.9 },
  { path: "/insurance", priority: 0.8 },
  { path: "/admissions", priority: 0.8 },
  { path: "/faq", priority: 0.7 },
  { path: "/contact", priority: 0.9 },
  { path: "/areas-we-serve", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...ROUTES.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.priority,
    })),
    ...serviceAreas.map((a) => ({
      url: `${site.url}/areas-we-serve/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
