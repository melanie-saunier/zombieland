import { Router } from "express";
import { bookingController } from "../controllers/bookings-controller";


export const bookingRouter = Router();

/**
 * @typedef {object} Booking
 * @property {number} id - booking unique id (UUID)
 * @property {string} visit_date - booking date
 * @property {number} nb_people - booking volume
 * @property {boolean} status - booking status
 * @property {string} user_id - user who has made the reservation
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
 * GET /booking/:id
 * @tags Booking
 * @summary Returns a booking by its id
 * @param {string} id.path.required - The ID of the booking
 * @return {Booking} 200 - Successful response with the booking object
 * @return {object} 404 - No category found
 * @return {object} 500 - Internal server error
 */
bookingRouter.get("/:id", bookingController.getById);