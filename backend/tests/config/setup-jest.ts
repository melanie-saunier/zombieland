import { sequelize } from "../../src/models/association";
import fs from "fs";
import path from "path";

// Lire le fichier SQL
const sqlFilePath = path.join(__dirname, "../../data/seed-db-test.sql");
const sql = fs.readFileSync(sqlFilePath, "utf-8");

// Préparation avant tous les tests
beforeAll(async () => {
  console.log("Connected to DB:", sequelize.getDatabaseName());
  await sequelize.authenticate();
    // Exécuter le SQL de seed **une seule fois** avant tous les tests
    await sequelize.query(sql);
});

// Nettoyage après tous les tests
afterAll(async () => {
  // Fermeture propre de la connexion Sequelize
  await sequelize.close();
  // Forcer Jest à attendre la fin des timers ouverts (évite les handles ouverts)
  await new Promise((resolve) => setTimeout(resolve, 500));
});
