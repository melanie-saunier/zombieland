// src/app/about/page.tsx
import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/Button";
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
      image: "/images/Portrait-max2.png",
      description: "Visionnaire derrière l'univers immersif de Zombieland, Sarah crée des expériences inoubliables depuis 15 ans."
    },
    {
      name: "Marcus \"Zombie\" Blake",
      role: "Chef des opérations",
      image: "/images/Portrait-Melanie.png",
      description: "Ancien cascadeur, Marcus garantit que chaque frisson est à la fois spectaculaire et totalement sécurisé."
    },
    {
      name: "Luna Cortez",
      role: "Scénographe en chef",
      image: "/images/Portrait-Manon.png",
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
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center border-2 bg-purple-950 border-primary-purple-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300"
              >
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-primary-purple-300">
                  <Image 
                    src={member.image || "/images/Portrait-max.jpeg"}
                    alt={member.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-primary-purple-300">{member.name}</h4>
                <p className="text-sm text-neutral-50/80 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Histoire & Valeurs */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl text-neutral-50 font-bold mb-8 text-center border-b-2 border-primary-purple-300 pb-3 inline-block ">
            Notre Histoire & Nos Valeurs
          </h3>
          
          <div className="max-w-4xl mx-auto space-y-6 text-neutral-50/80 leading-relaxed mt-8">
            <p className="text-lg">
              Zombieland est né d'une passion pour l'horreur et le divertissement extrême. Notre mission est de créer
              un espace où les amateurs de sensations fortes peuvent vivre des expériences uniques dans un
              environnement sécurisé mais terrifiant.
            </p>

            <p className="text-lg font-semibold text-neutral-50 mt-8">Nos Valeurs Fondamentales :</p>

            <div className="space-y-4">
              <p>
                <strong className="text-primary-purple-300">Innovation :</strong> Nous repoussons constamment les limites de
                l'horreur immersive avec des technologies de pointe et des scénarios originaux.
              </p>

              <p>
                <strong className="text-primary-purple-300">Sécurité :</strong> Malgré l'intensité de nos attractions, la
                sécurité de nos visiteurs reste notre priorité absolue.
              </p>

              <p>
                <strong className="text-primary-purple-300">Authenticité :</strong> Nous créons des environnements et des
                scénarios réalistes qui plongent nos visiteurs dans un monde post-apocalyptique crédible.
              </p>

              <p>
                <strong className="text-primary-purple-300">Passion :</strong> Notre équipe est composée de passionnés d'horreur,
                de cinéma et d'effets spéciaux qui mettent tout leur cœur dans chaque détail.
              </p>
            </div>

            <p className="text-lg mt-8 text-center font-medium text-neutral-50">
              Rejoignez-nous pour une aventure que vous n'oublierez jamais. Osez-vous affronter vos peurs les plus
              profondes à Zombieland ?
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center md:justify-center mt-12">
          <Link href="/booking" className="w-full md:w-auto">
            <Button text="Réserver maintenant" style="button_booking" Icon={Bell} />
          </Link>
          <Link href="/activities" className="w-full md:w-auto">
            <Button text="Découvrir nos activités" style="button_activity" Icon={Rocket} />
          </Link>
        </div>
      </div>
    </section>
  );
}