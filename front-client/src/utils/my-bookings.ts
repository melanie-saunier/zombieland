import { Booking, ReservationDisplay } from "@/@types/my-bookings";

/**
 * Transforme un Booking backend en ReservationDisplay frontend
 * 
 * Logique de calcul du status :
 * - Backend status: false → Frontend "cancelled"
 * - Backend status: true + visit_date < maintenant → Frontend "past"
 * - Backend status: true + visit_date >= maintenant → Frontend "confirmed"
 * 
 * @param booking - Objet Booking du backend
 * @param unitPrice - Prix unitaire par défaut (30€ selon seed-db.sql)
 */
export function transformBookingToDisplay(
  booking: Booking, 
  unitPrice: number = 30
): ReservationDisplay {
  const visitDate = new Date(booking.visit_date);
  const now = new Date();
  
  // Calcul du statut frontend depuis le boolean backend
  let displayStatus: "confirmed" | "past" | "cancelled";
  if (booking.status === false) {
    displayStatus = "cancelled";
  } else if (visitDate < now) {
    displayStatus = "past";
  } else {
    displayStatus = "confirmed";
  }

  // Calcul du prix total
  let totalPrice = 0;
  if (booking.bookingPrices && booking.bookingPrices.length > 0) { // Si le booking a des bookingPrices, on calcule le prix total en ajoutant les prix appliqués
    totalPrice = booking.bookingPrices.reduce((sum, bp) => sum + bp.applied_price, 0);
  } else {
    totalPrice = booking.nb_people * unitPrice; // Sinon, on calcule le prix total en multipliant le nombre de personnes par le prix unitaire
  }

  return {
    id: booking.id,
    bookingDate: booking.created_at,
    visitDate: booking.visit_date,
    ticketCount: booking.nb_people,
    status: displayStatus,
    totalPrice,
  };
}