import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FORMATS } from "@/types/content";
import { getArticlesByFormat } from "@/lib/articles";
import { JournalListing } from "@/components/JournalListing";

export function generateStaticParams() {
  return FORMATS.map((f) => ({ format: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ format: string }>;
}): Promise<Metadata> {
  const { format: slug } = await params;
  const format = FORMATS.find((f) => f.slug === slug);
  if (!format) return {};

  return {
    title: `${format.series} | Journal`,
    alternates: { canonical: `/journal/format/${format.slug}` },
  };
}

export default async function FormatPage({ params }: { params: Promise<{ format: string }> }) {
  const { format: slug } = await params;
  const format = FORMATS.find((f) => f.slug === slug);
  if (!format) notFound();

  return (
    <JournalListing
      title={format.series}
      articles={getArticlesByFormat(format.slug)}
      active={format.slug}
    />
  );
}
