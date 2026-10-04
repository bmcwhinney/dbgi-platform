"use client";

import { useState, type FormEvent } from "react";
import { SECTORS } from "@/types/content";

const STAGES = [
  "Exploring an idea",
  "Researching options",
  "Ready to commission work",
  "Project already under way",
];

export function EnquiryForm() {
  const [attempted, setAttempted] = useState(false);

  // No backend yet: nothing is sent, and the form says so rather than implying receipt.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="enquiry-grid">
        <label>
          Your name
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>
        <label>
          Organisation
          <input type="text" name="organisation" autoComplete="organization" required />
        </label>
        <label>
          Project
          <input type="text" name="project" placeholder="A short name or description" required />
        </label>
        <label>
          Sector
          <select name="sector" defaultValue="" required>
            <option value="" disabled>
              Choose a sector
            </option>
            {SECTORS.map((sector) => (
              <option key={sector.slug} value={sector.slug}>
                {sector.label}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Stage
          <select name="stage" defaultValue="" required>
            <option value="" disabled>
              Where the project stands
            </option>
            {STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        The decision you need help with
        <textarea name="decision" rows={5} required />
      </label>

      <div className="enquiry-actions">
        <button type="submit" className="subscribe-btn">
          Send enquiry
        </button>
        {attempted && (
          <p className="enquiry-notice" role="status">
            This form is not receiving enquiries yet, so nothing has been sent.
          </p>
        )}
      </div>
    </form>
  );
}
