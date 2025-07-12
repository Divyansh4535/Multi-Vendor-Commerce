import { NextRequest, NextResponse } from "next/server";
import { tokenTitle } from "./lib/constant";
import { decryptData } from "./lib/utils";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(tokenTitle)?.value;
  const path = request.nextUrl.pathname;

  let isAuthentication = false;

  if (token) {
    try {
      const user = decryptData(token);
      if (user) isAuthentication = true
    } catch (error) {
      isAuthentication = false
    }
  }

  if (path.startsWith("/dashboard") && !isAuthentication) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (path.startsWith("/auth") && isAuthentication ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next()
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

// Ye matcher ensure karta hai ki middleware sirf relevant frontend routes pe chale — static files ya APIs pe nahi.
// Middleware logic ko fix karne ke baad matcher add karna necessary hai so you don’t accidentally break internal files or SEO.