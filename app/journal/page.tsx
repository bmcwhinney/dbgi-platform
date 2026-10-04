import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { JournalListing } from "@/components/JournalListing";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "News, analysis, company stories, founder interviews and clearly labelled opinion on business in Dominica.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return <JournalListing title="All stories" articles={getAllArticles()} />;
}
