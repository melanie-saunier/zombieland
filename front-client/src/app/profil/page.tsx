"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, EyeOff, X } from "lucide-react";

/* -------------------------------
   Types de données
----------------------------------*/
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

/* État du modal de changement de mot de passe */
interface PasswordState {
  isOpen: boolean;
  current: string;
  new: string;
  confirm: string;
  show: { current: boolean; new: boolean; confirm: boolean };
  errors: string[];
}

/* Page Profil Utilisateur*/

export default function ProfilPage() {
  // État principal de l'utilisateur (issu de la BDD)
  const [userData, setUserData] = useState<User | null>(null);

  // État du mode édition
  const [isEditing, setIsEditing] = useState(false);

  // État pour le changement de mot de passe
  const [passwordState, setPasswordState] = useState<PasswordState>({
    isOpen: false,
    current: "",
    new: "",
    confirm: "",
    show: { current: false, new: false, confirm: false },
    errors: [] as string[],
  });

  /* 1. Chargement des données depuis la BDD (Simulation d’un appel à l' API backend utilisant Sequelize) */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Exemple : appel à une route API Next.js connectée à Sequelize
        // const res = await fetch("/api/user");
        // const data = await res.json();

        // Données temporaires simulées
        const data = {
          id: "1",
          firstName: "Max",
          lastName: "Dupont",
          email: "max.dupont@zombieland.fr",
        };

        setUserData(data);
      } catch (error) {
        console.error("Erreur de chargement du profil:", error);
      }
    };
    fetchUser();
  }, []);

  // Affichage de chargement pendant la requête
  if (!userData) return <p className="text-center mt-20">Chargement du profil...</p>;

  /* 2. Sauvegarde du profil dans la BDD */

  const handleSave = async () => {
    if (!userData.firstName || !userData.lastName || !userData.email) {
      alert("Tous les champs sont requis");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      alert("Veuillez entrer une adresse email valide");
      return;
    }

    try {
      // Exemple d’appel API vers Sequelize :
      // await fetch("/api/user/update", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(userData),
      // });

      alert("Profil mis à jour avec succès !");
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur de sauvegarde :", error);
      alert("Une erreur est survenue lors de la sauvegarde");
    }
  };

  /* 3. Gestion du changement de mot de passe */
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];

    if (!passwordState.current)
      errors.push("Le mot de passe actuel est requis");
    
    if (passwordState.new.length < 8)
      errors.push("Le nouveau mot de passe doit contenir au moins 8 caractères");
    
    if (passwordState.new !== passwordState.confirm)
      errors.push("Les mots de passe ne correspondent pas");
    
    if (errors.length) {
      setPasswordState((p) => ({ ...p, errors }));
      return;
    }
    

    try {
      // Exemple de route backend Sequelize :
      // await fetch("/api/user/password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     currentPassword: passwordState.current,
      //     newPassword: passwordState.new,
      //   }),
      // });

      alert("Mot de passe changé avec succès !");
      setPasswordState({
        isOpen: false,
        current: "",
        new: "",
        confirm: "",
        show: { current: false, new: false, confirm: false },
        errors: [],
      });
    } catch (error) {
      console.error("Erreur de changement de mot de passe :", error);
      alert("Une erreur est survenue");
    }
  };

  /* 4. Page Profil rendu */
  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Mon Profil</h1>

        {/* Bloc Avatar */}
        <div className="flex flex-col items-center gap-4 p-6 bg-neutral-700 rounded-lg border border-primary-purple-300 shadow-[0_0_12px_rgba(180,130,255,0.3)]">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary-purple-300 shadow-[0_0_20px_rgba(180,130,255,0.5)]">
            {/* Image par défaut non stockée en base */}
            <Image
              src="/images/default-avatar.png"
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-neutral-50">
            {userData.firstName} {userData.lastName}
          </h2>
        </div>

        {/* Bloc Informations personnelles */}
        <div className="p-6 bg-neutral-700 rounded-lg border border-primary-purple-300 shadow-[0_0_12px_rgba(180,130,255,0.3)]">
          <h3 className="text-xl font-bold text-neutral-50 mb-6 pb-2 border-b border-primary-purple-300">
            Informations personnelles
          </h3>

          {/* Champs dynamiques */}
          <div className="space-y-4">
            {["firstName", "lastName", "email"].map((key) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-sm text-primary-purple-200 font-semibold">
                  {key === "firstName"
                    ? "Prénom"
                    : key === "lastName"
                    ? "Nom"
                    : "Email"}
                </label>
                {isEditing ? (
                  <input
                    type={key === "email" ? "email" : "text"}
                    value={userData[key as keyof User] as string}
                    onChange={(e) =>
                      setUserData({ ...userData, [key]: e.target.value })
                    }
                    className="p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 focus:outline-none focus:border-primary-purple-300 focus:ring-1 focus:ring-primary-purple-300 transition-all"
                  />
                ) : (
                  <div className="p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50">
                    {userData[key as keyof User]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
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
              onClick={() =>
                setPasswordState((p) => ({ ...p, isOpen: true, errors: [] }))
              }
              className="px-6 py-2 button_booking text-neutral-50 font-bold rounded hover:scale-105 transition"
            >
              Changer mon mot de passe
            </button>
          </div>
        </div>
      </div>

      {/* Modal de changement de mot de passe */}
      {passwordState.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-neutral-700 rounded-lg border-2 border-primary-purple-300 shadow-[0_0_30px_rgba(180,130,255,0.5)]">
            {/* Header du modal */}
            <div className="sticky top-0 bg-neutral-700 border-b border-primary-purple-300 p-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-neutral-50">
                Modification du mot de passe
              </h3>
              <button
                onClick={() => setPasswordState((p) => ({ ...p, isOpen: false }))}
                className="text-primary-purple-300 hover:text-primary-purple-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Formulaire de mot de passe */}
            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              {["current", "new", "confirm"].map((field) => (
                <div key={field} className="flex flex-col gap-1">
                  <label className="text-sm text-primary-purple-200 font-semibold">
                    {field === "current"
                      ? "Mot de passe actuel"
                      : field === "new"
                      ? "Nouveau mot de passe"
                      : "Confirmer le mot de passe"}
                  </label>
                  <div className="relative">
                    <input
                      type={
                        passwordState.show[field as keyof PasswordState["show"]]
                          ? "text"
                          : "password"
                      }
                      value={passwordState[field as keyof PasswordState] as string}
                      onChange={(e) =>
                        setPasswordState({
                          ...passwordState,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={
                        field === "current"
                          ? "Entrez votre mot de passe actuel"
                          : field === "new"
                          ? "Entrez votre nouveau mot de passe"
                          : "Confirmez votre nouveau mot de passe"
                      }
                      className="w-full p-3 pr-12 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 focus:outline-none focus:border-primary-purple-300 focus:ring-1 focus:ring-primary-purple-300"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPasswordState((p) => ({
                          ...p,
                          show: {
                            ...p.show,
                            [field]: !p.show[field as keyof PasswordState["show"]],
                          },
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-purple-300 hover:text-primary-purple-200"
                    >
                      {passwordState.show[field as keyof PasswordState["show"]] ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              {/* Affichage des erreurs */}
              {passwordState.errors.length > 0 && (
                <div className="p-3 bg-red-900/30 border border-red-500 rounded">
                  <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
                    {passwordState.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Boutons du modal */}
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
