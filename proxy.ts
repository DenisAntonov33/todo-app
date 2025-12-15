import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, verifyToken } from "@/lib/auth/jwt";
import { StatusCodes } from "http-status-codes";
import { UNAUTHORIZED_ERROR } from "@/lib/auth/errorHandlers";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api");

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/signup", "/api/auth"];
  const isPublicRoute = publicRoutes.some(
    route => pathname.startsWith(route) || pathname === "/"
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check for auth token in cookies
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const jwtPayload = await verifyToken(token ?? "");

  if (!token || jwtPayload === null || jwtPayload.userId === undefined) {
    if (isApiRoute) {
      return NextResponse.json(
        { error: UNAUTHORIZED_ERROR },
        { status: StatusCodes.UNAUTHORIZED }
      );
    } else {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      const response = NextResponse.redirect(loginUrl, 307);
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }
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
