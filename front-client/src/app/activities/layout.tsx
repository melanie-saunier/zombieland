// src/app/activities/layout.tsx 
// création d'un layout pour utiliser les Metadata

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos activités | ZOMBIELAND",
  description: "Découvrez toutes nos activités !",
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
