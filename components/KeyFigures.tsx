import Link from "next/link";
import { KEY_FIGURES, KEY_FIGURES_SLUG } from "@/lib/key-figures";

export function KeyFigures() {
  return (
    <section className="key-figures" aria-labelledby="key-figures-label">
      <h3 id="key-figures-label" className="side-label">
        Dominica in numbers
      </h3>
      <dl className="key-figures-grid">
        {KEY_FIGURES.map((figure) => (
          <div key={figure.label}>
            <dd className="key-figure-value serif-text">{figure.value}</dd>
            <dt className="key-figure-label">{figure.label}</dt>
          </div>
        ))}
      </dl>
      <Link href={`/journal/${KEY_FIGURES_SLUG}`} className="key-figures-link">
        Sources and more figures
      </Link>
    </section>
  );
}
