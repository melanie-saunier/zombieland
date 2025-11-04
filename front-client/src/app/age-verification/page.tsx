"use client";
import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AgeVerificationModal() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  // Vérifie si l'utilisateur a déjà confirmé son âge
  useEffect(() => { // use effect pour vérifier si l'utilisateur a déjà confirmé son âge
    if (typeof window !== "undefined") {
      const ageVerified = localStorage.getItem("ageVerified");
      if (ageVerified) { // si l'utilisateur a déjà confirmé son âge, on ferme la modal
        setShowModal(false);
      }
    }
  }, []);

  const handleConfirmAge = () => {
    localStorage.setItem("ageVerified", "true"); // on met le cookie d'âge à true
    setShowModal(false);
  }; // on ferme la modal

  const handleUnderAge = () => { // fonction pour rediriger l'utilisateur vers le site de Disney
    router.push("https://www.disney.fr");
  };

  if (!showModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
    >
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/background.png"
          alt="Background zombie"
          fill
          className="object-cover blur-sm"
          priority
        />
      </div>
      <div className="relative z-10 w-full max-w-md bg-neutral-700 border-2 border-primary-300 rounded-2xl shadow-[0_0_40px_0_rgba(248,52,253,0.8)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="relative bg-gradient-to-b from-primary-500/50 to-transparent p-6 border-b-2 border-primary-500">
          <div className="flex items-center justify-center gap-3 mb-2">
            <AlertTriangle className="h-10 w-10 text-primary-300 animate-pulse" />
            <h1 id="modal-title" className="title text-2xl md:text-3xl text-center">
              Attention !
            </h1>
          </div>
          <p id="modal-description" className="text-center text-primary-200 text-sm font-semibold">
            Vérification d'âge requise
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-4 shadow-[0_0_12px_0_rgba(255,0,0,0.3)]">
            <p className="text-neutral-50 text-center font-bold text-lg mb-2">
              ⚠️ Zone interdite aux moins de 16 ans
            </p>
            <p className="text-neutral-50 text-center text-sm">
              Le parc Zombieland est une expérience terrifiante qui contient des scènes potentiellement violentes,
              ou gore. L'accès est strictement réservé aux personnes
              âgées de 16 ans et plus.
            </p>
          </div>
          <div className="text-center">
            <p className="text-neutral-50 text-xl font-bold mb-2">
              As-tu 16 ans ou plus ?
            </p>
            <p className="text-primary-200 text-sm">
              Confirme ton âge pour accéder au site
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleConfirmAge}
              className="group relative flex items-center justify-center gap-3 px-6 py-4 button_booking text-neutral-50 font-bold text-lg rounded-lg hover:scale-105 transition-all"
            >
              <CheckCircle className="h-6 w-6" />
              <span>Oui, j'ai 16 ans ou plus</span>
            </button>
            <button
              onClick={handleUnderAge}
              className="group relative flex items-center justify-center gap-3 px-6 py-4 bg-red-900/50 hover:bg-red-900/70 border-2 border-red-500 text-red-300 font-bold text-lg rounded-lg hover:scale-105 transition-all shadow-[0_0_12px_0_rgba(255,0,0,0.3)]"
            >
              <XCircle className="h-6 w-6" />
              <span>Non, j'ai moins de 16 ans</span>
            </button>
          </div>
          <div className="pt-4 border-t border-primary-500/30">
            <p className="text-neutral-50 text-xs text-center opacity-70">
              En confirmant, tu certifies avoir l'âge légal requis pour accéder à ce contenu.
              Toute fausse déclaration engage ta responsabilité.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent animate-pulse"></div>
      </div>
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
