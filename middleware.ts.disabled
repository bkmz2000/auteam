import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (but not /admin/api which Tina needs)
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/api")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME);
  const password = process.env.TINA_ADMIN_PASSWORD || "";
  const secret = process.env.NEXTAUTH_SECRET || "default-secret-change-me";
  const expectedHash = await hashPassword(password + secret);

  if (!cookie || cookie.value !== expectedHash) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

async function hashPassword(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const config = {
  matcher: ["/admin/:path*"],
};
