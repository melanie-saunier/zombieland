// src/app/register/page.tsx 

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  // pour faire un focus sur le premier input(input email)lorsque l'on arrive sur la page
  const inpuRef = useRef<HTMLInputElement>(null);

  // pour les messages d’erreur ou de succès
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    // on récupère les données du form
    const form = e.currentTarget;
    const formData = new FormData(form);
    // on vérifie le honeyPot si il est rempli, c'est un bot donc on stop
    const honeypot = formData.get("honeypot") as string;
    if (honeypot) {
      setErrorMessage("Erreur de validation du formulaire.");
      return; // bot détecté
    }
    const email = formData.get("email") as string;
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const password = formData.get("password") as string;
    const confirmation = formData.get("confirmation") as string;
    // verif des password si identique
    if (password !== confirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    // validation des autres à faire
    
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
        <form className="flex flex-col items-center gap-4">
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
          <div className="flex flex-col w-64 md:w-80">
            <label htmlFor="password" className="font-bold">Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="input_style" 
              required/>
          </div>
          <div className="flex flex-col w-64 md:w-80">
            <label htmlFor="confirmation" className="font-bold">Confirmation du mot de passe</label>
            <input  
              type="password" 
              name="confirmation" 
              id="confirmation" 
              className="input_style" 
              required/>
          </div>
          <div className="w-64 md:w-120">
            <p className="text-sm text-justify">Les informations recueillies lors de ton inscription sont utilisées uniquement pour la création et la gestion de ton compte Zombieland. Tes données personnelles ne seront jamais partagées à des tiers sans ton consentement. Pour en savoir plus sur la gestion de tes données et tes droits, consulte notre <Link href="/privacy-policy" className="underline font-bold hover:text-primary-200 transition">politique de confidentialité</Link>.</p>
          </div>
          <button className="button_booking m-2 p-2 md:m-4 md:py-4 md:px-12  font-bold">S&apos;inscrire</button>
        </form>
      </div>
    </div>
  );
}