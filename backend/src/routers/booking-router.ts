import { Router } from "express";
import { bookingController } from "../controllers/bookings-controller";


export const bookingRouter = Router();

/**
 * @typedef {object} Booking
 * @property {number} id - booking unique id 
 * @property {string} visit_date - visit date
 * @property {number} nb_people - number of people in the booking
 * @property {boolean} status - booking status
 * @property {string} user_id - user who has made the booking
 * @property {string} created_at - booking creation TS
 * @property {string} updated_at - booking latest update TS
*/

/**
 * @typedef {object} CreateBookingInput
 * @property {string} visit_date.required - Visit date (ISO format)
 * @property {number} nb_people.required - Number of people in the booking
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
 * @summary Returns all bookings
 * @return {Booking[]} 200 - Successful response with list of bookings
 * @return {object} 404 - No bookings found
 * @return {object} 500 - Internal server error
 */
bookingRouter.get("/", bookingController.getAll);

/**
 * GET /booking/user/{id}
 * @tags Booking
 * @summary Returns bookings by user_id
 * @param {string} id.path.required - The ID of the user
 * @return {Booking[]} 200 - Successful response with the User object
 * @return {object} 404 - No booking found
 * @return {object} 500 - Internal server error
 */
bookingRouter.get("/user/:id", bookingController.getAllBookingsForUser);

/**
 * GET /booking/{id}
 * @tags Booking
 * @summary Returns a booking by its id
 * @param {string} id.path.required - The ID of the booking
 * @return {Booking} 200 - Successful response with the booking object
 * @return {object} 404 - No booking found
 * @return {object} 500 - Internal server error
 */
bookingRouter.get("/:id", bookingController.getById);

/**
 * POST /booking
 * @tags Booking
 * @summary Creates a booking
 * @param {CreateBookingInput} request.body.required - Booking data
 * @return {Booking} 201 - Successful response with booking created
 * @return {object} 404 - No bookings found
 * @return {object} 500 - Internal server error
 */
bookingRouter.post("/", bookingController.createOne);

/**
 * PUT /booking/{id}
 * @tags Booking
 * @summary Updates a booking
 * @param {string} id.path.required - The ID of the booking
 * @param {UpdateBookingInput} request.body.required - Updated booking data
 * @return {Booking} 200 - Successful response with booking updated
 * @return {object} 404 - No bookings found
 * @return {object} 500 - Internal server error
 */
bookingRouter.put("/:id", bookingController.updateOneById);

/**
 * PATCH /booking/:id/user
 * @tags Booking
 * @summary Allows a user to update visit_date or nb_people only
 * @param {string} id.path.required - The ID of the booking
 * @param {UpdateBookingByUserInput} request.body.required - Fields allowed for update
 * @return {Booking} 200 - Successful response with booking updated
 * @return {object} 404 - No booking found
 * @return {object} 400 - Invalid fields
 * @return {object} 500 - Internal server error
 */
bookingRouter.patch("/:id/user", bookingController.updateBookingForUser);

/**
 * PATCH /booking/:id/cancel
 * @tags Booking
 * @summary Cancels a booking (set status = false)
 * @param {string} id.path.required - The ID of the booking
 * @return {Booking} 200 - Successful response with booking updated
 * @return {object} 404 - No booking found
 * @return {object} 500 - Internal server error
 */
bookingRouter.patch("/:id/cancel", bookingController.cancelBooking);

/**
 * DELETE /booking/{id}
 * @tags Booking
 * @summary Deletes a booking
 * @param {string} id.path.required - The ID of the booking
 * @return {object} 204 - Successful response with booking deleted
 * @return {object} 404 - No bookings found
 * @return {object} 500 - Internal server error
 */
bookingRouter.delete("/:id", bookingController.deleteOneById);




