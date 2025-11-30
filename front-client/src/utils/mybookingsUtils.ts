

// Fonction pour formater la date
export function formatDate (dateString: string) {
  const updatedDate = new Date(dateString).toLocaleDateString("fr-FR", { // On formate la date en français
    day: "numeric", // On affiche le jour
    month: "long", // On affiche le mois
    year: "numeric", // On affiche l'année
  });
  return updatedDate;
}
