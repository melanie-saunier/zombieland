// src/api/auth.ts

import axios from "axios";
import type { IUser, ILoginInput, IRegisterInput, IUpdateMeInput, IUpdatePasswordInput } from "@/@types/user";

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
    // si c'est une erreur axios avec un status 401 on return null car cela signifie qu'on est pas connecté
      if (axios.isAxiosError(err)) {
        
        if(err.response?.status === 401) {
          return null;
        } 
      }
      console.error("Erreur lors de la récupération du user :", err);

      return null;
    }
  },

  /**
   * Login
   * @param data LoginInput
   */
  login: async (data: ILoginInput, csrfToken: string): Promise<IUser | null> => {
    try {
      // console.log(csrfToken);
      const res = await axios.post(`${API_URL}/auth/login`, data, { 
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
          "Content-Type": "application/json"
        }
      });
      
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
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Erreur de connexion";
        throw new Error(message); // on remonte l'erreur pour le handle
      }
      throw new Error("Erreur inconnue");

      
    }
  },

  /**
   * Register
   * @param data RegisterInput
   */
  register: async (data: IRegisterInput, csrfToken: string): Promise<IUser | null> => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, data, { 
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
          "Content-Type": "application/json"
        }
      });
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
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Erreur lors de la mise à jour du mot de passe";
        throw new Error(message); // on remonte l'erreur pour le handle
      }
      throw new Error("Erreur inconnue");
      // console.error("Erreur lors de l'inscription :", err);
      // return null;
    }
  },

  /**
   * Logout
   * Supprime le cookie côté serveur
   */
  logout: async (csrfToken: string): Promise<void> => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { 
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
          "Content-Type": "application/json"
        }
      });
    } catch (err) {
      console.error("Erreur lors du logout :", err);
    }
  },
  updateMe: async (data: IUpdateMeInput, csrfToken: string): Promise<IUser | null> => {
    try {
      const res = await axios.put(`${API_URL}/auth/me`, data, { 
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
          "Content-Type": "application/json"
        }
      });
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
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Erreur lors de la mise à jour du mot de passe";
        throw new Error(message); // on remonte l'erreur pour le handle
      }
      throw new Error("Erreur inconnue");
    }
  },
  updatePassword: async (data: IUpdatePasswordInput, csrfToken: string): Promise<IUser | null> => {
    try {
      const res = await axios.patch(`${API_URL}/auth/me/password`, data, { 
        withCredentials: true,
        headers: {
          "x-csrf-token": csrfToken,
          "Content-Type": "application/json"
        }
      });
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
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Erreur lors de la mise à jour du profil";
        throw new Error(message); // on remonte l'erreur pour le handle
      }
      throw new Error("Erreur inconnue");
    }
  },
};
