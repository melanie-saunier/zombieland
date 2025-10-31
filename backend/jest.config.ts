import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  preset: "ts-jest",          // On utilise ts-jest pour gérer TypeScript
  testEnvironment: "node",    // Environnement Node.js pour les tests (pas navigateur)
  testTimeout: 30000,         // Timeout global de 30s pour chaque test (utile si certaines requêtes DB prennent du temps)
  verbose: true,              // Affiche les logs détaillés pour chaque test
  transform: {
    ...tsJestTransformCfg,    // On applique la configuration par défaut de ts-jest pour transformer les fichiers TS en JS
  },
  setupFilesAfterEnv: ["<rootDir>/tests/jest-setup.ts"], // Chemin vers le set-up
};