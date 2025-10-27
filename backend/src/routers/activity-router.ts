import { Router } from "express";
import { activityController } from "../controllers/activities-controller";

export const activityRouter = Router();

/**
 * @typedef {object} Level
 * @property {string} id - level's unique id (UUID)
 * @property {string} name - level's name
 * @property {number} value - level's numeric value (1, 2 or 3)
 * @property {string} created_at - level's creation TS
 * @property {string} updated_at - level's last update TS
*/

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
 * @property {Category} category - activity's category
 * @property {Level} level - activity's level

*/

/**
 * GET /activities
 * @tags Activity
 * @summary Returns all activities with their associated categories and levels
 * @return {Activity[]} 200 - Successful response with list of activities
 * @return {object} 404 - No activities found
 * @return {object} 500 - Internal server error
 */
activityRouter.get("/", activityController.getAll);

/**
 * GET /activities/:id
 * @tags Activity
 * @summary Returns an activity by its id, including its category and its level
 * @param {string} id.path.required - The ID of the activity
 * @return {Activity} 200 - Successful response with the activity object
 * @return {object} 404 - No activity found
 * @return {object} 500 - Internal server error
 */
activityRouter.get("/:id", activityController.getById);

/**
 * GET /activities/most-scary
 * @tags Activity
 * @summary Returns the most scary activities (level.value = 3) with their associated categories and levels
 * @param {number} limit.query - Number of activities to return (optional, default is 4)
 * @return {Activity[]} 200 - Successful response with list of activities
 * @return {object} 404 - No activities found
 * @return {object} 500 - Internal server error
 */
activityRouter.get("/most-scary", activityController.getRandomedScaryActivities);