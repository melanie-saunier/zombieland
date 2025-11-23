// src/app/forgot-password/layout.tsx 
// création d'un layout pour utiliser les Metadata

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mot de passe oublié | ZOMBIELAND",
  description: "Indique ton adresse e-mail pour recevoir un lien permettant de réinitialiser ton mot de passe et récupérer l'accès à ton compte Zombieland.",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
