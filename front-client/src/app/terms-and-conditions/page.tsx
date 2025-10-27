"use client";

export default function cgvPage() {

  return(
    <div className="bg-radial from-[#961990] to-[#000000] p-8">
      <h1 className="flex items-center justify-center text-shadow-none! tracking-normal! p-6">Conditions Générales de Vente – Zombieland</h1>
      <h2 className="text-shadow-none! tracking-normal! normal-case! p-6">Dernière mise à jour : Octobre 2025</h2>
      <h2 className="text-shadow-none! tracking-normal! p-6">1. Objet</h2>
      <p>Les présentes Conditions Générales de Vente (CGV) s’appliquent à toute réservation de billet d’entrée pour le parc Zombieland, effectuée via le site web [nom du site]. La réservation ne constitue pas une vente, mais une pré-réservation de place, soumise à confirmation et paiement sur place le jour de la visite.</p>
    
      <h2 className="text-shadow-none! tracking-normal! p-6">2. Réservation</h2>
      <ul className="list-inside list-disc">
        <li>La réservation est gratuite et ne vaut pas engagement de paiement.</li>
        <li>Chaque réservation est nominative et valable pour une seule personne.</li>
        <li>Le client doit fournir des informations exactes(nom, prénom, date de visite souhaitée).</li >
        <li>La réservation est valable uniquement pour la date et l’horaire choisis.</li>
      </ul>

      <h2 className="text-shadow-none! tracking-normal! p-6">3. Confirmation et validité</h2>
      <ul className="list-inside list-disc">
        <li>Une fois la réservation effectuée, un e-mail de confirmation est envoyé à l’adresse indiquée.</li>
        <li>La réservation est valable jusqu’à l’heure d’ouverture du parc le jour choisi.</li>
        <li>En cas de non-présentation à l’heure indiquée, la réservation est annulée automatiquement.</li>
      </ul>

      <h2 className="text-shadow-none! tracking-normal! p-6">4. Paiement</h2>
      <ul className="list-inside list-disc">
        <li>Le paiement du billet s’effectue uniquement sur place, le jour de la visite, aux caisses du parc.</li>
        <li>Les tarifs en vigueur sont ceux affichés sur le site au moment de la réservation.</li>
        <li>Les modes de paiement acceptés sont: espèces, carte bancaire.</li >
      </ul>

      
      <h2 className="text-shadow-none! tracking-normal! p-6">5. Annulation/Modification</h2>
      <ul className="list-inside list-disc">
        <li>Le client peut annuler ou modifier sa réservation jusqu’à 24h avant la date prévue, via le lien présent dans l’e-mail de confirmation.</li>
        <li>Passé ce délai, toute annulation ou modification est soumise à l’accord du parc.</li>
      </ul>

      <h2 className="text-shadow-none! tracking-normal! p-6">6. Responsabilité</h2>
      <ul className="list-inside list-disc">
        <li>Zombieland se réserve le droit d’annuler ou de reporter une visite en cas de force majeure (météo, problème technique, etc.). Le client en sera informé par e-mail.</li>
        <li>Le parc décline toute responsabilité en cas de perte, vol ou dommage subis par le client sur le site.</li>
      </ul>
      
      <h2 className="text-shadow-none! tracking-normal! p-6">7. Données personnelles</h2>
      <p>Les informations collectées lors de la réservation sont traitées conformément à notre Politique de Confidentialité.</p>

      <h2 className="text-shadow-none! tracking-normal! p-6">8. Droit applicable</h2>
      <p>Les présentes CGV sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents.</p>

      <p>Contact Pour toute question : contact@zombieland.fr</p>
    
    </div>


  );
}