import Link from "next/link";

export function SectionHeader({
  title,
  href,
  more = "See all",
}: {
  title: string;
  href: string;
  more?: string;
}) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <Link href={href} className="section-more">
        {more}
      </Link>
    </div>
  );
}
