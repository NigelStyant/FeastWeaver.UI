import { auth } from "@/auth";
import { NextResponse } from "next/server";

// This function handles the middleware before auth
export function middleware() {
  const response = NextResponse.next();

  // Add Content Security Policy headers to fix the Missing_CSP error
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://accounts.google.com; frame-src 'self' https://accounts.google.com"
  );

  return response;
}

// Auth middleware runs after the above middleware
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Protect dashboard routes
  if (nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl.origin));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
