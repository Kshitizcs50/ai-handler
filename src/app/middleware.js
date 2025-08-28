import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value || null; // token stored in cookie

  const { pathname } = req.nextUrl;

  // Public routes (login, signup, auth page, static files)
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // If token is missing → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // only protect these paths
};
