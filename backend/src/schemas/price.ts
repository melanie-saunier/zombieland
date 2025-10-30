import { z } from "zod";

// schema zod pour creer les prices
export const priceSchema = z.object({
  label: z.coerce.string(),
  value: z.coerce.number().positive(),
});

// schema zod pour mettre à jour les bookings
export const updatePriceSchema = priceSchema.partial();

