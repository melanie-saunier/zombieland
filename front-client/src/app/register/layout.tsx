// src/app/register/layout.tsx 
// création d'un layout pour utiliser les Metadata

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "S'inscrire | ZOMBIELAND",
  description:
    "Crée ton compte ZOMBIELAND et rejoins la communauté des survivants ! Réserve tes billets, prépare ta visite et découvre nos activités !",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}