import { NextRequest, NextResponse } from "next/server";

// Auth routes that require login
const protectedRoutes = ["/dashboard", "/checkout"];

// Public auth routes that redirect to home if logged in
const publicAuthRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/verify-otp",
  "/auth/success",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let token = request.cookies.get("token")?.value || "";

  // Fallback to Authorization header
  if (!token) {
    const authHeader = request.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  // Debug log for troubleshooting
  console.log(`[Middleware] Path: ${pathname}, Has Token: ${!!token}`);

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
