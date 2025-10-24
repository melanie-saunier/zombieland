import { Router } from "express";
import { categoryController } from "../controllers/categories-controller";

export const categoryRouter = Router();

/**
 * @typedef {object} Activity
 * @property {string} id - activity's unique id (UUID)
 * @property {string} name - activity's name
 * @property {string} description - activity's description
 * @property {number} duration - activity's duration (in min)
 * @property {number} min_height - minimum required height for the activity (in m)
 * @property {boolean} pregnancy_warning - true if there is a pregnancy warning
 * @property {string} image_ref - activity's image reference
 * @property {string} level_id - foreign key referencing the level
 * @property {string} category_id - foreign key referencing the category
 * @property {string} created_at - activity's creation TS
 * @property {string} updated_at - activity's last update TS

*/

/**
 * @typedef {object} Category
 * @property {string} id - category's unique id (UUID)
 * @property {string} name - category's name
 * @property {string} color - category's color in HEX
 * @property {string} created_at - category's creation TS
 * @property {string} updated_at - category's last update TS
 * @property {Activity[]} activities - list of activities associated with this category
*/


/**
 * GET /categories
 * @tags Category
 * @summary Returns all categories with their associated activities
 * @return {Category[]} 200 - Successful response with list of categories
 */
categoryRouter.get("/", categoryController.getAll);

/**
 * GET /category/:id
 * @tags Category
 * @summary Returns a category by its id, including its activities
 * @param {string} id.path.required - The ID of the category
 * @return {Category} 200 - Successful response with the category object
 */
categoryRouter.get("/:id", categoryController.getById);