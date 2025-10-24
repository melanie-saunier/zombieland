"use client";

import Link from "next/link";
import { LogIn, House, LogOut,  Rocket, Bell } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBarMobile() {
  // Varible pour récupérer le chemin de la page actuelle, grâce au hook "usePathname" de React
  const pathname= usePathname();
  // State provisoire pour gérer la connexion
  const [isLogged, setIsLogged] = useState(false);

  // Variables qui rassemblent les items de la navigation sous forme de liste
  // Propriété "always" : doit toujours apparaitre dans le mnu
  // Propriété "logged" : doit apparaitre dans le menu si l'utilisateur est connecté
  // Propriété "onlyLoggedOut" : doit apparaitre dans le menu si l'utilisateur n'est pas connecté
  const navItems = [
    { name: "Accueil", path: "/", Icon: House, always: true },
    { name: "Activités", path: "/activities", Icon: Rocket, always: true },
    { name: "Réserver", path: "/booking", Icon: Bell, always: true },
    { name: "Se connecter", path: "/login", Icon: LogIn, onlyLoggedOut: true },
    { name: "Se déconnecter", path: "/logout", Icon: LogOut, logged: true },
  ];
  
  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-neutral-700/90 p-2 rounded-t-xl border-t-2 border-solid border-primary-purple-300 drop-shadow-[0_0_4px_var(--color-primary-purple-200)] ">
        <ul className="flex justify-between px-4 text-neutral-50">
          {/* On fait un map sur notre liste d'items de navigation et qui affichent en fonction des propriétés always, logged et onlyLoggedOut*/}
          {navItems.map((item) => {
            // Toujours afficher
            if (item.always) return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={ `${pathname === item.path ? "flex flex-col items-center current_page_text" : "flex flex-col items-center"}`}
                >
                  <item.Icon
                    color={ `${pathname === item.path ? "var(--color-primary-purple-300)" : "var(--color-primary-purple-500)"}`}
                    className={ `${pathname === item.path ? "mx-2 curent_page_icon" : "mx-2"}`}
                    size={24}
                  />
                  <p>{item.name}</p>
                </Link>
              </li>
            );

            // Afficher si connecté
            if (isLogged && item.logged) return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={ `${pathname === item.path ? "flex flex-col items-center current_page_text" : "flex flex-col items-center"}`}
                >
                  <item.Icon
                    color={ `${pathname === item.path ? "var(--color-primary-purple-300)" : "var(--color-primary-purple-500)"}`}
                    className={ `${pathname === item.path ? "mx-2 curent_page_icon" : "mx-2"}`}
                    size={24}
                  />
                  {item.name}
                </Link>
              </li>
            );

            // Afficher si pas connecté
            if (!isLogged && item.onlyLoggedOut) return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={ `${pathname === item.path ? "flex flex-col items-center current_page_text" : "flex flex-col items-center"}`}
                >
                  <item.Icon
                    color={ `${pathname === item.path ? "var(--color-primary-purple-300)" : "var(--color-primary-purple-500)"}`}
                    className={ `${pathname === item.path ? "mx-2 curent_page_icon" : "mx-2"}`}
                    size={24}
                  />
                  {item.name}
                </Link>
              </li>
            );

          })}
        </ul>
      </nav>
    </>
  );
}
