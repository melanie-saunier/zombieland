import rateLimit from "express-rate-limit";

/**
 * Middleware pour limiter les tentatives de connexion.
 * - max 5 tentatives par IP toutes les 15 minutes
 * - renvoie un message clair si limite atteinte
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // nombre maximum de tentatives par IP
  message: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
  standardHeaders: true, // retourne les headers RateLimit dans la réponse
  legacyHeaders: false,   // désactive les anciens headers X-RateLimit
});

export default loginLimiter;
