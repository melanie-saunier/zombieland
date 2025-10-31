// src/app/my-bookings/layout.tsx 
// création d'un layout pour utiliser les Metadata

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes réservations | ZOMBIELAND",
  description: "Consulte, modifie ou annule tes réservations.",
};

export default function MyBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
