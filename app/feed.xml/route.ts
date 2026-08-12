import { getAllArticles } from "@/lib/articles";
import { articleHref } from "@/lib/urls";

export const dynamic = "force-static";

const SITE_URL = "https://dominicabgi.site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getAllArticles();

  const items = articles
    .map((article) => {
      const url = `${SITE_URL}${articleHref(article)}`;
      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description>${escapeXml(article.standfirst)}</description>
      <author>${escapeXml(article.author)}</author>
      <category>${escapeXml(article.eyebrow)}</category>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>DBGI Platform</title>
    <link>${SITE_URL}</link>
    <description>Dominica Business Growth &amp; Innovation — weekly business news from the nature isle.</description>
    <language>en</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
