"use client";

import { useState } from "react";
import {
  XIcon,
  FacebookIcon,
  WhatsAppIcon,
  LinkedInIcon,
  MailIcon,
  LinkIcon,
  CheckIcon,
} from "./icons";

export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: XIcon,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      Icon: WhatsAppIcon,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedInIcon,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      Icon: MailIcon,
    },
  ];

  const handleCopy = async () => {
    let ok = false;

    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      // Clipboard API unavailable or denied — fall back to the legacy method below.
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(textarea);
    }

    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="share-bar" role="group" aria-label="Share this article">
      <span className="share-label">Share</span>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="share-icon"
          aria-label={label}
        >
          <Icon />
        </a>
      ))}
      <button type="button" className="share-icon" aria-label="Copy link" onClick={handleCopy}>
        {copied ? <CheckIcon /> : <LinkIcon />}
      </button>
      {copied && (
        <span className="share-copied" role="status">
          Link copied
        </span>
      )}
    </div>
  );
}
