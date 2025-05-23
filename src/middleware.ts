import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { localesConfig } from "./locales/locales-config";

export default createMiddleware(localesConfig);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);

  // return ["/", "/home"].includes(pathname)
  //   ? NextResponse.redirect(new URL("/login", request.nextUrl))
  //   : NextResponse.next();
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
