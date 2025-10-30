// centraliser les schemas
import { bookingSchema, updateBookingSchema } from "./booking.js";
import { priceSchema, updatePriceSchema } from "./price.js";
import { idSchema } from "./utils.js";

export { 
  idSchema,
  bookingSchema, updateBookingSchema,
  priceSchema, updatePriceSchema,
};