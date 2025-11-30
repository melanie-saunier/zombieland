import { Router } from "express";
import { categoryRouter } from "./category-router";
import { activityRouter } from "./activity-router";
import { bookingRouter } from "./booking-router";
import { priceRouter } from "./price-router"
import { userRouter } from "./user-router";
import { authRouter } from "./auth-router";
import { authenticateToken } from "../middlewares/authenticate-token";
import { authorizeAdmin } from "../middlewares/authorize-admin";
import tokenCsrf from "csrf";

// Création du router de Express
export const router = Router();

// Route GET / pour l'API
router.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API de Zombieland !",
    docs: `${process.env.BASE_URL || "http://localhost:3001"}/api-docs`, // lien vers Swagger
    routes: {
      activities: "/api/activities",
      categories: "/api/categories",
      bookings: "/api/bookings",
      prices: "/api/prices",
      auth: "/api/auth",
      users: "/api/users (admin only)",
    },
  });
});

// Création d'une instance Tokens pour générer/verifier les secrets et tokens
// on l'exporte pour pouvoir vérifier les CSRF tokens avec le secret
export const csrfToken = new tokenCsrf();

router.get("/csrf-token", (req, res) => {
  // On génère un secret
  const secret = csrfToken.secretSync();
  // On génère un token CSRF à partir de ce secret
  const token = csrfToken.create(secret);

  // mettre le secret dans un cookie httpOnly
  res.cookie("csrf-secret", secret, {
    httpOnly: true, // le cookie n'est pas accessible par JS dans le front, cela protège le secret
    secure: true,
    sameSite: "none", // empêche l'envoi du cookie depuis un autre site (mitigation CSRF)
    // secure: process.env.NODE_ENV === "production", // cookie sécurisé seulement en prod
    maxAge: 15 * 60 * 1000, // durée du cookie de 15min
    path: "/", //TODO: ajouter un commentaire pour expliquer ce paramètre
  });

  // On transmet notre token sous forme de json pour le front
  // Il ne peut pas être décodé sans le secret présent dans le cookie
  res.json({ csrfToken: token });
});

// Router des activities
router.use("/activities", activityRouter);

// Router des categories
router.use("/categories", categoryRouter);

// Router des bookings
router.use("/bookings", bookingRouter);

// Router des prices
router.use("/prices", priceRouter);

// Router des users
router.use("/users", authenticateToken, authorizeAdmin, userRouter);

//Router auth
router.use("/auth", authRouter);

