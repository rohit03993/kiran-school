import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    type?: string;
    message?: string;
  } | null;
  const name = body?.name?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const type = body?.type?.trim() ?? "";
  const message = body?.message?.trim() ?? "";
  if (!name || !email || !type || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Check the name, email, and enquiry type." }, { status: 400 });
  }
  try {
    await getPrisma().enquiry.create({ data: { name, email, type, message } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not store the enquiry." }, { status: 503 });
  }
}
