import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "DBGI is Dominica's business and innovation platform, covering the founders, capital, and industries building the nature isle's economy.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="prose-page">
      <div className="listing-eyebrow">About</div>
      <h1 className="listing-title serif-text" style={{ marginBottom: 24 }}>
        Business news for the nature isle
      </h1>

      <p>
        DBGI, Dominica Business Growth &amp; Innovation, covers the people and industries
        building Dominica's economy: the founders raising capital, the sectors drawing new
        investment, and the policy decisions that shape what gets built here next.
      </p>

      <p>
        We report on clean energy, agribusiness, tourism, technology, and the blue economy, the
        industries where Dominica's natural assets and its entrepreneurs are increasingly working
        in the same direction rather than at odds with each other. Our brief is straightforward:
        cover the island's business story with the same rigour and skepticism you'd expect from
        coverage of any market, without treating scale as a ceiling on ambition.
      </p>

      <h2>What we cover</h2>
      <p>
        News on the industries and policy shifts moving the island's economy. Opportunities:
        funding, grants, and the programmes built to get founders from idea to execution.
        Founders: the people building companies from Dominica, and what that actually requires.
        Sector-by-sector coverage of clean energy, agribusiness, tourism, tech, and the blue
        economy. Dispatches from island life and the ideas taking shape before they become
        companies.
      </p>

      <h2>Get in touch</h2>
      <p>
        Have a story, a correction, or something we should be covering? Reach the newsroom through
        the contact details on our social channels, linked from the masthead.
      </p>
    </div>
  );
}
