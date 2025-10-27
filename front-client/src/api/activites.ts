import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// recupérer la liste de toutes les activités de l'API
export async function fetchAllActivities() {
  try {
    const res = await axios.get(`${API_URL}/activities`);
    return res.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des activitées");
    // TODO: gérer l'affichage de l'erreur
    return;
  }
};