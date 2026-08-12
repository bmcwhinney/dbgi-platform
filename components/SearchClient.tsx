"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SearchableArticle } from "@/lib/articles";
import { SearchIcon } from "./icons";

export function SearchClient({ articles }: { articles: SearchableArticle[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return articles.filter((a) =>
      [a.title, a.standfirst, a.eyebrow].some((field) => field.toLowerCase().includes(q))
    );
  }, [articles, query]);

  return (
    <>
      <div className="search-header">
        <div className="listing-eyebrow">Search</div>
        <h1 className="listing-title serif-text">Find a story</h1>
        <div className="search-input-wrap">
          <SearchIcon />
          <input
            type="search"
            className="search-input"
            placeholder="Search articles by title or topic…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {query.trim() && (
        <p className="search-count">
          {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="listing-grid">
          {results.map((article) => (
            <Link key={article.slug} href={`/${article.section}/${article.slug}`} className="listing-card">
              <div className="mid-image-placeholder">
                <Image
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  width={640}
                  height={420}
                />
              </div>
              <span className="eyebrow">{article.eyebrow}</span>
              <h3 className="listing-card-headline serif-text">{article.title}</h3>
            </Link>
          ))}
        </div>
      )}

      {query.trim() && results.length === 0 && (
        <p className="listing-empty">No stories match &ldquo;{query}&rdquo; yet.</p>
      )}
    </>
  );
}
