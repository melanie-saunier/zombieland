// Import des variables d'environnement
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import path from "path";

// Détermine l’environnement (test ou dev)
const env = process.env.NODE_ENV || "development";

// Charge le bon fichier .env (.env ou .env.test)
dotenv.config({
  path: path.resolve(`backend/.env${env === "test" ? ".test" : ""}`),
});

// Récupère l’URL de connexion
const dbUrl = process.env.PG_URL;

// Si pas de variables d'environnement, alors on créé une nouvelle erreur
if (!dbUrl) {
  throw new Error("Environnement variable missing: PG_URL");
}

// Création d'une nouvelle instance Sequelize avec des paramètres
export const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: console.log,
  define: {
    underscored: true, // Utiliser le format snake_case pour les noms de colonnes
    createdAt: "created_at", // Nom de la colonne pour la date de création
    updatedAt: "updated_at", // Nom de la colonne pour la date de mise à jour 
  }
});