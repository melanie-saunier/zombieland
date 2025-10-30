// src/app/login/layout.tsx 
// création d'un layout pour utiliser les Metadata

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | ZOMBIELAND",
  description: "Connecte-toi à ton compte ZOMBIELAND pour réserver tes billets et découvrir les nouveautés du parc.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
