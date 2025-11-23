"use client";
import { useState, useRef, useEffect } from "react";
import { csrfApi } from "@/api/csrf";
import { authApi } from "@/api/auth";
import useUserContext from "@/context/useUserContext";
import Loader from "@/components/Loader";
import LinkButton from "@/components/LinkButton";

export default function ForgotPasswordPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { csrfToken } = useUserContext();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const token = csrfToken || await csrfApi.getCsrfToken();

      await authApi.forgotPassword(email, token!);

      setSuccess("Si un compte existe avec cet email, un lien de réinitialisation a été envoyé. N'oublie pas de regarder dans tes spams !");
    } catch (err) {
      console.error(err);
      setError("Impossible d'envoyer l'email. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center bg-[url('/images/background.png')] bg-cover bg-center min-h-screen p-4 md:p-8">

      <div className="absolute inset-0 bg-neutral-700/50"></div>

      <div className="relative z-10 mx-auto">
        <h1 className="title text-3xl md:text-5xl text-center">Mot de passe oublié</h1>

        <p className="text-center text-base md:text-xl p-2 text-shadow-lg/30">
          Indique ton email pour recevoir un lien de réinitialisation.
        </p>

        <form 
          className="flex flex-col items-center gap-4 pt-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-64 md:w-80">
            <label htmlFor="email" className="font-bold">E-mail</label>
            <input
              ref={inputRef}
              type="email"
              id="email"
              name="email"
              className="input_style"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // <-- disable input pendant le loader
            />
          </div>

          {/* Loader ou bouton */}
          {!success && (
            loading ? (
              <div className="mt-4 flex justify-center">
                <Loader />
              </div>
            ) : (
              <button type="submit" className="button_booking mt-4 p-2 md:py-4 md:px-12 font-bold">
                Envoyer le lien
              </button>
            )
          )}
        </form>
        {(error || success) && (
          <><div
            className={`w-3/4 p-4 my-4 mx-auto rounded-lg shadow-[0_0_12px_rgba(0,255,0,0.3)] ${error
                ? "bg-red-900/70 border-2 border-red-500"
                : "bg-green-900/70 border-2 border-green-500"}`}
          >
            <p
              className={`text-sm text-center ${error ? "text-red-300" : "text-green-300"}`}
            >
              {error || success}
            </p>
          </div><div className="flex justify-center mt-4">
              <LinkButton path="/" text="Retour à l'accueil" style="button_booking" />
            </div></>
        )}
      </div>
    </div>
  );
}
