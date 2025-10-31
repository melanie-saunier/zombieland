import sanitizeHtml from "sanitize-html";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware Express pour assainir les données du corps de la requête.
 * 
 * Objectif :
 * Empêcher les injections HTML ou JavaScript (XSS) dans les données envoyées
 * par le client avant qu'elles ne soient traitées ou stockées en base.
 *
 * Fonctionnement :
 * - Parcourt toutes les clés présentes dans `req.body`
 * - Si la valeur associée est une chaîne de caractères (`string`)
 *   => on la nettoie avec `sanitize-html`
 * - Les autres types (nombre, booléen, objet, etc.) ne sont pas modifiés
 *
 * À savoir :
 * - `sanitize-html` supprime les balises dangereuses (ex: <script>, <img onerror=...>, etc.)
 * - Tu peux configurer ce qui est autorisé (balises, attributs, etc.) via les options du module.
 */

export const bodySanitizerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Vérifie qu’il y a bien un body à traiter
  if (req.body && typeof req.body === "object") {
    
    // Parcourt chaque clé du body
    Object.keys(req.body).forEach(key => {
      const value = req.body[key];

      // Si la valeur est une chaîne de caractères, on la nettoie
      if (typeof value === "string") {
        req.body[key] = sanitizeHtml(value.trim()); // .trim() pour enlever les espaces inutiles
      }
    });
  }

  // Passe au middleware suivant
  next();
};