import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSession, sessionCookie } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const ok = await isValidSession(request.cookies.get(sessionCookie.name)?.value);
    if (!ok) {
      const login = request.nextUrl.clone();
      login.pathname = "/admin/login";
      return NextResponse.redirect(login);
    }
  }

  if (pathname === "/admin/login") {
    const ok = await isValidSession(request.cookies.get(sessionCookie.name)?.value);
    if (ok) {
      const home = request.nextUrl.clone();
      home.pathname = "/admin";
      return NextResponse.redirect(home);
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
