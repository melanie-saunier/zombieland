// centraliser les schemas
import { bookingSchema, updateBookingSchema, updateBookingByUserSchema } from "./booking";
import { userSchema, updateUserSchema, updateUserPasswordSchema } from "./user";
import { registerSchema, loginSchema, updateMeSchema, updateMePasswordSchema } from "./auth";
import { priceSchema, updatePriceSchema } from "./price";
import { idSchema } from "./utils";

export { 
  idSchema,
  bookingSchema, updateBookingSchema, updateBookingByUserSchema,
  userSchema, updateUserSchema, updateUserPasswordSchema,
  registerSchema, loginSchema, updateMeSchema, updateMePasswordSchema,
  priceSchema, updatePriceSchema,
};