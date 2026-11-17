import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const reviewSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  country: z.string().trim().min(2).max(100),
  rating: z.coerce.number().int().min(1).max(5),
  packageName: z.string().trim().max(160).optional(),
  text: z.string().trim().min(20).max(3000),
});

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 100, select: { id: true, customerName: true, country: true, rating: true, packageName: true, text: true, createdAt: true } });
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Published reviews could not be loaded", error);
    return NextResponse.json({ error: "Reviews are temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const parsed = reviewSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check your review and try again." }, { status: 400 });
  try {
    await prisma.review.create({ data: { ...parsed.data, packageName: parsed.data.packageName || null } });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Review could not be saved", error);
    return NextResponse.json({ error: "We could not save your review right now. Please try again later." }, { status: 503 });
  }
}
