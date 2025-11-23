
// proxy.ts à la racine du projet
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes à protéger
const protectedRoutes = ["/booking", "/my-bookings", "/profile"];
// Routes accessibles uniquement aux non-connectés
const guestOnlyRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value; // Cookie HttpOnly contenant le JWT

  // Redirection si route protégée et pas connecté
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirection si route guestOnly et utilisateur déjà connecté
  if (token && guestOnlyRoutes.some((route) => pathname.startsWith(route))) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

// Définir les routes sur lesquelles ce proxy s’applique
export const config = {
  matcher: [
    "/booking/:path*",
    "/my-bookings/:path*",
    "/profile/:path*",
    "/login/:path*",
    "/register/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
  ],
};
