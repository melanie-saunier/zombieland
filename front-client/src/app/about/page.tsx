// src/app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { Bell, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos | ZOMBIELAND",
  description: "Découvrez l'histoire, la mission et l'équipe derrière Zombieland.",
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Vex",
      role: "Directrice créative",
      image: "/images/about/team1.jpg",
      description: "Visionnaire derrière l'univers immersif de Zombieland, Sarah crée des expériences inoubliables depuis 15 ans."
    },
    {
      name: "Marcus \"Zombie\" Blake",
      role: "Chef des opérations",
      image: "/images/about/team2.jpg",
      description: "Ancien cascadeur, Marcus garantit que chaque frisson est à la fois spectaculaire et totalement sécurisé."
    },
    {
      name: "Luna Cortez",
      role: "Scénographe en chef",
      image: "/images/about/team3.jpg",
      description: "Architecte des décors et effets spéciaux, Luna transforme chaque recoin du parc en cauchemar vivant."
    },
    {
      name: "Alex \"Neon\" Chen",
      role: "Responsable technique",
      image: "/images/about/team4.jpg",
      description: "Génie de l'éclairage et des effets, Alex donne vie aux ambiances néon qui font l'identité du parc."
    }
  ];

  return (
    <section className="px-4 py-10 md:px-8 md:py-16 bg-neutral-700">
      <div className="max-w-6xl mx-auto">
        {/* Section Hero */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl mb-6">
            À propos de Zombieland
          </h1>
        </header>

        {/* Section Équipe */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-50 mb-4 border-b-2 border-primary-purple-300 pb-3 inline-block">
            L'équipe qui fait vivre l'horreur
          </h2>
          <p className="text-neutral-50 md:text-lg mt-6 mb-10 max-w-3xl">
            Derrière chaque frisson se cache une équipe de passionnés : créatifs, techniciens, comédiens et cascadeurs qui unissent leurs talents pour vous offrir une expérience unique où l'adrénaline rencontre l'art.
          </p>

          {/* Grille des 4 membres de l'équipe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className="flex flex-col items-center text-center bg-[#201041] border border-primary-purple-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300"
              >
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-primary-purple-300">
                  <Image 
                    src="/images/Portrait-max.jpeg"
                    alt="photo de profil de Max" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-primary-purple-300">Max "La Menace" B.</h4>
                <p className="text-sm text-neutral-50/80 leading-relaxed">Ancien cascadeur, Max garantit que chaque frisson est à la fois spectaculaire et totalement sécurisé.</p>
              </div>
              <div
                className="flex flex-col items-center text-center bg-[#201041] border border-primary-purple-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300"
              >
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-primary-purple-300">
                  <Image 
                    src="/images/Portrait-max.jpeg"
                    alt="blablalaa" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-primary-purple-300">Manon "La Zombie Queen" T.</h4>
                <p className="text-sm text-neutral-50/80 leading-relaxed">Visionnaire derrière l'univers immersif de Zombieland, Manon crée des expériences inoubliables depuis 15 ans.</p>
              </div>
              <div
                className="flex flex-col items-center text-center bg-[#201041] border border-primary-purple-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300"
              >
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-primary-purple-300">
                  <Image 
                    src="/images/Portrait-max.jpeg"
                    alt="blablalaa" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-primary-purple-300">Mélanie "La Styliste" S.</h4>
                <p className="text-sm text-neutral-50/80 leading-relaxed">Architecte des décors et effets spéciaux, Luna transforme chaque recoin du parc en cauchemar vivant.</p>
              </div>
              <div
                className="flex flex-col items-center text-center bg-[#201041] border border-primary-purple-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300"
              >
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-primary-purple-300">
                  <Image 
                    src="/images/Portrait-max.jpeg"
                    alt="blablalaa" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-primary-purple-300">Karie "La Product Owner" R.</h4>
                <p className="text-sm text-neutral-50/80 leading-relaxed">Génie de l'éclairage et des effets, Alex donne vie aux ambiances néon qui font l'identité du parc.</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
