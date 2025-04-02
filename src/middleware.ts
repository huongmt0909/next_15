import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);

  return pathname === "/"
    ? NextResponse.redirect(new URL("/home", request.nextUrl))
    : NextResponse.next();
}

// Cấu hình matcher để chỉ định những route nào sẽ chạy qua middleware
export const config = {
  matcher: [
    /*
     * Match tất cả các request paths ngoại trừ:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|serviceWorker).*)",
  ],
};
