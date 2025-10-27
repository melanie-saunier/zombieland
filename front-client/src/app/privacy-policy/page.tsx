"use client";
import Image from "next/image";
import { Skull } from "lucide-react";

export default function privacyPolicyPage() {

  return (
    <div className="bg-radial from-[#961990] to-[#000000] p-12">
      <Image src="/images/logo.png" alt="Logo de Zombieland" width={150} height={75} className="w-16 h-auto md:w-48 hover:scale-125 transition-transform duration-200"/>
      <h1 className="flex items-center justify-center text-shadow-none! tracking-normal! pt-px py-6 pb-6">Politique de Confidentialité – Zombieland</h1>
      <h2 className="text-shadow-none! tracking-normal! normal-case! p-6">Dernière mise à jour : Octobre 2025</h2>
      <p>Chez Zombieland, nous prenons très au sérieux la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons les informations que vous nous confiez lorsque vous utilisez notre site web et nos services.</p>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">1. Quelles données collectons-nous ?</h2>
      <h3 className="">1. Nous pouvons collecter les informations suivantes :</h3>
      <ul className="list-inside list-disc">
        <li><span className="font-semibold">Données d’identification</span> : nom, prénom, adresse e-mail, numéro de téléphone, adresse postale (lors de la création d’un compte ou d’une réservation).</li>
        <li><span className="font-semibold">Données de paiement</span> : informations de carte bancaire (traitées de manière sécurisée par nos partenaires de paiement).</li>
        <li><span className="font-semibold">Données de navigation</span> : adresse IP, type de navigateur, pages visitées, durée de la visite, etc. (via des cookies et outils d’analyse).</li>
        <li><span className="font-semibold">Données de réservation</span> : date et heure de visite, type de billet, préférences d’activités.</li>
      </ul>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">2. Pourquoi collectons-nous ces données ?</h2>
      <h3 className="">Vos données sont utilisées pour :</h3>
      <ul className="list-inside list-disc">
        <li><span className="font-semibold">Gérer vos réservations</span> et vous fournir un accès fluide au parc.</li>
        <li><span className="font-semibold">Personnaliser votre expérience</span> (offres spéciales, recommandations d’attractions).</li>
        <li><span className="font-semibold">Améliorer nos services</span> (analyse des comportements de visite, feedbacks).</li>
        <li><span className="font-semibold">Assurer la sécurité</span> du site et des transactions.</li>
        <li><span className="font-semibold">Respecter nos obligations légales</span> (facturation, archives).</li>
      </ul>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">3. Comment protégeons-nous vos données ?</h2>
      <p>Nous mettons en place des mesures de sécurité techniques et organisationnelles pour protéger vos informations contre tout accès non autorisé, perte ou divulgation. Vos données de paiement sont chiffrées et traitées par des prestataires agréés.</p>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">4. Partage des données</h2>
      <h3 className="">Nous ne vendons ni ne louons vos données personnelles à des tiers. Vos informations peuvent être partagées avec :</h3>
      <ul className="list-inside list-disc">
        <li><span className="font-semibold">Nos prestataires de services</span> (hébergement, paiement, analyse) sous contrat de confidentialité.</li>
        <li><span className="font-semibold">Les autorités compétentes</span>, si la loi l’exige.</li>
      </ul>


      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">5. Vos droits</h2>
      <h3 className="">Conformément au RGPD, vous disposez des droits suivants :</h3>
      <ul className="list-inside list-disc">
        <li><span className="font-semibold">Accéder</span> à vos données personnelles.</li>
        <li><span className="font-semibold">Les rectifier</span> ou <span className="font-semibold">les supprimer</span>.</li>
        <li><span className="font-semibold">Vous opposer</span> à leur traitement.</li>
        <li><span className="font-semibold">Demander leur portabilité.</span></li >
        <li><span className="font-semibold">Retirer votre consentement</span> à tout moment.</li>
      </ul>
      <p>Pour exercer ces droits, contactez-nous à : contact@zombieland.fr.</p>

      <h2 className="text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">6. Cookies et technologies similaires</h2>
      <p>Notre site utilise des cookies pour améliorer votre expérience et analyser le trafic. Vous pouvez gérer vos préférences de cookies via notre bannière de consentement ou les paramètres de votre navigateur.</p>

      <h2 className=" text-shadow-none! tracking-normal! pl-6 pt-6 pr-6 pb-2">7. Modifications de cette politique</h2>
      <p>Nous nous réservons le droit de mettre à jour cette politique. Toute modification sera publiée sur cette page avec la date de mise à jour.</p>

      <h3 className="font-semibold p-2">Contact</h3>
      <p>Pour toute question concernant cette politique ou le traitement de vos données, écrivez-nous à : contact@zombieland.fr</p>
      <div className="flex justify-center pt-6"><Skull className=" stroke-[#4ea11e]" /></div>
    </div>
  );
}