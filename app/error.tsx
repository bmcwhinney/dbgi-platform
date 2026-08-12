"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="listing-header" style={{ textAlign: "center", padding: "96px 32px" }}>
      <div className="listing-eyebrow">Error</div>
      <h1 className="listing-title serif-text">Something didn&apos;t load correctly</h1>
      <p style={{ marginTop: 16, color: "var(--ink-muted)" }}>
        <button onClick={reset} className="subscribe-btn" style={{ marginRight: 16 }}>
          Try again
        </button>
        <Link href="/">Back to the front page</Link>
      </p>
    </div>
  );
}
