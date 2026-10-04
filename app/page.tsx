import { getHomepageLayout } from "@/lib/articles";
import { LeadCard, MidCard, MidTextCard, SideItem, BottomCard } from "@/components/ArticleCards";
import { FieldworkFeature } from "@/components/FieldworkFeature";
import { SectorStrip } from "@/components/SectorStrip";
import { WebsiteJsonLd } from "@/components/JsonLd";

export default function HomePage() {
  const { lead, mid, midSecondary, side, bottom } = getHomepageLayout();

  return (
    <>
      <WebsiteJsonLd />

      <main className="main-grid">
        {lead && <LeadCard article={lead} />}

        <article className="mid-col">
          {mid && <MidCard article={mid} />}
          {midSecondary && (
            <>
              <hr className="mid-rule" />
              <MidTextCard article={midSecondary} />
            </>
          )}
        </article>

        <aside className="side-col">
          <h3 className="side-label">Also this week</h3>
          {side.map((article) => (
            <SideItem key={article.slug} article={article} />
          ))}
        </aside>
      </main>

      <SectorStrip />

      <FieldworkFeature />

      <footer className="bottom-grid">
        {bottom.map((article) => (
          <BottomCard key={article.slug} article={article} />
        ))}
      </footer>
    </>
  );
}
