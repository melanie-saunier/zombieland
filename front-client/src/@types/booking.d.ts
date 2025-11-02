/** Données de réservation */
export interface BookingData {
    visit_date: string; // Date choisie pour la réservation, format "YYYY-MM-DD"
    nb_people: number; // Nombre de billets réservés
    status: boolean; // Statut de la réservation
    total_price: number; // Prix total de la réservation
  }
  
/** Tarification d'un billet */
export interface TicketPricing {
    label: string; // Etiquette du billet (ex: "Tarif Unique")
    value: number; // Prix d'un billet
  }
  
/** Type accepté par le calendrier (date unique ou plage) */
export type ValueDate = Date | [Date | null, Date | null] | null;