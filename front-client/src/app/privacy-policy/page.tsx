"use client";
import Button from "@/components/Button";

export default function privacyPolicyPage() {

  return (
    <div className="bg-radial from-[#961990] to-[#000000] p-8">
      <h1 className="">Politique de Confidentialité – Zombieland</h1>
      <h2 className="">Dernière mise à jour : Octobre 2025</h2>
      <p>Chez Zombieland, nous prenons très au sérieux la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons les informations que vous nous confiez lorsque vous utilisez notre site web et nos services.</p>

      <h2 className="">1. Quelles données collectons-nous ?</h2>
      <h3 className="">1. Nous pouvons collecter les informations suivantes :</h3>
      <ul className="list-inside list-disc">
        <li>Données d’identification : nom, prénom, adresse e-mail, numéro de téléphone, adresse postale (lors de la création d’un compte ou d’une réservation).</li>
        <li>Données de paiement : informations de carte bancaire (traitées de manière sécurisée par nos partenaires de paiement).</li>
        <li>Données de navigation : adresse IP, type de navigateur, pages visitées, durée de la visite, etc. (via des cookies et outils d’analyse).</li>
        <li>Données de réservation : date et heure de visite, type de billet, préférences d’activités.</li>
      </ul>

      <h2 className="">2. Pourquoi collectons-nous ces données ?</h2>
      <h3 className="">Vos données sont utilisées pour :</h3>
      <ul className="list-inside list-disc">
        <li>Gérer vos réservations et vous fournir un accès fluide au parc.</li>
        <li>Personnaliser votre expérience (offres spéciales, recommandations d’attractions).</li>
        <li>Améliorer nos services (analyse des comportements de visite, feedbacks).</li>
        <li>Assurer la sécurité du site et des transactions.</li>
        <li>Respecter nos obligations légales (facturation, archives).</li>
      </ul>

      <h2 className="">3. Comment protégeons-nous vos données ?</h2>
      <p>Nous mettons en place des mesures de sécurité techniques et organisationnelles pour protéger vos informations contre tout accès non autorisé, perte ou divulgation. Vos données de paiement sont chiffrées et traitées par des prestataires agréés.</p>

      <h2 className="">4. Partage des données</h2>
      <h3 className="">Nous ne vendons ni ne louons vos données personnelles à des tiers. Vos informations peuvent être partagées avec :</h3>
      <ul className="list-inside list-disc">
        <li>Nos prestataires de services (hébergement, paiement, analyse) sous contrat de confidentialité.</li>
        <li>Les autorités compétentes, si la loi l’exige.</li>
      </ul>


      <h2 className="">5. Vos droits</h2>
      <h3 className="">Conformément au RGPD, vous disposez des droits suivants :</h3>
      <ul className="list-inside list-disc">
        <li>Accéder à vos données personnelles.</li>
        <li>Les rectifier ou les supprimer.</li>
        <li>Vous opposer à leur traitement.</li>
        <li>Demander leur portabilité.</li >
        <li>Retirer votre consentement à tout moment.</li>
      </ul>
      <p>Pour exercer ces droits, contactez-nous à : contact@zombieland.fr.</p>

      <h2 className="">6. Cookies et technologies similaires</h2>
      <p>Notre site utilise des cookies pour améliorer votre expérience et analyser le trafic. Vous pouvez gérer vos préférences de cookies via notre bannière de consentement ou les paramètres de votre navigateur.</p>

      <h2 className="">7. Modifications de cette politique</h2>
      <p>Nous nous réservons le droit de mettre à jour cette politique. Toute modification sera publiée sur cette page avec la date de mise à jour.</p>

      <h3 className="">Contact</h3>
      <p>Pour toute question concernant cette politique ou le traitement de vos données, écrivez-nous à : contact@zombieland.fr</p>
    




      







    </div>
  );
}