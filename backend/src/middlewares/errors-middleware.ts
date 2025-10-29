import { NextFunction, Request, Response } from "express";

// Création d'une interface qui étend la classe Erreur pour ajouter un statut à l'erreur
interface AppError extends Error {
  statusCode?: number;
}

// Fonction pour les erreurs 404
function notFound(_req: Request, res: Response) {
  const err = new Error("Ressource not found");
  res.status(404).json({ error: err.message });
}

// Fonction pour les erreurs 500
function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction) {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ status: statusCode.toString(), error: err.message });
}

export { notFound, errorHandler }