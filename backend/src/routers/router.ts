import { Router } from "express";
import { categoryRouter } from "./category-router";
import { activityRouter } from "./activity-router";
import { userRouter } from "./user-router";
import { authRouter } from "./auth-router";
import { authenticateToken } from "../middlewares/authenticate-token";
import { authorizeAdmin } from "../middlewares/authorize-admin";

// Création du router de Express
export const router = Router();

// Test de la route / pour savoir si le serveur fonctionne bien
router.get("/", (req, res) => {
  res.send("ok");
});

// Router des activities
router.use("/activities", activityRouter);

// Router des categories
router.use("/categories", categoryRouter);

// Router des users
router.use("/users", authenticateToken, authorizeAdmin, userRouter);

//Router auth
router.use("/auth", authRouter);

