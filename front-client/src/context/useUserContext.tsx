// On importe le hook useContext depuis React.
// Ce hook permet d'accéder à la valeur d’un contexte défini avec createContext().
import { useContext } from "react";
// On importe le contexte que l’on a créé dans userContext.tsx
import UserContext from "./userContext";

/**
 * useUserContext
 * ------------------
 * C’est un *custom hook* (un hook personnalisé) qui encapsule useContext(UserContext).
 * 
 * Il sert à simplifier et sécuriser l’accès au contexte utilisateur dans toute l’application.
 * Au lieu d’écrire `useContext(UserContext)` partout,
 * on pourra simplement faire `useUserContext()` dans nos composants.
 */
export default function useUserContext() {
  // On récupère la valeur actuelle du contexte.
  // Elle contient : { user, logged, setLogged, login, logout } 
  const context = useContext(UserContext);

  // Si le contexte est "undefined", cela veut dire qu’on essaye d’utiliser ce hook
  // en dehors du <UserContextProvider> → ce n’est pas autorisé.
  if (!context) {
      // On lance une erreur explicite pour aider le développeur à comprendre la cause.
    throw new Error("UserContext doit être utilisé à l'intérieur d'un UserContextProvider");
  }
  
  // Si tout est bon, on retourne le contexte (jamais undefined à ce stade).
  return context;
}