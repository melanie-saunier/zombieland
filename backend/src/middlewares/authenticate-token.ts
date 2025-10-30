import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../@types";

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  // on récupère le token dans le cookie
  const token = req.cookies.token;
  if (!token) return res.status(401).json({error: "Access denied"});
  
  // on vérifie que l'on a bien un secret JWT, sinon on renvoie une erreur
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    // On décode notre JWT 
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    // On vérifie que les champs existent: decoded est un objet qui contient sub et role
    if (typeof decoded === "object" && decoded.sub && decoded.role) {
      // Si oui, on l'ajoute au req.user et on passe à la suite
      req.user = { id: Number(decoded.sub), role: String(decoded.role) };
      next();
    } else {
      // Si non, on envoie un message d'erreur
      return res.status(403).json({ error: "Invalid token payload" });
    }
  } catch {
    // Si token corrompu on envoie un message d'erreur
    res.status(403).json({ error: "Invalid token" });
  }
}
