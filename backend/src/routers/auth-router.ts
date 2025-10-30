import { Router } from "express";
import { authController } from "../controllers/auth-controller";
import { authenticateToken } from "../middlewares/authenticate-token";

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
 * @typedef {object} AuthRegisterResponse
 * @property {number} id - User's unique id
 * @property {string} email - User's email
 * @property {string} firstname - User's firstname
 * @property {string} lastname - User's lastname
 * @property {number} role_id - User's role id
 * @property {Date} updated_at - TS of the last update (same as created_at at creation)
 * @property {Date} created_at - TS when the user account was created
 */

/**
 * @typedef {object} AuthLoginResponse
 * @property {number} id - User's unique id
 * @property {string} email - User's email
 * @property {string} firstname - User's firstname
 * @property {string} lastname - User's lastname
 * @property {number} role_id - User's role id
 * @property {Date} updated_at - TS of the last update (same as created_at at creation)
 * @property {Date} created_at - TS when the user account was created
 * @property {RoleName} role - User's role name
 */

/**
 * POST /auth/register
 * @tags Auth
 * @summary Register a new user
 * @param {RegisterInput} request.body.required - User data to register
 * @return {AuthRegisterResponse} 201 - User successfully registered
 * @return {object} 400 - Invalid input data or email already used
 * @return {object} 404 - Default role "member" not found
 * @return {object} 500 - Internal server error
 */
authRouter.post("/register", authController.register);

/**
 * POST /auth/login
 * @tags Auth
 * @summary Log in a user
 * @param {LoginInput} request.body.required - User login credentials
 * @return {AuthLoginResponse} 200 - Successful login, user data returned (without password)
 * @return {object} 400 - Invalid credentials or malformed input
 * @return {object} 404 - User not found
 * @return {object} 500 - Internal server error
 */
authRouter.post("/login", authController.login);

// route /me qui doit décodé le token si ok elle renvoie les infos user
//on ajouter authenticateToken pour vérifier le cookie et le token qu'il contient et on ajoute les infos du token au req.user dans le but de s'en servir pour récuperer les infos et les transmettre au front
authRouter.get("/me", authenticateToken, authController.getCurrentUser);

// Route /me/ en put pour qu'un utilisateur puisse modifier ses infos (pas son mot de passe)
authRouter.put("/me", authenticateToken, authController.updateMe);

//route /me/password pour d'une utilisateur puisse modifier son mot de passe
authRouter.patch("/me/password", authenticateToken, authController.updatePassword);

//Route logout on supprime le cookie
//c'est une route POST car on détruit quelque chose: on a un effet de bord (sur les routes get pas d'effet de bord)
authRouter.post("/logout", authenticateToken, authController.logout);