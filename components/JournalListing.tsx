import Link from "next/link";
import { FORMATS, type Article, type FormatSlug } from "@/types/content";
import { ListingCard } from "./ArticleCards";
import { SectorStrip } from "./SectorStrip";

export function JournalListing({
  title,
  articles,
  active,
}: {
  title: string;
  articles: Article[];
  active?: FormatSlug;
}) {
  return (
    <>
      <div className="listing-header">
        <div className="listing-eyebrow">Journal</div>
        <h1 className="listing-title serif-text">{title}</h1>
        <nav className="pill-row" aria-label="Journal formats">
          <Link href="/journal" className={active ? "sector-pill" : "sector-pill active"}>
            All
          </Link>
          {FORMATS.map((format) => (
            <Link
              key={format.slug}
              href={`/journal/format/${format.slug}`}
              className={format.slug === active ? "sector-pill active" : "sector-pill"}
            >
              {format.series}
            </Link>
          ))}
        </nav>
      </div>

      {articles.length > 0 ? (
        <div className="listing-grid">
          {articles.map((article) => (
            <ListingCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="listing-empty">Nothing published in this series yet.</p>
      )}

      <SectorStrip />
    </>
  );
}
