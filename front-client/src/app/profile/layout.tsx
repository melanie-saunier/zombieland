// src/app/profile/layout.tsx 
// création d'un layout pour utiliser les Metadata

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil | ZOMBIELAND",
  description: "Gère ici les informations de ton profil : prénom, nom, adresse email et mot de passe.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}