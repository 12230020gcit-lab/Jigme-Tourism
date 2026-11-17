import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export const metadata = { title: "Contact Jigme Bhutan Tourism", description: "Contact the local Jigme Bhutan Tourism team to plan your visit to Bhutan." };

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_AGENCY_EMAIL || "info@jigmebhutantourism.com";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "97517000000";
  return <main>
    <section className="inner-hero"><div className="eyebrow light"><span/> CONTACT OUR LOCAL TEAM</div><h1>Start with<br/><em>hello.</em></h1><p>Questions, ideas or an early sketch of a trip? We would love to hear from you.</p></section>
    <section className="inner-content">
      <div className="contact-channels">
        <a className="practical-item" href={`mailto:${email}`}><span>01</span><div><h3>Email us</h3><p>{email}</p></div><b>↗</b></a>
        <a className="practical-item" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer"><span>02</span><div><h3>WhatsApp</h3><p>Message our local team directly.</p></div><b>↗</b></a>
      </div>
      <div className="contact-form-layout"><div><div className="section-label"><span>GENERAL QUESTIONS</span></div><h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: 34 }}>We are listening.</h2><p className="detail-copy" style={{ fontSize: 15 }}>If you already have travel dates in mind, include them in a journey inquiry.</p><Link className="text-link" href="/inquire">Plan a Bhutan journey <span>↗</span></Link></div><ContactForm /></div>
    </section>
  </main>;
}
