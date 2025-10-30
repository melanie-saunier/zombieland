import { Router } from "express";
import { authController } from "../controllers/auth-controller";

export const authRouter = Router();

// route register: pour créer un compte utilisateur
authRouter.post("/register", authController.register);
// route login pour se connecter
authRouter.post("/login", authController.login);