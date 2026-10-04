import Image from "next/image";
import Link from "next/link";

export function FieldworkFeature() {
  return (
    <Link href="/fieldwork" className="feature-box">
      <div className="feature-label">From DBGI&apos;s commercial division</div>
      <Image
        className="feature-wordmark"
        src="/images/fieldwork-wordmark.png"
        alt="Fieldwork Dominica"
        width={1100}
        height={385}
      />
      <p className="feature-text">
        Commissioned research, site and partner assessment, and brand and venture development for
        projects in Dominica.
      </p>
      <div className="feature-meta">Not editorial &middot; How Fieldwork works</div>
    </Link>
  );
}
