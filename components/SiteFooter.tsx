import Link from "next/link";
import { FORMATS, SECTORS } from "@/types/content";

type FooterLink = { label: string; href?: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Journal",
    links: [
      { label: "Latest", href: "/journal" },
      ...FORMATS.map((f) => ({ label: f.series, href: `/journal/format/${f.slug}` })),
    ],
  },
  {
    title: "Sectors",
    links: SECTORS.map((s) => ({ label: s.label, href: `/sectors/${s.slug}` })),
  },
  {
    title: "Fieldwork",
    links: [
      { label: "Fieldwork Dominica", href: "/fieldwork" },
      { label: "Morne", href: "/fieldwork/concepts/morne" },
      { label: "Start a conversation", href: "/fieldwork#enquire" },
    ],
  },
  {
    title: "DBGI",
    links: [
      { label: "About", href: "/about" },
      { label: "Opportunities", href: "/opportunities" },
      { label: "Search", href: "/search" },
      { label: "RSS", href: "/feed.xml" },
    ],
  },
];

// Add an href to each of these once its page exists; until then it shows as plain text.
const SMALL_PRINT: FooterLink[] = [{ label: "Contact" }, { label: "Legal" }, { label: "Privacy" }];

function FooterItem({ link }: { link: FooterLink }) {
  return link.href ? <Link href={link.href}>{link.label}</Link> : <span>{link.label}</span>;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-columns">
        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={`${column.title} links`}>
            <h2 className="site-footer-title">{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <FooterItem link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="site-footer-base">
        <p className="site-footer-copyright">© DBGI 2026</p>
        <ul className="site-footer-small">
          {SMALL_PRINT.map((link) => (
            <li key={link.label}>
              <FooterItem link={link} />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
