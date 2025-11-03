import { z } from "zod";

// schema zod pour creer les bookings
export const bookingSchema = z.object({
  visit_date: z.preprocess((val) => {
    // Si c'est une string, on la convertit en Date
    if (typeof val === "string" || val instanceof String) {
      return new Date(val as string);
    }
    return val; // sinon, on renvoie tel quel
  }, z.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // on ignore l’heure
      return date >= today;
    },
    { message: "La date de visite ne peut pas être dans le passé." }
  )),
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