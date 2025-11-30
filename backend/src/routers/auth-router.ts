import { Router } from "express";
import { authController } from "../controllers/auth-controller";
import { authenticateToken } from "../middlewares/authenticate-token";
import { verifyCsrf } from "../middlewares/verify-csrf";

export const authRouter = Router();

/**
 * @typedef {object} RegisterInput
 * @property {string} firstname - User's firstname
 * @property {string} lastname - User's lastname
 * @property {string} email - User's email
 * @property {string} password - User's password (plain text, not hashed)
 * @property {string} confirmedPassword - Confirmation of the password
 */

/**
 * @typedef {object} LoginInput
 * @property {string} email - User's email
 * @property {string} password - User's password
 */

/**
 * @typedef {object} UpdateMeInput
 * @property {string} firstname - User's firstname
 * @property {string} lastname - User's lastname
 * @property {string} email - User's email
 */

/**
 * @typedef {object} AuthResponse
 * @property {number} id - User's unique id
 * @property {string} email - User's email
 * @property {string} firstname - User's firstname
 * @property {string} lastname - User's lastname
 * @property {number} role_id - User's role id
 * @property {string} updated_at - TS of last update
 * @property {string} created_at - TS when user account was created
 * @property {RoleName} [role] - User's role name (optional)
 */

/**
 * POST /auth/register
 * @tags Auth
 * @summary Register a new user
 * @param {RegisterInput} request.body.required - User data to register
 * @return {AuthResponse} 201 - User successfully registered
 * @return {object} 400 - Invalid input data or email already used
 * @return {object} 404 - Validation error or email already used
 * @return {object} 500 - Internal server error
 */
authRouter.post("/register", verifyCsrf, authController.register);

/**
 * POST /auth/login
 * @tags Auth
 * @summary Log in a user
 * @param {LoginInput} request.body.required - User login credentials
 * @return {AuthResponse} 200 - Successful login, user data returned (without password)
 * @return {object} 400 - Validation error or bad credentials
 * @return {object} 404 - User not found
 * @return {object} 500 - Internal server error
 */
authRouter.post("/login", verifyCsrf, authController.login);

/**
 * GET /auth/me
 * @tags Auth
 * @summary Get current logged-in user
 * @return {AuthResponse} 200 - Current user info
 * @return {object} 401 - Access denied (not logged in)
 * @return {object} 404 - User not found
 */
// on ajoute authenticateToken pour vérifier le cookie et le token qu'il contient et on ajoute les infos du token au req.user dans le but de s'en servir pour récuperer les infos et les transmettre au front
authRouter.get("/me", authenticateToken, authController.getCurrentUser);

/**
 * PUT /auth/me
 * @tags Auth
 * @summary Update current user's info (except password)
 * @param {UpdateMeInput} request.body.required - Data to update
 * @return {AuthResponse} 200 - Updated user info
 * @return {object} 400 - Validation error or email already used
 * @return {object} 401 - Access denied (not logged in)
 * @return {object} 404 - User not found
 */
authRouter.put("/me", authenticateToken, verifyCsrf, authController.updateMe);

/**
 * PATCH /auth/me/password
 * @tags Auth
 * @summary Update current user's password
 * @param {UserPasswordUpdate} request.body.required - Old and new passwords
 * @return {object} 200 - Password successfully updated
 * @return {object} 400 - Validation error or bad credentials
 * @return {object} 401 - Access denied (not logged in)
 * @return {object} 404 - User not found
 */
authRouter.patch("/me/password", authenticateToken, verifyCsrf, authController.updatePassword);

/**
 * POST /auth/logout
 * @tags Auth
 * @summary Logout current user (delete cookie)
 * @return {object} 200 - Logout successful
 */
// c'est une route POST car on détruit quelque chose: on a un effet de bord (sur les routes get pas d'effet de bord)
authRouter.post("/logout", authenticateToken, verifyCsrf, authController.logout);