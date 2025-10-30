// src/api/auth.ts

import axios from "axios";
import type { IUser, ILoginInput, IRegisterInput } from "@/@types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = {
  /**
   * Récupère l'utilisateur connecté via le cookie HTTPOnly
   */
  getCurrentUser: async (): Promise<IUser | null> => {
    try {
      const res = await axios.get("/auth/me");
      return res.data;
    } catch (err) {
      console.error("Erreur lors de la récupération du user :", err);
      return null;
    }
  },

  /**
   * Login
   * @param data LoginInput
   */
  login: async (data: ILoginInput): Promise<IUser | null> => {
    try {
      const res = await axios.post("/auth/login", data);
      return res.data;
    } catch (err) {
      console.error("Erreur lors du login :", err);
      return null;
    }
  },

  /**
   * Register
   * @param data RegisterInput
   */
  register: async (data: IRegisterInput): Promise<IUser | null> => {
    try {
      const res = await axios.post("/auth/register", data);
      return res.data;
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      return null;
    }
  },

  /**
   * Logout
   * Supprime le cookie côté serveur
   */
  logout: async (): Promise<void> => {
    try {
      await axios.post("/auth/logout"); // à créer côté back si nécessaire
    } catch (err) {
      console.error("Erreur lors du logout :", err);
    }
  },
};
