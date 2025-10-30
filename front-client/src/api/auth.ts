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
      const res = await axios.get(`${API_URL}/auth/me`, 
        { withCredentials: true } // important pour envoyer le cookie HTTPOnly
      );

      const data = res.data;
      if (!data) return null;

      const user: IUser = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        role: data.role?.name || "member", // on récupère role.name ou "member" par défaut
      };
      return user;

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
      const res = await axios.post(`${API_URL}/auth/login`, data, { withCredentials: true });
      
      const userData = res.data;
      if (!userData) return null;

      const user: IUser = {
        id: userData.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        role: userData.role?.name || "member",
      };
      return user;
      
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
      const res = await axios.post(`${API_URL}/auth/register`, data, { withCredentials: true });
      const userData = res.data;
      if (!userData) return null;

      const user: IUser = {
        id: userData.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        role: userData.role?.name || "member",
      };

      return user;

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
      await axios.post(`${API_URL}/auth/logout`, { withCredentials: true });
    } catch (err) {
      console.error("Erreur lors du logout :", err);
    }
  },
};
