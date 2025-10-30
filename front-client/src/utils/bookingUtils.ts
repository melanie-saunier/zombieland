// src/utils/date.ts

// Définition de maximum de tickets possibles par réservation
export const MAX_TICKETS_PER_BOOKING = 15;

/**
 * Fonction formatLocalDate
 * Fonction utilitaire pour formater une date au format local français sans problème de fuseau horaire
 * - dateString : string "YYYY-MM-DD"
 * - options : options de formatage (facultatif)
 * Retourne une date formatée en string
 */
export function formatLocalDate (dateString: string, options?: Intl.DateTimeFormatOptions) {
  // On découpe la date "YYYY-MM-DD" en trois parties (année, mois, jour)
  // puis on convertit chaque partie en nombre pour pouvoir créer un objet Date ensuite
  const [year, month, day] = dateString.split('-').map(Number); 
  // En JavaScript, les mois sont indexés de 0 à 11 (janvier = 0, décembre = 11)
  // Donc on soustrait 1 pour que la date corresponde correctement
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("fr-FR", options || { /* On formate la date en français */
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};