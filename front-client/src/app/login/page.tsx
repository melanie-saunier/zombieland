// src/app/login/page.tsx 

"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function LoginPage() {
  // pour faire un focus sur le premier input(input email) lorsque l'on arrive sur la page
  const inpuRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inpuRef.current?.focus();
  }, []);

  return(
    <div className="relative flex flex-col justify-center bg-[url('/images/background.png')] bg-no-repeat bg-cover bg-center min-h-[500px] md:min-h-screen p-4 md:p-8">
      {/* div pour un effet overlay (noir) pour que le text ressorte bien par dessus l'image de background */}
      <div className="absolute inset-0 bg-neutral-700/50"></div>
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl text-center">Connexion</h1>
        <p className="text-center text-base md:text-xl p-2 text-shadow-lg/30">Ton pass pour l’expérience Zombieland t’attend !</p>
        <form className="flex flex-col items-center gap-4 pb-2">
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
          <button className="button_booking m-2 p-2 md:m-4 md:py-4 md:px-12  font-bold">Se connecter</button>
        </form>
        <p className="text-center drop-shadow-lg/30">Pas encore de compte ? <Link href={"/register"} className="font-semibold underline hover:text-primary-purple-200 transition">Créer un compte ici</Link></p>
      </div>
    </div>
  );
}