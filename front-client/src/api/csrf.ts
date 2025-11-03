import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const csrfApi = {
  getCsrfToken: async(): Promise<string | null> => {
    try {
      const res = await axios.get(`${API_URL}/csrf-token`);
      const token = res.data;
      return token;

    } catch (err) {
      // si c'est une erreur axios avec un status 401 on return null car cela signifie qu'on est pas connecté
      if (axios.isAxiosError(err)) {
        
        if(err.response?.status === 401) {
          return null;
        } 
      }
      console.error("Erreur lors de la récupération du token csrf", err);

      return null;
    }
  }
};