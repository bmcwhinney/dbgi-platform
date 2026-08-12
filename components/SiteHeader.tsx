"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, SearchIcon, CloseIcon } from "./icons";
import { SECTIONS, SECTORS } from "@/types/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="top-bar">
        <div className="top-left">
          <button
            className="menu-icon"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </button>
          <nav className="top-links" aria-label="Secondary navigation">
            <Link href="/about" className="utility-link">
              About
            </Link>
          </nav>
        </div>
        <div className="top-right">
          <Link href="/search" className="top-icon" aria-label="Search" style={{ marginRight: 4 }}>
            <SearchIcon />
          </Link>
          <button className="login-text">Log in</button>
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </header>

      <section className="masthead-row">
        <aside className="masthead-aside masthead-dispatch left">
          <Image
            className="masthead-dispatch-img"
            src="/images/reporting-from-portsmouth.png"
            alt="Illustration of a coconut pen"
            width={96}
            height={90}
          />
          <div className="dispatch-caption">Reporting from Portsmouth Dominica</div>
        </aside>

        <div className="masthead-brand">
          <Link href="/" className="masthead-logo">
            DBGI
          </Link>
          <p className="masthead-tagline">Dominica Business Growth &amp; Innovation</p>
        </div>

        <aside className="masthead-aside right masthead-dispatch">
          <Image
            className="masthead-dispatch-img"
            src="/images/founder-dispatch-parrot.png"
            alt="Sisserou parrot carrying a dispatch envelope"
            width={96}
            height={75}
          />
          <div className="dispatch-caption">Weekly business news from the nature isle</div>
        </aside>
      </section>

      <nav className="nav-strip" aria-label="Main navigation">
        {SECTIONS.map((section) => (
          <Link
            key={section.slug}
            href={`/${section.slug}`}
            className={pathname?.startsWith(`/${section.slug}`) ? "active" : undefined}
          >
            {section.label}
          </Link>
        ))}
      </nav>

      {drawerOpen && (
        <>
          <div className="nav-drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="nav-drawer" role="dialog" aria-modal="true" aria-label="Site menu">
            <div className="nav-drawer-header">
              <span className="nav-drawer-logo">DBGI</span>
              <button
                className="nav-drawer-close"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="nav-drawer-group-label">Sections</div>
            <nav>
              {SECTIONS.map((section) => (
                <Link key={section.slug} href={`/${section.slug}`} className="nav-drawer-link">
                  {section.label}
                </Link>
              ))}
            </nav>

            <div className="nav-drawer-group-label">Sectors</div>
            <nav>
              {SECTORS.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/sector/${sector.slug}`}
                  className="nav-drawer-link small"
                >
                  {sector.label}
                </Link>
              ))}
            </nav>

            <div className="nav-drawer-group-label">More</div>
            <nav>
              <Link href="/search" className="nav-drawer-link small">
                Search
              </Link>
              <Link href="/about" className="nav-drawer-link small">
                About DBGI
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
