import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SECTIONS, SECTORS, sectionLabel, type SectionSlug } from "@/types/content";
import { getArticlesBySection, getArticlesBySector } from "@/lib/articles";
import { ListingCard } from "@/components/ArticleCards";
import { SectorStrip } from "@/components/SectorStrip";

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const label = sectionLabel(section);
  const description =
    section === "sectors"
      ? "Browse DBGI coverage by industry: clean energy, agribusiness, tourism, tech & digital, and the blue economy."
      : `The latest ${label.toLowerCase()} coverage from DBGI, Dominica's business and innovation platform.`;

  return {
    title: label,
    description,
    alternates: { canonical: `/${section}` },
    openGraph: { title: `${label} | DBGI Platform`, description },
  };
}

function SectorHub() {
  return (
    <>
      <div className="listing-header">
        <div className="listing-eyebrow">Directory</div>
        <h1 className="listing-title serif-text">Sectors</h1>
      </div>

      <div className="sector-hub-grid">
        {SECTORS.map((sector) => {
          const count = getArticlesBySector(sector.slug).length;
          return (
            <Link key={sector.slug} href={`/sector/${sector.slug}`} className="sector-hub-card">
              <div className="sector-hub-title serif-text">{sector.label}</div>
              <div className="sector-hub-count">
                {count} {count === 1 ? "story" : "stories"}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const isValid = SECTIONS.some((s) => s.slug === section);
  if (!isValid) notFound();

  if (section === "sectors") {
    return <SectorHub />;
  }

  const articles = getArticlesBySection(section as SectionSlug);
  const label = sectionLabel(section);

  return (
    <>
      <div className="listing-header">
        <div className="listing-eyebrow">Section</div>
        <h1 className="listing-title serif-text">{label}</h1>
      </div>

      {articles.length > 0 ? (
        <div className="listing-grid">
          {articles.map((article) => (
            <ListingCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="listing-empty">New {label.toLowerCase()} stories are on the way.</p>
      )}

      <SectorStrip />
    </>
  );
}
