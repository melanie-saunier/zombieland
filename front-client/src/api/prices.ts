// src/api/prices.ts

import type { IPrice } from "@/@types/prices";
import axios from "axios";
// import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// recupérer la liste des prix de l'API, filtrer pour récupérer seulement ceux avec le label"tarif unique"
export async function fetchTarifUniquePrices(): Promise<IPrice[]> {
  try {
    const res = await axios.get<IPrice[]>(`${API_URL}/prices`);
    const allPrices = res.data;
    return allPrices;
  } catch (err) {
    console.error("Erreur lors de la récupération des prix:", err);
    throw err;
  }
};