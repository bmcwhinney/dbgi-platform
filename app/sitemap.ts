import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { FORMATS, NAV, SECTORS } from "@/types/content";
import { SITE_URL, articleHref } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    ...NAV.map((item) => item.href),
    ...FORMATS.map((f) => `/journal/format/${f.slug}`),
    ...SECTORS.map((s) => `/sectors/${s.slug}`),
    "/fieldwork/concepts/morne",
    "/about",
  ];

  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...getAllArticles().map((article) => ({
      url: `${SITE_URL}${articleHref(article)}`,
      lastModified: article.updated ?? article.date,
    })),
  ];
}
