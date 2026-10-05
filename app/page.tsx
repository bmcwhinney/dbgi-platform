import { getHomepageLayout } from "@/lib/articles";
import { LeadCard, MidCard, SideItem, BottomCard } from "@/components/ArticleCards";
import { FieldworkFeature } from "@/components/FieldworkFeature";
import { OpinionBox } from "@/components/OpinionBox";
import { getLatestViewpoint } from "@/lib/viewpoints";
import { SectorStrip } from "@/components/SectorStrip";
import { KeyFigures } from "@/components/KeyFigures";
import { SectionHeader } from "@/components/SectionHeader";
import { WebsiteJsonLd } from "@/components/JsonLd";

export default function HomePage() {
  const { lead, mid, side, bottom } = getHomepageLayout();
  const viewpoint = getLatestViewpoint();

  return (
    <>
      <WebsiteJsonLd />

      <main className="main-grid">
        {lead && <LeadCard article={lead} />}

        <article className="mid-col">
          {mid && <MidCard article={mid} />}
          {viewpoint && <OpinionBox viewpoint={viewpoint} />}
        </article>

        <aside className="side-col">
          <h3 className="side-label">Also this week</h3>
          {side.map((article) => (
            <SideItem key={article.slug} article={article} />
          ))}
          <KeyFigures />
        </aside>
      </main>

      <SectorStrip />

      {bottom.length > 0 && (
        <>
          <SectionHeader title="Latest from the Journal" href="/journal" />
          <div className={`bottom-grid bottom-grid-${bottom.length}`}>
            {bottom.map((article) => (
              <BottomCard key={article.slug} article={article} />
            ))}
          </div>
        </>
      )}

      <FieldworkFeature />
    </>
  );
}
