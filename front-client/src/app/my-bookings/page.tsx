"use client";

import { useEffect, useState } from "react";
import { bookingApi } from "@/api/booking";
import useUserContext from "@/context/useUserContext";
import { IMyBookingWithTotalPrice } from "@/@types/booking";
import MyBookingsCard from "@/components/MyBookingCard";
import Loader from "@/components/Loader";
import EditBookingModal from "@/components/EditBookingModal";
import CancelBookingModal from "@/components/CancelBookingModal";
import { MAX_TICKETS_PER_BOOKING } from "@/utils/bookingUtils";
import { csrfApi } from "@/api/csrf";


export default function MyBookingsPage() {
  const { user, csrfToken } = useUserContext();
  // État backend (structure BDD)
  // Cet état représente les données “brutes” venant du backend.
  const [myBookings, setmyBookings] = useState<IMyBookingWithTotalPrice[]>([]);
  const [isLoadingMyBookings, setIsLoadingMyBookings] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  //pour la modal de modification:
  const [selectedBooking, setSelectedBooking] = useState<IMyBookingWithTotalPrice | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // pour la gestion d'erreur dans la modal de modification
  const [errorForm, setErrorForm] = useState<string | null>(null);

  // pour la modal d'annulation de réservation
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);


  useEffect(() => {
    // chargement des reservations du users au chargement de la page
    const fetchMyBookings = async () => {
      if (!user?.id) return;
      setIsLoadingMyBookings(true);
      setError(null);

      try {
        const myBookingsData = await bookingApi.getMyBooking(user?.id);
        if (!myBookingsData) {
          setmyBookings([]);
          return;
        }
        const bookingsWithTotal = myBookingsData?.map(booking => ({
          ...booking,
          total_price: booking.nb_people * booking.bookingPrice,
        }));
        
        setmyBookings(bookingsWithTotal);
       
      } catch(error) {
        console.error("Erreur lors du chargement des réservations :", error);
        setError(
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors du chargement des réservations."
        );
      } finally {
        setIsLoadingMyBookings(false);
      }
    };
    fetchMyBookings();
  }, [user?.id]);


  // fonction pour soumission du formulaire de modification de la reservation
  async function handleUpdateBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // empêche le rechargement de la page
    if (!selectedBooking) return;
    // on récupère la saisie utilisateur
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    const visit_date = formData.get("visit_date") as string;
    const nb_people = Number(formData.get("nb_people"));

    // si la personne met moins de 1 ou plus de 15 billets on envoie une erreur
    if (nb_people < 1 || nb_people > MAX_TICKETS_PER_BOOKING) {
      setErrorForm("Le nombre de personnes doit être entre 1 et 15.");
      return;
    }
    // validation de la date: ne peut pas être antérieur à today
    const today = new Date;
    today.setHours(0, 0, 0, 0);
    //on utilise la fct setHours pour passer du format jour + heure à un format jour et heure à zero
    // ce format "sans heure" sera donc comparable à notre visit_date

    // on fait newDate sur visit_date car la saisie dans l'input est une string, donc on le converti en date
    //on pourra donc le comparer à today et l'envoyer en format Date au back
    const visitDateFormatted = new Date(visit_date);
    if (visitDateFormatted <=  today) {
      setErrorForm("La date de visite ne peut pas être antérieure à aujourd'hui.");
      return;
    }
    // remise à zéro du state d'erreur:
    setErrorForm(null);

    try {
      const token = csrfToken || await csrfApi.getCsrfToken();
      const updatedBooking = await bookingApi.updateMyBooking(selectedBooking.id, {
        visit_date: visitDateFormatted,
        nb_people,
      }, token!);
  
      if (updatedBooking) {
        setmyBookings((prev) =>
          // on parcours booking(state) pour trouver le booking qui a été modifié et remplacé ces données par les données à jour de l'api
          prev.map((booking) =>
            booking.id === selectedBooking.id
              ? { ...booking, 
                visit_date: new Date(updatedBooking.visit_date), 
                nb_people: updatedBooking.nb_people,
                total_price: updatedBooking.nb_people * booking.bookingPrice,
              }
              : booking
          )
        );
      }
  
      // Fermeture de la modale
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setErrorForm("Impossible de modifier la réservation.");
    }
  }
  // fonction pour annuler une réservation
  async function handleCancelBooking()  {
    if (!selectedBooking) return;

    try {
      const token = csrfToken || await csrfApi.getCsrfToken();
      // Appel API pour annuler la réservation: passer le status à false
      const cancelledBooking = await bookingApi.cancelMyBooking(selectedBooking.id, token!);

      if (cancelledBooking) {
        // on met à jour le state myBookings avec les données recues de l'API apres annulation
        setmyBookings((prev) =>
          prev.map((booking) =>
            booking.id === selectedBooking.id
              ? { ...booking, 
                status: cancelledBooking.status, 
              }
              : booking
          )
        );
      }

      // on ferme la modale
      setIsCancelModalOpen(false);
      
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setErrorForm("Impossible d'annuler la réservation.");
    }
  }

  if (isLoadingMyBookings) {
    return (
      <div className="bg-radial from-[#961990] to-[#000000] min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-radial from-[#961990] to-[#000000] min-h-screen flex items-center justify-center">
        <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-red-300 font-bold text-xl mb-2">Erreur de chargement</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-radial from-[#961990] to-[#000000] p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="title text-4xl md:text-5xl font-bold mb-2">Tes Réservations</h1>
          <p className="text-lg text-neutral-50">Gére tes réservations</p>
        </header>

        {/* Liste des réservations */}
        {myBookings.length === 0 ? (
          // Cas où l’utilisateur n’a aucune réservation
          <div className="bg-neutral-700 border border-primary-300 rounded-lg p-8 text-center shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <p className="text-neutral-50 text-lg">Tu n’as aucune réservation pour le moment.</p>
          </div>
        ) : (
          // Cas normal : on affiche les cartes de réservation
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myBookings.map((res) => (
              <MyBookingsCard 
                key={res.id}
                reservation = {res}
                onEdit={() => {
                  // on remplit le state avec la reservation de la carte et on passe le state de la modal à true pour l'afficher
                  setSelectedBooking(res);
                  setIsEditModalOpen(true);
                }}
                onCancel= {
                  () => {
                    setSelectedBooking(res);
                    setIsCancelModalOpen(true);
                  }
                }
              />
            ))}
          </div>
        )}
      </div>
      {/* // modal de modification */}
      {isEditModalOpen && selectedBooking && (
        <EditBookingModal  
          selectedBooking={selectedBooking}
          onClose={() => setIsEditModalOpen(false)}
          handleUpdateBooking={handleUpdateBooking}
          errorForm={errorForm}/>
      )}
      {/* modal d'annulation de réservation */}
      {isCancelModalOpen && selectedBooking && (
        <CancelBookingModal
          selectedBooking={selectedBooking}
          onClose={() => setIsCancelModalOpen(false)}
          handleCancelBooking={handleCancelBooking}
          errorForm={errorForm}
        />
      )}
    </div>

  );
}