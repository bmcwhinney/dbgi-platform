import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { OrganizationJsonLd } from "@/components/JsonLd";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-public-sans",
  display: "swap",
});

const SITE_URL = "https://dominicabgi.site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DBGI Platform",
    template: "%s | DBGI Platform",
  },
  description:
    "Dominica Business Growth & Innovation — weekly business news from the nature isle.",
  icons: {
    icon: "/images/dbgi-favicon.png",
    apple: "/images/dbgi-favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "DBGI Platform",
    title: "DBGI Platform",
    description:
      "Dominica Business Growth & Innovation — weekly business news from the nature isle.",
    images: [{ url: "/images/dbgi-og-v2.jpg", width: 1200, height: 1200 }],
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "DBGI Platform",
    description:
      "Dominica Business Growth & Innovation — weekly business news from the nature isle.",
    images: ["/images/dbgi-og-v2.jpg"],
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${publicSans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="dbgi-wrap">
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
        </div>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
