// src/app/login/page.tsx 

"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/auth";

import useUserContext from "../../context/useUserContext";
import { csrfApi } from "@/api/csrf";

export default function LoginPage() {
  // pour faire un focus sur le premier input(input email) lorsque l'on arrive sur la page
  const inputRef = useRef<HTMLInputElement>(null);
  // Router Next.js pour redirections après login
  const router = useRouter();

  // Récupération des fonctions du contexte utilisateur
  const { login, csrfToken } = useUserContext();

  // State pour gérer l'affichage des messages d'erreur et de succès
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  
  // Focus automatique sur le champ email au montage du composant
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Vérifie les identifiants saisis
   * @param email - Email saisi par l'utilisateur
   * @param password - Mot de passe saisi par l'utilisateur
   */
  const checkCrendentials = async (email: string, password: string) => {
    try {
      const token = csrfToken //|| await csrfApi.getCsrfToken();
      // Appel à l'API login
      const user = await authApi.login({email, password}, token!);
      // Si aucun utilisateur retourné → identifiants incorrects
      if (!user) {
        setError("Email ou mot de passe incorrect");
        return;
      }

      // On met à jour le context user 
      login(user);


      // Message de succès
      setSuccess(`Bienvenue ${user.firstname} ! Tu vas être redirigé·e vers la page d'accueil.`);
      setError(null);

      // Redirection vers la page d'accueil après 2 secondes
      setTimeout(() => {
        router.push("/"); // redirection vers la home
      }, 2000);

    } catch (e) {
      // Gestion des erreurs (ex: 401 Unauthorized)
      console.log("Erreur lors du login :", e);
      if (e instanceof Error) {
        if (e.message.includes("Bad credentials")) {
          setError("E-mail ou mot de passe incorrect");
        } else {
          setError("Erreur lors de connexion.");
        }
      }
     
    }
  };

  return(
    <div className="relative flex flex-col justify-center bg-[url('/images/background.png')] bg-no-repeat bg-cover bg-center min-h-[500px] md:min-h-screen p-4 md:p-8">
      
      {/* div pour un effet overlay (noir) pour que le text ressorte bien par dessus l'image de background */}
      <div className="absolute inset-0 bg-neutral-700/50"></div>

      {/* Contenu du formulaire */}
      <div className="relative z-10">
        <h1 className="title text-3xl md:text-5xl text-center">Connexion</h1>
        <p className="text-center text-base md:text-xl p-2 text-shadow-lg/30">Ton pass pour l’expérience Zombieland t’attend !</p>
        <p className="text-center text-base md:text-l p-2 text-shadow-lg/30 italic">Identifie-toi pour survivre à l’apocalypse et réserver tes billets.</p>
        {/* Formulaire de connexion */}
        <form 
          className="flex flex-col items-center gap-4 pb-2"
          onSubmit={(e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            setError(null); // Reset des messages d'erreur
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            checkCrendentials(email, password); // Vérification des identifiant
          }}
        >
          <div className="flex flex-col">
            {/* honeypot pour protéger des attaques de robot: le robot va remplir cet input */}
            {/* on pourra donc rejeter la soumission du form si cet input est complété */}
            {/* tabIndex -1 pour ne pas accèder à cet index avec la touche tab et autocomplete:off pour pas que le navigateur ne complète automatiquement l'input */}
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off"/>
          </div>

          {/* Champ Email */}
          <div className="flex flex-col w-64 md:w-80" >
            <label htmlFor="email" className="font-bold">E-mail</label>
            <input
              ref={inputRef} 
              type="email" 
              name="email" 
              id="email" 
              required 
              className="input_style"
            />
          </div>
          {/* Champ Mot de passe */}
          <div className="flex flex-col w-64 md:w-80">
            <label htmlFor="password" className="font-bold">Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="input_style" 
              required/>
          </div>
          {/* Bouton de soumission */}
          {!success && (
            <button type="submit" className="button_booking m-2 p-2 md:m-4 md:py-4 md:px-12 font-bold">
              Se connecter
            </button>
          )}
        </form>

        {/* Pour afficher l'erreur de connexion */}
        {error && (
          <div className="w-fit p-4 my-4 mx-auto bg-red-900/70 border-2 border-red-500 rounded-lg shadow-[0_0_12px_0_rgba(255,0,0,0.3)]" role="alert">
            <p className="text-red-300 text-sm space-y-1 text-center">{error}</p>
          </div>
        )}

        {/* Pour afficher le message de connexion de succès */}
        {success && (
          <div className="w-fit p-4 my-4 mx-auto bg-green-900/70 border-2 border-green-500 rounded-lg shadow-[0_0_12px_0_rgba(0,255,0,0.3)]" role="alert">
            <p className="text-green-300 text-sm space-y-1 text-center">{success}</p>
          </div>
        )}

        {/* Lien vers la page d'inscription */}
        <p className="text-center drop-shadow-lg/30">
          Pas encore de compte ? <Link href={"/register"} className="font-semibold underline hover:text-primary-purple-200 transition">Crée un compte ici</Link></p>
      </div>
    </div>
  );
}