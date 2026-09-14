import Link from "next/link";
import { SECTORS } from "@/types/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="site-footer-links" aria-label="Footer navigation">
        {SECTORS.map((sector) => (
          <Link key={sector.slug} href={`/sector/${sector.slug}`}>
            {sector.label}
          </Link>
        ))}
        <Link href="/about">About</Link>
        <Link href="/feed.xml">RSS</Link>
      </nav>
    </footer>
  );
}
