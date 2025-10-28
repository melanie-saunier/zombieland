// Composant NavBarDesktop
// Barre de navigation verticale pour desktop
// - Affiche le logo cliquable en haut
// - Inclut un bouton "Réserver" avec icône
// - Liste des items de navigation avec icônes et texte
// - Items affichés selon l'état de connexion : always, logged, onlyLoggedOut
// - Certains items ont un style spécial (isAction) pour les séparer visuellement
// - L'item actif est mis en valeur avec une couleur différente et des effets hover/scale

"use client";

import { Bell, CalendarCheck, House, Info, LogIn, LogOut, Rocket, SignpostBig, UserPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LinkButton from "./LinkButton";

export default function NavBarDesktop() {
  // Varible pour récupérer le chemin de la page actuelle, grâce au hook "usePathname" de React
  const pathname= usePathname();
  // State provisoire pour gérer la connexion
  const [isLogged, setIsLogged] = useState(false);
  
  // Variables qui rassemblent les items de la navigation sous forme de liste
  // Propriété "always" : doit toujours apparaitre dans le mnu
  // Propriété "logged" : doit apparaitre dans le menu si l'utilisateur est connecté
  // Propriété "onlyLoggedOut" : doit apparaitre dans le menu si l'utilisateur n'est pas connecté
  // Propriété "isAction" : style spécifique pour les items Se connecter et Se déconnecter (bordure top et bottom rose)
  const navItems = [
    { name: "Accueil", path: "/", Icon: House, always: true },
    { name: "Mon profil", path: "/profile", Icon: UserPen, logged: true },
    { name: "Mes réservations", path: "/bookings", Icon: CalendarCheck, logged: true },
    { name: "Activités", path: "/activities", Icon: Rocket, always: true },
    { name: "Informations", path: "/visitor-information", Icon: SignpostBig, always: true },
    { name: "À propos", path: "/about", Icon: Info, always: true },
    { name: "Se connecter", path: "/login", Icon: LogIn, onlyLoggedOut: true, isAction: true },
    { name: "Se déconnecter", path: "/logout", Icon: LogOut, logged: true, isAction: true },
  ];

  return (
    // Conteneur principal de la nav desktop
    <nav className="hidden md:flex flex-col items-center bg-neutral-700 py-4 min-h-screen w-1/5 fixed top-0 left-0 border-solid border-r border-primary-purple-300">
      
      {/* Logo cliquable en haut */}
      <Link href="/" className="mx-4">
        <Image src="/images/logo.png" alt="Logo de Zombieland" width={200} height={100} className="hover:scale-125 transition-transform duration-200"/>
      </Link>

      {/* Bouton "Réserver" avec icône */}
      <div className="border-b border-t border-solid border-primary-purple-300 flex justify-center w-full">
        <LinkButton path={"/booking"} text="Réserver" style="button_booking" Icon={Bell}/>
      </div>

      {/* Liste des éléments principaux (en haut) */}
      <ul className="text-neutral-50 flex flex-col gap-4 w-full my-4">
        {/* On fait un map sur notre liste d'items de navigation et qui affichent en fonction des propriétés always, logged et onlyLoggedOut*/}
        {navItems
          .filter(item => !item.isAction) // Exclut "Se connecter" et "Se déconnecter"
          .map((item) => {
            if (item.always || (isLogged && item.logged)) {
              return (
                <li key={item.path}>
                  {/*
                    <Link> : lien cliquable pour naviguer vers la page de l'item
                    - href={item.path} : URL de destination
                    - className : applique un style conditionnel si l'item correspond à la page actuelle
                  */}
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 px-8 py-2
                    ${pathname === item.path ? "current_page_text" : ""}
                    hover:scale-110 transition-transform duration-200`}
                  >
                    {/*
                      <item.Icon> : icône associée à l'item
                      - color : change la couleur si l'item correspond à la page actuelle
                      - className : applique un espacement et éventuellement un style spécial si c'est la page active
                      - size : taille de l'icône
                    */}
                    <item.Icon
                      color={pathname === item.path ? "var(--color-primary-purple-300)" : "var(--color-primary-purple-500)"}
                      className={pathname === item.path ? "mx-2 curent_page_icon" : "mx-2"}
                      size={24}
                    />
                    {/* Nom affiché de l'item de navigation */}
                    {item.name}
                  </Link>
                </li>
              );
            }
          })}
      </ul>

      {/* Bouton "Se connecter" ou "Se déconnecter" (en bas) */}
      <div className="w-full mt-auto">
        {navItems
          .filter(item => item.isAction)
          .map((item) => {
            if ((!isLogged && item.onlyLoggedOut) || (isLogged && item.logged)) {
              return (
                <div key={item.path} className="border-b border-t border-solid border-primary-purple-300 w-full">
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 px-8 py-4 w-full
                    ${pathname === item.path ? "current_page_text" : ""}
                    hover:scale-110 transition-transform duration-200`}
                  >
                    <item.Icon
                      color={pathname === item.path ? "var(--color-primary-purple-300)" : "var(--color-primary-purple-500)"}
                      className={pathname === item.path ? "mx-2 curent_page_icon" : "mx-2"}
                      size={24}
                    />
                    {item.name}
                  </Link>
                </div>
              );
            }
          })}
      </div>
    </nav>
  );

}



