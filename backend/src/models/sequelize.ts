// Import des variables d'environnement
import "dotenv/config";

import { Sequelize } from "sequelize";

// Si pas de variables d'environnement, alors on créé une nouvelle erreur
if (!process.env.PG_URL) {
  throw new Error("Environnement variable missing: PG_URL");
}

// Création d'une nouvelle instance Sequelize avec des paramètres
export const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  logging: console.log,
  define: {
    underscored: true, // Utiliser le format snake_case pour les noms de colonnes
    createdAt: "created_at", // Nom de la colonne pour la date de création
    updatedAt: "updated_at", // Nom de la colonne pour la date de mise à jour 
  }
});