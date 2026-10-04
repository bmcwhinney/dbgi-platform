import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Fieldwork Dominica",
  description:
    "Fieldwork Dominica is DBGI's commercial division: commissioned research, site and partner assessment, and brand and venture development for projects in Dominica.",
  alternates: { canonical: "/fieldwork" },
};

const SERVICES = [
  {
    name: "Commercial research",
    decision: "Should we investigate this sector, product or market further?",
    deliverable:
      "An agreed research brief, sourced findings, stakeholder or buyer interviews, assumptions, constraints and a recommendation for the next decision.",
  },
  {
    name: "Site and partner assessment",
    decision: "Which locations or counterparties merit detailed diligence?",
    deliverable:
      "A criteria-based shortlist, documented contact status, access and infrastructure observations, a comparison of options and the specialist diligence still required.",
  },
  {
    name: "Brand and venture development",
    decision: "What should we create, for whom and through which route to market?",
    deliverable:
      "A defined proposition, positioning, concept design, a potential production route and an agreed validation plan. Deliverables depend on the commission.",
  },
];

export default function FieldworkPage() {
  return (
    <div className="fieldwork">
      <header className="fieldwork-header">
        <Image
          className="fieldwork-wordmark"
          src="/images/fieldwork-wordmark.png"
          alt="Fieldwork Dominica"
          width={1100}
          height={385}
          priority
        />
        <h1 className="fieldwork-title serif-text">
          Commissioned research, advisory and concept development for projects in Dominica.
        </h1>
      </header>

      <p className="fieldwork-note">
        Fieldwork Dominica is the commercial division of DBGI. Its work is separate from
        DBGI&apos;s journalism, and commissioning Fieldwork does not buy editorial coverage.
      </p>

      <section className="spec-section">
        <div className="spec-label">What Fieldwork takes on</div>
        <div className="service-table">
          <div className="service-row service-head" aria-hidden="true">
            <div>Service</div>
            <div>The decision you face</div>
            <div>What you receive</div>
          </div>
          {SERVICES.map((service) => (
            <div key={service.name} className="service-row">
              <h2 className="service-name serif-text">{service.name}</h2>
              <p className="service-decision serif-text">{service.decision}</p>
              <p>{service.deliverable}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="spec-section">
        <div className="spec-label">Two ways to engage</div>
        <div className="two-col">
          <div>
            <h2 className="two-col-title serif-text">Commissioned work</h2>
            <p className="spec-text">
              Begins with your objective and ends with an agreed deliverable. Every commission is
              set out in writing first: scope, deliverables, exclusions, responsibilities, timeline,
              price and who owns the output.
            </p>
          </div>
          <div>
            <h2 className="two-col-title serif-text">Original concepts</h2>
            <p className="spec-text">
              Begin with Fieldwork&apos;s own research and development. A partner may later
              commission further work or negotiate participation. The first is{" "}
              <Link href="/fieldwork/concepts/morne">Morne</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="spec-section">
        <div className="spec-label">Where Fieldwork stops</div>
        <p className="spec-text">
          Land title, surveys, environmental assessment and other specialist checks sit with
          qualified parties, and Fieldwork identifies where they are needed. Fieldwork does not
          hold land or act under a mandate unless that is stated for a specific project. A concept
          page is not an offer of equity, access or exclusivity.
        </p>
      </section>

      <section className="spec-section" id="concepts">
        <div className="spec-label">Concepts</div>
        <Link href="/fieldwork/concepts/morne" className="concept-card">
          <Image
            src="/images/morne-concept.jpg"
            alt="Concept render of a clear glass bottle labelled Morne, Dominica, still water"
            width={1536}
            height={1024}
          />
          <div className="concept-card-body">
            <div className="concept-stage">Concept in development</div>
            <h2 className="concept-card-title serif-text">Morne</h2>
            <p className="spec-text">A premium still water concept from Dominica.</p>
          </div>
        </Link>
      </section>

      <section className="spec-section" id="enquire">
        <div className="spec-label">Start a conversation</div>
        <p className="spec-lede serif-text">Tell us about the decision you need help with.</p>
        <p className="spec-text">
          The next step is a scoped conversation about the work. It is not a commitment on either
          side.
        </p>
        <EnquiryForm />
      </section>
    </div>
  );
}
