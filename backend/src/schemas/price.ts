import { z } from "zod";

// schema zod pour creer les prices
export const priceSchema = z.object({
  label: z.string().min(1, "Le label ne peut pas être vide."),
  value: z.coerce.number().positive("La valeur doit être supérieure à 0."),
});

// schema zod pour mettre à jour les bookings
export const updatePriceSchema = priceSchema.partial();

