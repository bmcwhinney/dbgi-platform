import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Fieldwork Dominica",
  description:
    "Fieldwork Dominica is the advisory and venture development arm of DBGI: commercial research, site and partner assessment, and brand and venture development for projects in Dominica.",
  alternates: { canonical: "/fieldwork" },
};

const SERVICES = [
  {
    name: "Commercial research",
    question: "Should we investigate this sector, product or market further?",
    deliverable:
      "An agreed research brief, sourced findings, interviews with stakeholders or buyers, the assumptions and constraints, and a recommendation for the next decision.",
  },
  {
    name: "Site and partner assessment",
    question: "Which locations or counterparties merit detailed diligence?",
    deliverable:
      "A criteria-based shortlist, the status of each contact, observations on access and infrastructure, a comparison of the options and the specialist diligence still required.",
  },
  {
    name: "Brand and venture development",
    question: "What should we create, for whom and through which route to market?",
    deliverable:
      "A defined proposition, positioning, concept design, a potential production route and an agreed validation plan, shaped to the commission.",
  },
];

export default function FieldworkPage() {
  return (
    <>
      <header className="fw-hero">
        <Image
          className="fw-hero-wordmark"
          src="/images/fieldwork-wordmark.png"
          alt="Fieldwork Dominica"
          width={1100}
          height={385}
          priority
        />
        <h1 className="fw-hero-title">
          Research, advisory and venture development, grounded in Dominica.
        </h1>
        <p className="fw-hero-text">
          Fieldwork is the advisory and venture development arm of DBGI. We help businesses and
          project sponsors decide what to build on the island, where, and with whom.
        </p>
        <a href="#enquire" className="fw-button">
          Start a conversation
        </a>
      </header>

      <section className="spec-section">
        <div className="spec-label">What we do</div>
        <div className="fw-services">
          {SERVICES.map((service, index) => (
            <div key={service.name} className="fw-service">
              <div className="fw-kicker">0{index + 1}</div>
              <h2 className="fw-service-name serif-text">{service.name}</h2>
              <p className="fw-service-question serif-text">{service.question}</p>
              <p className="fw-service-text">{service.deliverable}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="spec-section">
        <div className="spec-label">How we work</div>
        <div className="two-col">
          <div>
            <h2 className="two-col-title serif-text">Commissions</h2>
            <p className="spec-text">
              A commission starts with your objective and ends with an agreed deliverable. Scope,
              timeline, price and ownership are settled in writing before work begins, and
              specialist diligence such as title, survey and environmental work is coordinated
              with qualified parties.
            </p>
          </div>
          <div>
            <h2 className="two-col-title serif-text">Concepts</h2>
            <p className="spec-text">
              Concepts start with our own research and design. Partners can commission further
              development or talk to us about taking part. The first is{" "}
              <Link href="/fieldwork/concepts/morne">Morne</Link>.
            </p>
          </div>
        </div>
      </section>

      <Link href="/fieldwork/concepts/morne" className="fw-concept" id="concepts">
        <div className="fw-concept-image">
          <Image
            src="/images/morne-concept.jpg"
            alt="A clear glass bottle labelled Morne, Dominica, still water"
            width={1536}
            height={1024}
          />
        </div>
        <div className="fw-concept-panel">
          <div className="fw-kicker">Concept 01 &middot; In development</div>
          <h2 className="fw-concept-title serif-text">Morne</h2>
          <p className="spec-text">A premium still water from Dominica.</p>
          <span className="fw-link">View the concept</span>
        </div>
      </Link>

      <section className="spec-section" id="enquire">
        <div className="spec-label">Start a conversation</div>
        <p className="spec-lede serif-text">Tell us about the decision in front of you.</p>
        <p className="spec-text">We start with a conversation to scope the work.</p>
        <EnquiryForm />
      </section>
    </>
  );
}
