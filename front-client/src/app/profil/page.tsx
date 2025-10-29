"use client"; 
/* Directive Next.js indiquant que ce composant est exécuté côté client (navigateur), 
   et non côté serveur. Nécessaire pour utiliser les hooks React comme useState ou useEffect. */

import { useState, useEffect } from "react"; // Import des hooks React
import Image from "next/image"; // Composant optimisé de Next.js pour afficher des images
import { Eye, EyeOff, X } from "lucide-react"; // Icônes SVG importées depuis la librairie lucide-react

// Import des types TypeScript pour la sécurité des données (structure attendue)
import type { User, PasswordState } from "@/@types/profile.d.ts";

// Définition du composant principal "ProfilPage" exporté par défaut
export default function ProfilPage() {

  /* ----------------------------- GESTION DES ÉTATS ----------------------------- */

  const [userData, setUserData] = useState<User | null>(null);
  // Contient les informations de l'utilisateur (nom, prénom, email). Null par défaut.

  const [isEditing, setIsEditing] = useState(false);
  // Définit si l'utilisateur est en mode "modification du profil". False = lecture seule.

  const [isLoading, setIsLoading] = useState(true);
  // Indique si la page est en cours de chargement. True au départ, passe à false quand les données sont prêtes.

  const [error, setError] = useState<string | null>(null);
  // Contient un éventuel message d'erreur à afficher à l'utilisateur.

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Contient un message de succès temporaire (ex: "Profil mis à jour !").

  // État complexe pour gérer tout ce qui concerne le mot de passe
  const [passwordState, setPasswordState] = useState<PasswordState>({
    isOpen: false, // Affiche ou non le modal de changement de mot de passe
    current: "", // Mot de passe actuel
    new: "", // Nouveau mot de passe
    confirm: "", // Confirmation du nouveau mot de passe
    show: { current: false, new: false, confirm: false }, // Gère l'affichage/masquage des mots de passe
    errors: [], // Liste d'erreurs liées au formulaire mot de passe
  });

  /* ----------------------------- CHARGEMENT DES DONNÉES UTILISATEUR ----------------------------- */

  useEffect(() => {
    // useEffect = Hook qui s’exécute au premier rendu du composant.
    // Ici, on s’en sert pour aller chercher les données de l’utilisateur dès que la page se charge.

    const fetchUser = async () => {
      try {
        setIsLoading(true); // On indique que la page est en cours de chargement
        setError(null); // On réinitialise les erreurs

        // ⚠️ À remplacer par un appel API réel plus tard (ex: getUserData() via axios)
        const data = {
          id: "1",
          firstName: "Max",
          lastName: "Dupont",
          email: "max.dupont@zombieland.fr",
        };

        setUserData(data); // On met à jour l’état avec les données reçues
      } catch (err) {
        // En cas d’erreur, on affiche un message d’erreur utilisateur
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      } finally {
        // Qu’il y ait erreur ou non, on arrête l’état "chargement"
        setIsLoading(false);
      }
    };
    
    fetchUser(); // Appel effectif de la fonction de récupération
  }, []); // [] = le hook ne s’exécute qu’une seule fois (au montage du composant)


  /* ----------------------------- SAUVEGARDE DU PROFIL ----------------------------- */

  const handleSave = async () => {
    // Fonction appelée quand l'utilisateur clique sur "Sauvegarder"

    // Vérifie que tous les champs obligatoires sont remplis
    if (!userData?.firstName || !userData?.lastName || !userData?.email) {
      setError("Tous les champs sont requis");
      return;
    }

    // Vérifie que l'email est au bon format via une expression régulière
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError("Email invalide");
      return;
    }

    try {
      setError(null); // Réinitialise les erreurs

      // ⚠️ Appel API à venir (updateUserData(userData))
      
      setSuccessMessage("Profil mis à jour !");
      setIsEditing(false); // Sort du mode édition

      // Message temporaire pendant 3 secondes
      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de sauvegarde");
    }
  };


  /* ----------------------------- FORMULAIRE DE CHANGEMENT DE MOT DE PASSE ----------------------------- */

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement automatique du formulaire

    const errors: string[] = [];

    // Vérifications simples côté client
    if (!passwordState.current) errors.push("Mot de passe actuel requis");
    if (passwordState.new.length < 8) errors.push("Minimum 8 caractères");
    if (passwordState.new !== passwordState.confirm) errors.push("Mots de passe différents");

    // Si des erreurs sont trouvées, on les enregistre et on arrête le processus
    if (errors.length) {
      setPasswordState((p) => ({ ...p, errors }));
      return;
    }

    try {
      // ⚠️ Appel API futur : updatePassword({ current, new })
      
      // Si tout se passe bien :
      setSuccessMessage("Mot de passe changé !");
      setPasswordState({
        isOpen: false, // Ferme le modal
        current: "",
        new: "",
        confirm: "",
        show: { current: false, new: false, confirm: false },
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

  // A MAJ avec le composant loader de Mélanie /!\
   if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-purple-300 border-t-transparent mx-auto mb-4" />
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
    <section className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Mon Profil</h1>

        {/* Messages de feedback */}
        {successMessage && (
          <div className="p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-300 text-center">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 p-6 bg-neutral-700 rounded-lg border border-primary-purple-300 shadow-[0_0_12px_rgba(180,130,255,0.3)]">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary-purple-300 shadow-[0_0_20px_rgba(180,130,255,0.5)]">
            <Image
              src="/images/default-avatar.png"
              alt={`Avatar de ${userData.firstName} ${userData.lastName}`} // MAJ en fonction du back//
              fill
              sizes="192px"
              className="object-cover"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-neutral-50">
            {userData.firstName} {userData.lastName}
          </h2>
        </div>

        {/* Informations personnelles */}
        <div className="p-6 bg-neutral-700 rounded-lg border border-primary-purple-300 shadow-[0_0_12px_rgba(180,130,255,0.3)]">
          <h3 className="text-xl font-bold text-neutral-50 mb-6 pb-2 border-b border-primary-purple-300">
            Informations personnelles
          </h3>

//* AJOUTER LA BALISE forms pour les inputs avec les bonnes props /!\//
          <div className="space-y-4">
            {(["firstName", "lastName", "email"] as const).map((key) => (
              <div key={key} className="flex flex-col gap-1">
                <label htmlFor={key} className="text-sm text-primary-purple-200 font-semibold">
                  {key === "firstName" ? "Prénom" : key === "lastName" ? "Nom" : "Email"}
                </label>
                {isEditing ? (
                  <input
                    id={key}
                    type={key === "email" ? "email" : "text"}
                    value={userData[key]}
                    onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                    className="p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 focus:outline-none focus:border-primary-purple-300 focus:ring-1 focus:ring-primary-purple-300 transition-all"
                    required
                  />
                ) : (
                  <div className="p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50">
                    {userData[key]}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-neutral-600 text-neutral-50 font-bold rounded hover:bg-neutral-500 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 button_activity text-neutral-50 font-bold rounded hover:scale-105 transition"
                >
                  Sauvegarder
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 button_activity text-neutral-50 font-bold rounded hover:scale-105 transition"
              >
                Modifier mes informations
              </button>
            )}
            <button
              onClick={() => setPasswordState((p) => ({ ...p, isOpen: true, errors: [] }))}
              className="px-6 py-2 button_booking text-neutral-50 font-bold rounded hover:scale-105 transition"
            >
              Changer mon mot de passe
            </button>
          </div>
        </div>
      </div>

      {/* Modal mot de passe (identique avec aria-labels ajoutés) */}
      {passwordState.isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="password-modal-title"
        >
          <div className="relative w-full max-w-md bg-neutral-700 rounded-lg border-2 border-primary-purple-300 shadow-[0_0_30px_rgba(180,130,255,0.5)]">
            <div className="sticky top-0 bg-neutral-700 border-b border-primary-purple-300 p-6 flex justify-between items-center">
              <h3 id="password-modal-title" className="text-xl font-bold text-neutral-50">
                Modification du mot de passe
              </h3>
              <button
                onClick={() => setPasswordState((p) => ({ ...p, isOpen: false }))}
                className="text-primary-purple-300 hover:text-primary-purple-200"
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              {(["current", "new", "confirm"] as const).map((field) => (
                <div key={field} className="flex flex-col gap-1">
                  <label htmlFor={`password-${field}`} className="text-sm text-primary-purple-200 font-semibold">
                    {field === "current" ? "Mot de passe actuel" : field === "new" ? "Nouveau mot de passe" : "Confirmer le mot de passe"}
                  </label>
                  <div className="relative">
                    <input
                      id={`password-${field}`}
                      type={passwordState.show[field] ? "text" : "password"}
                      value={passwordState[field]}
                      onChange={(e) => setPasswordState({ ...passwordState, [field]: e.target.value })}
                      placeholder={
                        field === "current" ? "Entrez votre mot de passe actuel" :
                        field === "new" ? "Entrez votre nouveau mot de passe" :
                        "Confirmez votre nouveau mot de passe"
                      }
                      className="w-full p-3 pr-12 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 focus:outline-none focus:border-primary-purple-300 focus:ring-1 focus:ring-primary-purple-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPasswordState((p) => ({
                          ...p,
                          show: { ...p.show, [field]: !p.show[field] }, /* Affiche ou masque le mot de passe */
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-purple-300 hover:text-primary-purple-200"
                      aria-label={passwordState.show[field] ? "Masquer" : "Afficher"}
                    >
                      {passwordState.show[field] ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              ))}

              {passwordState.errors.length > 0 && (
                <div className="p-3 bg-red-900/30 border border-red-500 rounded" role="alert">
                  <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
                    {passwordState.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

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