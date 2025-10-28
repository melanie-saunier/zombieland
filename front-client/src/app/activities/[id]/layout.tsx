// src/app/activities/[id]/layout.tsx
import type { Metadata } from "next";
import { fetchOneActivityById } from "@/api/activities";

export async function generateMetadata(
  { params }: { params: { id: number } }
): Promise<Metadata> {
  const { id } = await params;
  const idNumber = Number(id);
  const activity = await fetchOneActivityById(idNumber);

  // Si l'activité n'existe pas, on met des valeurs par défaut
  if (!activity) {
    return {
      title: "Activité inconnue | ZOMBIELAND",
      description: "Détails de l’activité non disponibles.",
    };
  }

  // Sinon, on génère les métadonnées dynamiques
  return {
    title: `${activity.name} | ZOMBIELAND`,
    description: `En savoir plus sur ${activity.name}, une activité du parc Zombieland.`,
  };
}

export default function ActivityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}