import BookingButton from "@/components/BookingButton";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative md:h-screen h-screen w-full">
      {/* Image de fond */}
      <Image
        src="/images/hero.png"
        alt="Entrée du parc ZombieLand"
        fill
        priority
        className="object-cover object-top"
      />

      <div className="absolute bottom-36 md:bottom-48 z-10 flex flex-col items-center justify-end gap-2 px-6 md:justify-center md:items-start md:w-2/3 md:h-auto">
        <div className="text-neutral-50 text-center mx-4 md:text-left">
          <p className="font-bold pb-2 md:text-2xl">
            L’aventure commence là où la peur prend vie… 
          </p>
          <p className="text-xs italic pb-2 md:text-base">
            Zombies, frissons et fous rires vous attendent dans un univers où les ombres bougent, les morts se réveillent, et chaque pas vous rapproche un peu plus de l’inconnu. 
          </p>
          <p className="font-bold md:text-2xl">
            Survivrez-vous à Zombieland ?
          </p>
        </div>
        <div className="w-auto">
          <BookingButton />
        </div>
      </div>

      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent to-black/60" />
    </section>
  );
}


