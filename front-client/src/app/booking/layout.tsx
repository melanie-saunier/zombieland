// src/app/booking/layout.tsx 
// création d'un layout pour utiliser les Metadata

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réserver vos billets | ZOMBIELAND",
  description: "Réservez vos billets pour Zombieland et vivez une expérience terrifiante inoubliable !",
};

export default function BoookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}