import Link from "next/link";
import { Bell, Clock, Euro, MapPin, Phone, Mail, Bus, Car } from "lucide-react";
import Button from "@/components/Button";

export const metadata = {
  title: "Informations utiles | ZOMBIELAND",
  description: "Horaires, tarifs, accès parking et contacts pour préparer votre visite à Zombieland.",
};

export default function VisitorInformationPage() {
  return (
    <>
      <section className="px-4 py-10 md:px-8 md:py-16 bg-neutral-700">
        <div className="max-w-6xl mx-auto">
          {/* Header avec effet néon cohérent */}
          <header className="mb-12 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl mb-4">
              Informations utiles
            </h1>
            <p className="text-neutral-50/80 md:text-lg max-w-3xl">
              Préparez votre visite à Zombieland : horaires d'ouverture, tarifs, accès parking, transports en commun et contacts utiles.
            </p>
          </header>

          {/* Container responsive pour Horaires + Tarif */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start mb-12">
            {/* Section Horaires d'ouverture */}
            <div className="w-full lg:w-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-6 border-b-2 border-primary-purple-300 pb-3 inline-block">
                <Clock className="inline-block mr-2 mb-1" size={28} />
                Horaires d'ouverture
              </h2>
              <div className="border border-primary-purple-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300 max-w-2xl" style={{backgroundColor: '#201041'}}>
                <ul className="space-y-3 text-neutral-50/80">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-300 mt-1 text-xl">•</span>
                    <span className="text-lg">
                      <strong className="text-primary-purple-300">Haute saison</strong> (Juin à Septembre) : 
                      <span className="text-secondary-300 font-semibold"> 7j/7 de 10h à 23h</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-300 mt-1 text-xl">•</span>
                    <span className="text-lg">
                      <strong className="text-primary-purple-300">Basse saison</strong> (Octobre à Mai) : 
                      <span className="text-secondary-300 font-semibold"> 7j/7 de 10h à 20h</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section Tarif */}
            <div className="w-full lg:w-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-6 border-b-2 border-primary-purple-300 pb-3 inline-block">
                <Euro className="inline-block mr-2 mb-1" size={28} />
                Tarif
              </h2>
              <div className="border-2 border-primary-purple-300 rounded-lg p-8 shadow-[0_0_20px_rgba(248,52,253,0.3)] hover:shadow-[0_0_30px_rgba(248,52,253,0.5)] transition-all duration-300 max-w-lg" style={{backgroundColor: '#201041'}}>
                <div className="flex items-baseline gap-3 mb-3">
                  <p className="text-3xl md:text-4xl font-bold text-primary-purple-300">45 €</p>
                  <p className="text-lg text-neutral-50/80">/ personne</p>
                </div>
                <p className="text-neutral-50/70 mb-6 leading-relaxed">
                  Billet unique donnant accès à l'ensemble du parc pour la journée. 
                  Toutes les attractions incluses, sensations garanties !
                </p>
                <Link href="/booking" className="inline-block">
                  <Button text="Réserver maintenant" style="button_booking" Icon={Bell} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Accès parking - PLEINE LARGEUR AVEC BACKGROUND */}
      <section 
        className="py-12 w-full relative"
        style={{
          backgroundImage: 'url(/images/info-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay pour la lisibilité sur toute la largeur */}
        <div className="absolute inset-0 bg-neutral-700/10" />
        
        {/* Contenu centré */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-6 border-b-2 border-primary-purple-300 pb-3 inline-block">
            <MapPin className="inline-block mr-2 mb-1" size={28} />
            Accès & Parking
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Infos à gauche */}
            <div className="space-y-5">
              {/* Adresse */}
              <div className="bg-neutral-700/90 border border-primary-purple-300 rounded-lg p-5 hover:border-secondary-300 transition-colors duration-300 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-primary-purple-300 mb-2 flex items-center gap-2">
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
              <div className="bg-neutral-700/90 border border-primary-purple-300 rounded-lg p-5 hover:border-secondary-300 transition-colors duration-300 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-primary-purple-300 mb-3 flex items-center gap-2">
                  <Car size={20} />
                  Parking
                </h3>
                <ul className="space-y-2 text-neutral-50/80">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-300 mt-1">•</span>
                    <span>Parking visiteurs à proximité immédiate de l'entrée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-300 mt-1">•</span>
                    <span>Places réservées PMR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-300 mt-1">•</span>
                    <span>Bornes de recharge électrique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-300 mt-1">•</span>
                    <span>Ouvert durant les horaires du parc (gratuit)</span>
                  </li>
                </ul>
              </div>

              {/* Transports */}
              <div className="bg-neutral-700/90 border border-primary-purple-300 rounded-lg p-5 hover:border-secondary-300 transition-colors duration-300 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-primary-purple-300 mb-3 flex items-center gap-2">
                  <Bus size={20} />
                  Transports en commun
                </h3>
                <ul className="space-y-2 text-neutral-50/80">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-300 mt-1">•</span>
                    <span>Bus lignes 12 et 24 — arrêt "Zombieland"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-300 mt-1">•</span>
                    <span>Tram T2 — station "Néonville Parc"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary-300 mt-1">•</span>
                    <span>Gare "Néonville" à ~15 min en navette</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Map à droite - CENTRÉE VERTICALEMENT */}
            <div className="flex items-center">
              <div className="relative w-full overflow-hidden rounded-lg border-2 border-primary-purple-300 aspect-[16/9] shadow-[0_0_15px_rgba(248,52,253,0.2)]">
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

      <section className="px-4 py-10 md:px-8 md:py-16 bg-neutral-700">
        <div className="max-w-6xl mx-auto">
          {/* Section Contact - CENTRÉE */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-6 border-b-2 border-primary-purple-300 pb-3 inline-block">
                <Phone className="inline-block mr-2 mb-1" size={28} />
                Contact
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Téléphone */}
                <div className="bg-neutral-700 border border-primary-purple-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-primary-purple-300 mb-3 flex items-center gap-2">
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
                <div className="bg-neutral-700 border border-primary-purple-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-primary-purple-300 mb-3 flex items-center gap-2">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}