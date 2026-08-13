import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
export async function proxy(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if(!session){
    return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }  
  return NextResponse.next();
}

export const config = {
  matcher: ["/movies/:path*", "/watch/:path*", "/history:path*"],
};
