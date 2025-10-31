/** Données de réservation */
export interface BookingData {
    visit_date: string; // Date choisie pour la réservation, format "YYYY-MM-DD"
    nb_people: number; // Nombre de billets réservés
    status: boolean; // Statut de la réservation
    total_price: number; // Prix total de la réservation
  }
  
  
/** Type accepté par le calendrier (date unique ou plage) */
export type ValueDate = Date | [Date | null, Date | null] | null;

export interface IBooking {
  visit_date: date;
  nb_people: number;
  status: boolean;
  user_id: number;
}

export interface IBookingInput {
  visit_date: date;
  nb_people: number;
  status: boolean;
  user_id: number;
}