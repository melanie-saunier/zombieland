// middleware.ts à la racine du projet
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//On définit les routes à protéger
const protectedRoutes = ["/booking", "/my-bookings", "/profile"];

export function middleware(req: NextRequest) {
  // on récupère la route
  const { pathname } = req.nextUrl;

  // On ne protège que les routes listées
  // sur les routes protégées on vérifie la présence du cookies et du token, si absent on redirige vers la page login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("token")?.value; // nom du cookie HttpOnly contenant le JWT

    // Si pas de token, redirection vers login
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Sinon, continuer la requête normalement
  return NextResponse.next();
}

// On définit les routes sur lesquelles le middleware s’applique
export const config = {
  matcher: ["/booking/:path*", "/my-bookings/:path*", "/profile/:path*"],
};
