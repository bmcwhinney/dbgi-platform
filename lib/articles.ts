import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  articleEyebrow,
  type Article,
  type ArticleFrontmatter,
  type FormatSlug,
  type SectorSlug,
} from "@/types/content";

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

export function getArticlesByFormat(format: FormatSlug): Article[] {
  return loadArticles().filter((a) => a.format === format);
}

export function getArticlesBySector(sector: SectorSlug): Article[] {
  return loadArticles().filter((a) => a.sector === sector);
}

export function getArticle(slug: string): Article | undefined {
  return loadArticles().find((a) => a.slug === slug);
}

export interface HomepageLayout {
  lead?: Article;
  mid?: Article;
  midSecondary?: Article;
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
    midSecondary: rest[0],
    side: rest.slice(1, 5),
    bottom: rest.slice(5, 8),
  };
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const all = loadArticles().filter((a) => a.slug !== article.slug);

  const bySector = article.sector ? all.filter((a) => a.sector === article.sector) : [];
  const byFormat = all.filter((a) => a.format === article.format && !bySector.includes(a));
  const rest = all.filter((a) => !bySector.includes(a) && !byFormat.includes(a));

  return [...bySector, ...byFormat, ...rest].slice(0, limit);
}

export interface SearchableArticle {
  title: string;
  standfirst: string;
  eyebrow: string;
  slug: string;
  heroImage: string;
  heroImageAlt: string;
}

export function getSearchIndex(): SearchableArticle[] {
  return loadArticles().map((a) => ({
    title: a.title,
    standfirst: a.standfirst,
    eyebrow: articleEyebrow(a),
    slug: a.slug,
    heroImage: a.heroImage,
    heroImageAlt: a.heroImageAlt,
  }));
}
