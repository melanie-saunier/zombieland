"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, X } from "lucide-react";

/* Types */
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/* Page Profil */
export default function ProfilPage() {
    const [userData, setUserData] = useState<User>({
      id: "1",
      firstName: "Max",
      lastName: "Dupont",
      email: "max.dupont@zombieland.fr",
      avatarUrl: "/images/Portrait-max2.png",
    });
  
    const [isEditing, setIsEditing] = useState(false);
    const [tempUserData, setTempUserData] = useState<User>(userData);
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordData, setPasswordData] = useState<PasswordChangeData>({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    const [showPasswords, setShowPasswords] = useState({
      current: false,
      new: false,
      confirm: false,
    });
    const [errors, setErrors] = useState<string[]>([]);
  
    const handleSave = () => {
      if (!tempUserData.firstName || !tempUserData.lastName || !tempUserData.email) {
        alert("Tous les champs sont requis");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(tempUserData.email)) {
        alert("Veuillez entrer une adresse email valide");
        return;
      }
      setUserData(tempUserData);
      setIsEditing(false);
      alert("Informations sauvegardées avec succès !");
    };
  
    const togglePasswordVisibility = (field: "current" | "new" | "confirm") =>
      setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  
    const handleSubmitPassword = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = [];
      if (!passwordData.currentPassword) newErrors.push("Le mot de passe actuel est requis");
      if (passwordData.newPassword.length < 8)
        newErrors.push("Le nouveau mot de passe doit contenir au moins 8 caractères");
      if (passwordData.newPassword !== passwordData.confirmPassword)
        newErrors.push("Les mots de passe ne correspondent pas");
      if (newErrors.length) return setErrors(newErrors);
      alert("Mot de passe changé !");
      setIsModalOpen(false);
    };
  
    return (
      <section className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Mon Profil</h1>
  
          <div className="flex flex-col items-center gap-4 p-6 bg-neutral-700 rounded-lg border border-primary-purple-300 shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary-purple-300 shadow-[0_0_20px_0_rgba(180,130,255,0.5)]">
              <Image src={userData.avatarUrl!} alt="Avatar" fill className="object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-50">
              {userData.firstName} {userData.lastName}
            </h2>
          </div>
  
          <div className="p-6 bg-neutral-700 rounded-lg border border-primary-purple-300 shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <h3 className="text-xl font-bold text-neutral-50 mb-6 pb-2 border-b border-primary-purple-300">
              Informations personnelles
            </h3>
  
            <div className="space-y-4">
              <ProfilField
                label="Prénom"
                value={isEditing ? tempUserData.firstName : userData.firstName}
                onChange={(v) => setTempUserData((p) => ({ ...p, firstName: v }))}
                isEditing={isEditing}
                placeholder="Votre prénom"
              />
              <ProfilField
                label="Nom"
                value={isEditing ? tempUserData.lastName : userData.lastName}
                onChange={(v) => setTempUserData((p) => ({ ...p, lastName: v }))}
                isEditing={isEditing}
                placeholder="Votre nom"
              />
              <ProfilField
                label="Email"
                value={isEditing ? tempUserData.email : userData.email}
                onChange={(v) => setTempUserData((p) => ({ ...p, email: v }))}
                isEditing={isEditing}
                type="email"
                placeholder="votre.email@exemple.fr"
              />
            </div>
  
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-neutral-600 text-neutral-50 font-bold rounded hover:bg-neutral-500 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 button_activity text-neutral-50 font-bold rounded hover:scale-105 transition-transform"
                  >
                    Sauvegarder
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 button_activity text-neutral-50 font-bold rounded hover:scale-105 transition-transform"
                >
                  Modifier mes informations
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2 button_booking text-neutral-50 font-bold rounded hover:scale-105 transition-transform"
              >
                Changer mon mot de passe
              </button>
            </div>
          </div>
        </div>
  
        <PasswordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          showPasswords={showPasswords}
          togglePasswordVisibility={togglePasswordVisibility}
          onSubmit={handleSubmitPassword}
          errors={errors}
        />
      </section>
    );
  }

/* Composants utilisés dans la page */

// Champ pour le profil avec un input et un label
function ProfilField({
  label,
  value,
  onChange,
  isEditing,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  isEditing: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-primary-purple-200 font-semibold">{label}</label>
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 focus:outline-none focus:border-primary-purple-300 focus:ring-1 focus:ring-primary-purple-300 transition-all"
        />
      ) : (
        <div className="p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50">
          {value}
        </div>
      )}
    </div>
  );
}

// Champ mot de passe avec un toggle pour voir le mot de passe
function PasswordInput({
  label,
  value,
  onChange,
  visible,
  onToggle,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-primary-purple-200 font-semibold">{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 pr-12 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 focus:outline-none focus:border-primary-purple-300 focus:ring-1 focus:ring-primary-purple-300"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-purple-300 hover:text-primary-purple-200"
        >
          {visible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
}

/* Modal pour changer le mot de passe */
function PasswordModal({
  isOpen,
  onClose,
  passwordData,
  setPasswordData,
  showPasswords,
  togglePasswordVisibility,
  onSubmit,
  errors,
}: {
  isOpen: boolean;
  onClose: () => void;
  passwordData: PasswordChangeData;
  setPasswordData: React.Dispatch<React.SetStateAction<PasswordChangeData>>;
  showPasswords: Record<"current" | "new" | "confirm", boolean>;
  togglePasswordVisibility: (field: "current" | "new" | "confirm") => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: string[];
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-700 rounded-lg border-2 border-primary-purple-300 shadow-[0_0_30px_0_rgba(180,130,255,0.5)] max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-700 border-b border-primary-purple-300 p-6 flex justify-between items-center">
          <h3 className="text-xl font-bold text-neutral-50">
            Modification du mot de passe
          </h3>
          <button
            onClick={onClose}
            className="text-primary-purple-300 hover:text-primary-purple-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <PasswordInput
            label="Mot de passe actuel"
            value={passwordData.currentPassword}
            onChange={(v) => setPasswordData((p) => ({ ...p, currentPassword: v }))}
            visible={showPasswords.current}
            onToggle={() => togglePasswordVisibility("current")}
            placeholder="Entrez votre mot de passe actuel"
          />

          <PasswordInput
            label="Nouveau mot de passe"
            value={passwordData.newPassword}
            onChange={(v) => setPasswordData((p) => ({ ...p, newPassword: v }))}
            visible={showPasswords.new}
            onToggle={() => togglePasswordVisibility("new")}
            placeholder="Entrez votre nouveau mot de passe"
          />
          <p className="text-xs text-primary-purple-200/70">Minimum 8 caractères</p>

          <PasswordInput
            label="Confirmer le nouveau mot de passe"
            value={passwordData.confirmPassword}
            onChange={(v) => setPasswordData((p) => ({ ...p, confirmPassword: v }))}
            visible={showPasswords.confirm}
            onToggle={() => togglePasswordVisibility("confirm")}
            placeholder="Confirmez votre nouveau mot de passe"
          />

          {errors.length > 0 && (
            <div className="p-3 bg-red-900/30 border border-red-500 rounded">
              <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-neutral-600 text-neutral-50 font-bold rounded hover:bg-neutral-500 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 button_booking text-neutral-50 font-bold rounded hover:scale-105 transition-transform"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
