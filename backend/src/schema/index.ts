// centraliser les schemas
import { bookingSchema, updateBookingSchema } from "./booking";
import { userSchema, updateUserSchema, updateUserPasswordSchema } from "./user";
import { idSchema } from "./utils";

export { 
  idSchema,
  bookingSchema, 
  updateBookingSchema,
  userSchema,
  updateUserSchema,
  updateUserPasswordSchema
};