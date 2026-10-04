import type { Article } from "@/types/content";

export const SITE_URL = "https://dominicabgi.site";

export function articleHref(article: Pick<Article, "slug">): string {
  return `/journal/${article.slug}`;
}

export function absoluteArticleUrl(article: Pick<Article, "slug">): string {
  return `${SITE_URL}${articleHref(article)}`;
}
