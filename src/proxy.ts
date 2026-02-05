import { NextRequest, NextResponse } from "next/server";
import { isValidAuthToken } from "./proxy/auth.proxy";

export default async function proxy(request: NextRequest) {
  // authentication check
  const isAuthenticated = await isValidAuthToken(request);
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/stores/:path*", "/profile"],
};
