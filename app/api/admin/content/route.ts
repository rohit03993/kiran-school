import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { findSection } from "@/lib/admin-sections";
import { type SectionKey } from "@/lib/defaults";
import { isValidSession, sessionCookie } from "@/lib/session";
import { saveSection } from "@/lib/site";

async function allowed() {
  const jar = await cookies();
  return isValidSession(jar.get(sessionCookie.name)?.value);
}

export async function PUT(request: Request) {
  if (!(await allowed())) {
    return NextResponse.json({ error: "Sign in again." }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { key?: string; value?: unknown } | null;
  if (!body?.key || !findSection(body.key)) {
    return NextResponse.json({ error: "Unknown section." }, { status: 400 });
  }
  try {
    await saveSection(body.key as SectionKey, body.value);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save. Check that the database setup has been run." }, { status: 500 });
  }
}
