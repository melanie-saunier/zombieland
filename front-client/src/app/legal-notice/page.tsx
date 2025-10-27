"use client";
import Image from "next/image";
import { Skull } from "lucide-react";

export default function legalNoticePage() {

  return (
    <div className="flex flex-col bg-radial from-[#961990] to-[#000000] p-12">
      <Image src="/images/logo.png" alt="Logo de Zombieland" width={150} height={75} className="w-16 h-auto md:w-48 hover:scale-125 transition-transform duration-200"/>
      <h1 className="flex items-center text-shadow-none! tracking-normal! justify-center pt-px pl-8 pr-8 pb-8">MENTION LÉGALES</h1>
      <p className="">Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique, il est précisé aux utilisateurs du site Zombieland l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">Edition du site</h2>
      <p className="">Le présent site, accessible à l’URL www.zombieland.fr (le « Site »), est édité par :</p>
      <p>Emilie Dupont, résidant 10 Bd de Parc, 77700 Coupvray, de nationalité Française (France), né(e) le 05/05/1998,  inscrite au R.C.S. de VERSAILLES sous le numéro RCS VANNES B 514 919 845,</p>
      <p>Le numéro individuel TVA de l’éditeur est : FR 40 987654321.</p>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">Hébergement</h2>
      <p>Le Site est hébergé par la société O Clock, situé 10 r Penthièvre, 75008 Paris, (contact téléphonique ou email : +33189716530).</p>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">Directeur de publication</h2>
      <p>Le Directeur de la publication du Site est Emilie Dupont.</p>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">Nous contacter</h2>
      <p>Par téléphone : +33189716530
        Par email : contact@Oclock.io
        Par courrier : 10 Bd de Parc, 77700 Coupvray</p>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">Données personnelles</h2>
      <p>Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section &quot;Charte de Protection des Données Personnelles&quot;, conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).</p>
      <p>a désigné un Délégué à la Protection des Données (DPO) auprès de la CNIL (Désignation N° ). Les coordonnées de notre Délégué à la Protection des Données sont les suivantes :</p>

      <p className="p-3!">Nom : Arthur Smith
        Adresse : 2 rue de l&apos;échappée 75010 PARIS
        Téléphone : +33610358691
        Email : asmith@gmail.com</p>
      <div className="flex justify-center p-4"><Skull className=" stroke-[#4ea11e]" /></div>
    </div>
  );
}