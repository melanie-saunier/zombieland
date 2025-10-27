import { Skull } from "lucide-react";

/**
 * Composant utilitaire qui affiche un indicateur visuel du niveau de difficulté
 * d'une activité à l'aide d'icônes de crâne.
 *
 * Le niveau (`levelValue`) est compris entre 1 et 3 :
 *  - 1 → Facile
 *  - 2 → Intermédiaire
 *  - 3 → Difficile
 *
 * Pour chaque niveau (1 à 3), une icône de crâne est affichée :
 *  - Si `i` <= `levelValue`, le crâne est coloré (niveau atteint)
 *  - Sinon, il est plus clair (niveau non atteint)
 */

export default function renderSkulls(levelValue: number) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3].map((i) => (
        <Skull
          key={i}
          size={24}
          color={
            i <= levelValue
              ? "var(--color-secondary-200)" // skull "rempli"
              : "var(--color-secondary-500)" // skull "vide"
          }
        />
      ))}
    </div>
  );
}
