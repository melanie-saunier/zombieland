import { z } from "zod";

// schema zod pour creer les bookings
export const bookingSchema = z.object({
  visit_date: z.date().refine(
    // refine() permet d'ajouter une condition personnalisée à la validation :
    // ici, on interdit les réservations dans le passé.
    // On "nettoie" la date du jour (setHours(0,0,0,0)) pour ignorer l'heure
    // et comparer uniquement les jours (ex : le 1er novembre reste valide toute la journée).
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // on ignore l’heure, pour ne comparer que la date
      return date >= today; // autorise uniquement les dates futures (pas la date du jour)
    },
    { message: "La date de visite ne peut pas être dans le passé." }
  ),
  nb_people: z.coerce
    .number()
    .int("Le nombre de personnes doit être un entier.")
    .positive("Le nombre de personnes doit être supérieur à 0."),
  status: z.boolean(),
  user_id: z.coerce
    .number()
    .int("L'identifiant utilisateur doit être un entier.")
    .positive("L'identifiant utilisateur doit être positif."),
});

// schema zod pour mettre à jour les bookings
export const updateBookingSchema = bookingSchema.partial();


// Omit permet de retirer des champs du schéma
// Schéma d'une réservation sans le statut et le user id
export const updateBookingByUserSchema = bookingSchema.omit({
  status: true,
  user_id: true
});