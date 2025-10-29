import { Router } from "express";
import { categoryController } from "../controllers/categories-controller";

export const categoryRouter = Router();

/**
 * @typedef {object} Category
 * @property {number} id - category's unique id
 * @property {string} name - category's name
 * @property {string} color - category's color in HEX
 * @property {string} created_at - category's creation TS
 * @property {string} updated_at - category's last update TS
*/

/**
 * GET /categories
 * @tags Category
 * @summary Returns all categories
 * @return {Category[]} 200 - Successful response with list of categories
 * @return {object} 404 - No categories found
 * @return {object} 500 - Internal server error
 */
categoryRouter.get("/", categoryController.getAll);

/**
 * GET /category/:id
 * @tags Category
 * @summary Returns a category by its id
 * @param {number} id.path.required - The ID of the category
 * @return {Category} 200 - Successful response with the category object
 * @return {object} 404 - No category found
 * @return {object} 500 - Internal server error
 */
categoryRouter.get("/:id", categoryController.getById);