"use client";
import { useState } from "react";
type Review = { id: string; customerName: string; country: string; rating: number; packageName: string | null; text: string; published: boolean; createdAt: Date };
export function AdminReviews({ rows }: { rows: Review[] }) {
  const [data, setData] = useState(rows);
  const [error, setError] = useState("");
  async function setPublished(review: Review) {
    setError("");
    const published = !review.published;
    try {
      const response = await fetch("/api/admin/reviews", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: review.id, published }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update review.");
      setData(current => current.map(row => row.id === review.id ? { ...row, published } : row));
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not update review."); }
  }
  return <div className="admin-list">{error && <p className="form-error" role="alert">{error}</p>}{!data.length ? <p>No reviews have been submitted yet.</p> : data.map(review => <article className="admin-card" key={review.id}><div className="admin-card-top"><div><small>{review.published ? "Published" : "Pending review"} · {new Date(review.createdAt).toLocaleDateString()}</small><h3>{review.customerName} · {review.country} · {"★".repeat(review.rating)}</h3>{review.packageName && <p>{review.packageName}</p>}</div><button className="admin-mark" type="button" onClick={() => setPublished(review)}>{review.published ? "Hide review" : "Approve review"}</button></div><p className="admin-message">{review.text}</p></article>)}</div>;
}
