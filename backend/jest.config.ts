/** @type {import("jest").Config} **/
export default {
  extensionsToTreatAsEsm: [".ts"], // Active le support ESM
  preset: "ts-jest/presets/default-esm", // On utilise ts-jest pour gérer TypeScript
  testEnvironment: "node", // Environnement Node.js pour les tests (pas navigateur)
  testTimeout: 30000, // Timeout global de 30s pour chaque test (utile si certaines requêtes DB prennent du temps)
  verbose: true, // Affiche les logs détaillés pour chaque test
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  transformIgnorePatterns: [
    "node_modules/(?!node-fetch)", // Ignore certains modules ESM (comme node-fetch)
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Optionnel : pour des chemins propres si tu as un tsconfig
  },
  setupFilesAfterEnv: ["<rootDir>/tests/config/setup-jest.ts"], // Chemin vers le set-up
};