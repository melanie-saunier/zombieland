// Composant Footer
// Footer responsive pour toutes les pages

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    // Conteneur principal du pied de page
    <footer className="bg-neutral-700 border-t-2 border-solid border-primary-purple-300 md:ml-[20%] md:w-[80%] pb-16 md:pb-0">

      {/* Section principale : logo +  contact, infos légales, réseaux sociaux */}
      <div className="flex flex-col md:flex-row md:justify-around md:items-start items-center mt-8 mx-4 py-2 border-solid border-y border-primary-purple-300">

        {/* Logo du parc avec lien vers la page d'accueil */}
        <div className="md:self-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo de Zombieland" width={150} height={75} className="w-32 h-auto md:w-48 hover:scale-125 transition-transform duration-200"/>
          </Link>
        </div>

        {/* Bloc contact (téléphone, email, adresse, horaires) */}
        <div className="flex flex-col items-center md:items-start my-2">
          <h5>Contact</h5>
          <ul className="text-center md:text-left space-y-2">
            <li>
              <a href="tel:+33666666666" className="hover:text-primary-purple-300 transition">06 66 66 66 66</a>
            </li>
            <li>
              <a href="mailto:contact@zombieland.fr" className="hover:text-primary-purple-300 transition">contact@zombieland.fr</a>
            </li>
            <li>Zombieland Park,<br/>66 rue du Cerveau enragé <br/>42190 Néonville, France</li>
            <li>Horaires: 7j/7 de 10h à 23h</li>
          </ul>
        </div>

        {/* Bloc des liens légaux */}
        <div className="flex flex-col items-center md:items-start my-2">
          <h5>Informations légales</h5>
          <ul className="text-center md:text-left space-y-2">
            <li className="hover:text-primary-purple-300 transition"><Link href="/legal-notice">Mentions légales</Link></li>
            <li className="hover:text-primary-purple-300 transition"><Link href="/privacy-policy">Politique de confidentialité</Link></li>
            <li className="hover:text-primary-purple-300 transition"><Link href="/terms-and-conditions">CVG</Link></li>
          </ul>
        </div>

        {/* Bloc des réseaux sociaux */}
        <div className="flex flex-col items-center mb-4 mt-2">
          <h5>Rejoignez-nous !</h5>
          <div className="flex justify-center items-center gap-4 mt-4">
            {/* Icône YouTube */}
            <a href={"https://www.youtube.com/"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200">
              <Image src="/images/icons/youtube-circle.png" alt="Logo de Youtube" width={24} height={24}/>
            </a>
            {/* Icône Facebook */}
            <a href={"https://www.facebook.com/?locale=fr_FR"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200">
              <Image src="/images/icons/facebook.png" alt="Logo de Facebook" width={24} height={24}/>
            </a>
            {/* Icône Instagram */}
            <a href={"https://www.instagram.com/"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200">
              <Image src="/images/icons/instagram.png" alt="Logo de Instagram" width={24} height={24}/>
            </a>
            {/* Icône TikTok */}
            <a href={"https://www.tiktok.com/fr/"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200">
              <Image src="/images/icons/tik-tok.png" alt="Logo de Tik-tok" width={24} height={24}/>
            </a>
          </div>
        </div>
      </div>

      {/* Ligne de bas de page (copyright) */}
      <div className="flex items-center justify-center">
        <p className="p-4 text-xs">ZombieLand @ 2025. Tous droits réservés.</p>
      </div>

    </footer>
  );

}