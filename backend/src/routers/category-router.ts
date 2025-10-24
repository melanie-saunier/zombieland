import { Router } from "express";
import { categoryController } from "../controllers/categories-controller";

export const categoryRouter = Router();


/**
 * @typedef {object} Category
 * @property {string} id - category's id
 * @property {string} name - category's name
 * @property {string} color - category's color
 * @property {string} created_at - category's creation TS
 * @property {string} updated_at - category's last update TS
*/


/**
 * GET /categories
 * @tags Category
 * @summary Retourne toutes les catégories avec leurs activités
 * @return {Category[]} 200 - Success response
 */
categoryRouter.get("/", categoryController.getAll);

/**
 * GET /category/:id
 * @tags Category
 * @summary Retourne une catégorie par son id, avec ses activités
 * @return {Category} 200 - Success response
 */
categoryRouter.get("/:id", categoryController.getById);