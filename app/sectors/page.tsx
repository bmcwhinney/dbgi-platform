import type { Metadata } from "next";
import Link from "next/link";
import { SECTORS } from "@/types/content";
import { getArticlesBySector } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "The sectors DBGI covers in Dominica, the business questions pursued in each and the reporting so far.",
  alternates: { canonical: "/sectors" },
};

export default function SectorsPage() {
  return (
    <>
      <div className="listing-header">
        <div className="listing-eyebrow">Directory</div>
        <h1 className="listing-title serif-text">Sectors</h1>
        <p className="listing-standfirst">
          Where DBGI concentrates its reporting, and the business questions it pursues in each.
        </p>
      </div>

      <div className="sector-hub-grid">
        {SECTORS.map((sector) => {
          const count = getArticlesBySector(sector.slug).length;
          return (
            <Link key={sector.slug} href={`/sectors/${sector.slug}`} className="sector-hub-card">
              <div className="sector-hub-title serif-text">{sector.label}</div>
              <p className="sector-hub-scope">{sector.scope}</p>
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
