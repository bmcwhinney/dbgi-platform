import Image from "next/image";
import Link from "next/link";

export function FieldworkFeature() {
  return (
    <section className="fw-band" aria-label="Fieldwork Dominica">
      <Link href="/fieldwork" className="fw-band-panel">
        <Image
          className="fw-band-wordmark"
          src="/images/fieldwork-wordmark.png"
          alt="Fieldwork Dominica"
          width={1100}
          height={385}
        />
        <p className="fw-band-title">
          Research, advisory and venture development, grounded in Dominica.
        </p>
        <p className="fw-kicker">
          Commercial research &middot; Site and partner assessment &middot; Brand and venture
          development
        </p>
        <span className="fw-button">Explore Fieldwork</span>
      </Link>

      <Link href="/fieldwork/concepts/morne" className="fw-band-concept">
        <Image
          src="/images/morne-concept.jpg"
          alt="A clear glass bottle labelled Morne, Dominica, still water"
          width={1536}
          height={1024}
        />
        <span className="fw-band-caption">
          <span className="fw-kicker">Concept 01</span>
          Morne
        </span>
      </Link>
    </section>
  );
}
