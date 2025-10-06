import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Protect /admin routes EXCEPT /admin/login
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login"
  ) {
    const authCookie = req.cookies.get("admin_auth")?.value;
    if (authCookie !== process.env.ADMIN_SECRET) {
      // Redirect to password gate
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
