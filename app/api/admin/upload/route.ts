import { randomBytes } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import path from "path";
import { isValidSession, sessionCookie } from "@/lib/session";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  const jar = await cookies();
  if (!(await isValidSession(jar.get(sessionCookie.name)?.value))) {
    return NextResponse.json({ error: "Sign in again." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image." }, { status: 400 });
  }
  const extension = types[file.type];
  if (!extension) {
    return NextResponse.json({ error: "Use a JPG, PNG, or WebP image." }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Keep the image under 5 MB." }, { status: 400 });
  }

  const directory = path.join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  const name = `${Date.now()}-${randomBytes(4).toString("hex")}.${extension}`;
  await writeFile(path.join(directory, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${name}` });
}
