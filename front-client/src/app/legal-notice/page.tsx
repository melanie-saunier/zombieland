// src/app/legal-notice/page.tsx

import Image from "next/image";
import { Skull } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | ZOMBIELAND",
  description: "Nos mentions légales",
};


export default function legalNoticePage() {

  return (
    <div className="flex flex-col bg-radial from-[#961990] to-[#000000] p-12">
      <Image src="/images/logo.png" alt="Logo de Zombieland" width={150} height={75} className="w-16 h-auto md:w-48 hover:scale-125 transition-transform duration-200"/>
      <h1 className="font-bold text-3xl text-center p-8 uppercase">Mention légales</h1>
      <p className="">Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l’économie numérique, il est précisé aux utilisateurs du site Zombieland l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>

      <h2 className="p-6 font-bold ">Edition du site</h2>
      <p className="">Le présent site, accessible à l’URL www.zombieland.fr (le « Site »), est édité par :</p>
      <p>Emilie Dupont, résidant 10 Bd de Parc, 77700 Coupvray, de nationalité Française (France), né(e) le 05/05/1998,  inscrite au R.C.S. de VERSAILLES sous le numéro RCS VANNES B 514 919 845,</p>
      <p>Le numéro individuel TVA de l’éditeur est : FR 40 987654321.</p>

      <h2 className="p-6 font-bold ">Hébergement</h2>
      <p>Le Site est hébergé par la société O Clock, situé 10 r Penthièvre, 75008 Paris, (contact téléphonique ou email : +33189716530).</p>

      <h2 className="p-6 font-bold ">Directeur de publication</h2>
      <p>Le Directeur de la publication du Site est Emilie Dupont.</p>

      <h2 className="p-6 font-bold ">Nous contacter</h2>
      <p>Par téléphone : <a href="tel:+33666666666" className="hover:text-primary-300 transition">06 66 66 66 66</a></p>
      <p>Par email : <a href="mailto:contact@zombieland.fr" className="hover:text-primary-300 transition">contact@zombieland.fr</a></p>
      <p>Par courrier : 66 rue du Cerveau enragé 42190 Néonville</p>

      <h2 className="p-6 font-bold ">Données personnelles</h2>
      <p>Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section &quot;Charte de Protection des Données Personnelles&quot;, conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).</p>
      <p>Zombieland a désigné un Délégué à la Protection des Données (DPO) auprès de la CNIL (Désignation N° ). Les coordonnées de notre Délégué à la Protection des Données sont les suivantes :</p>

      <div className="p-3">
        <p>Nom : Arthur Smith</p>
        <p>Adresse : 66 rue du Cerveau enragé 42190 Néonville</p>
        <p>Téléphone : <a href="tel:+33666666666" className="hover:text-primary-300 transition">06 66 66 66 66</a></p>
        <p>Email : <a href="mailto:contact@zombieland.fr" className="hover:text-primary-300 transition">arthur.smith@zombieland.com</a></p>
      </div>
      <div className="flex justify-center p-4"><Skull size={24} color="var(--color-secondary-300)"/></div>
    </div>
  );
}