"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

export default function AgeVerificationPage() {
  const router = useRouter(); // hook pour rediriger l'utilisateur vers la page d'accueil
  const [showModal, setShowModal] = useState(false); // état pour afficher la modal
  const [isAnimating, setIsAnimating] = useState(false); // état pour l'animation de la modal

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà confirmé son âge (stocké dans localStorage)
    const ageVerified = localStorage.getItem("zombieland_age_verified");
    
    if (ageVerified === "true") {
      // Si déjà vérifié, redirige directement vers l'accueil
      router.push("/");
    } else {
      // Sinon, affiche la modal après une petite animation
      setTimeout(() => {
        setShowModal(true);
        setIsAnimating(true);
      }, 300);
    }
  }, [router]);

  /**
   * Fonction appelée si l'utilisateur confirme qu'il a 16 ans ou plus
   */
  const handleConfirmAge = () => {
    // Sauvegarde la confirmation dans le localStorage
    localStorage.setItem("zombieland_age_verified", "true");
    
    // Animation de sortie
    setIsAnimating(false);
    
    // Redirection vers la page d'accueil après l'animation
    setTimeout(() => {
      router.push("/");
    }, 400);
  };

  /**
   * Fonction appelée si l'utilisateur a moins de 16 ans
   */
  const handleUnderAge = () => {
    // Animation de sortie
    setIsAnimating(false);
    
    // Redirection vers un site externe (Disney par exemple)
    setTimeout(() => {
      window.location.href = "https://www.disney.fr";
    }, 400);
  };

  // Si la modal n'est pas encore affichée, on ne rend rien (ou un loader)
  if (!showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-700">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      {/* Image de fond zombie floue */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/background.png"
          alt="Background zombie"
          fill
          className="object-cover blur-sm"
          priority
        />
      </div>

      {/* Modal principale */}
      <div
        className={`relative z-10 w-full max-w-md bg-neutral-700 border-2 border-primary-300 rounded-2xl shadow-[0_0_40px_0_rgba(248,52,253,0.8)] overflow-hidden transition-all duration-400 ${
          isAnimating ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* En-tête avec icône d'avertissement */}
        <div className="relative bg-gradient-to-b from-primary-500/50 to-transparent p-6 border-b-2 border-primary-500">
          <div className="flex items-center justify-center gap-3 mb-2">
            <AlertTriangle className="h-10 w-10 text-primary-300 animate-pulse" />
            <h1 className="title text-2xl md:text-3xl text-center">
              Attention !
            </h1>
          </div>
          <p className="text-center text-primary-200 text-sm font-semibold">
            Vérification d'âge requise
          </p>
        </div>

        {/* Contenu principal */}
        <div className="p-6 space-y-6">
          {/* Message d'avertissement */}
          <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-4 shadow-[0_0_12px_0_rgba(255,0,0,0.3)]">
            <p className="text-neutral-50 text-center font-bold text-lg mb-2">
              ⚠️ Zone interdite aux moins de 16 ans
            </p>
            <p className="text-neutral-50 text-center text-sm">
              Le parc Zombieland est une expérience terrifiante qui contient des scènes violentes, 
              gore. L'accès est strictement réservé aux personnes 
              âgées de 16 ans et plus.
            </p>
          </div>

          {/* Question principale */}
          <div className="text-center">
            <p className="text-neutral-50 text-xl font-bold mb-2">
              As-tu 16 ans ou plus ?
            </p>
            <p className="text-primary-200 text-sm">
              Confirme ton âge pour accéder au site
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col gap-3">
            {/* Bouton OUI (16 ans ou plus) */}
            <button
              onClick={handleConfirmAge}
              className="group relative flex items-center justify-center gap-3 px-6 py-4 button_booking text-neutral-50 font-bold text-lg rounded-lg hover:scale-105 transition-all"
            >
              <CheckCircle className="h-6 w-6" />
              <span>Oui, j'ai 16 ans ou plus</span>
            </button>

            {/* Bouton NON (moins de 16 ans) */}
            <button
              onClick={handleUnderAge}
              className="group relative flex items-center justify-center gap-3 px-6 py-4 bg-red-900/50 hover:bg-red-900/70 border-2 border-red-500 text-red-300 font-bold text-lg rounded-lg hover:scale-105 transition-all shadow-[0_0_12px_0_rgba(255,0,0,0.3)]"
            >
              <XCircle className="h-6 w-6" />
              <span>Non, j'ai moins de 16 ans</span>
            </button>
          </div>

          {/* Note légale */}
          <div className="pt-4 border-t border-primary-500/30">
            <p className="text-neutral-50 text-xs text-center opacity-70">
              En confirmant, tu certifies avoir l'âge légal requis pour accéder à ce contenu. 
              Toute fausse déclaration engage ta responsabilité.
            </p>
          </div>
        </div>

        {/* Effet néon en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent animate-pulse"></div>
      </div>

      {/* Avertissement en bas de l'écran */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-neutral-700/90 border border-primary-300 rounded-lg px-4 py-2 backdrop-blur-sm">
          <p className="text-primary-200 text-xs font-semibold text-center">
            🧟 ZOMBIELAND - Parc d'attractions pour les âmes courageuses
          </p>
        </div>
      </div>
    </div>
  );
}