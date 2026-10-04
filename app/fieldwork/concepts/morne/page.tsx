import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Morne | Fieldwork Dominica",
  description:
    "Morne is a premium still water concept from Dominica, in development at Fieldwork Dominica.",
  alternates: { canonical: "/fieldwork/concepts/morne" },
  openGraph: {
    title: "Morne | Fieldwork Dominica",
    description: "A premium still water from Dominica. A Fieldwork concept, in development.",
    images: [{ url: "/images/morne-concept.jpg", width: 1536, height: 1024 }],
  },
};

const NEXT_STEPS = [
  "Define the intended buyer and price positioning.",
  "Confirm source access and a bottling route.",
  "Obtain quotations for production, packaging and freight.",
  "Compare delivered cost with realistic buyer prices.",
  "Test the product with buyers and refine the design alongside the findings.",
];

export default function MornePage() {
  return (
    <>
      <header className="fw-concept-header">
        <Link href="/fieldwork" className="fieldwork-back">
          <Image
            className="fieldwork-mark"
            src="/images/fieldwork-mark.png"
            alt=""
            width={320}
            height={456}
          />
          Fieldwork Dominica
        </Link>
        <div className="fw-kicker">Concept 01</div>
        <h1 className="fw-concept-title serif-text">Morne</h1>
        <p className="listing-standfirst">A premium still water from Dominica.</p>
      </header>

      <figure className="concept-figure">
        <Image
          src="/images/morne-concept.jpg"
          alt="A clear glass bottle labelled Morne, Dominica, still water, 750 mL"
          width={1536}
          height={1024}
          priority
        />
        <figcaption>Concept render</figcaption>
      </figure>

      <section className="spec-section">
        <div className="spec-label">The concept</div>
        <dl className="spec-list">
          <div className="spec-row">
            <dt>Stage</dt>
            <dd>In development</dd>
          </div>
          <div className="spec-row">
            <dt>Created by</dt>
            <dd>Fieldwork Dominica</dd>
          </div>
          <div className="spec-row">
            <dt>Completed</dt>
            <dd>Name and bottle design.</dd>
          </div>
          <div className="spec-row">
            <dt>Next</dt>
            <dd>
              <ol>
                {NEXT_STEPS.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </dd>
          </div>
          <div className="spec-row">
            <dt>Partnership</dt>
            <dd>
              We are looking for a commercial partner to take Morne to market once the buyer and
              cost work is complete. Hospitality is one channel we plan to test.
            </dd>
          </div>
        </dl>
      </section>

      <section className="spec-section">
        <p className="spec-lede serif-text">Interested in Morne?</p>
        <Link href="/fieldwork#enquire" className="fw-button fw-button-dark">
          Talk to Fieldwork
        </Link>
      </section>
    </>
  );
}
