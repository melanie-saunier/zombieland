import { Router } from "express";
import { priceController } from "../controllers/prices-controller";
import { authorizeAdmin } from "../middlewares/authorize-admin";
import { authenticateToken } from "../middlewares/authenticate-token";


export const priceRouter = Router();

/**
 * @typedef {object} Price
 * @property {number} id - price unique id 
 * @property {string} label - price label
 * @property {number} value - price value (float)
 * @property {string} created_at - price creation TS
 * @property {string} updated_at - price latest update TS
*/

/**
 * GET /prices
 * @tags Price
 * @summary Returns all prices
 * @return {Price[]} 200 - Successful response with list of prices
 * @return {object} 404 - No prices found
 * @return {object} 500 - Internal server error
 */ priceRouter.get("/", priceController.getAll);

/**
 * GET  /price/{id}
 * @tags Price
 * @summary Returns a price by its id
 * @param {number} id.path.required - The ID of the price
 * @return {Price} 200 - Successful response with the price object
 * @return {object} 404 - No price found
 * @return {object} 500 - Internal server error
 */ 
priceRouter.get("/:id", priceController.getById);

/**
 * POST  /price
 * @tags Price
 * @summary Creates a new price
 * @return {price} 201 - Successful response with price created
 * @return {object} 400 - Validation errors
 * @return {object} 403 - Unauthorized
 * @return {object} 500 - Internal server error
 */ 
priceRouter.post("/", authenticateToken, authorizeAdmin, priceController.createOne);

/**
 * PUT  /price/{id}
 * @tags Price
 * @summary Updates a price by its id
 * @param {number} id.path.required - The ID of the price
 * @return {price} 200 - Successful response with price updated
 * @return {object} 400 - Validation errors
 * @return {object} 403 - Unauthorized
 * @return {object} 404 - No price found
 * @return {object} 500 - Internal server error
 */ 
priceRouter.put("/:id", authenticateToken, authorizeAdmin, priceController.updateOneById);

/**
 * DELETE  /price/{id}
 * @tags Price
 * @summary Deletes a price by its id
 * @param {string} id.path.required - The ID of the price
 * @return {object} 204 - Successful response with price deleted
 * @return {object} 403 - Unauthorized
 * @return {object} 404 - No price found
 * @return {object} 500 - Internal server error
 */ 
priceRouter.delete("/:id", authenticateToken, authorizeAdmin, priceController.deleteOneById);




