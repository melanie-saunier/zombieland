import { NextFunction, Response } from "express";
import { RequestWithCookies } from "../@types";
import { csrfToken } from "../routers/router";

export function verifyCsrf(req : RequestWithCookies, res: Response, next: NextFunction) {
  // On récupère le secret dans le cookie 
  const secret = req.cookies["csrf-secret"];
  // On recupère le token dans les headers de la requete
  const token = req.headers["x-csrf-token"] || req.body?._csrf;

  // Si pas de secret, on renvoie une erreur
  if (!secret) {
    return res.status(403).json({ error: "Missing CSRF secret" });
  }

  // Si pas de token, on renvoie une erreur
  if (!token) {
    return res.status(403).json({ error: "Missing CSRF token " });
  }
  
  // On valide le token avec verify
  const valid = csrfToken.verify(secret, token);
  if (!valid) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  // Si ok on passe au midleware suivant
  next();
}