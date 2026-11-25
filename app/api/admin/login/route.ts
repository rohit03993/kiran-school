import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { createSessionToken, sessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  if (!email || !password) {
    return NextResponse.json({ error: "Enter the email and password." }, { status: 400 });
  }

  try {
    const admin = await getPrisma().admin.findUnique({ where: { email } });
    const match = admin ? await bcrypt.compare(password, admin.passwordHash) : false;
    if (!match) {
      return NextResponse.json({ error: "Email or password is wrong." }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "The admin database is not ready yet." }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie.name, await createSessionToken(), sessionCookie.options);
  return response;
}
