import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import expressJSDocSwagger, { Options } from "express-jsdoc-swagger";
import { Application } from "express";

/**
 * Initialise et configure la documentation Swagger pour l’API.
 * Cette fonction attache l’interface Swagger UI et la spécification OpenAPI
 * à l'app Express fournie en paramètre.
 */

export function setupSwagger(app: Application) {
  // Configuration de express-jsdoc-swagger
  const options: Options = {
    info: {
      version: "1.0.0",
      title: "Zombieland API",
      description: "API du projet Zombieland 🧟",
    },
    servers: [
      {
        // URL de base de ton API (utilisée dans le bouton « Try it out » de Swagger)
        url: `http://${process.env.BASE_URL}:${process.env.PORT}/api`,
        description: "Serveur local de développement",
      },
    ],
    // Définit le dossier racine à partir duquel express-jsdoc-swagger va analyser les fichiers
    // "../.." remonte de deux niveaux à partir du fichier actuel (pour arriver dans /src)
    baseDir: resolve(dirname(fileURLToPath(import.meta.url)), "../.."),

    // Motif des fichiers à analyser pour extraire les commentaires JSDoc
    // Ici, tous les fichiers TypeScript du projet
    filesPattern: "./**/*.ts",

    // Chemin où sera accessible l’interface Swagger
    swaggerUIPath: "/docs",

    // Permet d’exposer la version brute du JSON OpenAPI
    exposeApiDocs: true,

    // Chemin pour accéder à ce JSON
    apiDocsPath: "/api-docs",
  };

  // Initialise express-jsdoc-swagger avec l'app et la configuration
  expressJSDocSwagger(app)(options);
}
