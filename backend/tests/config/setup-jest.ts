// Import des modules nécessaires
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { sequelize } from "../../src/models/association.js";

// Ces deux lignes remplacent __dirname en ESM :
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger le .env.test (utile pour utiliser une base de données de test séparée)
dotenv.config({ path: path.resolve(__dirname, "../../.env.test") });

// Préparation avant tous les tests
beforeAll(async () => {
  await sequelize.authenticate();
});

// Nettoyage après tous les tests
afterAll(async () => {
  // Fermeture propre de la connexion Sequelize
  await sequelize.close();
  // Forcer Jest à attendre la fin des timers ouverts (évite les handles ouverts)
  await new Promise((resolve) => setTimeout(resolve, 500));
});
