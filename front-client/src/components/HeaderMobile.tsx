// Composant HeaderMobile
// Header mobile avec logo cliquable, bouton hamburger et menu vertical.
// Items du menu affichés selon l'état de connexion (always, logged, onlyLoggedOut).
// L'item actif est mis en valeur, chaque item peut avoir une icône et un texte.
// Le menu se ferme automatiquement au clic pour l'UX mobile.

"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu, House, LogOut, UserPen, Info, CalendarCheck, SignpostBig, Rocket } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import useUserContext from "../context/useUserContext";

export default function HeaderMobile() {
  // Varible pour récupérer le chemin de la page actuelle, grâce au hook "usePathname" de React
  const pathname= usePathname();
  // State pour gérer l'ouverture du menu hamburger
  const [menuOpen, setMenuOpen] = useState(false);
  // Utilisation du contexte pour savoir si un utilisateur est connecté
  const { logged } = useUserContext();

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
      {/* Header mobile fixe en haut de l'écran */}
      <header className="fixed top-0 z-50 w-full md:hidden bg-neutral-700 border-b-2 border-solid border-primary-purple-300 flex justify-between items-center">
        
        {/* Logo cliquable qui renvoie à l'accueil */}
        <Link href="/" className="mx-4">
          <Image src="/images/logo.png" alt="Logo de Zombieland" width={100} height={50}/>
        </Link>

        {/* Bouton hamburger pour ouvrir/fermer le menu */}  
        <button 
          className="mx-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu color="#fff" size={24}/>
        </button>
      </header>

      {/* Menu mobile (affiché seulement si menuOpen = true) */}
      <nav className={`${menuOpen ? "bg-neutral-700/85 py-4 flex justify-center fixed z-50 w-full top-16" : "hidden"}`}>
        <ul className="text-neutral-50 flex flex-col gap-2">
          {/* On fait un map sur notre liste d'items de navigation et qui affichent en fonction des propriétés always, logged et onlyLoggedOut*/}
          {navItems.map((item) => {
            // Toujours afficher
            if (item.always) return (
              <li key={item.path}>
                {/* 
                  <Link> : lien cliquable qui redirige vers l'URL de l'item
                  - href={item.path} : chemin de destination
                  - className : applique un style conditionnel si l'item correspond à la page actuelle
                  - onClick : ferme le menu hamburger après le clic pour l'expérience mobile
                */}
                <Link
                  href={item.path}
                  className={ `${pathname === item.path ? "flex current_page_text" : "flex"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {/* 
                    <item.Icon> : icône associée à l'item
                    - color : couleur dynamique selon si l'item correspond à la page actuelle
                    - className : applique un espacement et éventuellement un style spécial si c'est la page active
                    - size : taille de l'icône
                  */}
                  <item.Icon
                    color={ `${pathname === item.path ? "var(--color-primary-purple-300)" : "var(--color-primary-purple-500)"}`}
                    className={ `${pathname === item.path ? "mx-2 curent_page_icon" : "mx-2"}`}
                    size={24}
                  />
                  {/* Nom affiché de l'item de navigation */}
                  {item.name}
                </Link>
              </li>
            );

            // Afficher si connecté
            if (logged && item.logged) return (
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
            if (!logged && item.onlyLoggedOut) return (
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
