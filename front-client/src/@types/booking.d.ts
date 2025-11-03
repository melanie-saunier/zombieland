/** Données de réservation */
// utilisé dans la page booking (faire une réservation)
export interface BookingData {
    visit_date: string; // Date choisie pour la réservation, format "YYYY-MM-DD"
    nb_people: number; // Nombre de billets réservés
    status: boolean; // Statut de la réservation
    total_price: number; // Prix total de la réservation
  }
  
// utilisé dans la page booking (faire une réservation)
/** Type accepté par le calendrier (date unique ou plage) */
export type ValueDate = Date | [Date | null, Date | null] | null;

// type Booking de base pour envoyé des données à l'api notamment
export interface IBooking {
  visit_date: date;
  nb_people: number;
  status: boolean;
  user_id: number;
}

// type de données booking que renvoie l'api
export interface IApiBooking {
  id: number;
  visit_date: date;
  nb_people: number;
  status: boolean;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  bookingPrices: IBookingPrices[]
}
// sert dans le type de IApiBooking
export interface IBookingPrices {
  applied_price: number;
  price: IBookingPrice
}
// sert dans le type de IBookingPrices
export interface IBookingPrice {
  label: string;
  value: number;
}
// sert dans le typage quand on récupère toutes les bookings de 'l'api
export interface IMyBooking {
  id: number;
  visit_date: date;
  nb_people: number;
  status: boolean;
  user_id: number;
  bookingPrice: number;
  created_at: date;
}
// pour le typage des state de mybookings
export interface IMyBookingWithTotalPrice {
  id: number;
  visit_date: date;
  nb_people: number;
  status: boolean;
  user_id: number;
  bookingPrice: number;
  created_at: date;
  total_price: number;
}
