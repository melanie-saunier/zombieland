import LinkButton from "@/components/LinkButton";
import Button from "@/components/LinkButton";
import { Bell, CircleEllipsis, Clock, MapPinned, Phone, Rocket } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
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
            <LinkButton path="/booking" text="Réserver maintenant" style="button_booking" Icon={Bell} />
            <LinkButton path="/activities" text="Découvrir nos activités" style="button_activity" Icon={Rocket} />
          </div>
        </div>
      </section>
      <section>
        <div className="w-full h-[200px] md:h-screen bg-neutral-700">
          {/* section pour le slider d'activités du parc */}
        </div>
      </section>
      <section>
        <div className="relative w-full h-[400px] md:h-screen overflow-hidden">
          <Image
            src="/images/infos.png"
            alt="image direction du parc"
            fill
            priority
            className="object-cover object-[35%_center] scale-110 md:object-center md:scale-100"
          />
          {/* overlay dégradé de gauche à droite  */}
          <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent z-1"></div>

          <div className="absolute z-10 m-4 flex flex-col justify-center gap-4 w-full md:w-[60%] md:left-[10%] md:top-1/2 md:-translate-y-1/2">
            <h2 className="text-xl md:text-2xl">PRÉPARE TA VENUE</h2>
            <div className="">
              <div className="flex gap-2 font-bold text-base md:text-lg drop-shadow-lg/60">
                <Clock />
                <p>Horaires</p>
              </div>
              <div className="drop-shadow-lg/60 text-sm md:text-base">
                <p>Ouvert du lundi au dimanche</p>
                <p>De 10h à 23h</p>
              </div>
            </div>
            <div>
              <div className="flex gap-2 font-bold text-base md:text-lg drop-shadow-lg/60">
                <MapPinned />
                <p>Accès & parking</p>
              </div>
              <div className="drop-shadow-lg/60 text-sm md:text-base">
                <p>Zombieland Park, <br />
                66 rue du Cerveau enragé <br />
                42190 Néonville, France</p>
              </div>
            </div>
            <div>
              <div className="flex gap-2 font-bold text-base md:text-lg drop-shadow-lg/60">
                <Phone />
                <p>Contact</p>
              </div>
              <div className="drop-shadow-lg/60 text-sm md:text-base">
                <p>Téléphone: 06 66 66 66 66</p>
                <p>Email: contact@zombieland.com</p>
              </div>
            </div>
            <div className="self-center md:self-auto ">
              <LinkButton path="/visitor-information" text="En savoir plus ..." style="button_activity" Icon={undefined}/>
            </div>
          </div>
        
        </div>

      </section>
    </>
  );
}


