import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Researched business propositions in Dominica, each with its stage, evidence, constraints and next decision made explicit.",
  alternates: { canonical: "/opportunities" },
};

const REQUIRED = [
  {
    field: "Proposition and participant",
    establishes:
      "What could be built, supplied, expanded or partnered on, and who is suited to take part.",
  },
  {
    field: "Customer and demand",
    establishes:
      "The intended buyer and sales channel, supported by buyer research, market evidence or clearly stated assumptions.",
  },
  {
    field: "Dominica connection",
    establishes:
      "The resource, capability, business, location or infrastructure involved, and why it matters commercially.",
  },
  {
    field: "Existing position",
    establishes:
      "What exists today, who controls the asset or concept, and the status of permissions and relationships.",
  },
  {
    field: "Economics and constraints",
    establishes:
      "Known cost drivers, supply and logistics limits, competition and material dependencies, with estimates and unknowns marked.",
  },
  {
    field: "Stage and next decision",
    establishes:
      "Whether this is exploratory research, concept development or an active project, and what evidence or partner is needed next.",
  },
  {
    field: "Evidence and disclosure",
    establishes:
      "Sources, last review date, a named contact, and any DBGI ownership, client, sponsor or referral interest.",
  },
];

const STAGES = [
  {
    stage: "Exploratory thesis",
    meaning: "A plausible proposition with a documented research question and acknowledged gaps.",
  },
  {
    stage: "Concept in development",
    meaning:
      "A defined proposition with design or development work completed and a stated validation plan.",
  },
  {
    stage: "Active project seeking a partner",
    meaning:
      "A named project owner has authorised the approach and specified the participation sought.",
  },
];

export default function OpportunitiesPage() {
  return (
    <>
      <div className="listing-header">
        <div className="listing-eyebrow">Opportunities</div>
        <h1 className="listing-title serif-text">Researched business propositions</h1>
        <p className="listing-standfirst">
          A natural resource, a positive headline or an attractive product image is a starting
          point. It becomes an opportunity brief when the customer, the business model, the
          evidence and the next decision are explicit.
        </p>
      </div>

      <section className="spec-section">
        <div className="spec-label">Published briefs</div>
        <p className="spec-lede serif-text">No brief has been published yet.</p>
        <p className="spec-text">
          A brief appears here only when it meets the standard below. The first proposition being
          worked up is <Link href="/fieldwork/concepts/morne">Morne</Link>, a premium water concept
          from Fieldwork Dominica, which is DBGI&apos;s own commercial division.
        </p>
      </section>

      <section className="spec-section">
        <div className="spec-label">What a brief must establish</div>
        <dl className="spec-list">
          {REQUIRED.map((item) => (
            <div key={item.field} className="spec-row">
              <dt>{item.field}</dt>
              <dd>{item.establishes}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="spec-section">
        <div className="spec-label">Publication stages</div>
        <dl className="spec-list">
          {STAGES.map((item) => (
            <div key={item.stage} className="spec-row">
              <dt>{item.stage}</dt>
              <dd>{item.meaning}</dd>
            </div>
          ))}
        </dl>
        <p className="spec-text">None of these labels alone establishes investment readiness.</p>
      </section>

      <section className="spec-section">
        <div className="spec-label">Have a project to assess?</div>
        <p className="spec-text">
          Research into a specific decision is commissioned through{" "}
          <Link href="/fieldwork">Fieldwork Dominica</Link>.
        </p>
      </section>
    </>
  );
}
