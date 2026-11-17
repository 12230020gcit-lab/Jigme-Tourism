import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE = "jbt-session";
function secret() { const value = process.env.AUTH_SECRET; if (!value || value.length < 32) throw new Error("AUTH_SECRET must be set to at least 32 characters."); return new TextEncoder().encode(value); }
export async function createSession(user: { id: string; email: string; role: "VISITOR" | "ADMIN" }) {
  const token = await new SignJWT({ email: user.email, role: user.role }).setProtectedHeader({ alg: "HS256" }).setSubject(user.id).setIssuedAt().setExpirationTime("7d").sign(secret());
  const forwardedProtocol = (await headers()).get("x-forwarded-proto")?.split(",")[0].trim();
  const secure = forwardedProtocol === "https" || (!forwardedProtocol && process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://") === true);
  (await cookies()).set(COOKIE, token, { httpOnly: true, secure, sameSite: "strict", path: "/", maxAge: 60 * 60 * 24 * 7 });
}
export async function getSession() {
  const token = (await cookies()).get(COOKIE)?.value; if (!token) return null;
  try { const { payload } = await jwtVerify(token, secret()); if (!payload.sub || typeof payload.email !== "string") return null; const user = await prisma.user.findUnique({ where: { id: payload.sub }, select: { email: true, role: true } }); if (!user) return null; return { id: payload.sub, email: user.email, role: user.role }; } catch { return null; }
}
export async function clearSession() { (await cookies()).delete(COOKIE); }
