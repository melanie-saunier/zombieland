import { IApiPrice, IPrice } from "@/@types/price";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const pricesApi = {
  getPrices: async (): Promise<IPrice[] | null> => {
    // fetch pour récupérer tous les prix
    try {
      const res = await axios.get<IApiPrice[]>(`${API_URL}/prices`);
      const pricesData = res.data;
      if (!pricesData) return null;
      // on renvoie uniquement ce dont on a besoin
      const prices = pricesData.map((price) => ({
        id: price.id,
        label: price.label,
        value: price.value,
      }));
  
      return prices;
  
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // si les erreurs sont dans un tableau on fait un join pour les afficher
        const message =
          err.response?.data?.message ||
          (Array.isArray(err.response?.data?.errors)
            ? err.response.data.errors.join(", ")
            : "Erreur lors de la création de la réservation");
        throw new Error(message);
      }
      throw new Error("Erreur inconnue");
    }
  },
};