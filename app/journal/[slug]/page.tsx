import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticle, getRelatedArticles } from "@/lib/articles";
import { formatLabel, sectorLabel } from "@/types/content";
import { VideoEmbed } from "@/components/VideoEmbed";
import { mdxComponents } from "@/lib/mdx-components";
import { ClockIcon } from "@/components/icons";
import { SectorStrip } from "@/components/SectorStrip";
import { ListingCard } from "@/components/ArticleCards";
import { ArticleJsonLd } from "@/components/JsonLd";
import { ShareBar } from "@/components/ShareBar";
import { articleHref, absoluteArticleUrl } from "@/lib/urls";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.standfirst,
    alternates: { canonical: articleHref(article) },
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.standfirst,
      images: [{ url: article.heroImage, alt: article.heroImageAlt }],
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: [article.author],
      section: formatLabel(article.format),
      tags: article.sector ? [sectorLabel(article.sector)] : undefined,
      url: articleHref(article),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.standfirst,
      images: [article.heroImage],
    },
  };
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);

  return (
    <article>
      <ArticleJsonLd article={article} />
      <div className="article-hero">
        <span className="eyebrow">
          {formatLabel(article.format)}
          {article.sector && (
            <>
              {" "}
              &middot; <Link href={`/sectors/${article.sector}`}>{sectorLabel(article.sector)}</Link>
            </>
          )}
        </span>
        <h1 className="lead-headline">{article.title}</h1>
        <p className="lead-standfirst">{article.standfirst}</p>

        <div className="article-byline">
          {article.authorImage && (
            <div className="article-byline-avatar">
              <Image src={article.authorImage} alt={article.author} width={40} height={40} />
            </div>
          )}
          <div>
            <div className="article-byline-name">{article.author}</div>
            <div className="article-byline-meta">
              {article.authorRole ? `${article.authorRole} · ` : ""}
              {formatDate(article.date)}
              {article.updated ? ` · Updated ${formatDate(article.updated)}` : ""}
            </div>
          </div>
          <div className="read-meta" style={{ marginLeft: "auto" }}>
            <ClockIcon />
            <span>{article.readTime} read</span>
          </div>
        </div>

        <ShareBar url={absoluteArticleUrl(article)} title={article.title} />

        <div className="article-media">
          {article.video ? (
            <VideoEmbed
              playbackId={article.video.playbackId}
              title={article.video.title ?? article.title}
              poster={article.heroImage}
            />
          ) : (
            <Image
              src={article.heroImage}
              alt={article.heroImageAlt}
              width={1400}
              height={900}
              priority
            />
          )}
        </div>
        {article.imageCredit && <p className="article-credit">{article.imageCredit}</p>}
      </div>

      <div className="article-body">
        <MDXRemote source={article.content} components={mdxComponents} />

        {article.sources && article.sources.length > 0 && (
          <aside className="article-note" aria-label="Sources">
            <div className="article-note-label">Sources</div>
            <ul>
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} rel="noopener noreferrer" target="_blank">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {article.disclosure && (
          <aside className="article-note" aria-label="Disclosure">
            <div className="article-note-label">Disclosure</div>
            <p>{article.disclosure}</p>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="related-section" aria-label="Related stories">
          <div className="related-section-label">More from the Journal</div>
          <div className="related-grid">
            {related.map((r) => (
              <ListingCard key={r.slug} article={r} />
            ))}
          </div>
        </section>
      )}

      <SectorStrip active={article.sector} />
    </article>
  );
}
