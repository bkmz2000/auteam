import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

const COOKIE_NAME = "admin_auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (but not /admin/api which Tina needs)
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/api")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME);
  const expectedHash = hashPassword(process.env.TINA_ADMIN_PASSWORD || "");

  if (!cookie || cookie.value !== expectedHash) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

function hashPassword(password: string): string {
  const secret = process.env.NEXTAUTH_SECRET || "default-secret-change-me";
  return createHash("sha256").update(password + secret).digest("hex");
}

export const config = {
  matcher: ["/admin/:path*"],
};
