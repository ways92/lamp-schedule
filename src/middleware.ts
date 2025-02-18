import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    const isAuthPage = ["/auth/login", "/auth/register"].includes(req.nextUrl.pathname);

    if (!token && !isAuthPage) {
      return NextResponse.redirect(new URL("/auth/login", process.env.NEXTAUTH_URL || req.url));
    }

    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/lamp-schedule", process.env.NEXTAUTH_URL || req.url));
    }

    return NextResponse.next();
  } catch ( error ) {
    return NextResponse.redirect(new URL("/auth/login", process.env.NEXTAUTH_URL || req.url));
  }
}

export const config = {
  matcher: ["/((?!_next|api/auth|_next/static|_next/image|favicon.ico).*)"],
};
