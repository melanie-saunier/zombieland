// Importation des modules nécessaires
import "dotenv/config";
import express from "express";
import { router } from "./routers/router";
import corsParser from "./middlewares/cors-middleware";
import { notFound, errorHandler } from "./middlewares/errors-middleware";
import { setupSwagger } from "./utils/swagger";
import cookieParser from "cookie-parser";
import { bodySanitizerMiddleware } from "./middlewares/body-sanitizer";

// Création d'une app Express
const app = express();

// Swagger est branché sur l'app 
setupSwagger(app);

// Appel au middleware de CORS, afin que la politique des CORS soit vérifiée avant de passer à la suite
app.use(corsParser);

// Ajout du bordy parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ajout du cookie parser
app.use(cookieParser());

// Ajout du body sanitizer
app.use(bodySanitizerMiddleware);

// On branche le routeur principal sur le préfixe /api : 
// toutes les routes définies dans "router" seront accessibles via /api/...
app.use("/api", router);

// Middlewares de gestion d'erreurs
app.use(notFound);
app.use(errorHandler);

// Définition des variables pour connecter le serveur
const port = process.env.PORT || 3001;
const base_url = process.env.BASE_URL || "localhost";

// Démarrage du serveur
app.listen(port, () => console.log(`Listening on http://${base_url}:${port}/api`));