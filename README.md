# DBGI Platform

DBGI (Dominica Business Growth & Innovation) is a business publication and intelligence platform focused on Dominica, and home to Fieldwork Dominica, its advisory and venture development arm. This repo is the website: Next.js (App Router), MDX articles, Mux video.

## Site structure

| Destination | Route | What it holds |
|---|---|---|
| Journal | `/journal`, `/journal/[slug]`, `/journal/format/[format]` | Every article. Formats: news, analysis, profile (the People series), briefing, opinion. |
| Sectors | `/sectors`, `/sectors/[sector]` | The five covered sectors, each with its scope, the business questions pursued and its linked reporting. |
| Opportunities | `/opportunities` | The evidence standard and publication stages for opportunity briefs. No brief is published yet. |
| Fieldwork | `/fieldwork`, `/fieldwork/concepts/morne` | The advisory and venture arm: services, how it works, concepts, enquiry form. |

Fieldwork is presented as a sister studio: its own brush wordmark and sage accent on DBGI's forest surface, with a band on the homepage. No disclaimer labels; the separation from the newsroom is stated once, on About. Formats and sectors are defined in `types/content.ts`. Old section URLs (`/news/...`, `/founders/...`, `/sector/...`) redirect from `next.config.mjs`.

**Not wired up yet:** the Fieldwork enquiry form has no backend. It validates, sends nothing, and tells the visitor so (`components/EnquiryForm.tsx`). There is no newsletter sign-up.

## Stack

- **Next.js 16** (App Router, TypeScript) — every article/section/sector/search/about page is statically generated at build time (`● SSG` / `○ Static` in the build output), so the live site is pre-rendered HTML served from Vercel's edge CDN. That's what lets it hold up under heavy traffic without any extra infrastructure work.
- **MDX content** — articles live as files in `content/`, no database or CMS. You write, commit, deploy.
- **Mux** — video playback via `@mux/mux-player-react`. Adaptive bitrate streaming, no third-party branding.
- **next/image** — automatic image optimization/resizing for every hero image and thumbnail.
- **next/font** — Newsreader and Public Sans are self-hosted at build time, no external font CDN request on page load.
- **Structured data + RSS** — Organization/WebSite JSON-LD sitewide, NewsArticle JSON-LD per story, and a full RSS feed at `/feed.xml`.

## Features

- **Search** (`/search`): instant client-side search over every article's title, standfirst and label.
- **Full site menu**: the hamburger opens a drawer with the Journal, sectors, Fieldwork, search and About.
- **Related stories**: every article ends with more from the Journal, prioritising the same sector, then the same format.
- **Sharing**: share bar plus per-article Open Graph and Twitter cards.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Publishing an article

Add a new `.mdx` file to `content/articles/`. The filename (minus `.mdx`) becomes the URL slug.

```mdx
---
title: "Your headline here"
format: "news"            # news | analysis | profile | briefing | opinion
sector: "energy"          # optional primary sector: food-and-agriculture | natural-ingredients |
                          # tourism-and-hospitality | energy | infrastructure-and-connectivity
standfirst: "One or two sentence summary shown on cards and at the top of the article."
author: "Your name"
authorRole: "Optional role/title"
authorImage: "/images/your-photo.png"   # optional
date: "2026-08-12"
updated: "2026-08-20"     # optional, shown in the byline
heroImage: "/images/your-hero.jpg"   # optional; without it the story runs as a text card
heroImageAlt: "Describe the image for accessibility"
imageCredit: "Photo: name"              # optional
sources:                                # optional, listed under the article
  - label: "Who said or published it"
    url: "https://example.com"
disclosure: "Any Fieldwork, client or sponsor interest in this story."   # optional
featured: true            # optional, pins it to the homepage lead or mid slot
---

Article body goes here, written in Markdown/MDX. Use `##` for subheadings,
`>` for pull quotes, and normal Markdown links and lists.
```

Put images in `public/images/`. Reference them from frontmatter/body as `/images/filename.jpg`.

An article is written once and appears wherever it belongs: the homepage, its format series in the Journal, and its sector page. The label on cards is the sector (or the format when there is no sector; opinion is always labelled Opinion).

The homepage takes featured articles for the lead and mid slots, then newest-first for "Also this week" and the bottom grid. A text-only third story sits under the mid story, and the Fieldwork band follows the sector strip.

## Publishing a video article

1. Upload the video in the [Mux dashboard](https://dashboard.mux.com) (or via the Mux API/CLI).
2. Copy the asset's **Playback ID**.
3. Add a `video` block to the article's frontmatter:

```yaml
video:
  playbackId: "your-playback-id"
  title: "Optional title for player analytics"
```

When `video` is present, the article page and any homepage/listing card that features it will show the Mux player (with a "Watch" badge) instead of a static hero image.

The demo article `content/articles/inside-the-founder-house-video-tour.mdx` uses Mux's public sample playback ID (`DS00Spx1CV902MCtPj5WknGlR102V5HFkDe`) as a placeholder — swap it for a real asset before launch.

## Placeholder content

Seven of the fifteen articles in `content/articles/` are still placeholder copy with invented figures and no sources: the business registrations, founder grant fund, eco-luxury resorts, accelerator seed rounds, resilience bonds, financial services and office-hours pieces. Every other article lists its sources. The specification asks that claims be attributable before reuse, so the placeholders should be replaced or sourced before launch.

## Deploying

The site is built for [Vercel](https://vercel.com):

1. Push this repo to GitHub (`bmcwhinney/dbgi-platform`).
2. Import the repo in Vercel. No environment variables are required for the current MDX + Mux-playback-ID setup.
3. Point the `dominicabgi.site` domain at the Vercel project.

Every push to `main` triggers a new production build; every article is pre-rendered as static HTML at build time.

## Project structure

```
app/                    home, journal, sectors, opportunities, fieldwork, about, search,
                        feed.xml, sitemap, robots, error
components/             SiteHeader (+ nav drawer), SiteFooter, ArticleCards, JournalListing,
                        FieldworkFeature, EnquiryForm, VideoEmbed, ShareBar, SearchClient, JsonLd
content/articles/       article MDX files (source of truth for all editorial content)
lib/                    articles.ts (loading and queries), urls.ts
types/content.ts        navigation, formats, sectors and TypeScript types
public/images/          brand art, hero images, Fieldwork and Morne assets
```
