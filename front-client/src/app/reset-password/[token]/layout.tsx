// src/app/reset-password/[token]/layout.tsx 
// création d'un layout pour utiliser les Metadata

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réinitialise ton mot de passe | ZOMBIELAND",
  description: "Saisis ton nouveau mot de passe pour sécuriser ton compte Zombieland après avoir reçu le lien de réinitialisation.",
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
