// Composant LinkButton
// Bouton réutilisable sous forme de lien cliquable (Next.js Link) qui peut inclure un texte et une icône

import { Icon as LucideIcon } from "lucide-react"; // juste pour le type
import Link from "next/link";

// Définition des props du composant LinkButton
type LinkProps = {
  // URL vers laquelle le bouton redirige
  path: string;
  // Texte affiché sur le bouton
  text: string;
  // Classe(s) personnalisée(s) pour le style du bouton
  style: string;
  // Icône optionnelle à afficher à côté du texte
  // React.ComponentType permet d'utiliser n'importe quelle icône compatible Lucide avec props size et className
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
};

export default function LinkButton({ path, text, style, Icon }: LinkProps) {
  return (
    // Lien cliquable stylisé comme un bouton
    // ${style} : classes supplémentaires passées via la prop style
    <Link href={path} className={`m-2 p-2 md:m-4 md:py-4 flex items-center w-fit ${style} text-neutral-50 width-inherit md:px-12 justify-center font-bold`}>
      {/* Affichage de l'icône si elle est fournie */}
      {Icon && <Icon size={24} className="mx-2" />}
      {/* Texte du bouton */}
      {text}
    </Link>
  );
} 