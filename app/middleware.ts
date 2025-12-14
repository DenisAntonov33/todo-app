import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup", "/api/auth"];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Skip middleware for public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check for auth token in cookies
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    // Redirect to login if not authenticated
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token
  const payload = await verifyToken(token);

  if (!payload) {
    // Invalid token, redirect to login
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth-token");
    return response;
  }

  // If logged in and trying to access login/signup, redirect to todos
  if (payload && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/todos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
