import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Article, ArticleFrontmatter, SectionSlug, SectorSlug } from "@/types/content";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

let cache: Article[] | null = null;

function loadArticles(): Article[] {
  if (cache) return cache;

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as ArticleFrontmatter;

    return {
      ...frontmatter,
      slug,
      readTime: frontmatter.readTime ?? readingTime(content).text.replace("read", "").trim(),
      content,
    } satisfies Article;
  });

  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  cache = articles;
  return articles;
}

export function getAllArticles(): Article[] {
  return loadArticles();
}

export function getArticlesBySection(section: SectionSlug): Article[] {
  return loadArticles().filter((a) => a.section === section);
}

export function getArticlesBySector(sector: SectorSlug): Article[] {
  return loadArticles().filter((a) => a.sector === sector);
}

export function getArticle(section: string, slug: string): Article | undefined {
  return loadArticles().find((a) => a.section === section && a.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return loadArticles().find((a) => a.slug === slug);
}

export interface HomepageLayout {
  lead?: Article;
  mid?: Article;
  side: Article[];
  bottom: Article[];
}

/**
 * Featured articles are pinned to the lead/mid slots ahead of recency;
 * everything else falls back to newest-first.
 */
export function getHomepageLayout(): HomepageLayout {
  const sorted = loadArticles();

  const lead = sorted.find((a) => a.featured) ?? sorted[0];
  const afterLead = sorted.filter((a) => a.slug !== lead?.slug);

  const mid = afterLead.find((a) => a.featured) ?? afterLead[0];
  const rest = afterLead.filter((a) => a.slug !== mid?.slug);

  return {
    lead,
    mid,
    side: rest.slice(0, 4),
    bottom: rest.slice(4, 7),
  };
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const all = loadArticles().filter((a) => a.slug !== article.slug);

  const bySector = article.sector
    ? all.filter((a) => a.sector === article.sector)
    : [];
  const bySection = all.filter(
    (a) => a.section === article.section && !bySector.includes(a)
  );
  const rest = all.filter((a) => !bySector.includes(a) && !bySection.includes(a));

  return [...bySector, ...bySection, ...rest].slice(0, limit);
}

export interface SearchableArticle {
  title: string;
  standfirst: string;
  eyebrow: string;
  section: string;
  sector?: string;
  slug: string;
  date: string;
  heroImage: string;
  heroImageAlt: string;
}

export function getSearchIndex(): SearchableArticle[] {
  return loadArticles().map((a) => ({
    title: a.title,
    standfirst: a.standfirst,
    eyebrow: a.eyebrow,
    section: a.section,
    sector: a.sector,
    slug: a.slug,
    date: a.date,
    heroImage: a.heroImage,
    heroImageAlt: a.heroImageAlt,
  }));
}
