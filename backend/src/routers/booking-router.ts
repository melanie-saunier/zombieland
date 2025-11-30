import { Router } from "express";
import { bookingController } from "../controllers/bookings-controller";
import { authenticateToken } from "../middlewares/authenticate-token";
import { authorizeAdmin } from "../middlewares/authorize-admin";
import { verifyCsrf } from "../middlewares/verify-csrf";

export const bookingRouter = Router();

/**
 * @typedef {object} PriceLabel
 * @property {string} label - Label du prix
 * @property {string} value - Valeur du prix
 */

/**
 * @typedef {object} BookingPrice
 * @property {string} applied_price - Prix appliqué pour la réservation
 * @property {PriceLabel} price - Objet Price associé
 */

/**
 * @typedef {object} Booking 
 * @property {number} id - booking unique id 
 * @property {string} visit_date - visit date
 * @property {number} nb_people - number of people in the booking
 * @property {boolean} status - booking status
 * @property {string} user_id - user who has made the booking
 * @property {string} created_at - booking creation TS
 * @property {string} updated_at - booking latest update TS
 * @property {BookingPrice[]} bookingPrices - liste des tarifs appliqués à la réservation
*/

/**
 * @typedef {object} CreateBookingInput
 * @property {string} visit_date.required - Visit date (ISO format)
 * @property {number} nb_people.required - Number of people in the booking
 * @property {boolean} status - booking status
 * @property {number} user_id.required - ID of the user who made the booking
 */

/**
 * @typedef {object} UpdateBookingInput
 * @property {string} visit_date - Visit date (ISO format)
 * @property {number} nb_people - Number of people in the booking
 * @property {boolean} status - Booking status
 */

/**
 * @typedef {object} UpdateBookingByUserInput
 * @property {string} visit_date - Visit date (ISO format)
 * @property {number} nb_people - Number of people in the booking
 */

/**
 * GET /bookings
 * @tags Booking
 * @summary Returns all bookings (admin only)
 * @return {Booking[]} 200 - Successful response with list of bookings
 * @return {object} 404 - No bookings found
 * @return {object} 403 - Unauthorized
 * @return {object} 500 - Internal server error
 */
// GET all bookings (admin only)
bookingRouter.get("/", authenticateToken, authorizeAdmin, bookingController.getAll);

/**
 * GET /bookings/user/{id}
 * @tags Booking
 * @summary Returns all the bookings made by a user (authenticated users)
 * @param {string} id.path.required - The ID of the user
 * @return {Booking[]} 200 - Successful response with the Booking object
 * @return {object} 403 - Unauthorized
 * @return {object} 404 - No bookings found
 * @return {object} 500 - Internal server error
 */
// GET all bookings for a specific user
bookingRouter.get("/user/:id", authenticateToken, bookingController.getAllBookingsForUser);

/**
 * GET /bookings/{id}
 * @tags Booking
 * @summary Returns a booking by its id
 * @param {string} id.path.required - The ID of the booking
 * @return {Booking} 200 - Successful response with the booking object
 * @return {object} 403 - Unauthorized
 * @return {object} 404 - No booking found
 * @return {object} 500 - Internal server error
 */
// GET booking by ID
bookingRouter.get("/:id", authenticateToken, bookingController.getById);

/**
 * POST /bookings 
 * @tags Booking
 * @summary Creates a booking (authenticated users)
 * @param {CreateBookingInput} request.body.required - Booking data
 * @return {Booking} 201 - Successful response with booking created
 * @return {object} 400 - Validation errors
 * @return {object} 403 - Unauthorized
 * @return {object} 500 - Internal server error
 */
bookingRouter.post("/", authenticateToken, verifyCsrf, bookingController.createOne);

/**
 * PUT /bookings/{id}
 * @tags Booking
 * @summary Updates a booking (admin only)
 * @param {string} id.path.required - The ID of the booking
 * @param {UpdateBookingInput} request.body.required - Updated booking data
 * @return {Booking} 200 - Successful response with booking updated
 * @return {object} 400 - Validation errors
 * @return {object} 403 - Unauthorized
 * @return {object} 404 - No booking found
 * @return {object} 500 - Internal server error
 */
bookingRouter.put("/:id", authenticateToken, authorizeAdmin, bookingController.updateOneById);

/**
 * PATCH /bookings/:id/user
 * @tags Booking
 * @summary Allows a user to update visit_date or nb_people only (authenticated users)
 * @param {string} id.path.required - The ID of the booking
 * @param {UpdateBookingByUserInput} request.body.required - Fields allowed for update
 * @return {Booking} 200 - Successful response with booking updated
 * @return {object} 400 - Validation errors
 * @return {object} 403 - Unauthorized
 * @return {object} 404 - No booking found
 * @return {object} 500 - Internal server error
 */
bookingRouter.patch("/:id/user", authenticateToken, verifyCsrf, bookingController.updateBookingForUser);

/**
 * PATCH /bookings/:id/cancel
 * @tags Booking
 * @summary Cancels a booking (set status = false) (authenticated users)
 * @param {string} id.path.required - The ID of the booking
 * @return {Booking} 200 - Successful response with booking updated
 * @return {object} 400 - Validation errors
 * @return {object} 403 - Unauthorized
 * @return {object} 404 - No booking found
 * @return {object} 500 - Internal server error
 */
bookingRouter.patch("/:id/cancel", authenticateToken, verifyCsrf, bookingController.cancelBooking);

/**
 * DELETE /bookings/{id}
 * @tags Booking
 * @summary Deletes a booking (admin only)
 * @param {string} id.path.required - The ID of the booking
 * @return {object} 204 - Successful response with booking deleted
 * @return {object} 403 - Unauthorized
 * @return {object} 404 - No bookings found
 * @return {object} 500 - Internal server error
 */
bookingRouter.delete("/:id", authenticateToken, authorizeAdmin, bookingController.deleteOneById);




