import { IUser } from "@/@types/user";
import { createContext, Dispatch, SetStateAction } from "react";

/**
 * Interface IUserContext
 * -----------------------
 * Elle décrit le contenu du *UserContext* :
 * - `user` : les infos de l'utilisateur connecté (ou `null` s’il n’y a pas de session)
 * - `login` : une fonction pour connecter un utilisateur (met à jour le contexte)
 * - `logout` : une fonction pour le déconnecter (réinitialise le contexte)
 */
export interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  logged: boolean; // état connecté
  setLogged: (value: boolean) => void; // setter pour logged
  login: (userData: IUser) => void;
  logout: () => void;
  csrfToken: string | null;
}

/**
 * Création du contexte utilisateur
 * ---------------------------------
 * - `createContext()` crée un objet React Context.
 * - On lui passe `undefined` par défaut, car le Provider sera défini ailleurs.
 * 
 * Typage : `IUserContext | undefined`
 *  → Cela signifie que le contexte contiendra un objet conforme à `IUserContext`,
 *    ou `undefined` si le Provider n’a pas encore été initialisé.
 * 
 * Ce contexte permettra de partager les infos utilisateur dans toute l’application,
 * sans avoir à passer de props manuellement entre les composants.
 */
const UserContext = createContext<undefined | IUserContext>(undefined);

export default UserContext;