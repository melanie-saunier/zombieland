"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Plus, Minus, Users } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Types
interface BookingData {
  date: string;
  numberOfTickets: number;
  totalPrice: number;
}

interface UserContactData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function BookingPage() {
  // Prix unitaire d'un billet (en euros)
  const TICKET_PRICE = 45;

  // État pour la réservation
  const [bookingData, setBookingData] = useState<BookingData>({
    date: "",
    numberOfTickets: 1,
    totalPrice: TICKET_PRICE,
  });

  // État pour les informations de contact
  const [contactData, setContactData] = useState<UserContactData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // État pour les erreurs
  const [errors, setErrors] = useState<string[]>([]);

  // État pour le calendrier (date sélectionnée)
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  // Handler pour le changement de date via react-calendar
  const handleCalendarChange = (value: Value) => {
    setSelectedDate(value);
    if (value && value instanceof Date) {
      const formattedDate = value.toISOString().split("T")[0];
      setBookingData(prev => ({
        ...prev,
        date: formattedDate,
      }));
      setErrors([]);
    }
  };

  // Handler pour augmenter le nombre de billets
  const incrementTickets = () => {
    setBookingData(prev => {
      const newTickets = prev.numberOfTickets + 1;
      return {
        ...prev,
        numberOfTickets: newTickets,
        totalPrice: newTickets * TICKET_PRICE,
      };
    });
  };

  // Handler pour diminuer le nombre de billets
  const decrementTickets = () => {
    if (bookingData.numberOfTickets > 1) {
      setBookingData(prev => {
        const newTickets = prev.numberOfTickets - 1;
        return {
          ...prev,
          numberOfTickets: newTickets,
          totalPrice: newTickets * TICKET_PRICE,
        };
      });
    }
  };

  // Handler pour changer directement le nombre de billets
  const handleTicketsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    const newTickets = Math.max(1, Math.min(value, 50)); // Entre 1 et 50 billets max
    setBookingData(prev => ({
      ...prev,
      numberOfTickets: newTickets,
      totalPrice: newTickets * TICKET_PRICE,
    }));
  };

  // Handler pour les informations de contact
  const handleContactChange = (field: keyof UserContactData, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  // Validation et soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Validation de la date
    if (!bookingData.date) {
      newErrors.push("Veuillez sélectionner une date de visite");
    } else {
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.push("La date de visite ne peut pas être dans le passé");
      }
    }

    // Validation du nombre de billets
    if (bookingData.numberOfTickets < 1) {
      newErrors.push("Vous devez réserver au moins 1 billet");
    }

    // Validation des informations de contact
    if (!contactData.firstName.trim()) {
      newErrors.push("Le prénom est requis");
    }
    if (!contactData.lastName.trim()) {
      newErrors.push("Le nom est requis");
    }
    if (!contactData.email.trim()) {
      newErrors.push("L'email est requis");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactData.email)) {
        newErrors.push("L'email n'est pas valide");
      }
    }
    
    if (!contactData.password) {
      newErrors.push("Le mot de passe est requis");
    } else if (contactData.password.length < 8) {
      newErrors.push("Le mot de passe doit contenir au moins 8 caractères");
    }
    if (contactData.password !== contactData.confirmPassword) {
      newErrors.push("Les mots de passe ne correspondent pas");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // TODO: Appel API pour créer le compte et la réservation
    const bookingInfo = {
      booking: bookingData,
      user: {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
      },
    };

    console.log("Réservation soumise:", bookingInfo);
    alert(`Réservation confirmée !\n\nDate: ${bookingData.date}\nBillets: ${bookingData.numberOfTickets}\nTotal: ${bookingData.totalPrice}€\n\nUn email de confirmation a été envoyé à ${contactData.email}`);
    
    // Reset du formulaire après confirmation
    setBookingData({
      date: "",
      numberOfTickets: 1,
      totalPrice: TICKET_PRICE,
    });
    setContactData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setSelectedDate(new Date());
  };

  // Date d'aujourd'hui pour bloquer les dates passées
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Titre principal */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Réserver vos billets
        </h1>

        {/* Messages d'erreur globaux */}
        {errors.length > 0 && (
          <div className="p-4 bg-red-900/30 border-2 border-red-500 rounded-lg shadow-[0_0_12px_0_rgba(255,0,0,0.3)]">
            <h3 className="text-red-300 font-bold mb-2 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Erreurs de validation
            </h3>
            <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section Réservation : Calendrier + Billets + Total */}
          <div className="p-6 bg-neutral-700 rounded-lg border border-primary-purple-300 shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <h3 className="text-xl font-bold text-neutral-50 mb-6 pb-2 border-b border-primary-purple-300 flex items-center gap-2">
              <CalendarIcon size={24} className="text-primary-purple-300" />
              Détails de votre réservation
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Colonne gauche : Calendrier */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-primary-purple-200 font-semibold">
                  Date de visite
                </label>
                <div className="flex justify-center md:justify-start">
                  <Calendar
                    onChange={handleCalendarChange}
                    value={selectedDate}
                    minDate={today}
                    locale="fr-FR"
                    className="booking-calendar"
                  />
                </div>
                {bookingData.date && (
                  <p className="text-center md:text-left text-sm text-secondary-200 font-semibold mt-2">
                    📅 {new Date(bookingData.date).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                )}
                <p className="text-xs text-primary-purple-200/70 text-center md:text-left">
                  Sélectionnez la date de votre visite au parc
                </p>
              </div>

              {/* Colonne droite : Nombre de billets + Total */}
              <div className="flex flex-col gap-6">
                {/* Nombre de billets */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm text-primary-purple-200 font-semibold flex items-center gap-2">
                    <Users size={18} />
                    Nombre de billets
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={decrementTickets}
                      disabled={bookingData.numberOfTickets <= 1}
                      className="w-12 h-12 flex items-center justify-center bg-primary-purple-500 text-neutral-50 rounded-full hover:bg-primary-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
                    >
                      <Minus size={20} />
                    </button>
                    
                    <input
                      type="number"
                      value={bookingData.numberOfTickets}
                      onChange={handleTicketsChange}
                      min="1"
                      max="50"
                      className="w-24 text-center p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 text-xl font-bold focus:outline-none focus:border-primary-purple-300 focus:ring-2 focus:ring-primary-purple-300"
                    />
                    
                    <button
                      type="button"
                      onClick={incrementTickets}
                      className="w-12 h-12 flex items-center justify-center bg-primary-purple-500 text-neutral-50 rounded-full hover:bg-primary-purple-300 transition-all hover:scale-110 active:scale-95"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-neutral-50">
                    <span className="text-sm">Prix unitaire :</span>
                    <span className="text-lg font-bold text-primary-purple-200">{TICKET_PRICE}€</span>
                  </div>
                </div>

                {/* Prix total */}
                <div className="p-6 bg-secondary-500/20 rounded-lg border-2 border-secondary-300 shadow-[0_0_12px_0_rgba(139,255,132,0.5)]">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-lg font-bold text-neutral-50">
                      Prix total
                    </span>
                    <span className="text-5xl font-bold text-secondary-200">
                      {bookingData.totalPrice}€
                    </span>
                    <p className="text-sm text-neutral-50/70 mt-1">
                      {bookingData.numberOfTickets} billet{bookingData.numberOfTickets > 1 ? "s" : ""} × {TICKET_PRICE}€
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}