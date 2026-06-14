import { NextRequest, NextResponse } from "next/server";

// Auth routes that require login
const protectedRoutes = ["/dashboard", "/checkout"];

// Public auth routes that redirect to home if logged in
const publicAuthRoutes = ["/auth/login", "/auth/register", "/auth/verify-otp"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("Authorization")?.split(" ")[1];

  // Redirect logged-in users away from public auth pages
  if (publicAuthRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect routes that require authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    "/dashboard/:path*",
    "/checkout/:path*",
    // Public auth routes
    "/auth/login",
    "/auth/register",
    "/auth/verify-otp",
  ],
};
