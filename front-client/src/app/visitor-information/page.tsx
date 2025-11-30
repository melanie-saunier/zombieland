// src/app/visitor-information/page.tsx 
"use client";

import { Bell, Clock, Euro, MapPin, Phone, Mail, Bus, Car } from "lucide-react";
import LinkButton from "@/components/LinkButton";
import { useEffect, useState } from "react";
import { IPrice } from "@/@types/price";
import { pricesApi } from "@/api/prices";
import Loader from "@/components/Loader";


export default function VisitorInformationPage() {
  const [pricing, setPricing] = useState<IPrice | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true); // État de chargement du prix
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketPrice = async () => {
      try {
        setIsLoadingPrice(true); // on affiche le loader
  
        const prices = await pricesApi.getPrices();
  
        if(!prices) {
          setError("Impossible de charger les tarifs. Veuillez réessayer.");
          return;
        }
        // on veut le prix "Tarif unique"
        const uniquePrice = prices.find((price) => price.label === "Tarif unique");
  
        if(!uniquePrice) {
          setError("Tarif unique introuvable.");
          return;
        }
        // on sauvegarde le prix dans l'état
        setPricing(uniquePrice);
   
      } catch (error) {
        console.error("Erreur de chargement du prix:", error);
        setError("Impossible de charger les tarifs. Veuillez réessayer.");
      } finally {
        setIsLoadingPrice(false); // on masque le loader
      }
    };
  
    fetchTicketPrice(); // Appel de la fonction dès le premier rendu
  }, []);

  if(isLoadingPrice) {
    return (<div className="h-100 flex flex-col justify-center items-center m-4">
      <Loader /> 
    </div> );
  }
 
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-red-300 font-bold text-xl mb-2">Erreur de chargement</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }
  //on doit rajouter return null si on a pas de prix pour que TS comprenne bien que pricing ne peut pas être null
  if (!pricing) return null;

  return (
    <>
      <section className="px-4 py-10 md:px-8 md:py-16 bg-neutral-700">
        <div className="max-w-6xl mx-auto">
          {/* Header avec effet néon cohérent */}
          <header className="mb-12 text-center md:text-left">
            <h1 className="title text-3xl md:text-5xl mb-4">
              Informations utiles
            </h1>
            <p className="text-neutral-50/80 md:text-lg">
              Préparez votre visite à Zombieland : horaires d’ouverture, tarifs, accès parking, transports en commun et contacts utiles.
            </p>
          </header>

          {/* Container responsive pour Horaires + Tarif */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start mb-12">
            {/* Section Horaires d'ouverture */}
            <div className="w-full lg:w-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-6 border-b-2 border-primary-300 pb-3 inline-block">
                <Clock className="inline-block mr-2 mb-1" size={28} />
                Horaires d’ouverture
              </h2>
              <div className="border border-primary-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300 max-w-2xl" style={{backgroundColor: "#201041"}}>
                <ul className="px-2 space-y-3 text-neutral-50/80 list-disc marker:text-secondary-300">
                  <li>
                    <span className="text-lg text-primary-300">Haute saison</span> (Juin à Septembre) : 
                    <span className="text-lg text-secondary-300 font-semibold"> 7j/7 de 10h à 23h</span>
                  </li>
                  <li>
                    <span className="text-lg text-primary-300">Basse saison</span> (Octobre à Mai) : 
                    <span className="text-lg text-secondary-300 font-semibold"> 7j/7 de 10h à 20h</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section Tarif */}
            <div className="w-full lg:w-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-6 border-b-2 border-primary-300 pb-3 inline-block">
                <Euro className="inline-block mr-2 mb-1" size={28} />
                Tarif
              </h2>
              <div className="border-2 border-primary-300 rounded-lg p-8 shadow-[0_0_20px_rgba(248,52,253,0.3)] hover:shadow-[0_0_30px_rgba(248,52,253,0.5)] transition-all duration-300 max-w-lg" style={{backgroundColor: "#201041"}}>
                <div className="flex items-baseline justify-center gap-3 mb-3">
                  <p className="text-3xl md:text-4xl font-bold text-primary-300">{pricing.value} €</p>
                  <p className="text-lg text-neutral-50/80">/ personne</p>
                </div>
                <p className="text-neutral-50/70 mb-6 leading-relaxed text-center">
                  Billet unique donnant accès à l’ensemble du parc pour la journée. 
                  Toutes les attractions incluses, sensations garanties !
                </p>
                <LinkButton path="/booking" text="Réserver maintenant" style="button_booking" Icon={Bell} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Accès parking*/}
      <section 
        className="py-12 w-full relative border-b-2 border-t-2 border-primary-300"
        style={{
          backgroundImage: "url(/images/info-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Overlay pour la lisibilité sur toute la largeur */}
        <div className="absolute inset-0 bg-neutral-700/10" />
        
        {/* Contenu centré */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-6 border-b-2 border-primary-300 pb-3 inline-block">
            <MapPin className="inline-block mr-2 mb-1" size={28} />
            Accès & Parking
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Infos à gauche */}
            <div className="space-y-5">
              {/* Adresse */}
              <div className="bg-neutral-700/90 border border-primary-300 rounded-lg p-5 hover:border-secondary-300 transition-colors duration-300 backdrop-blur-sm" style={{backgroundColor: "#201041"}}>
                <h3 className="text-lg font-bold text-primary-300 mb-2 flex items-center gap-2">
                  <MapPin size={20} />
                  Adresse
                </h3>
                <address className="not-italic text-neutral-50/80 leading-relaxed">
                  Zombieland Park<br />
                  66 rue du Cerveau enragé<br />
                  42190 Néonville, France
                </address>
              </div>

              {/* Parking */}
              <div className="bg-neutral-700/90 border border-primary-300 rounded-lg p-5 hover:border-secondary-300 transition-colors duration-300 backdrop-blur-sm" style={{backgroundColor: "#201041"}}>
                <h3 className="text-lg font-bold text-primary-300 mb-3 flex items-center gap-2">
                  <Car size={20} />
                  Parking
                </h3>
                <ul className="px-2 space-y-2 text-neutral-50/80 list-disc marker:text-secondary-300">
                  <li>Parking visiteurs à proximité immédiate de l’entrée</li>
                  <li>Places réservées PMR</li>
                  <li>Bornes de recharge électrique</li>
                  <li>Ouvert durant les horaires du parc (gratuit)</li>
                </ul>
              </div>

              {/* Transports */}
              <div className="bg-neutral-700/90 border border-primary-300 rounded-lg p-5 hover:border-secondary-300 transition-colors duration-300 backdrop-blur-sm" style={{backgroundColor: "#201041"}}>
                <h3 className="text-lg font-bold text-primary-300 mb-3 flex items-center gap-2">
                  <Bus size={20} />
                  Transports en commun
                </h3>
                <ul className="px-2 space-y-2 text-neutral-50/80 list-disc marker:text-secondary-300">
                  <li>Bus lignes 12 et 24 — arrêt “Zombieland”</li>
                  <li>Tram T2 — station “Néonville”</li>
                  <li>Gare “Néonville” à ~15 min en navette</li>
                </ul>
              </div>
            </div>

            {/* Map à droite - CENTRÉE VERTICALEMENT */}
            <div className="flex items-center">
              <div className="relative w-full h-full overflow-hidden rounded-lg border-2 border-primary-300 aspect-video shadow-[0_0_15px_rgba(248,52,253,0.2)]">
                <iframe
                  title="Accès parking Zombieland"
                  className="w-full h-full"
                  referrerPolicy="no-referrer-when-downgrade"
                  loading="lazy"
                  src="https://www.google.com/maps?q=66+rue+du+Cerveau+enrag%C3%A9,+42190+N%C3%A9onville,+France&output=embed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact - CENTRÉE */}
      <section className="bg-neutral-700 px-4 py-10 md:px-8 md:py-16 w-full mx-auto mb-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-6 border-b-2 border-primary-300 pb-3 inline-block">
          <Phone className="inline-block mr-2 mb-1" size={28} />
            Contact
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-4 md:w-1/2">
          {/* Téléphone */}
          <div className="md:w-1/2 bg-neutral-700 border border-primary-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300" style={{backgroundColor: "#201041"}}>
            <h3 className="text-lg font-bold text-primary-300 mb-3 flex items-center gap-2">
              <Phone size={20} />
                Téléphone
            </h3>
            <p className="text-neutral-50/80 mb-2">
              <a 
                href="tel:+33666666666" 
                className="text-xl font-semibold text-secondary-300 hover:text-secondary-200 transition-colors"
              >
                06 66 66 66 66
              </a>
            </p>
            <p className="text-sm text-neutral-50/60">
              Réception téléphonique :<br />
              Lun–Dim, 9h–18h
            </p>
          </div>

          {/* Email */}
          <div className="md:w-1/2 bg-neutral-700 border border-primary-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300" style={{backgroundColor: "#201041"}}>
            <h3 className="text-lg font-bold text-primary-300 mb-3 flex items-center gap-2">
              <Mail size={20} />
                Email
            </h3>
            <p className="text-neutral-50/80">
              <a 
                href="mailto:contact@zombieLand.fr" 
                className="text-xl font-semibold text-secondary-300 hover:text-secondary-200 transition-colors break-all"
              >
                contact@zombieLand.fr
              </a>
            </p>
            <p className="text-sm text-neutral-50/60 mt-2">
              Réponse sous 24h en semaine
            </p>
          </div>
        </div>
      </section>
    </>
  );
}