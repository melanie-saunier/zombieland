"use client";
import CardActivity from "@/components/CardActivity";
import { Search, Skull } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ActivitiesPage() {
  const activities = [
    { id: "activity-id1",
      name: "Target Panic",
      description: "Un stand futuriste où vous devez viser des têtes de zombies mécaniques avec des pistolets lumineux. Capteurs, sons délirants et effets LED à chaque tir réussi.",
      duration: 5,
      min_height: 110,
      pregnancy_warning: false,
      image_ref: "target_panic.png",
      category: {id: "category-id2", name: "Instinct de survie", color: "#C41E3A"},
      level: {id: "level-id1", name: "Facile", value: 1} 
    }, 
    { id: "activity-id2",
      name: "The Grinder",
      description: "Les visiteurs embarquent dans une machine à broyer les morts-vivants : nacelles rotatives, étincelles de métal, néons roses et verts, cris mécaniques et rires zombifiés en fond sonore. Sensations garanties !",
      duration: 15,
      min_height: 130,
      pregnancy_warning: true,
      image_ref: "the_grinder.png",
      category: {id: "category-id1", name: "Frissons mécaniques", color: "#1BE7FF"},
      level: {id: "level-id3", name: "Difficile", value: 3} 
    }, 
    { id: "activity-id3",
      name: "The Core",
      description: "Un tunnel lumineux et sonore à explorer : capteurs de mouvement, illusions lumineuses, effets sonores 3D, hologrammes de zombies et une fin humoristique inattendue.",
      duration: 15,
      min_height: 110,
      pregnancy_warning: false,
      image_ref: "the_core.png",
      category: {id: "category-id3", name: "Réalité Inhumaine", color: "#7A00FF"},
      level: {id: "level-id2", name: "Intermédiaire", value: 2} 
    }, 
    { id: "activity-id4",
      name: "Rebirth Live Show",
      description: "Danseurs zombies, lasers verts, beats techno et projections futuristes : un show déjanté entre concert électro et théâtre d’outbreak.",
      duration: 30,
      min_height: 110,
      pregnancy_warning: false,
      image_ref: "rebirth_live_show.png",
      category: {id: "category-id4", name: "Freak Shows", color: "#E3C014"},
      level: {id: "level-id1", name: "Facile", value: 1} 
    },
  ];

  const categories = [
    {id: "category-id1", name: "Frissons mécaniques", color: "#1BE7FF"},
    {id: "category-id2", name: "Instinct de survie", color: "#C41E3A"},
    {id: "category-id3", name: "Réalité Inhumaine", color: "#7A00FF"},
    {id: "category-id4", name: "Freak Shows", color: "#E3C014"}
  ]
  
    // États pour la recherche et le filtre
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

    // 🔍 Filtrage en temps réel selon les deux critères
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      searchTerm === "" ||
      activity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || activity.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 relative flex flex-col min-h-screen">
      {/* Background image*/}
      <Image 
        src="/images/background.png"
        alt="Image du parc ZombieLand"
        fill
        priority
        className="object-fit"
      />

      {/* overlay noir */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Contenu */}
      <div className="z-10 flex flex-col justify-between items-center md:items-start gap-4">
        <h1 className="text-3xl md:text-4xl">Trouve ton horreur</h1>
        <div className="flex flex-col justify-between items-center md:flex-row gap-4 text-center">
          
          {/* Barre de recherche */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-neutral-600 border-solid border-b-2 border-primary-purple-300 rounded-sm flex gap-2 py-1 px-2 w-full"
          >
            <Search size={20} />
            <input 
              type="text"
              value={searchTerm}
              placeholder="Rechercher par mot clé"
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </form>
          
          {/* Sélecteur de catégorie */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-neutral-600 border-solid border-b-2 border-primary-purple-300 rounded-sm py-1 px-2 w-full"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-neutral-600 text-neutral-400"
            >
              <option value="">Filtre par catégorie</option>
              {categories.map( (category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </form>
        </div>
      </div>
      {/* Cards */}
      <div className="p-8 flex flex-wrap gap-4 justify-center">
        {filteredActivities.map((activity) => (
          <CardActivity key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}