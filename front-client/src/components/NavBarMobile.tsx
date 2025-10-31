// Composant NavBarDesktop
// Barre de navigation mobile fixe en bas de l'écran avec icônes et labels
// Affiche les items de navigation en fonction de l'état de connexion de l'utilisateur

"use client";

import Link from "next/link";
import { LogIn, House, LogOut,  Rocket, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import useUserContext from "../context/useUserContext";


export default function NavBarMobile() {
  // Varible pour récupérer le chemin de la page actuelle, grâce au hook "usePathname" de React
  const pathname= usePathname();
  // Utilisation du contexte pour savoir si un utilisateur est connecté
  const { logged, logout } = useUserContext();

  // Variables qui rassemblent les items de la navigation sous forme de liste
  // Propriété "always" : doit toujours apparaitre dans le mnu
  // Propriété "logged" : doit apparaitre dans le menu si l'utilisateur est connecté
  // Propriété "onlyLoggedOut" : doit apparaitre dans le menu si l'utilisateur n'est pas connecté
  // Propriété "isAction" : style spécifique pour les items Se connecter et Se déconnecter (bordure top et bottom rose)
  const navItems = [
    { name: "Accueil", path: "/", Icon: House, always: true },
    { name: "Activités", path: "/activities", Icon: Rocket, always: true },
    { name: "Réserver", path: "/booking", Icon: Bell, always: true },
    { name: "Se connecter", path: "/login", Icon: LogIn, onlyLoggedOut: true, isAction: true },
    { name: "Se déconnecter", path: "/logout", Icon: LogOut, logged: true, isAction: true },
  ];
  
  return (
    // Navigation mobile fixe en bas
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-neutral-700/90 p-2 rounded-t-xl border-t-2 border-solid border-primary-purple-300 drop-shadow-[0_0_4px_var(--color-primary-purple-200)] ">
      <ul className="flex justify-between px-2 text-neutral-50">
        {/* On fait un map sur notre liste d'items de navigation et qui affichent en fonction des propriétés always, logged et onlyLoggedOut*/}
        {navItems.map((item) => {
          // Filtrage selon état de connexion
          if ((item.always) || (logged && item.logged) || (!logged && item.onlyLoggedOut)) {

            // Si l'item est une action (ex: logout)
            if (item.isAction && item.name === "Se déconnecter") {
              return (
                <li key={item.name}>
                  <button
                    onClick={() => logout()}
                    className="flex flex-col items-center px-2 py-1 hover:bg-neutral-600 rounded w-full"
                  >
                    <item.Icon
                      color={pathname === item.path ? "var(--color-primary-purple-300)" : "var(--color-primary-purple-500)"}
                      className="mx-2"
                      size={24}
                    />
                    <p>{item.name}</p>
                  </button>
                </li>
              );
            }

            // Item classique → navigation via Link
            return (
              <li key={item.name}>
                <Link
                  href={item.path || "/"}
                  className={`${pathname === item.path ? "flex flex-col items-center current_page_text" : "flex flex-col items-center"} px-2 py-1 hover:bg-neutral-600 rounded`}
                >
                  <item.Icon
                    color={pathname === item.path ? "var(--color-primary-purple-300)" : "var(--color-primary-purple-500)"}
                    className="mx-2"
                    size={24}
                  />
                  <p>{item.name}</p>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}
