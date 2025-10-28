// src/app/activities/id/layout.tsx 
// création d'un layout pour utiliser les Metadata

import type { Metadata } from "next";

// Fonction pour générer les métadonnées dynamiques (server-side)
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  //TODO: mettre à jour le fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities/${params.id}`, {
    // Important pour éviter le cache
    cache: "no-store",
  });

  // Si le fetch échoue, on met des valeurs par défaut
  if (!res.ok) {
    return {
      title: "Activité inconnue | ZOMBIELAND",
      description: "Détails de l’activité non disponibles.",
    };
  }

  const activity = await res.json();

  return {
    title: `${activity.name} | ZOMBIELAND`,
    description: `En savoir plus sur ${activity.name}, une activité du parc Zombieland.`,
  };
}

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
