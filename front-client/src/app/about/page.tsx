// src/app/about/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import { Bell, Rocket } from "lucide-react";
import LinkButton from "@/components/LinkButton";

export const metadata: Metadata = {
  title: "À propos | ZOMBIELAND",
  description: "Découvrez l'histoire, la mission et l'équipe derrière Zombieland.",
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Maximilien Berbudeau",
      role: "Maître des opérations",
      image: "/images/Portrait-max2.png",
      description: "Chef d’orchestre du parc, Maximilien veille à la bonne coordination de chaque attraction et s’assure que toute l’équipe avance dans la même direction. Grâce à sa vision globale, chaque mission est menée à bien sans qu’aucun zombie ne s’égare."
    },
    {
      name: "Mélanie Saunier",
      role: "Architecte des illusions visuelles",
      image: "/images/Portrait-Melanie.png",
      description: "Spécialiste des façades et expériences immersives, Mélanie conçoit les univers qui accueillent les visiteurs. Elle façonne les décors et les interfaces du parc pour que chaque détail, chaque lumière, plonge le public dans la terreur... avec style."
    },
    {
      name: "Manon Thez",
      role: "Ingénieure des ombres et des mécanismes secrets",
      image: "/images/Portrait-Manon.png",
      description: "Dans les coulisses du parc, Manon construit les systèmes qui font battre le cœur de Zombieland. Elle s’assure que chaque piège, chaque cri et chaque porte grinçante s’activent au bon moment, sans jamais révéler les rouages du cauchemar."
    },
    {
      name: "Kari Routier",
      role: "Gardienne de la vision et de l’expérience",
      image: "/images/about/team4.jpg",
      description: "Toujours à l’écoute des visiteurs, Kari imagine les parcours et définit les grandes orientations du parc. Elle veille à ce que chaque nouvelle attraction reste fidèle à l’esprit de Zombieland : intense, surprenant et délicieusement effrayant."
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
            L’ équipe qui fait vivre l’horreur
          </h2>
          <p className="text-neutral-50 md:text-lg mt-6 mb-10 max-w-3xl">
            Derrière chaque frisson se cache une équipe de passionnés : créatifs, techniciens, comédiens et cascadeurs qui unissent leurs talents pour vous offrir une expérience unique où l’adrénaline rencontre l’art.
          </p>

          {/* Grille des 4 membres de l'équipe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-[#201041] border border-primary-purple-300 rounded-lg p-6 hover:border-secondary-300 hover:shadow-[0_0_20px_rgba(100,204,41,0.4)] transition-all duration-300"
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
    
      </div>

      {/* Section Histoire & Valeurs */}
      <div className="mb-12 max-w-6xl mx-auto px-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center pb-3 text-neutral-50" >
                Notre Histoire & Nos Valeurs !
          </h3>
        </div>
        <div className="max-w-4xl mx-auto space-y-6 text-neutral-50/80 leading-relaxed">
          <p className="text-lg">
            Zombieland est né d’une passion pour l’horreur et le divertissement extrême. Notre mission est de créer
            un espace où les amateurs de sensations fortes peuvent vivre des expériences uniques dans un
            environnement sécurisé mais terrifiant.
          </p>

          <p className="text-lg font-semibold text-neutral-50 mt-8">Nos Valeurs Fondamentales :</p>

          <div className="space-y-4">
            <p>
              <span className="text-primary-purple-300">Innovation :</span> Nous repoussons constamment les limites de l’horreur immersive avec des technologies de pointe et des scénarios originaux.
            </p>
            <p>
              <span className="text-primary-purple-300">Sécurité :</span> Malgré l’intensité de nos attractions, la sécurité de nos visiteurs reste notre priorité absolue. Chaque expérience est conçue et supervisée par des professionnels qualifiés.
            </p>
            <p>
              <span className="text-primary-purple-300">Authenticité :</span> Nous créons des environnements et des scénarios réalistes qui plongent nos visiteurs dans un monde post-apocalyptique crédible et terrifiant.
            </p>
            <p>
              <span className="text-primary-purple-300">Passion :</span> Notre équipe est composée de passionnés d’horreur, de cinéma et d’effets spéciaux qui mettent tout leur cœur dans chaque détail de l’expérience.visiteurs dans un monde post-apocalyptique crédible et terrifiant.
            </p>
          </div>

          <p className="text-lg mt-8 text-center font-medium text-neutral-50">
            Rejoignez-nous pour une aventure que vous n’oublierez jamais. Osez-vous affronter vos peurs les plus profondes à Zombieland ?
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center md:justify-center mt-12">
        <LinkButton path="/booking" text="Réserver maintenant" style="button_booking" Icon={Bell} />
        <LinkButton path="/activities" text="Découvrir nos activités" style="button_activity" Icon={Rocket} />
      </div>
    </section>
  );
}