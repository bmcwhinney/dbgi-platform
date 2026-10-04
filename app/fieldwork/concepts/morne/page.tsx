import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Morne | Fieldwork Dominica",
  description:
    "Morne is a premium still water concept from Dominica, created by Fieldwork Dominica. A concept in development, with the work completed and outstanding set out.",
  alternates: { canonical: "/fieldwork/concepts/morne" },
  openGraph: {
    title: "Morne | Fieldwork Dominica",
    description: "A premium still water concept from Dominica. Concept in development.",
    images: [{ url: "/images/morne-concept.jpg", width: 1536, height: 1024 }],
  },
};

const OUTSTANDING = [
  "Define the intended buyer and price positioning.",
  "Document the status of source access and bottling discussions.",
  "Obtain quotations for production, packaging and freight.",
  "Compare delivered cost with realistic buyer prices.",
  "Test product and buyer requirements, and refine the design alongside the findings.",
];

const NOT_ESTABLISHED = [
  "Production rights",
  "Supply contracts",
  "Manufacturing capacity",
  "A commercially proven product",
];

export default function MornePage() {
  return (
    <div className="fieldwork">
      <header className="fieldwork-header">
        <Link href="/fieldwork" className="fieldwork-back">
          <Image
            className="fieldwork-mark"
            src="/images/fieldwork-mark.png"
            alt=""
            width={320}
            height={456}
          />
          Fieldwork Dominica &middot; Concept
        </Link>
        <h1 className="listing-title serif-text">Morne</h1>
        <p className="listing-standfirst">
          A premium still water concept from Dominica, created by Fieldwork Dominica.
        </p>
      </header>

      <figure className="concept-figure">
        <Image
          src="/images/morne-concept.jpg"
          alt="Concept render of a clear glass bottle labelled Morne, Dominica, still water, 750 mL"
          width={1536}
          height={1024}
          priority
        />
        <figcaption>Concept render. Morne is not a product in production.</figcaption>
      </figure>

      <section className="spec-section">
        <div className="spec-label">Concept record</div>
        <dl className="spec-list">
          <div className="spec-row">
            <dt>Creator</dt>
            <dd>Fieldwork Dominica</dd>
          </div>
          <div className="spec-row">
            <dt>Stage</dt>
            <dd>Concept in development</dd>
          </div>
          <div className="spec-row">
            <dt>Work completed</dt>
            <dd>Name and bottle design concept.</dd>
          </div>
          <div className="spec-row">
            <dt>Work outstanding</dt>
            <dd>
              <ol>
                {OUTSTANDING.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </dd>
          </div>
          <div className="spec-row">
            <dt>Not yet established</dt>
            <dd>
              <ul>
                {NOT_ESTABLISHED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="spec-row">
            <dt>Partnership sought</dt>
            <dd>
              A commercial partner with an explicit role, once the evidence supports the
              proposition. Hospitality is a channel to test, not a confirmed customer base.
            </dd>
          </div>
        </dl>
      </section>

      <section className="spec-section">
        <div className="spec-label">Disclosure</div>
        <p className="spec-text">
          Morne is a Fieldwork Dominica concept, and Fieldwork is the commercial division of DBGI,
          so DBGI has an interest in it. This page is not an offer of equity, access or
          exclusivity.
        </p>
        <p className="spec-text">
          <Link href="/fieldwork#enquire">Discuss this concept with Fieldwork</Link>
        </p>
      </section>
    </div>
  );
}
