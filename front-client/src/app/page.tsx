// src/app/page.tsx (home page)

"use client";
import CardActivity from "@/components/CardActivity";
import LinkButton from "@/components/LinkButton";
import { Bell, Clock, MapPinned, Phone, Rocket } from "lucide-react";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";

export default function Home() {
  //TODO: fetch des activities depuis le back, quand back sera prêt. En attendant, j'ai créé une variable statique qui contient un tableau d'activités, pour mis en forme du front.

  const activities = [
    { id: "activity-id1",
      name: "Target Panic",
      description: "Un stand futuriste où vous devez viser des têtes de zombies mécaniques avec des pistolets lumineux. Capteurs, sons délirants et effets LED à chaque tir réussi.",
      duration: 5,
      min_height: 110,
      pregnancy_warning: false,
      image_ref: "target_panic.png",
      category: {id: "category-id2", name: "Instinct de survie", color: "#C41E3A"},
      level: {id: "level-id1", name: "Facile", value: 1} 
    }, 
    { id: "activity-id2",
      name: "The Grinder",
      description: "Les visiteurs embarquent dans une machine à broyer les morts-vivants : nacelles rotatives, étincelles de métal, néons roses et verts, cris mécaniques et rires zombifiés en fond sonore. Sensations garanties !",
      duration: 15,
      min_height: 130,
      pregnancy_warning: true,
      image_ref: "the_grinder.png",
      category: {id: "category-id1", name: "Frissons mécaniques", color: "#1BE7FF"},
      level: {id: "level-id3", name: "Difficile", value: 3} 
    }, 
    { id: "activity-id3",
      name: "The Core",
      description: "Un tunnel lumineux et sonore à explorer : capteurs de mouvement, illusions lumineuses, effets sonores 3D, hologrammes de zombies et une fin humoristique inattendue.",
      duration: 15,
      min_height: 110,
      pregnancy_warning: false,
      image_ref: "the_core.png",
      category: {id: "category-id3", name: "Réalité Inhumaine", color: "#7A00FF"},
      level: {id: "level-id2", name: "Intermédiaire", value: 2} 
    }, 
    { id: "activity-id4",
      name: "Rebirth Live Show",
      description: "Danseurs zombies, lasers verts, beats techno et projections futuristes : un show déjanté entre concert électro et théâtre d’outbreak.",
      duration: 30,
      min_height: 110,
      pregnancy_warning: false,
      image_ref: "rebirth_live_show.png",
      category: {id: "category-id4", name: "Freak Shows", color: "#E3C014"},
      level: {id: "level-id1", name: "Facile", value: 1} 
    },
  ];
  return (
    <>
      <section className="md:relative md:h-screen w-full">
        <div className="md:relative w-full h-[200px] md:h-screen">
          {/* Image de fond 1 */}
          <Image
            src="/images/bg1.png"
            alt="Zombie sans lumière"
            width={400}           // largeur mobile
            height={200}          // hauteur mobile
            className="absolute top-5 left-0 object-cover object-top-right w-full h-[200px] md:w-full md:h-screen"
          />

          {/* Image de fond 2 (avec lumière néon) */}
          <Image
            src="/images/bg0.png"
            alt="Zombie éclairé par le néon vert"
            width={400}           // largeur mobile
            height={200}          // hauteur mobile
            className="absolute top-5 left-0 object-cover object-top-right animate-flicker w-full h-[200px] md:w-full md:h-screen"
          />
        </div>

        <div className="md:absolute md:bottom-24 z-10 flex flex-col items-center justify-end gap-2 p-4 md:justify-center md:items-start md:w-2/3 md:h-auto min-h-[300px] max-h-screen bg-neutral-700 md:bg-transparent">
          <div className="text-neutral-50 text-center md:mx-4 md:text-left md:pb-8 flex flex-col justify-around gap-8">
            <h1 className="text-3xl md:text-5xl">
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
        {/* section pour le slider d'activités du parc */}
        <div className="w-full h-[400px] p-4  flex flex-col items-center justify-center gap-4">
          <h2 className="text-xl md:text-3xl uppercase">Nos attractions les plus flippantes</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1} //mobile une activitée
            breakpoints={{
              768: {
                slidesPerView: 2, // desktop 2 activité
              },
            }}
            className="w-full"
          >
            {activities.map((activity) => {
              return (
                <SwiperSlide key={activity.id} >
                  <div className="flex justify-center w-full mb-8">
                    <CardActivity  activity={activity}/>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <section>
        {/* section informations utiles du parc */}
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
            <h2 className="text-xl md:text-3xl uppercase">Prépare ta venue</h2>
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
            <div className="self-center md:self-auto md:w-xs">
              <LinkButton path="/visitor-information" text="En savoir plus" style="button_activity" Icon={undefined}/>
            </div>
          </div>
        
        </div>

      </section>
    </>
  );
}