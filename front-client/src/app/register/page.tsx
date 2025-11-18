// src/app/register/page.tsx 

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authApi } from "@/api/auth";
import useUserContext from "@/context/useUserContext";
import { csrfApi } from "@/api/csrf";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  // pour faire un focus sur le premier input(input email)lorsque l'on arrive sur la page
  const inpuRef = useRef<HTMLInputElement>(null);

  const { csrfToken } = useUserContext();

  const router = useRouter();
  
  // pour les messages d’erreur ou de succès
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // State pour montrer ou masquer les mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage(null);
    // on récupère les données du form
    const form = e.currentTarget;
    const formData = new FormData(form);
    // on vérifie le honeyPot si il est rempli, c'est un bot donc on stop
    const honeypot = formData.get("honeypot") as string;
    if (honeypot) {
      setErrors(["Erreur de validation du formulaire."]);
      return; // bot détecté
    }
    const email = formData.get("email") as string;
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const password = formData.get("password") as string;
    const confirmedPassword = formData.get("confirmation") as string;

    const newErrors: string[] = [];

    //verification nom et prénom: 
    if (!firstname) newErrors.push("Le prénom est obligatoire.");
    if (!lastname) newErrors.push("Le nom est obligatoire.");
    // Vérifie que l'email est au bon format via une expression régulière
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrors.push("Email invalide");
    }
    // Longueur minimale
    if (password.length < 8)
      newErrors.push("Le mot de passe doit contenir au moins 8 caractères");
    // Lettre minuscule
    if (!/[a-z]/.test(password))
      newErrors.push("Le mot de passe doit contenir au moins une lettre minuscule");
    // Lettre majuscule
    if (!/[A-Z]/.test(password))
      newErrors.push("Le mot de passe doit contenir au moins une lettre majuscule");
    // Chiffre
    if (!/\d/.test(password))
      newErrors.push("Le mot de passe doit contenir au moins un chiffre");
    // Caractère spécial (parmi les plus courants)
    if (!/[!@#$%^&*]/.test(password))
      newErrors.push("Le mot de passe doit contenir au moins un caractère spécial");
    // verif des password si identique
    if (password !== confirmedPassword) {
      newErrors.push("Les mots de passe ne correspondent pas.");
    }
    // si il y a des erreurs on les passent dans le state d'erreurs:
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {email, firstname, lastname, password, confirmedPassword };
    try {
      const token = csrfToken || await csrfApi.getCsrfToken();
      
      const user = await authApi.register(data, token!);

      if (!user) {
        setErrors(["Échec de l'inscription. Veuillez réessayer."]);
        return;
      }
      setSuccessMessage("Inscription réussie ! Redirection en cours...");

      setTimeout(() => router.push("/login"), 2000);
    } catch(e) {
      // Gestion des erreurs (ex: 401 Unauthorized)
      console.log("Erreur lors du login :", e);
      if (e instanceof Error) {
        if (e.message.includes("An account with this email address already exists.")) {
          setErrors(["Un compte avec cet email existe déjà."]);
        } else {
          setErrors(["Erreur lors de l'inscription."]);
        }
      }
    }
  }

  useEffect(() => {
    inpuRef.current?.focus();
  }, []);

  return(
    <div className="relative bg-[url('/images/background.png')] bg-no-repeat bg-cover bg-center min-h-[600px] md:min-h-screen p-4 md:p-8">
      {/* div pour un effet overlay (noir) pour que le text ressorte bien par dessus l'image de background */}
      <div className="absolute inset-0 bg-neutral-700/50"></div>
      <div className="relative z-10">
        <h1 className="title text-3xl md:text-5xl text-center">Inscription</h1>
        <p className="text-center text-base md:text-xl p-2 text-shadow-lg/30">Rejoignez-nous dans l’aventure Zombieland</p>
        <form 
          onSubmit={handleRegister}
          className="flex flex-col items-center gap-4">
          <div className="flex flex-col">
            {/* honeypot pour protéger des attaques de robot: le robot va remplir cet input */}
            {/* on pourra donc rejeter la soumission du form si cet input est complété */}
            {/* tabIndex -1 pour ne pas accèder à cet index avec la touche tab et autocomplete:off pour pas que le navigateur ne complète automatiquement l'input */}
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off"/>
          </div>
          <div className="flex flex-col w-64 md:w-80">
            <label htmlFor="email" className="font-bold">E-mail</label>
            <input
              ref={inpuRef} 
              type="email" 
              name="email" 
              id="email" 
              required 
              className="input_style"
            />
          </div>
          <div className="flex flex-col w-64 md:w-80">
            <label htmlFor="lastname" className="font-bold">Nom</label>
            <input 
              type="text" 
              name="lastname" 
              id="lastname" 
              className="input_style" 
              required
            />
          </div>
          <div className="flex flex-col w-64 md:w-80">
            <label htmlFor="firstname" className="font-bold">Prénom</label>
            <input 
              type="text" 
              name="firstname" 
              id="firstname" 
              className="input_style" 
              required
            />
          </div>
          <div className="flex flex-col w-64 md:w-80 relative">
            <label htmlFor="password" className="font-bold">Mot de passe</label>
            <input 
              type={showPassword ? "text" : "password"}
              name="password" 
              id="password" 
              className="input_style" 
              required
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
            <label htmlFor="confirmation" className="font-bold">Confirmation du mot de passe</label>
            <input 
              type={showConfirmation ? "text" : "password"}
              name="confirmation" 
              id="confirmation" 
              className="input_style pr-10"
              required
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
          {/* si message d'erreur  */}
          {errors.length > 0 && (
            <div className="w-fit p-4 my-4 mx-auto bg-red-900/70 border-2 border-red-500 rounded-lg shadow-[0_0_12px_0_rgba(255,0,0,0.3)]" role="alert">
              {errors.map((err) => (
                <p key={err} className="text-red-300 text-sm space-y-1 text-center">{err}</p>
              ))}
            </div>
          )}
          {/* si reussite  */}
          {successMessage && (
            <div className="w-fit p-4 my-4 mx-auto bg-green-900/70 border-2 border-green-500 rounded-lg shadow-[0_0_12px_0_rgba(0,255,0,0.3)]" role="alert">
              <p className="text-green-300 text-sm space-y-1 text-center">{successMessage}</p>
            </div>
          )}

          <div className="w-64 md:w-120">
            <p className="text-sm text-justify">Les informations recueillies lors de ton inscription sont utilisées uniquement pour la création et la gestion de ton compte Zombieland. Tes données personnelles ne seront jamais partagées à des tiers sans ton consentement. Pour en savoir plus sur la gestion de tes données et tes droits, consulte notre <Link href="/privacy-policy" className="underline font-bold hover:text-primary-200 transition">politique de confidentialité</Link>.</p>
          </div>
          <button className="button_booking m-2 p-2 md:m-4 md:py-4 md:px-12  font-bold">S&apos;inscrire</button>
        </form>
      </div>
    </div>
  );
}