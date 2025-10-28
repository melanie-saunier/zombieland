import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function fetchAllCategories() {
  try {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data;
  } catch (err) {
    console.error("Erreur lors de la récupération des catégories:", err);
    throw err;
  }
}