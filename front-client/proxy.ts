// middleware.ts (ou proxy.ts, selon ta structure)
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode'; // importation de la fonction jwtDecode de la bibliothèque jwt-decode pour décoder le token

// 1. Définition des routes
const protectedRoutes = ['/profile', '/my-bookings', '/booking']; // routes nécessitant une connexion
const authRoutes = ['/login', '/register']; // routes publiques accessibles sans connexion

export default async function middleware(req: NextRequest) { // fonction middleware pour vérifier le token et rediriger vers la page de login si nécessaire
  const path = req.nextUrl.pathname; // on récupère le chemin de la requête

  // 2. Vérifie si la route est protégée ou d'authentification
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route)); // on vérifie si la route est une route protégée (requiert une connexion)
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route)); // on vérifie si la route est une route d'authentification (accessible sans connexion)

  // 3. Récupère le cookie 'token' (créé côté back)
  const token = (await cookies()).get('token')?.value; // on récupère le token de la requête dans le cookie

  // 4. Vérifie si le token existe et n'est pas expiré
  let isAuthenticated = false; // on initialise la variable isAuthenticated à false
  if (token) {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token); // on décode le token pour récupérer l'expiration (exp)
      isAuthenticated = exp * 1000 > Date.now(); // encore valide si le token n'est pas expiré (encore valide si le token n'est pas expiré)
    } catch {
      isAuthenticated = false;
    }
  }

  // 5. Si la route est protégée et que l'utilisateur n'est pas connecté → redirection login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', req.nextUrl); // on redirige vers la page de login
    loginUrl.searchParams.set('from', path); // on ajoute le chemin de la requête à la URL de login pour rediriger vers la page d'où on vient
    return NextResponse.redirect(loginUrl); // on redirige vers la page de login
  } // si la route est protégée et que l'utilisateur n'est pas connecté, on redirige vers la page de login

  // 6. Si la route est d'auth et que l'utilisateur est déjà connecté → redirection accueil
  if (isAuthRoute && isAuthenticated) { // si la route est une route d'authentification et que l'utilisateur est connecté, on redirige vers la page d'accueil
    return NextResponse.redirect(new URL('/', req.nextUrl)); // on redirige vers la page d'accueil
  }

  // 7. Si tout est OK → on laisse passer la requête
  return NextResponse.next();
}

// 8. Configuration : exclure les fichiers statiques, images et routes API
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

 // configuration pour matcher les routes, ce qui permet de sécuriser les routes qui ne sont pas dans la liste des routes protégées ou d'authentification  (les routes de l'API, les static files, les images, les fonts, etc.)  et donc d'être sûr que le token est valide pour accéder à ces routes.