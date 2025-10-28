import IActivity from "@/@types/activity";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// recupérer la liste de toutes les activités de l'API
export async function fetchAllActivities() {
  try {
    const res = await axios.get(`${API_URL}/activities`);
    return res.data;
  } catch (err) {
    console.error("Erreur lors de la récupération des activitées:", err);
    throw err;
  }
};

export async function fetchOneActivityById(id: number): Promise<IActivity>{
  try {
    const res = await axios.get(`${API_URL}/activities/${id}`);
    return res.data;
  } catch (err) {
    console.error("Erreur lors de la récupération de l'activités:", err);
    throw err;
  }
}

