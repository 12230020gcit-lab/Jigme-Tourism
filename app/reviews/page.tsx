import { prisma } from "@/lib/prisma";
import { ReviewForm } from "@/components/review-form";
export const dynamic = "force-dynamic";
export const metadata = { title: "Guest reviews", description: "Read and share experiences travelling in Bhutan with Jigme Bhutan Tourism." };

export default async function Reviews() {
  let reviews: { id: string; customerName: string; country: string; rating: number; packageName: string | null; text: string; createdAt: Date }[] = [];
  let available = true;
  try { reviews = await prisma.review.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 100, select: { id: true, customerName: true, country: true, rating: true, packageName: true, text: true, createdAt: true } }); }
  catch (error) { available = false; console.error("Reviews could not be loaded", error); }
  const average = reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : null;
  return <main>
    <section className="inner-hero"><div className="eyebrow light"><span/> TRAVELLER REVIEWS</div><h1>Stories from<br/><em>Bhutan journeys.</em></h1><p>Read what travellers remember from their time in Bhutan, and share your own experience with our local team.</p></section>
    <section className="inner-content">
      {!available ? <p className="form-error" role="status">Reviews are temporarily unavailable. You can still send your review below.</p> : reviews.length ? <><div className="review-summary"><strong>{average} / 5</strong><span>{reviews.length} traveller {reviews.length === 1 ? "review" : "reviews"}</span></div><div className="review-grid">{reviews.map(review => <article className="review-card" key={review.id}><div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div><blockquote>{review.text}</blockquote><p><strong>{review.customerName}</strong> · {review.country}</p>{review.packageName && <small>{review.packageName}</small>}</article>)}</div></> : <p className="detail-copy">No published reviews yet. If you have travelled with us, you can be the first to share your experience.</p>}
      <div className="review-form-wrap"><ReviewForm /></div>
    </section>
  </main>;
}
