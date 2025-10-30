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
 * @return {Booking} 200 - Successful response with booking updated
 * @return {object} 404 - No bookings found
 * @return {object} 500 - Internal server error
 */
bookingRouter.put("/:id", bookingController.updateOneById);

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




