/** Données de réservation */
export interface BookingData {
    date: string; // Date choisie pour la réservation, format "YYYY-MM-DD"
    numberOfTickets: number; // Nombre de billets réservés
    totalPrice: number; // Prix total de la réservation
  }
  
  /** Tarification d'un billet */
  export interface TicketPricing {
    price: number; // Prix d'un billet
    maxTicketsPerBooking: number; // Nombre maximum de billets par réservation
  }
  
  /** Type accepté par le calendrier (date unique ou plage) */
  export type ValueDate = Date | [Date | null, Date | null] | null;