import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isValidSession, sessionCookie } from "@/lib/session";

async function allowed() {
  const jar = await cookies();
  return isValidSession(jar.get(sessionCookie.name)?.value);
}

export async function GET() {
  if (!(await allowed())) return NextResponse.json({ error: "Sign in again." }, { status: 401 });
  const items = await getPrisma().enquiry.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ items });
}

export async function DELETE(request: Request) {
  if (!(await allowed())) return NextResponse.json({ error: "Sign in again." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { id?: number } | null;
  if (!body?.id) return NextResponse.json({ error: "Missing enquiry." }, { status: 400 });
  await getPrisma().enquiry.delete({ where: { id: body.id } });
  return NextResponse.json({ ok: true });
}
