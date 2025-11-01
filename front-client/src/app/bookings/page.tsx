
"use client";
import { useEffect, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import MyBookingCard from "@/components/MyBookingsCard"; // Composant affichant une carte de réservation
import { Booking, ReservationDisplay } from "@/@types/my-bookings";
import { transformBookingToDisplay, formatDate } from "@/utils/mybookingsUtils";
import { MAX_TICKETS_PER_BOOKING } from "@/utils/bookingUtils";
import { bookingApi } from "@/api/booking";
import useUserContext from "@/context/useUserContext";
import { IMyBookingWithTotalPrice } from "@/@types/booking";
import MyBookingsCard from "@/components/MyBookingCardV2";
import Loader from "@/components/Loader";


export default function MyBookingsPage() {
  const { user } = useUserContext();
  // État backend (structure BDD)
  // Cet état représente les données “brutes” venant du backend.
  const [myBookings, setmyBookings] = useState<IMyBookingWithTotalPrice[]>([]);
  const [isLoadingMyBookings, setIsLoadingMyBookings] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  //pour la modal de modification:
  const [selectedBooking, setSelectedBooking] = useState<IMyBookingWithTotalPrice | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  
    try {
      await bookingApi.updateMyBooking(selectedBooking.id, {
        visit_date: new Date(visit_date),
        nb_people,
      });
  
      // Mise à jour locale du state myBookings
      setmyBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id
            ? { ...booking, visit_date: new Date(visit_date), nb_people }
            : booking
        )
      );
  
      // Fermeture de la modale
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour de la réservation.");
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
          <h1 className="title text-4xl md:text-5xl font-bold mb-2">Mes Réservations</h1>
          <p className="text-lg text-neutral-50">Gérez mes réservations</p>
        </header>

        {/* Liste des réservations */}
        {myBookings.length === 0 ? (
          // Cas où l’utilisateur n’a aucune réservation
          <div className="bg-neutral-700 border border-primary-300 rounded-lg p-8 text-center shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <p className="text-neutral-50 text-lg">Vous n&apos;avez aucune réservation pour le moment.</p>
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
              />
            ))}
          </div>
        )}
      </div>
      {/* // modal de modification */}
      {isEditModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1E1630] text-neutral-50 p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
            <h2 className="text-2xl font-bold mb-4">Modifier la réservation</h2>

            <p className="text-sm text-primary-200 mb-6">
              Réservation du {new Date(selectedBooking.visit_date).toLocaleDateString()}
            </p>

            
            <form
              onSubmit={handleUpdateBooking}
              className="space-y-4"
            >
              <label className="block">
                <span className="text-sm">Nombre de personnes</span>
                <input
                  name="nb_people"
                  type="number"
                  min={1} 
                  defaultValue={selectedBooking.nb_people}
                  className="w-full mt-1 p-2 rounded bg-neutral-800 border border-primary-300"
                />
              </label>

              <label className="block">
                <span className="text-sm">Date de visite</span>
                <input
                  name="visit_date"
                  type="date"
                  defaultValue={new Date(selectedBooking.visit_date).toISOString().split("T")[0]}
                  className="w-full mt-1 p-2 rounded bg-neutral-800 border border-primary-300"
                />
              </label>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition"
                >
            Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-primary-500 hover:bg-primary-400 transition"
                >
            Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  );
}