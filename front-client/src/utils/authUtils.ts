// src/utils/authUtils.ts

// Import des hooks de navigation de Next.js
import { useRouter } from "next/navigation";

/**
 * useHandleLogout
 * ----------------
 * Hook custom pour gérer la déconnexion d'un utilisateur.
 * 
 * Paramètres :
 * - logout : fonction fournie par le contexte pour déconnecter l'utilisateur
 * - setLogoutMessage : setter pour afficher un message temporaire après la déconnexion
 * 
 * Retourne : une fonction handleLogout à utiliser dans les composants.
 */
export const useHandleLogout = (logout: () => void) => {
  // Hook Next.js pour effectuer des redirections programmatiques
  const router = useRouter();

  /**
   * handleLogout
   * --------------
   * Fonction qui sera appelée lorsqu'on clique sur "Se déconnecter".
   */
  const handleLogout = () => {
    logout(); // Appel de la fonction de déconnexion globale (context)

    // Redirection vers la page d'accueil
    router.push("/");
  };
  
  // On retourne la fonction handleLogout pour pouvoir l'utiliser dans les composants
  return handleLogout;
};
