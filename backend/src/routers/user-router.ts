import { Router } from "express";
import { userController } from "../controllers/user-controller";
import { authenticateToken } from "../middlewares/authenticate-token";
import { authorizeAdmin } from "../middlewares/authorize-admin";

export const userRouter = Router();

/**
 * @typedef {object} RoleName
 * @property {string} name - Role name (ex: "admin", "user")
 */

/**
 * @typedef {object} User
 * @property {number} id - user's unique id
 * @property {string} email - user's email
 * @property {string} firstname - user's firstname
 * @property {string} lastname - user's lastname
 * @property {number} role_id - user's role id
 * @property {string} created_at - level's creation TS
 * @property {string} updated_at - level's last update TS
 * @property {RoleName} role - User's role name
*/

/**
 * @typedef {object} UserInput
 * @property {string} email - user's email
 * @property {string} firstname - user's firstname
 * @property {string} lastname - user's lastname
 * @property {string} password - user's password (not hashed)
 * @property {string} confirmedPassword - user's confirmed password
 * @property {number} role_id - user's role id
 */

/**
 * @typedef {object} UserUpdate
 * @property {string} email - user's email
 * @property {string} firstname - user's firstname
 * @property {string} lastname - user's lastname
 * @property {number} role_id - user's role id
 */

/**
 * @typedef {object} UserPasswordUpdate
 * @property {string} oldPassword - current password
 * @property {string} newPassword - new password
 * @property {string} confirmedPassword - confirmation of the new password
 */

/**
 * GET /users
 * @tags User
 * @summary Returns all users with their associated role names
 * @return {User[]} 200 - Successful response with list of users
 * @return {object} 404 - No users found
 * @return {object} 500 - Internal server error
 */
userRouter.get("/", authenticateToken, authorizeAdmin, userController.getAll);

/**
 * GET /users/{id}
 * @tags User
 * @summary Returns a user by its id, including its role name
 * @param {integer} id.path.required - The ID of the user
 * @return {User} 200 - Successful response with the user object
 * @return {object} 404 - No user found
 * @return {object} 500 - Internal server error
 */
userRouter.get("/:id", authenticateToken, authorizeAdmin, userController.getById);

/**
 * POST /users
 * @tags User
 * @summary Create a user
 * @param {UserInput} request.body.required - User data to create
 * @return {User} 201 - Successful response with the created user object
 * @return {object} 400 - Bad input
 * @return {object} 500 - Internal server error
 */
userRouter.post("/", authenticateToken, authorizeAdmin, userController.createUser);

/**
 * PUT /users/{id}
 * @tags User
 * @summary Update an existing user (excluding password updates)
 * @param {integer} id.path.required - The ID of the user
 * @param {UserUpdate} request.body.required - User data to update
 * @return {User} 200 - Successful response with the updated user object
 * @return {object} 400 - Bad input
 * @return {object} 500 - Internal server error
 */
userRouter.put("/:id", authenticateToken, authorizeAdmin, userController.updateUser);

/**
 * DELETE /users/{id}
 * @tags User
 * @summary Delete a user
 * @param {integer} id.path.required - The ID of the user
 * @return {object} 200 - Successful response
 * @return {object} 400 - Bad input
 * @return {object} 500 - Internal server error
 */
userRouter.delete("/:id", authenticateToken, authorizeAdmin, userController.deleteUser);

/**
 * PATCH /users/{id}
 * @tags User
 * @summary Update a user's password
 * @param {integer} id.path.required - The ID of the user
 * @param {UserPasswordUpdate} request.body.required - New password data
 * @return {User} 200 - Successful response with the updated user object
 * @return {object} 400 - Bad input
 * @return {object} 500 - Internal server error
 */
userRouter.patch("/:id", authenticateToken, authorizeAdmin, userController.updatePassword);