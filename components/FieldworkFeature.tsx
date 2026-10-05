import Image from "next/image";
import Link from "next/link";
import { FIELDWORK_SERVICES } from "@/lib/fieldwork";
import { SectionHeader } from "./SectionHeader";
import { ChartIcon, MapPinIcon, PencilIcon } from "./icons";

const SERVICE_ICONS = {
  "Commercial research": ChartIcon,
  "Site and partner assessment": MapPinIcon,
  "Brand and venture development": PencilIcon,
} as const;

export function FieldworkFeature() {
  return (
    <section aria-label="Fieldwork Dominica">
      <SectionHeader title="From Fieldwork" href="/fieldwork" more="About Fieldwork" />
      <div className="bottom-grid">
        <Link href="/fieldwork/concepts/morne" className="bottom-col card-link-target fw-cell">
          <div className="mid-image-placeholder fw-visual">
            <span className="fw-badge">Concept</span>
            <Image
              src="/images/morne-concept.jpg"
              alt="A clear glass bottle labelled Morne, Dominica, still water"
              width={1536}
              height={1024}
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <h3 className="bottom-headline serif-text">Morne</h3>
          <p className="bottom-snip">A premium still water from Dominica, in development.</p>
        </Link>

        {FIELDWORK_SERVICES.map((service) => {
          const Icon = SERVICE_ICONS[service.name];
          return (
            <Link key={service.name} href="/fieldwork" className="bottom-col card-link-target fw-cell">
              <div className="fw-visual fw-tile">
                <Icon className="fw-tile-icon" />
              </div>
              <h3 className="bottom-headline serif-text">{service.name}</h3>
              <p className="bottom-snip">{service.question}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
