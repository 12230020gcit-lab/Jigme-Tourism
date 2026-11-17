import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const inquirySchema = z.object({ fullName: z.string().trim().min(2).max(120), email: z.email().max(254), phone: z.string().trim().min(5).max(40), country: z.string().trim().min(2).max(100), nationality: z.string().max(100).optional(), arrivalDate: z.union([z.literal(""),z.iso.date()]).optional(), departureDate: z.union([z.literal(""),z.iso.date()]).optional(), travelers: z.coerce.number().int().min(1).max(30), adults: z.coerce.number().int().min(1).max(30), children: z.coerce.number().int().min(0).max(20), accommodation: z.enum(["Budget", "3-Star", "4-Star", "5-Star", "Luxury", "No preference"]), specialRequests: z.string().max(4000).optional(), packageSlug: z.string().max(100).optional() }).refine(d => d.travelers === d.adults + d.children, { message: "Traveler counts do not match", path: ["travelers"] }).refine(d => !d.arrivalDate || !d.departureDate || d.departureDate > d.arrivalDate, {message:"Departure date must be after arrival date",path:["departureDate"]}).refine(d => !d.arrivalDate || d.arrivalDate >= new Date().toISOString().slice(0, 10), {message:"Arrival date must be today or later",path:["arrivalDate"]});

export async function POST(request: Request) {
  const parsed = inquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "Inquiry storage is not configured yet. Please contact us by WhatsApp or email." }, { status: 503 });
  try {
    const d = parsed.data;
    const tour = d.packageSlug ? await prisma.tourPackage.findFirst({ where: { slug: d.packageSlug, published: true } }) : null;
    if (d.packageSlug && !tour) return NextResponse.json({ error: "That tour is no longer available. Please choose another tour or a custom trip." }, { status: 400 });
    const reference = `JBT-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
    const session = await getSession();
    const saved = await prisma.bookingInquiry.create({ data: { reference, fullName: d.fullName, email: d.email, phone: d.phone, country: d.country, nationality: d.nationality || null, arrivalDate: d.arrivalDate ? new Date(d.arrivalDate) : null, departureDate: d.departureDate ? new Date(d.departureDate) : null, travelers: d.travelers, adults: d.adults, children: d.children, accommodation: d.accommodation, specialRequests: d.specialRequests || null, tourPackageId: tour?.id, userId: session?.id }, select: { reference: true } });
    return NextResponse.json({ reference: saved.reference });
  } catch (error) {
    console.error("Inquiry could not be saved", error);
    return NextResponse.json({ error: "We could not save your inquiry because the database is unavailable. Please try again later or contact us directly." }, { status: 503 });
  }
}
