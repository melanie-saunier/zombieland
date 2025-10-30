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
    oldPassword: string; // Mot de passe actuel
    newPassword: string; // Nouveau mot de passe
    confirmedPassword: string; // Confirmation du mot de passe
    show: { oldPassword: boolean; newPassword: boolean; confirmedPassword: boolean }; // Affichage des champs
    errors: string[]; // Liste des erreurs de validation
  }