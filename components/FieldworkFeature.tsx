import Image from "next/image";
import Link from "next/link";
import { FIELDWORK_SERVICES } from "@/lib/fieldwork";
import { SectionHeader } from "./SectionHeader";

export function FieldworkFeature() {
  return (
    <section aria-label="Fieldwork Dominica">
      <SectionHeader title="From Fieldwork" href="/fieldwork" more="About Fieldwork" />
      <div className="bottom-grid">
        <Link href="/fieldwork/concepts/morne" className="bottom-col card-link-target fw-cell">
          <div className="mid-image-placeholder">
            <Image
              src="/images/morne-concept.jpg"
              alt="A clear glass bottle labelled Morne, Dominica, still water"
              width={1536}
              height={1024}
            />
          </div>
          <span className="fw-kicker">Concept</span>
          <h3 className="bottom-headline serif-text">Morne</h3>
          <p className="bottom-snip">A premium still water from Dominica, in development.</p>
        </Link>

        {FIELDWORK_SERVICES.map((service) => (
          <Link key={service.name} href="/fieldwork" className="bottom-col card-link-target fw-cell">
            <h3 className="bottom-headline serif-text">{service.name}</h3>
            <p className="bottom-snip">{service.question}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
