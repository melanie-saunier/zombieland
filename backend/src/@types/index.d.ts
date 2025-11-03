import { Request } from "express";

// on etend request pour ajouter un user si besoin
export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}
//on étend request pour ajouter un cookie
export interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
}