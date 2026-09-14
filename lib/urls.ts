import type { Article } from "@/types/content";

export const SITE_URL = "https://dominicabgi.site";

export function articleHref(article: Pick<Article, "section" | "slug">): string {
  return `/${article.section}/${article.slug}`;
}

export function absoluteArticleUrl(article: Pick<Article, "section" | "slug">): string {
  return `${SITE_URL}${articleHref(article)}`;
}
