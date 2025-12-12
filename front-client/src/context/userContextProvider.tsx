"use client";
// On importe les hooks React nécessaires :
// - useEffect : pour exécuter du code au montage du composant (chargement initial)
// - useState : pour gérer l’état local (ici, l’utilisateur connecté)
import { useEffect, useState } from "react";

// On importe le contexte UserContext, l’interface IUser (le type des données utilisateur) et les fonctions fetch de l'Api
import UserContext from "./userContext";
import { IUser } from "@/@types/user";
import { authApi } from "@/api/auth";
import { csrfApi } from "@/api/csrf";
import { useRouter } from "next/navigation";

// On définit les props attendues par le composant : ici, seulement les enfants
// Ce composant enveloppera toute l’application.
interface Props {
  children: React.ReactNode;
}

/**
 * UserContextProvider
 * ----------------------
 * Ce composant "fournit" le contexte utilisateur à toute l’application.
 * Il gère :
 *  - la récupération du user au chargement du site (via /auth/me)
 *  - la mise à jour du user après connexion ou déconnexion
 *  - le partage des infos (user, login, logout) à tous les composants enfants
 */
export default function UserContextProvider({ children }: Props) {
  // On crée un state "user" pour stocker les informations de l’utilisateur connecté.
  // Par défaut, il est null (aucun utilisateur connecté).
  const [user, setUser] = useState<IUser | null>(null);
  const [logged, setLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  // state pour récuperer le csrf token
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const router = useRouter();

  // Fonction de login : appelée après un POST /login réussi
  // Elle enregistre les données de l’utilisateur dans le state global.
  const login = (userData: IUser) => {
    setUser(userData);
    setLogged(true);
  };

  // Fonction de logout : utilisée pour déconnecter l’utilisateur
  // Elle réinitialise le state à null.
  const logout = async () => {
    try {
      const token = csrfToken || await csrfApi.getCsrfToken();
      // Appel au backend pour supprimer le cookie
      await authApi.logout(token!);
  
      // Mise à jour du state React
      setUser(null);
      setLogged(false);

      // redirection vers login
      router.push("/");
    } catch (err) {
      console.error("Erreur lors du logout :", err);
    } 
  };

  /**
   * useEffect : exécuté au premier rendu
   * Son rôle : récupèrer l'utilisateur connecté au chargement
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // On recupère le token csrf de l'API
        const csrfToken = await csrfApi.getCsrfToken();

        setCsrfToken(csrfToken);
        // On récupère l'utilisateur courrant (via la route GET)
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
        // ici on met setLogged à true si l'utilisateur courant n'est pas null
        setLogged(currentUser !== null);
        // console.log(csrfToken);
      } catch (err) {
        console.error("Erreur lors de la récupération du user :", err);
        setUser(null);
        setLogged(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  /**
   * On retourne le Provider du contexte :
   * il "enveloppe" l’application et rend accessibles :
   *  - user : infos de l’utilisateur connecté
   *  - login : fonction pour se connecter
   *  - logout : fonction pour se déconnecter
   */
  return (
    <UserContext.Provider value={{ user, setUser, logged, setLogged, isLoading, login, logout, csrfToken }}>
      {children}
    </UserContext.Provider>
  );
}

