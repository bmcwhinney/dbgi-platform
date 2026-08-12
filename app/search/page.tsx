import type { Metadata } from "next";
import { getSearchIndex } from "@/lib/articles";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search DBGI's coverage of Dominican business, founders, and innovation.",
  alternates: { canonical: "/search" },
};

export default function SearchPage() {
  const articles = getSearchIndex();
  return <SearchClient articles={articles} />;
}
