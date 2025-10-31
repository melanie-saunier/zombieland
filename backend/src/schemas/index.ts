// centraliser les schemas
import { bookingSchema, updateBookingSchema, updateBookingByUserSchema } from "./booking.js";
import { priceSchema, updatePriceSchema } from "./price.js";
import { idSchema } from "./utils.js";

export { 
  idSchema,
  bookingSchema, updateBookingSchema, updateBookingByUserSchema,
  priceSchema, updatePriceSchema,
};