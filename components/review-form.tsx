"use client";
import { FormEvent, useState } from "react";

export function ReviewForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We could not send your review.");
      setSent(true); form.reset();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not send your review. Please try again.");
    } finally { setBusy(false); }
  }
  if (sent) return <div className="success-box" role="status"><h3>Thank you for sharing your journey.</h3><p>Your review has been sent to our team and will appear after it has been checked.</p></div>;
  return <form className="inquiry-form" onSubmit={submit}>
    <h2 className="form-title">Share your Bhutan experience</h2><p className="form-subtitle">Reviews are checked by our team before they appear on the site.</p>
    <div className="form-grid">
      <Field label="Your name"><input name="customerName" required minLength={2} maxLength={100} autoComplete="name" /></Field>
      <Field label="Country"><input name="country" required minLength={2} maxLength={100} autoComplete="country-name" /></Field>
      <Field label="Rating"><select name="rating" required defaultValue="5"><option value="5">5 – Excellent</option><option value="4">4 – Very good</option><option value="3">3 – Good</option><option value="2">2 – Fair</option><option value="1">1 – Poor</option></select></Field>
      <Field label="Tour or package (optional)"><input name="packageName" maxLength={160} /></Field>
      <Field label="Your review" full><textarea name="text" required minLength={20} maxLength={3000} rows={5} /></Field>
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="form-submit" type="submit" disabled={busy}><span>{busy ? "Sending review…" : "Submit review"}</span><span>↗</span></button>
  </form>;
}
function Field({ label, children, full = false }: { label: string; children: React.ReactNode; full?: boolean }) { return <div className={full ? "field full" : "field"}><label>{label}</label>{children}</div>; }
