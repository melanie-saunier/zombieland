"use client";
import Button from "@/components/Button";
import { useEffect, useRef } from "react";

export default function RegisterPage() {
  // pour faire un focus sur le premier input(input email)
  const inpuRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inpuRef.current?.focus();
  }, []);

  return(
    <div className="relative bg-[url('/images/background.png')] bg-no-repeat bg-cover bg-center min-h-[600px] md:min-h-screen p-4 md:p-8">
      {/* div pour un effet overlay (noir) pour que le text ressorte bien par dessus l'image de background */}
      <div className="absolute inset-0 bg-neutral-700/50"></div>
      <div className="relative z-10">
        <h2 className="text-xl md:text-2xl text-center">INSCRIPTION</h2>
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
              type="confirmation" 
              name="confirmation" 
              id="confirmation" 
              className="input_style" 
              required/>
          </div>
          <Button style="button_booking" text="S'INSCRIRE"/>
        </form>
      </div>
    </div>
  );
}