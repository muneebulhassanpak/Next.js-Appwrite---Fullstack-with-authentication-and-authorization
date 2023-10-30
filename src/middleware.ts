import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const cookies = request.cookies.get("token")?.value;
  const publicPaths = pathName == "/signup" || pathName == "/login";
  if (publicPaths && cookies) {
    return NextResponse.redirect(new URL("/profile", request.url));
  } else if (!publicPaths && !cookies) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/signup", "/login", "/profile"],
};
