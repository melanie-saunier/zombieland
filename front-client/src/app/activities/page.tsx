// src/app/activity/id/page.tsx 

"use client";
import IActivity, { ICategory } from "@/@types/activity";
import { fetchAllActivities } from "@/api/activities";
import fetchAllCategories from "@/api/categories";
import CardActivity from "@/components/CardActivity";
import Loader from "@/components/Loader";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ActivitiesPage() {
  
  // State pour le fetch des activités avec state d'erreur et de loading
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [errorActivities, setErrorActivities] = useState<string | null>(null);
  const [loadingActivities, setLoadingActivities] = useState(true);

  // State pour le fetch des catégories avec state d'erreur et de loading
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // use effect pour récupérer les données avec un fetch
  useEffect(() => {
    // on récup les données des activités
    const loadActivities = async () => {
      // on remet le state d'erreur à zéro
      // on met le loading à true
      setLoadingActivities(true);
      setErrorActivities(null);
      try {
        // appelle de la fonction qui fetch les activités avec axios
        const dataActivities = await fetchAllActivities();
        setActivities(dataActivities);

      } catch(err) {
        console.error(err);
        setErrorActivities("Erreur lors de la récupération des activitées"); 
      } finally {
        // quand c'est chargé on met loading à false
        setLoadingActivities(false);
      }
    };

    // on récup les données des activités
    const loadCategories = async () => {
      // on remet le state d'erreur à zéro
      // on met le loading à true
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        // appelle de la fonction qui fetch les catégories avec axios
        const dataCategories = await fetchAllCategories();
        setCategories(dataCategories);
      } catch(err) {
        console.error(err);
        setErrorCategories("Erreur lors de la récupération des catégories");
      } finally {
        // quand données chargées on met le loader à false
        setLoadingCategories(false);
      }
    };
    // on appelle les fonctions de récupération des données:
    loadActivities();
    loadCategories();
  }, []);
 
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

  // si il y a une erreur on afffiche l'erreur 
  if(errorActivities || errorCategories) {
    return (
      <div className="h-100 flex flex-col items-center justify-center p-4">
        <p className="text-center font-bold text-xl">{errorActivities}</p>
        <p className="text-center font-bold text-xl">{errorCategories}</p>
        {/* ajouter une image */}
      </div>
    );
  }

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
        <h1 className="text-3xl md:text-5xl">Trouve ton horreur</h1>
        
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
          {/* loader mis en place, si loading categories: true on a un loader sinon on affiche les catégories */}
          { loadingCategories ?
            <Loader /> :

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
          }
        </div>
      </div>
      
      {/* Cards */}
      {/* On parcourt le tableau `filteredActivities` (déjà filtré selon la recherche et la catégorie),
        et on affiche une carte pour chaque activité à l’aide du composant `CardActivity`. */}
      {/* loadingActivities a true on affiche le loader sinon les activités */}
      {loadingActivities ? 
        (<div className="h-100 flex flex-col justify-center items-center m-4">
          <Loader /> 
        </div> ):
        (<div className="p-8 flex flex-wrap gap-8 justify-center">
          {filteredActivities.map((activity) => (
            <CardActivity key={activity.id} activity={activity} />
          ))}
        </div>)
      }
    </div>
  );
}