import { Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-700 border-t-2 border-solid border-primary-purple-300">
      <div className="flex flex-col items-center border-solid border-t my-8 border-b border-primary-purple-300">
        <div className="my-2">
          <Link href="/" >
            <Image src="/images/logo.png" alt="Logo de Zombieland" width={100} height={50}/>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <h5>Contact</h5>
          <ul className="text-center">
            <li>06 66 66 66 66</li>
            <li>contact@zombieLand.fr</li>
            <li>Zombieland Park,<br/>66 rue du Cerveau enragé <br/>42190 Néonville, France</li>
            <li>Horaires: 7j/7 de 10h à 23h</li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h5>Informations légales</h5>
          <ul className="text-center">
            <li><Link href="/legal-notice">Mentions légales</Link></li>
            <li><Link href="/privacy-policy">Politique de confidentialités</Link></li>
            <li><Link href="/terms-and-conditions">CVG</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h5>Rejoigner-nous !</h5>
          <div className="flex">
            <Link href={"https://www.youtube.com/"}>
              <Youtube color={"var(--color-neutral-50)"} size={32}/>
            </Link>
            <Link href={"https://www.facebook.com/?locale=fr_FR"}>
              <Facebook color={"var(--color-neutral-50)"} size={24}/>
            </Link>
            <Link href={"https://www.instagram.com/"}>Insta</Link>
            <Link href={"https://www.tiktok.com/fr/"}>Tiktok</Link>
          </div>
        </div>
      </div>
      <div>
        <p>ZombieLand @ 2025. Tous droits réservés.</p>
      </div>
    </footer>
  );

}