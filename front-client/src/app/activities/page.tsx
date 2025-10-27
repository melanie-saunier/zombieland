"use client";
import IActivity from "@/@types/activity";
import { fetchAllActivities } from "@/api/activites";
import CardActivity from "@/components/CardActivity";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ActivitiesPage() {
  //TODO: fetch des activities depuis le back, quand back sera prêt. En attendant, j'ai créé une variable statique qui contient un tableau d'activités, pour mis en forme du front.
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadActivities = async () => {
      try {
        const dataActivities = await fetchAllActivities();
        setActivities(dataActivities);

      } catch(error) {
        console.log("erreur de fetch des recettes");
        setError("Erreur lors de la récupération des activitées"); 
      }
    };
    loadActivities();
  }, []);
 

  //TODO: fetch des categories depuis le back, quand il sera prêt. En attendant, j'ai créé une variable statique qui contient le tableau de catégories, pour mis en forme du front.
  const categories = [
    {id: "category-id1", name: "Frissons mécaniques", color: "#1BE7FF"},
    {id: "category-id2", name: "Instinct de survie", color: "#C41E3A"},
    {id: "category-id3", name: "Réalité Inhumaine", color: "#7A00FF"},
    {id: "category-id4", name: "Freak Shows", color: "#E3C014"}
  ];
  
  // Etats pour la recherche (searchTerm) et le filtre par catégories (selectedCategory)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filtrage en temps réel du tableau d'activités selon les deux critères
  // 🔁 La méthode .filter() parcourt chaque élément d'un tableau (ici, chaque "activity")
  // et ne conserve que ceux pour lesquels la fonction callback renvoie "true".
  // → En d'autres termes, elle crée un nouveau tableau filtré sans modifier l'original.
  const filteredActivities = activities.filter((activity) =>
    // On conserve uniquement les activités qui remplissent les deux conditions suivantes :
    // - le texte de recherche correspond (ou la barre est vide)
    // - la catégorie correspond (ou aucune catégorie n’est sélectionnée)
    (
      // --- Vérification du critère de recherche textuelle ---
      // Si "searchTerm" est vide, toutes les activités passent le test.
      // Sinon, on compare en minuscule le nom de l’activité au texte saisi.
      (searchTerm === "" ||
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()))
      &&
      // --- Vérification du critère de catégorie ---
      // Si "selectedCategory" est vide, toutes les activités passent le test.
      // Sinon, on garde uniquement celles dont le nom de catégorie correspond exactement.
      (selectedCategory === "" || activity.category.name === selectedCategory)
    )
  );


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

      {/* Overlay noir */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Bloc principal contenant le titre, la barre de recherche et le filtre par catégorie */}
      <div className="z-10 flex flex-col justify-between items-center md:items-start gap-4">
        
        {/* Titre principal de la page */}
        <h1 className="text-3xl md:text-4xl">Trouve ton horreur</h1>
        
        {/* Conteneur regroupant la barre de recherche et le sélecteur de catégorie */}
        <div className="flex flex-col justify-between items-center md:flex-row gap-4 text-center">
          
          {/* Barre de recherche */}
          {/* Ce formulaire ne déclenche pas de rechargement de page (grâce à e.preventDefault()).
            Chaque frappe met à jour le state `searchTerm`, utilisé pour filtrer la liste des activités en temps réel. */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="input_style flex gap-2 w-full"
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
          {/* Ce second formulaire permet de filtrer les activités selon leur catégorie.
            La valeur sélectionnée est stockée dans le state `selectedCategory`,
            qui met également à jour le filtrage des activités. */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="input_style  w-full"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-neutral-600 text-neutral-400"
            >
              {/* Option par défaut (aucun filtre appliqué) */}
              <option value="">Filtre par catégorie</option>

              {/* Les différentes catégories disponibles sont générées dynamiquement à partir du tableau `categories` */}
              {categories.map( (category) => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </form>
        </div>
      </div>
      
      {/* Cards */}
      {/* On parcourt le tableau `filteredActivities` (déjà filtré selon la recherche et la catégorie),
        et on affiche une carte pour chaque activité à l’aide du composant `CardActivity`. */}
      <div className="p-8 flex flex-wrap gap-8 justify-center">
        {filteredActivities.map((activity) => (
          <CardActivity key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}