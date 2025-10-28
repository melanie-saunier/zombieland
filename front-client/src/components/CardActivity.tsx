// Composant CardActivity
// Affiche une carte d'activité avec :
// - une image de l'activité en haut (cliquable pour accéder au détail) 
// - un badge de catégorie coloré superposé sur l'image
// - le nom de l'activité
// - le niveau de difficulté représenté par un certain nombre de crânes
// - un lien "Explore" pour découvrir les détails de l'activité

import Image from "next/image";
import Link from "next/link";
import renderSkulls from "./RenderSkulls";

type PropsCardActivity = {
  activity: {
    id: string;
    name: string;
    description: string;
    duration: number;
    min_height: number;
    pregnancy_warning: boolean;
    image_ref: string;
    category: { id: string; name: string; color: string };
    level: { id: string; name: string; value: number };
  };
};

export default function CardActivity({activity} : PropsCardActivity) {

  return (
    <article className="relative flex flex-col border-solid border-2 border-primary-purple-300 rounded-xl drop-shadow-[0_0_4px_var(--color-primary-purple-200)]">
      {/* Image de l'activité */}
      <Link href={`/activities/${activity.id}`}>
        <Image 
          src={`/images/activities/${activity.image_ref}`}
          alt={`Image de l'activité ${activity.name}`}
          width={300} 
          height={200}
          className="w-full rounded-xl"
        />
        {/* Catégorie (badge coloré) */}
        <span 
          className="absolute top-3 left-3 rounded-xl text-neutral-50 px-2 md:text-sm text-xs font-medium"
          style={{ backgroundColor: activity.category.color }}
        >
          {activity.category.name}
        </span>
      </Link>

      {/* Contenu texte */}
      <div className="absolute bottom-0 w-full bg-neutral-700/80 flex justify-between items-center px-2 md:py-4 py-2 rounded-xl">
        <div className="flex gap-4 md:gap-8">
          <h3 className="md:text-xl font-medium">{activity.name}</h3>
          <div className="flex justify-between items-center gap-2">
            {renderSkulls(activity.level.value)}
          </div>
        </div>
        <Link
          href={`/activities/${activity.id}`}
          className="self-end text-neutral-300 hover:text-secondary-300"
        >
          Explore
        </Link>
      </div>
    </article>
  );
}