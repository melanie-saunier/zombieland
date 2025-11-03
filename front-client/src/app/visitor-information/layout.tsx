import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informations pratiques | ZOMBIELAND",
  description: "Préparez votre venue à Zombieland et vivez une expérience terrifiante inoubliable !",
};

export default function VisitorInformationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}