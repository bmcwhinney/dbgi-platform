export const NAV = [
  { href: "/journal", label: "Journal" },
  { href: "/sectors", label: "Sectors" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/fieldwork", label: "Fieldwork" },
] as const;

// `label` names a single article; `series` names the collection in the Journal.
export const FORMATS = [
  { slug: "news", label: "News", series: "News" },
  { slug: "analysis", label: "Analysis", series: "Analysis" },
  { slug: "profile", label: "Profile", series: "People" },
  { slug: "briefing", label: "Briefing", series: "Briefings" },
  { slug: "opinion", label: "Opinion", series: "Opinion" },
] as const;

export type FormatSlug = (typeof FORMATS)[number]["slug"];

export const SECTORS = [
  {
    slug: "food-and-agriculture",
    label: "Food and agriculture",
    scope: "Crops, fisheries and food products, from fine cocoa to sea moss.",
    questions:
      "Who buys, what quality is required, where processing adds value and whether production can meet demand.",
  },
  {
    slug: "natural-ingredients",
    label: "Natural ingredients",
    scope:
      "Plant-derived oils and extracts such as bay oil. Cannabis is covered as a reporting topic, not as an assumed investable market.",
    questions:
      "Who produces and buys, what processing is possible and which market or policy conditions matter.",
  },
  {
    slug: "tourism-and-hospitality",
    label: "Tourism and hospitality",
    scope: "Operators, attractions and the local suppliers around them.",
    questions:
      "How operators earn revenue, what visitors spend on, which local suppliers participate and what limits growth.",
  },
  {
    slug: "energy",
    label: "Energy",
    scope: "Power generation and supply, led by geothermal.",
    questions:
      "Project status, delivery arrangements and the evidence for any effect on business costs or reliability.",
  },
  {
    slug: "infrastructure-and-connectivity",
    label: "Infrastructure and connectivity",
    scope: "Airports, transport links and the projects that change access to the island.",
    questions:
      "What is funded, being built or operating, and what changes for access, logistics and business activity.",
  },
] as const;

export type SectorSlug = (typeof SECTORS)[number]["slug"];

export interface ArticleVideo {
  playbackId: string;
  title?: string;
}

export interface ArticleSource {
  label: string;
  url: string;
}

export interface ArticleFrontmatter {
  title: string;
  format: FormatSlug;
  sector?: SectorSlug;
  standfirst: string;
  author: string;
  authorRole?: string;
  authorImage?: string;
  date: string;
  updated?: string;
  readTime?: string;
  heroImage?: string;
  heroImageAlt?: string;
  imageCredit?: string;
  sources?: ArticleSource[];
  disclosure?: string;
  video?: ArticleVideo;
  featured?: boolean;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  readTime: string;
  content: string;
}

export interface ViewpointFrontmatter {
  name: string;
  role: string;
  image: string;
  relatedSlug?: string;
  href?: string;
}

export interface Viewpoint extends ViewpointFrontmatter {
  slug: string;
  quote: string;
}

export function formatLabel(slug: string): string {
  return FORMATS.find((f) => f.slug === slug)?.label ?? slug;
}

export function sectorLabel(slug: string): string {
  return SECTORS.find((s) => s.slug === slug)?.label ?? slug;
}

/** Opinion is always labelled as such; otherwise a card leads with its sector. */
export function articleEyebrow(article: Pick<Article, "format" | "sector">): string {
  if (article.format === "opinion" || !article.sector) return formatLabel(article.format);
  return sectorLabel(article.sector);
}
