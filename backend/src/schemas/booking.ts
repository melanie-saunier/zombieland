import { z } from "zod";

// schema zod pour creer les bookings
export const bookingSchema = z.object({
  visit_date: z.date(),
  nb_people: z.coerce.number().int().positive(),
  status: z.coerce.boolean(),
  user_id: z.coerce.number().int().positive(),
});

// schema zod pour mettre à jour les bookings
export const updateBookingSchema = bookingSchema.partial();

