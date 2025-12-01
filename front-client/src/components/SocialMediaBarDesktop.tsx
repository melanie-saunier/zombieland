// Composant SocialMediaBarDesktop
// Barre de réseaux sociaux affichée uniquement sur les écrans de bureau (md et plus)
// Contient les icônes de YouTube, Facebook, Instagram et TikTok avec un lien vers chaque plateforme

// target="_blank" : ouvre le lien dans un nouvel onglet/fenêtre du navigateur
// rel="noopener noreferrer" : améliore la sécurité et la confidentialité
//   - "noopener" empêche la nouvelle page ouverte d'accéder à l'objet window.opener, ce qui évite des attaques de type "tabnabbing"
//   - "noreferrer" empêche le navigateur d'envoyer l'URL de la page d'origine au site cible via l'en-tête HTTP Referer

import Image from "next/image";

export default function SocialMediaBarDesktop() {
  return (
    <div className="hidden md:flex justify-end gap-4 border-solid border-b-2 border-primary-300 bg-black p-4">
      {/* Lien vers YouTube */}
      <a href={"https://www.youtube.com/"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200" aria-label="Suivez-nous sur YouTube (ouvre dans un nouvel onglet)">
        <Image src="/images/icons/youtube-circle.png" alt="Logo de Youtube" width={24} height={24}/>
      </a>
      {/* Lien vers Facebook */}
      <a href={"https://www.facebook.com/?locale=fr_FR"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200" aria-label="Suivez-nous sur Facebook (ouvre dans un nouvel onglet)">
        <Image src="/images/icons/facebook.png" alt="Logo de Facebook" width={24} height={24}/>
      </a>
      {/* Lien vers Instagram */}
      <a href={"https://www.instagram.com/"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200" aria-label="Suivez-nous sur Instagram (ouvre dans un nouvel onglet)">
        <Image src="/images/icons/instagram.png" alt="Logo de Instagram" width={24} height={24}/>
      </a>
      {/* Lien vers TikTok */}
      <a href={"https://www.tiktok.com/fr/"} target="_blank" rel="noopener noreferrer" className="hover:scale-115 transition-transform duration-200" aria-label="Suivez-nous sur Tiktok (ouvre dans un nouvel onglet)">
        <Image src="/images/icons/tik-tok.png" alt="Logo de Tik-tok" width={24} height={24}/>
      </a>
    </div>
  );
}