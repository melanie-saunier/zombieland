// On importe le module 'fs' de Node pour pouvoir lire des fichiers
import fs from "fs";
// On importe le module 'path' de Node pour gérer les chemins de fichiers de manière portable
import path from "path";
// On importe l'instance de Sequelize qui gère la connexion à la base de données
import { sequelize } from "../../src/models/association";

// beforeAll est une fonction de Jest qui s'exécute avant tous les tests
// Ici, on l'utilise pour "préparer" la base de données avant de lancer les tests
beforeAll(async () => {
  // On construit le chemin vers le fichier SQL qui contient le seed pour la DB de test
  const seedFile = path.join(__dirname, "../db/seed-db-test.sql");
  // On lit le contenu du fichier SQL en UTF-8
  const seedSQL = fs.readFileSync(seedFile, "utf8");
  // On exécute le script SQL dans la base de données via Sequelize
  // Cela va insérer toutes les données nécessaires pour les tests
  await sequelize.query(seedSQL);
});

// afterAll : s'exécute après tous les tests
// Ici, on ferme proprement la connexion Sequelize pour éviter les warnings Jest
afterAll(async () => {
  // fermeture de la connexion à la base de données
  await sequelize.close(); 
});