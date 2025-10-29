"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Plus, Minus, Users, CheckCircle } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface BookingData {
  date: string;
  numberOfTickets: number;
  totalPrice: number;
}

interface TicketPricing {
  price: number;
  maxTicketsPerBooking: number;
}

type Value = Date | [Date | null, Date | null] | null;

export default function BookingPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // État des données de réservation
  const [bookingData, setBookingData] = useState<BookingData>({
    date: "",
    numberOfTickets: 1,
    totalPrice: 0,
  });

  // État du prix (depuis la BDD)
  const [pricing, setPricing] = useState<TicketPricing | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);
  
  // État UI
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** 📦 Chargement du prix depuis la BDD au montage du composant */
  useEffect(() => {
    const fetchTicketPrice = async () => {
      try {
        setIsLoadingPrice(true);
        
        // TODO: Remplacer par Server Action
        // const pricing = await getTicketPricing();
        
        // Simulation d'appel API (à remplacer)
        await new Promise(resolve => setTimeout(resolve, 500));
        const pricing = {
          price: 45,
          maxTicketsPerBooking: 50,
        };

        setPricing(pricing);
        setBookingData(prev => ({
          ...prev,
          totalPrice: prev.numberOfTickets * pricing.price,
        }));
      } catch (error) {
        console.error("Erreur de chargement du prix:", error);
        setErrors(["Impossible de charger les tarifs. Veuillez réessayer."]);
      } finally {
        setIsLoadingPrice(false);
      }
    };

    fetchTicketPrice();
  }, []);

  /** 🗓️ Changement de date */
  const handleCalendarChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setBookingData(prev => ({
        ...prev,
        date: value.toISOString().split("T")[0],
      }));
      setErrors([]);
    }
  };

  /** 🎫 Changement du nombre de billets */
  const updateTickets = (count: number) => {
    if (!pricing) return;

    const numberOfTickets = Math.min(
      Math.max(count, 1),
      pricing.maxTicketsPerBooking
    );
    
    setBookingData({
      ...bookingData,
      numberOfTickets,
      totalPrice: numberOfTickets * pricing.price,
    });
  };

  /** ✅ Validation + soumission */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pricing) return;

    const newErrors: string[] = [];

    // Validation
    if (!bookingData.date) {
      newErrors.push("Veuillez sélectionner une date de visite");
    } else {
      const selectedDateObj = new Date(bookingData.date);
      selectedDateObj.setHours(0, 0, 0, 0);
      
      if (selectedDateObj < today) {
        newErrors.push("La date de visite ne peut pas être dans le passé");
      }
    }

    if (bookingData.numberOfTickets < 1) {
      newErrors.push("Vous devez réserver au moins 1 billet");
    }

    if (bookingData.numberOfTickets > pricing.maxTicketsPerBooking) {
      newErrors.push(`Maximum ${pricing.maxTicketsPerBooking} billets par réservation`);
    }

    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }

    // Soumission
    setIsSubmitting(true);
    setErrors([]);

    try {
      // TODO: Remplacer par Server Action
      // await createBooking(bookingData);
      
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Réservation créée:", bookingData);

      // Message de succès
      setSuccessMessage(
        `Réservation confirmée pour le ${new Date(bookingData.date).toLocaleDateString("fr-FR")} - ${bookingData.numberOfTickets} billet(s) - Total: ${bookingData.totalPrice}€`
      );

      // Reset du formulaire
      setBookingData({
        date: "",
        numberOfTickets: 1,
        totalPrice: pricing.price,
      });
      setSelectedDate(new Date());

      // Masquer le message après 5s
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error("Erreur de réservation:", error);
      setErrors([
        error instanceof Error 
          ? error.message 
          : "Une erreur est survenue lors de la réservation"
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  /** 🔄 État de chargement */
  if (isLoadingPrice) {
    return (
      <section className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-purple-300 border-t-transparent mx-auto mb-4" />
          <p className="text-neutral-300 text-lg">Chargement des tarifs...</p>
        </div>
      </section>
    );
  }

  /** ❌ Erreur de chargement des prix */
  if (!pricing) {
    return (
      <section className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-300 font-bold text-xl mb-2">Erreur de chargement</h2>
          <p className="text-red-300">Impossible de charger les tarifs. Veuillez rafraîchir la page.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Réserver vos billets
        </h1>

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

        {/* Erreurs de validation */}
        {errors.length > 0 && (
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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="p-6 bg-neutral-700 rounded-lg border border-primary-purple-300 shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <h2 className="text-xl font-bold text-neutral-50 mb-6 pb-2 border-b border-primary-purple-300 flex items-center gap-2">
              <CalendarIcon size={24} className="text-primary-purple-300" />
              Détails de votre réservation
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 📅 Calendrier */}
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="booking-calendar"
                  className="text-lg text-primary-purple-200 font-semibold"
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
                {bookingData.date && (
                  <p className="text-sm text-secondary-200 font-semibold mt-2 text-center md:text-left">
                    📅 {new Date(bookingData.date).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>

              {/* 🎫 Nombre de billets + Total */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <label 
                    htmlFor="ticket-count"
                    className="text-lg text-primary-purple-200 font-semibold flex items-center gap-2"
                  >
                    <Users size={18} /> Nombre de billets
                  </label>
                  
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => updateTickets(bookingData.numberOfTickets - 1)}
                      disabled={bookingData.numberOfTickets <= 1}
                      aria-label="Diminuer le nombre de billets"
                      className="w-12 h-12 flex items-center justify-center bg-primary-purple-500 text-neutral-50 rounded-full hover:bg-primary-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                    >
                      <Minus size={20} />
                    </button>

                    <input
                      id="ticket-count"
                      type="number"
                      value={bookingData.numberOfTickets}
                      onChange={e => updateTickets(parseInt(e.target.value) || 1)}
                      min="1"
                      max={pricing.maxTicketsPerBooking}
                      aria-label="Nombre de billets"
                      className="w-24 text-center p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 text-xl font-bold focus:outline-none focus:border-primary-purple-300 focus:ring-2 focus:ring-primary-purple-300"
                    />

                    <button
                      type="button"
                      onClick={() => updateTickets(bookingData.numberOfTickets + 1)}
                      disabled={bookingData.numberOfTickets >= pricing.maxTicketsPerBooking}
                      aria-label="Augmenter le nombre de billets"
                      className="w-12 h-12 flex items-center justify-center bg-primary-purple-500 text-neutral-50 rounded-full hover:bg-primary-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <p className="text-center text-sm text-neutral-50">
                    Prix unitaire : <strong className="text-primary-purple-200">{pricing.price}€</strong>
                  </p>
                </div>

                {/* 💰 Prix total */}
                <div 
                  className="p-6 bg-secondary-500/20 rounded-lg border-2 border-secondary-300 shadow-[0_0_12px_0_rgba(139,255,132,0.5)] text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="block text-lg font-bold text-neutral-50">
                    Prix total
                  </span>
                  <span className="text-5xl font-bold text-secondary-200">
                    {bookingData.totalPrice}€
                  </span>
                  <p className="text-sm text-neutral-50/70 mt-1">
                    {bookingData.numberOfTickets} billet{bookingData.numberOfTickets > 1 ? "s" : ""} × {pricing.price}€
                  </p>
                </div>

                {/* ✅ Bouton de soumission */}
                <button
                  type="submit"
                  disabled={!bookingData.date || isSubmitting}
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

        {/* 💀 Message d'ambiance */}
        <div className="p-4 bg-primary-purple-500/20 rounded-lg border border-primary-purple-300 text-center">
          <p className="text-sm text-neutral-50">
            💀 Préparez-vous à vivre une expérience terrifiante à ZombieLand ! 💀
          </p>
        </div>
      </div>
    </section>
  );
}