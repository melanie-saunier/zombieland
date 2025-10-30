// middleware pour autorisé certaines route que pour les admins(notament les routes du middleware user)
// ATTENTION: toujours mettre ce middleware APRES le middelware authenticate sinon req.user n'existe pas
import { NextFunction, Response } from "express";
import { AuthRequest } from "../@types";

export function authorizeAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  // on vérifie que la requete possède bien un user (req.user a été ajouté dans le middelware authenticate, donc si req.user existe c'est que le cookie/token existe)
  if(!req.user) return res.status(401).json({error: "Unauthorized"});
  // on vérifier que l'utilisateur est admin
  if(req.user.role !== "admin" && req.user.role !== "superadmin") return res.status(403).json({ error: "Forbidden: Admins only" });

  //l'utilisateur est admin ou super admin on peut passer au suivant
  next();
}