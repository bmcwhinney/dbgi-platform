import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SECTORS } from "@/types/content";
import { getArticlesBySector } from "@/lib/articles";
import { ListingCard } from "@/components/ArticleCards";
import { SectorStrip } from "@/components/SectorStrip";

export function generateStaticParams() {
  return SECTORS.map((s) => ({ sector: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>;
}): Promise<Metadata> {
  const { sector: slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);
  if (!sector) return {};

  return {
    title: sector.label,
    description: `${sector.scope} ${sector.questions}`,
    alternates: { canonical: `/sectors/${sector.slug}` },
    openGraph: { title: `${sector.label} | DBGI Platform`, description: sector.scope },
  };
}

export default async function SectorPage({ params }: { params: Promise<{ sector: string }> }) {
  const { sector: slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);
  if (!sector) notFound();

  const articles = getArticlesBySector(sector.slug);

  return (
    <>
      <div className="listing-header">
        <div className="listing-eyebrow">Sector</div>
        <h1 className="listing-title serif-text">{sector.label}</h1>
        <p className="listing-standfirst">{sector.scope}</p>
      </div>

      <section className="spec-section">
        <div className="spec-label">The questions we pursue</div>
        <p className="spec-lede serif-text">{sector.questions}</p>
      </section>

      {articles.length > 0 ? (
        <div className="listing-grid">
          {articles.map((article) => (
            <ListingCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="listing-empty">No reporting published in this sector yet.</p>
      )}

      <SectorStrip active={sector.slug} />
    </>
  );
}
