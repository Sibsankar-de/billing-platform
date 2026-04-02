import { NextRequest, NextResponse } from "next/server";
import { isValidAuthToken } from "./proxy/auth.proxy";

// Route groups
const publicRoutes = [];
const authRoutes = ["/auth/login", "/auth/register"];
const protectedRoutes = ["/profile", "/stores"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = await isValidAuthToken(request);

  // "/" route
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
  }

  // AUTH ROUTES
  if (authRoutes.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
  }

  // PROTECTED ROUTES
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"], // match everything except internals
};
