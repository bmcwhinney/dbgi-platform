import type { Article } from "@/types/content";

const SITE_URL = "https://dominicabgi.site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DBGI Platform",
    alternateName: "Dominica Business Growth & Innovation",
    url: SITE_URL,
    logo: `${SITE_URL}/images/dbgi-favicon.png`,
    description:
      "Weekly business news, founder stories, and sector coverage from Dominica and the wider Caribbean.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DBGI Platform",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({ article }: { article: Article }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.standfirst,
    image: [`${SITE_URL}${article.heroImage}`],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author,
      ...(article.authorRole ? { jobTitle: article.authorRole } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "DBGI Platform",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/dbgi-favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${article.section}/${article.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
