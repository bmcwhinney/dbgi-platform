// Links shared before the Journal / Sectors / Opportunities / Fieldwork restructure.
const LEGACY_SECTIONS = "news|founders|island-life|ideation-hub";
const LEGACY_OPPORTUNITY_STORIES = ["businesses-registered-167", "founder-grant-fund", "resilience-bonds"];
const LEGACY_SECTORS = {
  "clean-energy": "/sectors/energy",
  agribusiness: "/sectors/food-and-agriculture",
  tourism: "/sectors/tourism-and-hospitality",
  "tech-digital": "/sectors",
  "blue-economy": "/sectors",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.mux.com" },
    ],
  },
  turbopack: {
    root: import.meta.dirname,
  },
  agentRules: false,
  async redirects() {
    return [
      { source: `/:section(${LEGACY_SECTIONS})`, destination: "/journal", permanent: true },
      { source: `/:section(${LEGACY_SECTIONS})/:slug`, destination: "/journal/:slug", permanent: true },
      ...LEGACY_OPPORTUNITY_STORIES.map((slug) => ({
        source: `/opportunities/${slug}`,
        destination: `/journal/${slug}`,
        permanent: true,
      })),
      ...Object.entries(LEGACY_SECTORS).map(([slug, destination]) => ({
        source: `/sector/${slug}`,
        destination,
        permanent: true,
      })),
      // Natural ingredients was folded into Food and agriculture.
      {
        source: "/sectors/natural-ingredients",
        destination: "/sectors/food-and-agriculture",
        permanent: true,
      },
      { source: "/fieldwork/concepts", destination: "/fieldwork", permanent: true },
    ];
  },
};

export default nextConfig;
