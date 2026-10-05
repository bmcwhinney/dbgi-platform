"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, SearchIcon, CloseIcon } from "./icons";
import { NAV, SECTORS } from "@/types/content";

// Height of the pinned top strip; keep in step with --top-bar-h in globals.css.
const TOP_BAR_HEIGHT = 64;

export function SiteHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [markVisible, setMarkVisible] = useState(false);
  const [navDocked, setNavDocked] = useState(false);
  const mastheadRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // The compact mark takes over as the masthead logo passes under the top strip,
  // and the nav ribbon docks once the whole masthead has gone.
  useEffect(() => {
    const masthead = mastheadRef.current;
    const logo = logoRef.current;
    if (!masthead || !logo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === logo) setMarkVisible(!entry.isIntersecting);
          else setNavDocked(!entry.isIntersecting);
        }
      },
      { rootMargin: `-${TOP_BAR_HEIGHT}px 0px 0px 0px` },
    );
    observer.observe(masthead);
    observer.observe(logo);
    return () => observer.disconnect();
  }, []);

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
      <header className={markVisible ? "top-bar has-mark" : "top-bar"}>
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
        <div className="top-middle">
          <Link href="/" className="top-mark" aria-label="DBGI home">
            DBGI
          </Link>
        </div>
        <div className="top-right">
          <Link href="/search" className="top-icon" aria-label="Search">
            <SearchIcon />
          </Link>
          <button className="login-text">Log in</button>
          <a href="#newsletter" className="subscribe-btn">
            Subscribe
          </a>
        </div>
      </header>

      <section className="masthead-row" ref={mastheadRef}>
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
          <Link href="/" className="masthead-logo" ref={logoRef}>
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

      <nav className={navDocked ? "nav-strip is-docked" : "nav-strip"} aria-label="Main navigation">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname?.startsWith(item.href) ? "active" : undefined}
          >
            {item.label}
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

            <div className="nav-drawer-group-label">DBGI</div>
            <nav>
              {NAV.slice(0, 3).map((item) => (
                <Link key={item.href} href={item.href} className="nav-drawer-link">
                  {item.label}
                </Link>
              ))}
              <Link href="/journal/format/profile" className="nav-drawer-link small">
                People
              </Link>
            </nav>

            <div className="nav-drawer-group-label">Sectors</div>
            <nav>
              {SECTORS.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/sectors/${sector.slug}`}
                  className="nav-drawer-link small"
                >
                  {sector.label}
                </Link>
              ))}
            </nav>

            <div className="nav-drawer-group-label">Fieldwork Dominica</div>
            <nav>
              <Link href="/fieldwork" className="nav-drawer-link">
                Fieldwork
              </Link>
              <Link href="/fieldwork/concepts/morne" className="nav-drawer-link small">
                Morne
              </Link>
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
