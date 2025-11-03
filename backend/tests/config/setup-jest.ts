import { sequelize } from "../../src/models/association";

// Préparation avant tous les tests
beforeAll(async () => {
  console.log("Connected to DB:", sequelize.getDatabaseName());
  await sequelize.authenticate();
});

// Nettoyage après tous les tests
afterAll(async () => {
  // Fermeture propre de la connexion Sequelize
  await sequelize.close();
  // Forcer Jest à attendre la fin des timers ouverts (évite les handles ouverts)
  await new Promise((resolve) => setTimeout(resolve, 500));
});
