import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({ id: z.string().min(1), published: z.boolean() });
export async function PATCH(request: Request) {
  const session = await getSession();
  if (session?.role !== "ADMIN") return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid review update." }, { status: 400 });
  try {
    await prisma.review.update({ where: { id: parsed.data.id }, data: { published: parsed.data.published } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not update this review." }, { status: 404 });
  }
}
