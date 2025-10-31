// src/app/not-found.tsx 

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable | ZOMBIELAND",
  description: "Cette page a été dévorée par des zombies... Elle n'existe plus ou a été déplacée.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/404bg.png"
          alt="Error 404 background"
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

      {/* Contenu */}
      <div className="relative z-10 w-full px-4 py-8">
        <div className="max-w-lg mx-auto sm:ml-8 md:ml-16 lg:ml-24 text-center sm:text-left space-y-4 md:space-y-6">
          {/* Code erreur avec effet néon */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-primary-purple-300 drop-shadow-[0_0_30px_rgba(248,52,253,1)] leading-none">
            404
          </h1>

          {/* Titre */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-50 drop-shadow-[0_2px_20px_rgba(0,0,0,1)]">
            Page Introuvable
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-100 max-w-md">
            Cette page a été dévorée par des zombies... Elle n'existe plus ou a été déplacée.
          </p>

          {/* Bouton avec style principal */}
          <div className="pt-4 sm:pt-6">
            <Link
              href="/"
              className="button_activity inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-neutral-50 font-bold"
            >
              <span>←</span>
              <span>Retour à l'abri</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}