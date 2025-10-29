/** 
 * Représente les informations d'un utilisateur
 */
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  /**
   * Structure d'état pour la gestion du changement de mot de passe
   */
export interface PasswordState {
    isOpen: boolean; // État du modal (ouvert/fermé)
    current: string; // Mot de passe actuel
    new: string; // Nouveau mot de passe
    confirm: string; // Confirmation du mot de passe
    show: { current: boolean; new: boolean; confirm: boolean }; // Affichage des champs
    errors: string[]; // Liste des erreurs de validation
  }