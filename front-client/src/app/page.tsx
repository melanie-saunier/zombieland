import Button from "@/components/Button";
import { Bell, Rocket } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative h-screen w-full">
      <div className="relative w-full h-[200px] md:h-screen">
        {/* Image de fond 1 */}
        <Image
          src="/images/bg1.png"
          alt="Zombie sans lumière"
          fill
          priority
          className="object-cover object-top-right"
        />

        {/* Image de fond 2 (avec lumière néon) */}
        <Image
          src="/images/bg0.png"
          alt="Zombie éclairé par le néon vert"
          fill
          priority
          className="object-cover object-top-right animate-flicker"
        />
      </div>

      <div className="absolute md:bottom-24 z-10 flex flex-col items-center justify-end gap-2 p-4 md:justify-center md:items-start md:w-2/3 md:h-auto min-h-[300px] max-h-screen bg-neutral-700 md:bg-transparent">
        <div className="text-neutral-50 text-center md:mx-4 md:text-left md:pb-8 flex flex-col justify-around gap-8">
          <h1 className="text-2xl md:text-4xl">
            Bienvenue à Zombieland ! 
          </h1>
          <p className="font-bold md:text-2xl w-3/4 m-auto md:m-0">
            L’aventure commence là où la peur prend vie… 
          </p>
          <p className="text-xs italic md:text-base w-3/4 m-auto md:m-0">
            Zombies, frissons et fous rires vous attendent dans un univers où les ombres bougent, les morts se réveillent, et chaque pas vous rapproche un peu plus de l’inconnu. 
          </p>
          <p className="font-bold md:text-2xl w-3/4 m-auto pb-4 md:m-0">
            Survivrez-vous à Zombieland ?
          </p>
        </div>
        <div className="w-auto flex items-center flex-col md:flex-row md:mt-4">
          <Button text="Réserver maintenant" style="button_booking" Icon={Bell} />
          <Button text="Découvrir nos activités" style="button_activity" Icon={Rocket} />
        </div>
      </div>
    </section>
  );
}


