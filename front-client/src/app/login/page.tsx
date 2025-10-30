// src/app/login/page.tsx 

"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/auth";

import useUserContext from "../../context/useUserContext";

export default function LoginPage() {
  // pour faire un focus sur le premier input(input email) lorsque l'on arrive sur la page
  const inpuRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { login, setLogged } = useUserContext();
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  
  useEffect(() => {
    inpuRef.current?.focus();
  }, []);

  const checkCrendentials = async (email: string, password: string) => {
		try {
			const user = await authApi.login({email, password});
      if (!user) {
        setError("Email ou mot de passe incorrect");
        return;
      }

      // On met à jour le context user et le state logged
      login(user);
      setLogged(true);

      // Message de succès
      setSuccess(`Bienvenue ${user.firstname} ! Tu vas être redirigé vers la page d'accueil.`);
      setError(null);

      // redirection après un petit délai pour laisser le message visible
      setTimeout(() => {
        router.push("/"); // redirection vers la home
      }, 3000);

		} catch (e) {
			// si on reçoit une 401 unauthorisez c'est que y'a une erreur de email ou password on va afficher une erreur
			console.log("erreur");
			setError("Email ou mot de passe incorrect");
		}
	};

  return(
    <div className="relative flex flex-col justify-center bg-[url('/images/background.png')] bg-no-repeat bg-cover bg-center min-h-[500px] md:min-h-screen p-4 md:p-8">
      {/* div pour un effet overlay (noir) pour que le text ressorte bien par dessus l'image de background */}
      <div className="absolute inset-0 bg-neutral-700/50"></div>
      <div className="relative z-10">
        <h1 className="title text-3xl md:text-5xl text-center">Connexion</h1>
        <p className="text-center text-base md:text-xl p-2 text-shadow-lg/30">Ton pass pour l’expérience Zombieland t’attend !</p>
        <form 
          className="flex flex-col items-center gap-4 pb-2"
          onSubmit={(e) => {
            e.preventDefault(); // empêche le rechargement de la page
            setError(null); // reset error
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            checkCrendentials(email, password);
          }}
        >
          <div className="flex flex-col">
            {/* honeypot pour protéger des attaques de robot: le robot va remplir cet input */}
            {/* on pourra donc rejeter la soumission du form si cet input est complété */}
            {/* tabIndex -1 pour ne pas accèder à cet index avec la touche tab et autocomplete:off pour pas que le navigateur ne complète automatiquement l'input */}
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off"/>
          </div>
          <div className="flex flex-col w-64 md:w-80" >
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
            <label htmlFor="password" className="font-bold">Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="input_style" 
              required/>
          </div>
          <button type="submit" className="button_booking m-2 p-2 md:m-4 md:py-4 md:px-12 font-bold">Se connecter</button>
        </form>

        {/* Pour afficher l'erreur de connexion */}
        {error && (
          <div className="p-4 m-4 bg-red-900/70 border-2 border-red-500 rounded-lg shadow-[0_0_12px_0_rgba(255,0,0,0.3)]" role="alert">
            <p className="text-red-300 text-sm space-y-1 text-center">{error}</p>
          </div>
        )}

        {/* Pour afficher le message de connexion de succès */}
        {success && (
          <div className="p-4 m-4 bg-green-900/70 border-2 border-green-500 rounded-lg shadow-[0_0_12px_0_rgba(0,255,0,0.3)]" role="alert">
            <p className="text-green-300 text-sm space-y-1 text-center">{success}</p>
          </div>
        )}

        <p className="text-center drop-shadow-lg/30">Pas encore de compte ? <Link href={"/register"} className="font-semibold underline hover:text-primary-purple-200 transition">Créer un compte ici</Link></p>
      </div>
    </div>
  );
}