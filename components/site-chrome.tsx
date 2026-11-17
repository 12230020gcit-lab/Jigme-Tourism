"use client";
import Link from "next/link";
import { useState } from "react";

const links = [["Discover Bhutan", "/#discover"], ["Destinations", "/destinations"], ["Tours", "/tours"], ["Plan Your Trip", "/#plan"], ["Gallery", "/gallery"], ["Reviews", "/reviews"], ["Travel Info", "/travel-info"], ["Contact", "/contact"]];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" href="/" aria-label="Jigme Bhutan Tourism home"><span className="brand-mark"><svg viewBox="0 0 42 42" aria-hidden="true"><path d="M4 32 17 12l6 9 4-6 11 17H4Z" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M12 32h22M9 36h24M18 12l3 5 2-2" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M19 28h8v4h-8zM21 24h4v4h-4" fill="none" stroke="currentColor" strokeWidth="1.3"/></svg></span><span><b>JIGME</b><small>BHUTAN TOURISM</small></span></Link>
    <nav className={open ? "main-nav nav-open" : "main-nav"}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<Link className="nav-mobile-cta" href="/inquire">Plan a journey <span>↗</span></Link></nav>
    <Link className="header-cta" href="/inquire">Plan a journey <span>↗</span></Link>
    <button aria-label="Toggle menu" className="menu-toggle" onClick={() => setOpen(!open)}><i/><i/></button>
  </div></header>;
}

export function SiteFooter() {
  const email=process.env.NEXT_PUBLIC_AGENCY_EMAIL||"info@jigmebhutantourism.com",whatsapp=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"97517000000";
  return <footer className="site-footer"><div className="footer-top"><Link className="brand footer-brand" href="/"><span className="brand-mark"><svg viewBox="0 0 42 42"><path d="M4 32 17 12l6 9 4-6 11 17H4Z" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M12 32h22M9 36h24" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></span><span><b>JIGME</b><small>BHUTAN TOURISM</small></span></Link><p>We know these mountains by heart.<br/>Let’s find your way into Bhutan.</p><Link className="footer-contact" href="/inquire">Start a conversation <span>↗</span></Link></div><div className="footer-links"><Link href="/destinations">Destinations</Link><Link href="/tours">Journeys</Link><Link href="/travel-information">Travel information</Link><Link href="/services/accommodation">Accommodation</Link><Link href="/services/transport">Transportation</Link><Link href="/services/guides">Local guides</Link><Link href="/trip-planner">Trip planner</Link><Link href="/gallery">Gallery</Link><Link href="/reviews">Guest stories</Link><Link href="/contact">Contact</Link><Link href="/login">Your account</Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jigme Bhutan Tourism</span><span>Made with care in Bhutan <b>✳</b></span><span>{email&&<a href={`mailto:${email}`}>Email</a>}{whatsapp&&<a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>}</span></div></footer>;
}

