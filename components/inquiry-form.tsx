"use client";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
type TourOption={slug:string;title:string};

export function InquiryForm({availableTours}:{availableTours:TourOption[]}) {
  const params = useSearchParams();
  const [busy, setBusy] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [result, setResult] = useState<{ reference: string; message: string } | null>(null);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "We could not send your inquiry.");
      setResult({ reference: data.reference, message: createContactText(values, data.reference, availableTours) });
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again."); }
    finally { setBusy(false); }
  }
  if (result) {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "97517000000", email = process.env.NEXT_PUBLIC_AGENCY_EMAIL || "info@jigmebhutantourism.com";
    return <div className="success-box"><h3>Your journey starts here.</h3><p>Thank you for reaching out. Our local team will be in touch to talk through your plans and prepare a personal quotation.</p><div className="reference">{result.reference}</div><p>Keep this reference for your conversation with our team.</p><div className="success-actions">{number&&<a href={`https://wa.me/${number}?text=${encodeURIComponent(result.message)}`} target="_blank" rel="noreferrer">Continue on WhatsApp ↗</a>}{email&&<a href={`mailto:${email}?subject=${encodeURIComponent(`Travel inquiry ${result.reference}`)}&body=${encodeURIComponent(result.message)}`}>Email us ↗</a>}</div>{!number&&!email&&<p className="status-note">The agency’s contact channels will appear here once configured.</p>}<p className="status-note">Your inquiry is a first step. It is not a booking confirmation or payment.</p></div>;
  }
  return <form className="inquiry-form" onSubmit={submit}><h2 className="form-title">Tell us about your trip</h2><p className="form-subtitle">A few details help us get the conversation started. We’ll follow up personally.</p><div className="form-grid">
    <Field label="Tour package"><select name="packageSlug" defaultValue={params.get("package") || ""}><option value="">I'm planning a custom trip</option>{availableTours.map(t => <option key={t.slug} value={t.slug}>{t.title}</option>)}</select></Field>
    <Field label="Accommodation preference"><select name="accommodation" defaultValue="No preference"><option>Budget</option><option>3-Star</option><option>4-Star</option><option>5-Star</option><option>Luxury</option><option>No preference</option></select></Field>
    <Field label="Full name"><input name="fullName" required autoComplete="name" minLength={2} maxLength={120} placeholder="Your name"/></Field><Field label="Email address"><input name="email" required type="email" autoComplete="email" placeholder="you@example.com"/></Field>
    <Field label="Phone / WhatsApp"><input name="phone" required autoComplete="tel" placeholder="Include country code"/></Field><Field label="Country of residence"><input name="country" required autoComplete="country-name" placeholder="Where are you travelling from?"/></Field>
    <Field label="Passport nationality"><input name="nationality" placeholder="Optional"/></Field><Field label="Arrival date"><input name="arrivalDate" type="date"/></Field><Field label="Departure date"><input name="departureDate" type="date"/></Field>
    <Field label="Adults"><input name="adults" type="number" min="1" max="30" value={adults} onChange={e=>setAdults(Number(e.target.value))} required/></Field><Field label="Children"><input name="children" type="number" min="0" max="20" value={children} onChange={e=>setChildren(Number(e.target.value))} required/></Field><Field label="Total travelers"><input name="travelers" type="number" value={adults+children} readOnly required/></Field>
    <Field label="Anything else we should know?" full><textarea name="specialRequests" maxLength={4000} placeholder="Interests, pace, accessibility needs, special occasions…"/></Field>
  </div>{error && <p role="alert" className="form-error">{error}</p>}<button className="form-submit" type="submit" disabled={busy}><span>{busy ? "Sending your inquiry…" : "Send inquiry"}</span><span>↗</span></button><p className="form-hint">There is no payment or commitment at this stage. We’ll discuss your itinerary and quotation directly by email or WhatsApp.</p></form>;
}
function Field({ label, children, full = false }: { label: string; children: React.ReactNode; full?: boolean }) { return <div className={full ? "field full" : "field"}><label>{label}</label>{children}</div>; }
function createContactText(v: Record<string, FormDataEntryValue>, ref: string, tours:TourOption[]) { const selected = tours.find(t => t.slug === v.packageSlug)?.title || "Custom trip"; return `Hello Jigme Bhutan Tourism,\nI have submitted a travel inquiry.\nBooking Reference: ${ref}\nPackage: ${selected}\nArrival: ${v.arrivalDate || "To be arranged"}\nDeparture: ${v.departureDate || "To be arranged"}\nTravelers: ${v.travelers} (${v.adults} adults, ${v.children} children)\nAccommodation: ${v.accommodation}\nName: ${v.fullName}\nI would like to discuss my trip.`; }
