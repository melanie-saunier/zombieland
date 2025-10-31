// src/app/profile/page.tsx 

"use client"; 
import { useState, useEffect } from "react";
import Image from "next/image"; 
import { Eye, EyeOff, X } from "lucide-react"; 

// Import des types TypeScript pour la sécurité des données (structure attendue)
import type { User, PasswordState } from "@/@types/profile.d.ts";

/**
 * Composant principal : ProfilePage
 * Gère toute la logique et l'affichage du profil :
 *  - L’affichage du profil utilisateur
 *  - Le mode édition (modification des infos personnelles)
 *  - Le changement de mot de passe via un modal
 *  - Les messages d’erreur et de succès
 */
export default function ProfilePage() {
  // State qui contient les informations de l'utilisateur (nom, prénom, email). Null par défaut.
  const [userData, setUserData] = useState<User | null>(null);
  // State qui définit si l'utilisateur est en mode "modification du profil". False = lecture seule.
  const [isEditing, setIsEditing] = useState(false);
  // State qui indique si la page est en cours de chargement. True au départ, passe à false quand les données sont prêtes.
  const [isLoading, setIsLoading] = useState(true);
  // State qui contient un éventuel message d'erreur à afficher à l'utilisateur.
  const [error, setError] = useState<string | null>(null);
  // State qui contient un message de succès temporaire (ex: "Profil mis à jour !").
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // State complexe pour gérer tout ce qui concerne le mot de passe
  const [passwordState, setPasswordState] = useState<PasswordState>({
    isOpen: false, // Affiche ou non le modal de changement de mot de passe
    oldPassword: "", // Mot de passe actuel
    newPassword: "", // Nouveau mot de passe
    confirmedPassword: "", // Confirmation du nouveau mot de passe
    show: { oldPassword: false, newPassword: false, confirmedPassword: false }, // Gère l'affichage/masquage des mots de passe
    errors: [], // Liste d'erreurs liées au formulaire mot de passe
  });

  // Au montage, on simule la récupération du profil utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true); // On indique que la page est en cours de chargement
        setError(null); // On réinitialise les erreurs

        //TODO: faire le fetch directement à l'API. En attendant, on créé une variable provisoire 
        const data = {
          id: "1",
          firstName: "Max",
          lastName: "Dupont",
          email: "max.dupont@zombieland.fr",
        };

        // On met à jour l’état avec les données reçues
        setUserData(data); 
      } catch (err) {
        // En cas d’erreur, on affiche un message d’erreur utilisateur
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      } finally {
        // Qu’il y ait erreur ou non, on arrête l’état "chargement"
        setIsLoading(false);
      }
    };
    
    fetchUser(); // Appel effectif de la fonction de récupération
  }, []); 

  // Fonction appelée quand l'utilisateur clique sur "Sauvegarder" pour sauvegarder les modifications de son profil (hors password)
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // empêche le rechargement de la page

    // Vérifie que tous les champs obligatoires sont remplis
    if (!userData?.firstName || !userData?.lastName || !userData?.email) {
      setError("Tous les champs sont requis");
      return;
    }

    // Vérifie que l'email est au bon format via une expression régulière
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(userData.email)) {
      setError("Email invalide");
      return;
    }

    try {
      setError(null); // Réinitialise les erreurs

      // TODO: Appel API à venir (updateUserData(userData))
      
      setSuccessMessage("Profil mis à jour !");
      setIsEditing(false); // Sort du mode édition

      // Message temporaire pendant 3 secondes
      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de sauvegarde");
    }
  };

  // Fonction appelée quand l'utilisateur modifie son mot de passe
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // empêche le rechargement de la page

    // On créé un tableau d'erreur vide, pour contenir toutes les erreurs possibles
    const newErrors: string[] = [];
    
    // Il faut l'ancien mot de passe
    if (!passwordState.oldPassword) newErrors.push("Mot de passe actuel requis");

    // Vérifications simples côté client
    const pwd = passwordState.newPassword;
    // Longueur minimale
    if (pwd.length < 8)
      newErrors.push("Le mot de passe doit contenir au moins 8 caractères");
    // Lettre minuscule
    if (!/[a-z]/.test(pwd))
      newErrors.push("Le mot de passe doit contenir au moins une lettre minuscule");
    // Lettre majuscule
    if (!/[A-Z]/.test(pwd))
      newErrors.push("Le mot de passe doit contenir au moins une lettre majuscule");
    // Chiffre
    if (!/\d/.test(pwd))
      newErrors.push("Le mot de passe doit contenir au moins un chiffre");
    // Caractère spécial (parmi les plus courants)
    if (!/[!@#$%^&*]/.test(pwd))
      newErrors.push("Le mot de passe doit contenir au moins un caractère spécial");
    // Confirmation identique
    if (pwd !== passwordState.confirmedPassword)
      newErrors.push("Les mots de passe ne correspondent pas");

    if (newErrors.length) {
      setPasswordState((p) => ({ ...p, errors: newErrors }));
      return;
    }

    try {
      // TODO: Appel API à venir (updateUserData(userData))
      
      // Si tout se passe bien :
      setSuccessMessage("Ton mot de passe a bien été mis à jour !");
      setPasswordState({
        isOpen: false, // Ferme le modal
        oldPassword: "",
        newPassword: "",
        confirmedPassword: "",
        show: { oldPassword: false, newPassword: false, confirmedPassword: false },
        errors: [], // Vide les erreurs
      });

    } catch (err) {
      // Si une erreur survient (ex: mot de passe actuel incorrect)
      setPasswordState((p) => ({
        ...p,
        errors: [err instanceof Error ? err.message : "Erreur"],
      }));
    }
  };

  // TODO : mettre à jour avec le Loader existant
   if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-300 border-t-transparent mx-auto mb-4" />
          <p className="text-neutral-300">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error && !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 max-w-md">
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!userData) return null; // Si aucune donnée d'utilisateur n'est trouvée, on ne rend rien //

  return (
    // SECTION PRINCIPALE — englobe toute la page profil
    <section className="min-h-screen p-4 md:p-8 bg-radial from-[#961990] to-[#000000]">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Mon Profil</h1>

        {/* Messages de feedback */}
        {/* Message de succès après une mise à jour réussie (par ex. infos modifiées ou mot de passe changé) */}
        {successMessage && (
          <div className="p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-300 text-center">
            {successMessage}
          </div>
        )}
        
        {/* Message d’erreur si une action échoue (erreur serveur, validation, etc.) */}
        {error && (
          <div className="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 p-6 bg-neutral-700 rounded-lg border border-primary-300 shadow-[0_0_12px_rgba(180,130,255,0.3)]">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary-300 shadow-[0_0_20px_rgba(180,130,255,0.5)]">
            <Image
              src="/images/zombie-avatar.png"
              alt={`Avatar de ${userData.firstName} ${userData.lastName}`} // On affiche le prénom et le nom de l'utilisateur connecté
              fill
              sizes="192px"
              className="object-cover"
              priority
            />
          </div>
          {/* Nom complet de l’utilisateur connecté */}
          <h2 className="text-2xl font-bold text-neutral-50">
            {userData.firstName} {userData.lastName}
          </h2>
        </div>

        {/* Informations personnelles */}
        <div className="p-6 bg-neutral-700 rounded-lg border border-primary-300 shadow-[0_0_12px_rgba(180,130,255,0.3)]">
          <h3 className="text-xl font-bold text-neutral-50 mb-6 pb-2 border-b border-primary-300">
            Informations personnelles
          </h3>

          {/* FORMULAIRE D’EDITION DES INFOS (prénom, nom, email) */}
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            {/* Boucle sur les champs à afficher */}
            {(["firstName", "lastName", "email"] as const).map((key) => (
              <div key={key} className="flex flex-col gap-1">
                {/* Label descriptif du champ */}
                <label htmlFor={key} className="text-sm text-primary-200 font-semibold">
                  {key === "firstName" ? "Prénom" : key === "lastName" ? "Nom" : "Email"}
                </label>
                {/* Si le mode édition est actif → input modifiable */}
                {isEditing ? (
                  <input
                    id={key}
                    type={key === "email" ? "email" : "text"}
                    value={userData[key]}
                    onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                    className="p-3 bg-neutral-700/50 rounded border border-primary-500 text-neutral-50 focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-300 transition-all"
                    required
                  />
                ) : (
                  // Sinon, simple affichage non modifiable
                  <div className="p-3 bg-neutral-700/50 rounded border border-primary-500 text-neutral-50">
                    {userData[key]}
                  </div>
                )}
              </div>
            ))}
          
             {/* --- BOUTONS D’ACTION --- */}
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              {isEditing ? (
                // Boutons visibles quand on édite les infos
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-neutral-600 text-neutral-50 font-bold rounded hover:bg-neutral-500 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 button_activity text-neutral-50 font-bold rounded hover:scale-105 transition"
                  >
                    Sauvegarder
                  </button>
                </>
              ) : (
                // Bouton pour activer le mode édition
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 button_activity text-neutral-50 font-bold rounded hover:scale-105 transition"
                >
                  Modifier mes informations
                </button>
              )}

              {/* Bouton pour ouvrir la modale de changement de mot de passe */}
              <button
                onClick={() => setPasswordState((p) => ({ ...p, isOpen: true, errors: [] }))}
                className="px-6 py-2 button_booking text-neutral-50 font-bold rounded hover:scale-105 transition"
              >
                Changer mon mot de passe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal pour modifier le mot de passe */}
      {passwordState.isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="password-modal-title"
        >
          {/* Conteneur principal de la modale */}
          <div className="relative w-full max-w-md bg-neutral-700 rounded-lg border-2 border-primary-300 shadow-[0_0_30px_rgba(180,130,255,0.5)]">
            
            {/* En-tête de la modale avec titre + bouton de fermeture */}
            <div className="sticky top-0 bg-neutral-700 border-b border-primary-300 p-6 flex justify-between items-center">
              <h3 id="password-modal-title" className="text-xl font-bold text-neutral-50">
                Modification du mot de passe
              </h3>
              <button
                onClick={() => setPasswordState((p) => ({ ...p, isOpen: false }))}
                className="text-primary-300 hover:text-primary-200"
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Formulaire du changement de mot de passe */}
            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              {/* Trois champs : ancien, nouveau et confirmation */}
              {(["oldPassword", "newPassword", "confirmedPassword"] as const).map((field) => (
                <div key={field} className="flex flex-col gap-1">
                  <label htmlFor={`password-${field}`} className="text-sm text-primary-200 font-semibold">
                    {field === "oldPassword" ? "Mot de passe actuel" : field === "newPassword" ? "Nouveau mot de passe" : "Confirmer le mot de passe"}
                  </label>
                  {/* Champ de saisie du mot de passe avec bouton pour afficher/masquer */}
                  <div className="relative">
                    <input
                      id={`password-${field}`}
                      type={passwordState.show[field] ? "text" : "password"}
                      value={passwordState[field]}
                      onChange={(e) => setPasswordState({ ...passwordState, [field]: e.target.value })}
                      placeholder={
                        field === "oldPassword" ? "Entrez votre mot de passe actuel" :
                        field === "newPassword" ? "Entrez votre nouveau mot de passe" :
                        "Confirmez votre nouveau mot de passe"
                      }
                      className="w-full p-3 pr-12 bg-neutral-700/50 rounded border border-primary-500 text-neutral-50 focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-300"
                      required
                    />
                    {/* Bouton œil pour afficher ou masquer le mot de passe */}
                    <button
                      type="button"
                      onClick={() =>
                        setPasswordState((p) => ({
                          ...p,
                          show: { ...p.show, [field]: !p.show[field] }, /* Affiche ou masque le mot de passe */
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-300 hover:text-primary-200"
                      aria-label={passwordState.show[field] ? "Masquer" : "Afficher"}
                    >
                      {passwordState.show[field] ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              ))}

              {/* Liste des erreurs de validation du mot de passe */}
              {passwordState.errors.length > 0 && (
                <div className="p-3 bg-red-900/30 border border-red-500 rounded" role="alert">
                  <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
                    {passwordState.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Boutons d’action dans la modale */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setPasswordState((p) => ({ ...p, isOpen: false }))}
                  className="flex-1 px-6 py-3 bg-neutral-600 text-neutral-50 font-bold rounded hover:bg-neutral-500 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 button_booking text-neutral-50 font-bold rounded hover:scale-105 transition"
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}