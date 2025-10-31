"use client";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erreur serveur | ZOMBIELAND",
  description: "Le serveur a été infecté par des zombies ! Nos survivants tentent de rétablir la connexion...",
};

export default function Error500Page() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - Desktop : zombie à droite, Mobile : zombie au centre */}
      <div className="absolute inset-0">
        <Image
          src="/images/500bg.png"
          alt="Error 500 background"
          fill
          className="
            object-cover
            object-[70%_center] 
            sm:object-[60%_center] 
            md:object-[50%_center]
            lg:object-center
          "
          priority
          quality={100}
        />
      </div>
      
      {/* Overlay avec gradient adaptatif */}
      <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      {/* Contenu - Positionné pour ne pas cacher le zombie */}
      <div className="relative z-10 w-full px-4 py-8">
        <div className="max-w-lg mx-auto sm:ml-8 md:ml-16 lg:ml-24 text-center sm:text-left space-y-4 md:space-y-6">
          {/* Code erreur avec effet néon */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-red-500 drop-shadow-[0_0_30px_rgba(255,0,0,1)] leading-none">
            500
          </h1>
          
          {/* Titre */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-50 drop-shadow-[0_2px_20px_rgba(0,0,0,1)]">
            Erreur Serveur
          </h2>
          
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-100 drop-shadow-[0_2px_15px_rgba(0,0,0,1)] max-w-md">
            Le serveur a été infecté par des zombies ! Nos survivants tentent de rétablir la connexion...
          </p>
          
          {/* Bouton */}
          <div className="pt-4 sm:pt-6">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:shadow-[0_0_30px_rgba(220,38,38,0.9)]"
            >
              <span>←</span>
              <span>Retour à la sécurité</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}