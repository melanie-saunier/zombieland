// src/api/activities.ts

import IActivity from "@/@types/activity";
import axios, { AxiosError } from "axios";
import { notFound } from "next/navigation";

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

// j'ai typé la fonction Promis IActivity pour avoir l'autocomplétion lors de l'utilisation du résultat
export async function fetchOneActivityById(id: number): Promise<IActivity>{
  try {
    const res = await axios.get(`${API_URL}/activities/${id}`);
    return res.data;
  } catch (error) {
    // si c'est une erreur axios avec un status 404 on redirige vers la page notFound
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      if(error.response?.status === 404) {
        notFound();
      } 
    }
    throw new Error("Problème pour récupérer l'activité demandée");
  }
}

// fonction pour récuperer les activités les plus effrayante
export default async function fetchMostScaryActivities() {
  try {
    const res = await axios.get(`${API_URL}/activities/most-scary`);
    return res.data;
  } catch (err) {
    console.error("Erreur lors de la récupération des activitées:", err);
    throw err;
  }
}