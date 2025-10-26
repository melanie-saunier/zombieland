"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu, House, LogOut, UserPen, Info, CalendarCheck, SignpostBig, Rocket } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function HeaderMobile() {
  // Varible pour récupérer le chemin de la page actuelle, grâce au hook "usePathname" de React
  const pathname= usePathname();
  // State pour gérer l'ouverture du menu hamburger
  const [menuOpen, setMenuOpen] = useState(false);
  // State provisoire pour gérer la connexion
  const [isLogged, setIsLogged] = useState(false);

  // Variables qui rassemblent les items de la navigation sous forme de liste
  // Propriété "always" : doit toujours apparaitre dans le mnu
  // Propriété "logged" : doit apparaitre dans le menu si l'utilisateur est connecté
  // Propriété "onlyLoggedOut" : doit apparaitre dans le menu si l'utilisateur n'est pas connecté
  const navItems = [
    { name: "Accueil", path: "/", Icon: House, always: true },
    { name: "Mon profil", path: "/profile", Icon: UserPen, logged: true },
    { name: "Mes réservations", path: "/bookings", Icon: CalendarCheck, logged: true },
    { name: "Activités", path: "/activities", Icon: Rocket, always: true },
    { name: "Informations", path: "/visitor-information", Icon: SignpostBig, always: true },
    { name: "À propos", path: "/about", Icon: Info, always: true },
    { name: "Se connecter", path: "/login", Icon: LogIn, onlyLoggedOut: true },
    { name: "Se déconnecter", path: "/logout", Icon: LogOut, logged: true },
  ];
  
  return (
    <>
      <header className="fixed top-0 z-50 w-full md:hidden bg-neutral-700 border-b-2 border-solid border-primary-purple-300 flex justify-between items-center">
        <Link href="/" className="mx-4">
          <Image src="/images/logo.png" alt="Logo de Zombieland" width={100} height={50}/>
        </Link>
            
        <button 
          className="mx-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu color="#fff" size={24}/>
        </button>
      </header>
      <nav className={`${menuOpen ? "bg-neutral-700/85 py-4 flex justify-center fixed z-50 w-full top-16" : "hidden"}`}>
        <ul className="text-neutral-50 flex flex-col gap-2">
          {/* On fait un map sur notre liste d'items de navigation et qui affichent en fonction des propriétés always, logged et onlyLoggedOut*/}
          {navItems.map((item) => {
            // Toujours afficher
            if (item.always) return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={ `${pathname === item.path ? "flex current_page_text" : "flex"}`}
                  onClick={() => setMenuOpen(false)}
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

            // Afficher si connecté
            if (isLogged && item.logged) return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={ `${pathname === item.path ? "flex current_page_text" : "flex"}`}
                  onClick={() => setMenuOpen(false)}
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
                  className={ `${pathname === item.path ? "flex current_page_text" : "flex"}`}
                  onClick={() => setMenuOpen(false)}
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
