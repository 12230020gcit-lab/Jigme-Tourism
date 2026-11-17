import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Jigme Bhutan Tourism | Discover the Kingdom of Bhutan", template: "%s | Jigme Bhutan Tourism" },
  description: "Discover Bhutan with local experts. Explore cultural journeys, Himalayan landscapes and thoughtfully planned private tours with Jigme Bhutan Tourism.",
  openGraph: { title: "Jigme Bhutan Tourism", description: "Your journey into the heart of the Himalayas starts here.", type: "website", images: ["/images/bhutan/paro-taktsang.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "TravelAgency", name: "Jigme Bhutan Tourism", description: "Local Bhutanese trip planning and private journeys across Bhutan.", ...(process.env.NEXT_PUBLIC_AGENCY_EMAIL?{email:process.env.NEXT_PUBLIC_AGENCY_EMAIL}:{}), ...(process.env.NEXT_PUBLIC_SITE_URL?{url:process.env.NEXT_PUBLIC_SITE_URL}:{}) };
  return <html lang="en"><body><SiteHeader />{children}<SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organization)}} /></body></html>;
}


