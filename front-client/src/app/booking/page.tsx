// src/app/booking/page.tsx 

"use client";
import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Plus, Minus, Users, CheckCircle } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Import des types et utils
import type { BookingData, ValueDate } from "@/@types/booking";
import { MAX_TICKETS_PER_BOOKING, formatLocalDate } from "@/utils/bookingUtils";
import useUserContext from "@/context/useUserContext";
import { bookingApi } from "@/api/booking";
import Loader from "@/components/Loader";
import { pricesApi } from "@/api/prices";
import { IPrice } from "@/@types/price";
import { csrfApi } from "@/api/csrf";
import { authApi } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";



/**
 * Composant principal : BookingPage
 * Gère toute la logique et l'affichage du processus de réservation :
 *  - sélection de la date
 *  - choix du nombre de billets
 *  - calcul du total
 *  - validation et soumission
 */
export default function BookingPage() {
  const { user, isLoading, csrfToken} = useUserContext(); // On récupère l'état de connexion
  // on vérifie si il y a un user avec la route /me si pas de user on redirige vers la home
  useAuthGuard();

  const today = new Date(); // Préparation d'une référence à la date du jour
  today.setHours(0, 0, 0, 0); // On met l'heure à 00:00 pour éviter le décalage horaire

  /**
   * 🧠 bookingData : contient les données principales de la réservation
   * - date : la date choisie par l'utilisateur (format YYYY-MM-DD)
   * - numberOfTickets : nombre de billets choisis
   * - total_price : montant total calculé selon le prix unitaire
   */
  const [bookingData, setBookingData] = useState<BookingData>({
    visit_date: "", // initialement aucune date sélectionnée
    nb_people: 1, // 1 billet par défaut
    status: false, // statut de la réservation à false (pas confirmée)
    total_price: 0, // prix calculé plus tard
  });

  // État pour stocker le prix des billets récupéré depuis la BDD
  // pricing : contient les infos tarifaires récupérées (prix unitaire, limite max)
  // isLoadingPrice : gère l’état de chargement du prix
  const [pricing, setPricing] = useState<IPrice | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true); // État de chargement du prix

  /**
   * États d’interface (UI)
   * - selectedDate : date sélectionnée dans le calendrier (objet Date)
   * - errors : tableau de messages d’erreur à afficher à l’utilisateur
   * - successMessage : message affiché quand la réservation est validée
   * - isSubmitting : indique si le formulaire est en cours d’envoi (désactive le bouton)
   */
  const [selectedDate, setSelectedDate] = useState<ValueDate>(new Date()); 
  const [errors, setErrors] = useState<string[]>([]); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 

  /**
   * useEffect : hook React appelé après le premier rendu (montage) du composant
   * Ici, il sert à récupérer le prix du billet depuis notre API
   * Une fois les données reçues :
   *  - on met à jour le pricing
   *  - on calcule le total initial (prix * nb billets)
   */
  useEffect(() => {
    const fetchTicketPrice = async () => {
      try {
        setIsLoadingPrice(true); // on affiche le loader

        const prices = await pricesApi.getPrices();

        if(!prices) {
          setErrors(["Impossible de charger les tarifs. Veuillez réessayer."]);
          return;
        }
        // on veut le prix "Tarif unique"
        const uniquePrice = prices.find((price) => price.label === "Tarif unique");

        if(uniquePrice) {
          // on sauvegarde le prix dans l'état
          setPricing(uniquePrice);
          // Calcul du prix total en fonction du nombre actuel de billets
          setBookingData(prev => ({
            ...prev,
            total_price: prev.nb_people * uniquePrice.value, 
          }));
        } else {
          setErrors(["Tarif unique introuvable."]);
          return;
        }
      } catch (error) {
        console.error("Erreur de chargement du prix:", error);
        setErrors(["Impossible de charger les tarifs. Veuillez réessayer."]);
      } finally {
        setIsLoadingPrice(false); // on masque le loader
      }
    };

    fetchTicketPrice(); // Appel de la fonction dès le premier rendu
  }, []);
    // useEffect(() => {
    //   const fetchUser = async () => {
    //     const currentUser = await authApi.getCurrentUser();
    //     if (!currentUser) {
    //       // Si pas d'utilisateur, redirection vers login
    //       router.push("/login");
    //     } else {
    //       setUser(currentUser);
    //     }
    //   };
  
    //   fetchUser();
    // }, [router]);

  /**
   * handleCalendarChange : appelée quand l’utilisateur choisit une nouvelle date
   * - met à jour la date sélectionnée
   * - met à jour bookingData.date au format "YYYY-MM-DD"
   * - réinitialise les erreurs éventuelles
   */
  const handleCalendarChange = (value: ValueDate) => {
    if (value instanceof Date) { // on ne gère que la sélection d'une date unique
      setSelectedDate(value); // on met à jour l'état de la date sélectionnée

      // On formate la date pour le state bookingData
      // On récupère l'année complète depuis l'objet Date
      const year = value.getFullYear();
      // On récupère le mois (entre 0 et 11) et on ajoute +1 car les mois commencent à 0 en JS
      // On convertit le résultat en string et on ajoute un zéro devant si le mois est sur un seul chiffre
      // (ex : "03" au lieu de "3") grâce à padStart(2, '0')
      // Explication padStart : str.padStart(targetLength, padString)
      // - targetLength → la longueur finale de la chaîne souhaitée.
      // - padString → la chaîne utilisée pour compléter le début si nécessaire (par défaut " ").
      const month = String(value.getMonth() + 1).padStart(2, "0");
      // On récupère le jour du mois (1 à 31)
      // Même logique : on convertit en string et on ajoute un zéro au besoin
      const day = String(value.getDate()).padStart(2, "0");
      // On combine les trois parties (année, mois, jour) pour former une chaîne "YYYY-MM-DD"
      // C’est le format standard ISO, pratique pour stocker et échanger des dates
      const formattedDate = `${year}-${month}-${day}`;

      // mise à jour du state avec la date au bon format
      setBookingData(prev => ({
        ...prev,
        visit_date: formattedDate, // on stocke la date au format YYYY-MM-DD
      }));
      setErrors([]); // on supprime les erreurs quand on change de date
    }
  };

  /**
   * updateTickets
   * Fonction pour changer le nombre de billets et recalculer le prix total
   * - count : nouveau nombre souhaité
   * - limite automatiquement entre 1 et maxTicketsPerBooking
   */
  const updateTickets = (count: number) => {
    if (!pricing) return; // si le prix n'est pas chargé, on sort

    // bornage du nombre de tickets qu'on peut réserver (1 à maxTicketsPerBooking)
    const nb_people = Math.min(
      Math.max(count, 1), // minimum 1 billet
      MAX_TICKETS_PER_BOOKING // maximum autorisé
    );

    // mise à jour du state avec recalcul du prix total
    setBookingData({
      ...bookingData,
      nb_people,
      total_price: nb_people * pricing.value, // recalcul du prix total
    });
  };

  /**
   * handleSubmit : appelée quand l’utilisateur soumet le formulaire
   * Étapes :
   *  1. Validation des champs (date et nombre de billets)
   *  2. Simulation d’un appel API pour “enregistrer” la réservation
   *  3. Affichage d’un message de succès ou d’erreur
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // empêche le rechargement de la page

    if (!pricing) return; // si le prix n'est pas chargé, on sort

    // On créé un tableau d'erreur vide, pour contenir toutes les erreurs possibles
    const newErrors: string[] = [];

    // Vérification de la date
    if (!bookingData.visit_date) {
      newErrors.push("Veuillez sélectionner une date de visite");
    } else {
      const [year, month, day] = bookingData.visit_date.split("-").map(Number); // On sépare l'année, le mois et le jour
      const selectedDateObj = new Date(year, month - 1, day); // On crée un objet Date avec la date sélectionnée
      selectedDateObj.setHours(0, 0, 0, 0); // On met l'heure à 00:00 pour éviter le décalage horaire
      if (selectedDateObj < today) {
        newErrors.push("La date de visite ne peut pas être dans le passé");
      }
    }

    // Vérification du nombre de billets
    if (bookingData.nb_people < 1) {
      newErrors.push("Vous devez réserver au moins 1 billet");
    }
    if (bookingData.nb_people > MAX_TICKETS_PER_BOOKING) {
      newErrors.push(`Maximum ${MAX_TICKETS_PER_BOOKING} billets par réservation`);
    }

    // Si erreurs, on les affiche et on arrête la soumission
    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }
    // on vérifie si utilisateur connecté 
    if (!user?.id) {
      setErrors(["Utilisateur non connecté."]);
      return;
    }
    // Soumission simulée
    setIsSubmitting(true);
    setErrors([]);

    try {
      const token = csrfToken //|| await csrfApi.getCsrfToken();

      await bookingApi.createBooking({
        visit_date: bookingData.visit_date, 
        nb_people: bookingData.nb_people,
        status: true,
        user_id: user.id,
      }, token!);
      
      console.log("Réservation créée:", bookingData);

      // Message de succès formaté avec les infos de réservation
      setSuccessMessage(
        `Réservation confirmée pour le ${formatLocalDate(bookingData.visit_date)} - ${bookingData.nb_people} billet(s) - Total: ${bookingData.total_price}€`
      );

      // Réinitialisation du formulaire
      setBookingData({
        visit_date: "",
        nb_people: 1,
        status: false,
        total_price: pricing.value,
      });
      setSelectedDate(new Date());

      // Masquer le message de succès après 5 secondes
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error("Erreur de réservation:", error);
      setErrors([
        error instanceof Error 
          ? error.message 
          : "Une erreur est survenue lors de la réservation"
      ]);
    } finally {
      setIsSubmitting(false); // fin de soumission
    }
  };

  /** Erreur de chargement des prix: si apres le chargement le prix est absent on affiche une erreur */
  if (!pricing && !isLoadingPrice) { // Si le prix n'est pas chargé, on affiche le message d'erreur dans un div avec les bonnes props
    return (
      <section className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-300 font-bold text-xl mb-2">Erreur de chargement</h2>
          <p className="text-red-300">Impossible de charger les tarifs. Veuillez rafraîchir la page.</p>
        </div>
      </section>
    );
  }
  //on doit rajouter return null si on a pas de prix pour que TS comprenne bien que pricing ne peut pas être null
  if (!pricing) return null;
  if (isLoading) return <Loader />; // loader avant tout rendu
  if (!user) return null; // redirection gérée par useAuthGuard

  return (
    <section className="bg-radial from-[#961990] to-[#000000] min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="title text-4xl md:text-5xl text-center mb-8">
          Réserver vos billets
        </h1>

        {/* Erreurs de validation */}
        {errors.length > 0 && ( // Si il y a des erreurs, on affiche le message d'erreur dans un div avec les bonnes props
          <div 
            className="p-4 bg-red-900/30 border-2 border-red-500 rounded-lg shadow-[0_0_12px_0_rgba(255,0,0,0.3)]"
            role="alert"
          >
            <h3 className="text-red-300 font-bold mb-2 flex items-center gap-2">
              ⚠️ Erreurs de validation
            </h3>
            <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {
          isLoadingPrice ? (
            <div className="h-100 flex flex-col justify-center items-center m-4">
              <Loader /> 
            </div>
          ) :(

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="p-6 bg-neutral-700 rounded-lg border border-primary-300 shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
                <h2 className="text-xl font-bold text-neutral-50 mb-6 pb-2 border-b border-primary-300 flex items-center gap-2">
                  <CalendarIcon size={24} className="text-primary-300" />
              Détails de ta réservation
                </h2>

                <div className="flex flex-col md:flex-row justify-around gap-6">
              
                  {/* Calendrier */}
                  <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <label 
                      htmlFor="booking-calendar"
                      className="text-lg text-primary-200 font-semibold"
                    >
                  Date de visite
                    </label>
                    <Calendar
                      onChange={handleCalendarChange}
                      value={selectedDate}
                      minDate={today}
                      locale="fr-FR"
                      className="booking-calendar mx-auto md:mx-0"
                      aria-label="Sélectionner une date de visite"
                    />
                    {bookingData.visit_date && (
                      <p className="text-sm text-secondary-200 font-semibold mt-2 text-center md:text-left">
                    📅 {formatLocalDate(bookingData.visit_date, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>

                  {/* Nombre de billets + Total */}
                  <div className="w-full md:w-1/2 flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <label 
                        htmlFor="ticket-count"
                        className="text-lg text-primary-200 font-semibold flex items-center gap-2"
                      >
                        <Users size={18} /> Nombre de billets
                      </label>
                  
                      <div className="flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => updateTickets(bookingData.nb_people - 1)} /* Appelle la fonction updateTickets pour diminuer le nombre de billets */
                          disabled={bookingData.nb_people <= 1} /* Désactive le bouton si le nombre de billets est inférieur ou égal à 1 */
                          aria-label="Diminuer le nombre de billets"
                          className="w-12 h-12 flex items-center justify-center bg-primary-500 text-neutral-50 rounded-full hover:bg-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                        >
                          <Minus size={20} />
                        </button>

                        <input
                          id="ticket-count"
                          type="number"
                          value={bookingData.nb_people}
                          onChange={e => updateTickets(parseInt(e.target.value) || 1)} /* Appelle la fonction updateTickets pour mettre à jour le nombre de billets */
                          min="1"
                          max={MAX_TICKETS_PER_BOOKING} /* Définit le nombre maximum de billets */
                          aria-label="Nombre de billets"
                          className="w-24 text-center p-3 bg-neutral-700/50 rounded border border-primary-500 text-neutral-50 text-xl font-bold focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-300"
                        />

                        <button
                          type="button"
                          onClick={() => updateTickets(bookingData.nb_people + 1)} /* Appelle la fonction updateTickets pour augmenter le nombre de billets */
                          disabled={bookingData.nb_people >= MAX_TICKETS_PER_BOOKING} /* Désactive le bouton si le nombre de billets est supérieur ou égal au nombre maximum de billets */
                          aria-label="Augmenter le nombre de billets"
                          className="w-12 h-12 flex items-center justify-center bg-primary-500 text-neutral-50 rounded-full hover:bg-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                        >
                          <Plus size={20} />
                        </button>
                      </div>

                      <p className="text-center text-sm text-neutral-50">
                    Prix unitaire : <strong className="text-primary-200">{pricing.value}€</strong>
                      </p>
                    </div>

                    {/* Prix total */}
                    <div 
                      className="p-6 bg-secondary-500/20 rounded-lg border-2 border-secondary-300 shadow-[0_0_12px_0_rgba(139,255,132,0.5)] text-center"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="block text-lg font-bold text-neutral-50">
                    Prix total
                      </span>
                      <span className="text-5xl font-bold text-secondary-200">
                        {bookingData.total_price}€
                      </span>
                      <p className="text-sm text-neutral-50/70 mt-1">
                        {bookingData.nb_people} billet{bookingData.nb_people > 1 ? "s" : ""} × {pricing.value}€
                      </p>
                    </div>

                    {/* Bouton de soumission */}
                    <button
                      type="submit"
                      disabled={!bookingData.visit_date || isSubmitting}
                      className="w-full p-4 font-bold button_booking text-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed relative"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin rounded-full h-5 w-5 border-2 border-neutral-50 border-t-transparent" />
                      Traitement en cours...
                        </span>
                      ) : (
                        "Confirmer ma réservation"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )
        }

        {/* Message de succès */}
        {successMessage && (
          <div 
            className="p-4 bg-green-900/30 border-2 border-green-500 rounded-lg shadow-[0_0_12px_0_rgba(0,255,0,0.3)]"
            role="alert"
          >
            <div className="flex items-center gap-3 text-green-300">
              <CheckCircle size={24} />
              <p className="font-semibold">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Message d'ambiance */}
        <div className="p-4 bg-primary-500/20 rounded-lg border border-primary-300 text-center">
          <p className="text-sm text-neutral-50">
            💀 Prépare-toi à vivre une expérience terrifiante à ZombieLand ! 💀
          </p>
        </div>
      </div>
    </section>
  );
}