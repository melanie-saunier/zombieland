import { Router } from "express";
import { categoryRouter } from "./category-router";
import { activityRouter } from "./activity-router";
import { bookingRouter } from "./booking-router";

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

// Router des bookings
router.use("/bookings", bookingRouter);
