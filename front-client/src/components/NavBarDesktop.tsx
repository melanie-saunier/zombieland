"use client";

import { Bell, CalendarCheck, House, Info, LogIn, LogOut, Rocket, SignpostBig, UserPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBarDesktop() {
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
    { name: "Mon profil", path: "/profile", Icon: UserPen, logged: true },
    { name: "Mes réservations", path: "/bookings", Icon: CalendarCheck, logged: true },
    { name: "Activités", path: "/activities", Icon: Rocket, always: true },
    { name: "Informations", path: "/visitor-information", Icon: SignpostBig, always: true },
    { name: "À propos", path: "/about", Icon: Info, always: true },
    { name: "Se connecter", path: "/login", Icon: LogIn, onlyLoggedOut: true },
    { name: "Se déconnecter", path: "/logout", Icon: LogOut, logged: true },
  ];

  return (
    <nav className="hidden md:flex flex-col items-center bg-neutral-700 py-4 h-screen w-1/5 fixed top-0 left-0 border-solid border-r border-primary-purple-300 drop-shadow-[0_0_4px_var(--color-primary-purple-200)] ">
      <Link href="/" className="mx-4">
        <Image src="/images/logo.png" alt="Logo de Zombieland" width={200} height={100}/>
      </Link>
      <div className="border-b border-t  border-solid border-primary-purple-300  flex justify-center w-full">
        <button className="my-4 mx-2 px-2 py-4 flex items-center button_booking text-neutral-50">
          <Bell size={24} className="mx-2"/>
            Réserver maintenant
        </button>
      </div>
      <ul className="text-neutral-50 flex flex-col gap-8 w-full my-8">
        {/* On fait un map sur notre liste d'items de navigation et qui affichent en fonction des propriétés always, logged et onlyLoggedOut*/}
        {navItems.map((item) => {
          // Toujours afficher
          if (item.always) return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={ `${pathname === item.path ? "flex current_page_text" : "flex"}`}
                  
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
            <li key={item.path} className="border-b border-t  border-solid border-primary-purple-300 py-4">
              <Link
                href={item.path}
                className={ `${pathname === item.path ? "flex current_page_text" : "flex"}`}
                
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
            <li key={item.path} className="border-b border-t  border-solid border-primary-purple-300 py-4">
              <Link
                href={item.path}
                className={ `${pathname === item.path ? "flex current_page_text" : "flex"}`}
            
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
  );
}