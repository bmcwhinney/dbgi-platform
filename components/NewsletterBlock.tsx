"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

export function NewsletterBlock() {
  const [submitted, setSubmitted] = useState(false);

  // No newsletter service is connected yet, so nothing is stored or sent.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="newsletter-block" id="newsletter" aria-labelledby="newsletter-heading">
      <Image
        className="newsletter-art"
        src="/images/founder-dispatch-parrot.png"
        alt=""
        width={320}
        height={250}
      />
      <div className="newsletter-copy">
        <h2 id="newsletter-heading" className="newsletter-heading serif-text">
          Weekly business news from the nature isle
        </h2>
        <p className="newsletter-text">
          One email a week on what is changing for business in Dominica.
        </p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="email"
            required
          />
          <button type="submit" className="subscribe-btn">
            Subscribe
          </button>
        </form>
        {submitted && (
          <p className="newsletter-note" role="status">
            The newsletter is not open for sign-ups yet, so your address has not been saved.
          </p>
        )}
      </div>
    </section>
  );
}
