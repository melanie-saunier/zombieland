import { Request } from "express";

// on etend request pour ajouter un user si besoin
export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}