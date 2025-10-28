// src/app/activities/id/page.tsx 

import renderSkulls from "@/components/RenderSkulls";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ActivityDetailPageProps = {
  params: Promise<{ id: number }>;
};

export default async function ActivityDetailPage({params}: ActivityDetailPageProps) {
  // on veut recuperer l'id de l'activité de l'URL pour récupérer les infos de cette activité via un fetch
  // on reçoit direct en props du composant une promesse avec les valeurs des segments dynamiques
  const { id } = await params;

  // TODO: fetch à faire quand back sera prêt. En attendant, on a un objet "activity" à la place (provisoire, pour mise en place du front)
  const activity =
    { id: "activity-id1",
      name: "Target Panic",
      description: "Un stand futuriste où vous devez viser des têtes de zombies mécaniques avec des pistolets lumineux. Capteurs, sons délirants et effets LED à chaque tir réussi.",
      duration: 5,
      min_height: 110,
      pregnancy_warning: true,
      image_ref: "zombie_glam_lab.png",
      category: {id: "category-id2", name: "Instinct de survie", color: "#C41E3A"},
      level: {id: "level-id1", name: "Facile", value: 2} 
    };

  return (
    <div className="bg-neutral-700 py-4 px-8">
      <Link
        href="/activities"
        className="hover:text-primary-purple-300 transition"
      >
        ⭠ Retour à la liste des activités
      </Link>
      <div className="flex flex-col md:flex-row-reverse justify-around gap-8 md:gap-16 pt-4">
        {/* {Conteneur de l'image} */}
        <div className="md:w-1/2">
          <Image 
            src={`/images/activities/${activity.image_ref}`}
            alt={`Image de l'activité ${activity.name}`}
            width={400} 
            height={300}
            className="border-solid border-2 border-primary-purple-300 rounded-xl drop-shadow-[0_0_4px_var(--color-primary-purple-200)] md:w-full"
          />
        </div>

        {/* {Conteneur du texte} */}
        <div className="md:w-1/2 flex flex-col gap-2 md:gap-8 md:px-8">
          <div>
            {/* {Nom de l'activité} */}
            <h1 className="text-3xl md:text-5xl pb-4">{activity.name}</h1>
            {/* {Badge de la catégorie} */}
            <span 
              className="rounded-xl text-neutral-50 px-2 md:text-sm text-xs font-medium w-fit"
              style={{ backgroundColor: activity.category.color }}
            >
              {activity.category.name}
            </span>
          </div>
          <p className="text-justify italic">{activity.description}</p>
          <div>
            {/* {Niveau de frisson avec les crânes en fonction du niveau} */}
            <h2 className="font-bold text-xl pb-1">Niveau de frisson</h2>
            <div className="flex items-center gap-2">
              {renderSkulls(activity.level.value)}
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div>
              {/* {Durée de l'activité} */}
              <h2 className="font-bold text-xl pb-1">Durée</h2>
              <p>{activity.duration} min</p>
            </div>
            <div>
              {/* {Taille minimum pour participer à l'activité} */}
              <h2 className="font-bold text-xl pb-1">Taille Minimum</h2>
              <p>{activity.min_height} cm</p>
            </div>
          </div>
          {
            /* Avertissement femme enceinte : si pregnancy_warning = true, on affiche cette div, sinon, on ne l'affiche pas */
            activity.pregnancy_warning &&
            <div className="flex items-center gap-2">
              <TriangleAlert size={24} color="var(--color-primary-purple-300)" className="w-1/4 md:w-auto"/><p className="italic">Cette attraction est fortement déconseillée aux femmes enceintes.</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}