import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "DBGI is a business publication and intelligence platform focused on Dominica, and home to Fieldwork Dominica, its advisory and venture development arm.",
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
        DBGI, Dominica Business Growth &amp; Innovation, is a business publication and
        intelligence platform focused on Dominica. It exists to improve understanding of the
        island&apos;s business landscape, for local operators, diaspora professionals and
        prospective international partners.
      </p>

      <p>
        The focus is Dominica. Regional and international developments enter the coverage when
        they affect business on the island.
      </p>

      <h2>What we publish</h2>
      <p>
        The <Link href="/journal">Journal</Link> carries news reports that establish what changed,
        analysis that explains the business implications, profiles of companies and founders, and
        sector briefings. Opinion is labelled and attributed to its author.{" "}
        <Link href="/sectors">Sectors</Link> gathers the reporting by industry, with the questions
        pursued in each. <Link href="/opportunities">Opportunities</Link> is reserved for
        researched propositions that meet a stated evidence standard.
      </p>

      <h2>Fieldwork Dominica</h2>
      <p>
        <Link href="/fieldwork">Fieldwork Dominica</Link> is DBGI&apos;s advisory and venture development arm. It
        takes on commissioned research, advisory and concept development, and develops original
        concepts of its own, the first of which is Morne.
      </p>

      <h2>How the two are kept apart</h2>
      <p>
        Fieldwork&apos;s interests are disclosed in any coverage they touch. Sponsored work and
        opinion are labelled. Client information stays confidential and separate from the
        newsroom. A positive story still explains the constraints that affect its conclusion, and
        paying for Fieldwork work does not buy favourable coverage.
      </p>
    </div>
  );
}
