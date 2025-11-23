"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { csrfApi } from "@/api/csrf";
import { authApi } from "@/api/auth";
import useUserContext from "@/context/useUserContext";
import Loader from "@/components/Loader";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams(); // pour récupérer le token depuis l'URL
  const token = params.token as string;

  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
    // State pour montrer ou masquer les mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { csrfToken } = useUserContext();

  useEffect(() => {
    // Focus sur le premier input si tu veux
    const input = document.getElementById("newPassword");
    input?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Token manquant ou invalide.");
      return;
    }

    if (newPassword !== confirmedPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const csrf = csrfToken || await csrfApi.getCsrfToken();

      await authApi.resetPassword({ token, newPassword, confirmedPassword }, csrf!);

      setSuccess("Mot de passe réinitialisé avec succès ! Redirection en cours...");
      
      // Rediriger vers la page login après 2s
      setTimeout(() => router.push("/login"), 2000);

    } catch (err) {
      console.error(err);
      setError("Impossible de réinitialiser le mot de passe. Le lien peut être expiré.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center bg-[url('/images/background.png')] bg-cover bg-center min-h-screen p-4 md:p-8">
      <div className="absolute inset-0 bg-neutral-700/50"></div>

      <div className="relative z-10 mx-auto">
        <h1 className="title text-3xl md:text-5xl text-center">Réinitialiser le mot de passe</h1>

        <p className="text-center text-base md:text-xl p-2 text-shadow-lg/30">
          Saisis ton nouveau mot de passe.
        </p>

        <form className="flex flex-col items-center gap-4 pt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col w-64 md:w-80 relative">
            <label htmlFor="newPassword" className="font-bold">Nouveau mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              className="input_style"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-2 top-2/3 -translate-y-1/2 text-primary-300 hover:text-primary-200"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex flex-col w-64 md:w-80 relative">
            <label htmlFor="confirmedPassword" className="font-bold">Confirmer le mot de passe</label>
            <input
              type={showConfirmation ? "text" : "password"}
              id="confirmedPassword"
              name="confirmedPassword"
              className="input_style"
              required
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmation(prev => !prev)}
              className="absolute right-2 top-2/3 -translate-y-1/2 text-primary-300 hover:text-primary-200"
              aria-label={showConfirmation ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showConfirmation ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Loader ou bouton */}
          {loading ? (
            <div className="mt-4 flex justify-center">
              <Loader />
            </div>
          ) : (
            <button type="submit" className="button_booking mt-4 p-2 md:py-4 md:px-12 font-bold">
              Réinitialiser
            </button>
          )}
        </form>

        {error && (
          <div className="w-fit p-4 my-4 mx-auto bg-red-900/70 border-2 border-red-500 rounded-lg shadow-[0_0_12px_rgba(255,0,0,0.3)]">
            <p className="text-red-300 text-sm text-center">{error}</p>
          </div>
        )}

        {success && (
          <div className="w-fit p-4 my-4 mx-auto bg-green-900/70 border-2 border-green-500 rounded-lg shadow-[0_0_12px_rgba(0,255,0,0.3)]">
            <p className="text-green-300 text-sm text-center">{success}</p>
          </div>
        )}
      </div>
    </div>
  );
}
