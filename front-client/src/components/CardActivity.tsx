import { Link, Skull } from "lucide-react";
import Image from "next/image";

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
  // Fonction utilitaire pour afficher les skulls selon le niveau
  const renderSkulls = (levelValue: number) => {
    const skulls = [];
    for (let i = 1; i <= 3; i++) {
      skulls.push(
        <Skull
          key={i}
          size={24}
          color={
            i <= levelValue
              ? "var(--color-secondary-200)" // skull "rempli"
              : "var(--color-secondary-500)" // skull "vide"
          }
        />
      );
    }
    return skulls;
  };
  return (
    <article className="relative flex flex-col border-solid border-2 border-primary-purple-300 rounded-xl drop-shadow-[0_0_4px_var(--color-primary-purple-200)]">
      {/* Image de l'activité */}
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
          className="self-end hover:text-secondary-300"
        >
        En savoir plus
        </Link>
      </div>
    </article>
  );
}