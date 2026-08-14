import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export async function proxy(request: NextRequest) {

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-pathname", request.nextUrl.pathname);

  const pathname = request.nextUrl.pathname;
  if (pathname === "/login" || pathname === "/movies") {
    return NextResponse.next();
  }
  const session = await getServerSession(authOptions);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/movies/:path*",
    "/watch/:path*",
    "/history/:path*",
  ],
};