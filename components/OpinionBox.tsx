import Image from "next/image";
import Link from "next/link";
import type { Viewpoint } from "@/types/content";

export function OpinionBox({ viewpoint }: { viewpoint: Viewpoint }) {
  const href =
    viewpoint.href ??
    (viewpoint.relatedSlug ? `/journal/${viewpoint.relatedSlug}` : "/journal/format/opinion");

  return (
    <Link href={href} className="opinion-box">
      <div className="opinion-label">Viewpoint</div>
      <div className="opinion-avatar">
        {/* Requested well above its 64px display size so it stays sharp on dense screens and when zoomed */}
        <Image src={viewpoint.image} alt={viewpoint.name} width={320} height={320} />
      </div>
      <div className="opinion-name">{viewpoint.name}</div>
      <div className="opinion-role">{viewpoint.role}</div>
      <div className="opinion-text">&ldquo;{viewpoint.quote}&rdquo;</div>
    </Link>
  );
}
