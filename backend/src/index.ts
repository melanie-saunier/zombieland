// Importation des modules nécessaires
import "dotenv/config";
import express from "express";
import { router } from "./routers/router";
import corsParser from "./middlewares/cors-middleware";
import { notFound, errorHandler } from "./middlewares/errors-middleware";

// Création d'une app Express
const app = express();

// Appel au middleware de CORS, afin que la politique des CORS soit vérifiée avant de passe rà la suite
app.use(corsParser);

// Ajout du bordy parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Brancher le router
app.use(router);

// Middlewares de gestion d'erreurs
app.use(notFound);
app.use(errorHandler);

// Définition des variables pour connecter le serveur
const port = process.env.PORT || 3001;
const base_url = process.env.BASE_URL || "localhost";

// Démarrage du serveur
app.listen(port, () => console.log(`Listening on http://${base_url}:${port}`));