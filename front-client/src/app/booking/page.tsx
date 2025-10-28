"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Plus, Minus, Users } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface BookingData {
  date: string;
  numberOfTickets: number;
  totalPrice: number;
}

type Value = Date | [Date | null, Date | null] | null;

export default function BookingPage() {
  const TICKET_PRICE = 45;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [bookingData, setBookingData] = useState<BookingData>({
    date: "",
    numberOfTickets: 1,
    totalPrice: TICKET_PRICE,
  });
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [errors, setErrors] = useState<string[]>([]);

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

  /** Changement du nombre de billets (par bouton ou input) */
  const updateTickets = (count: number) => {
    const numberOfTickets = Math.min(Math.max(count, 1), 50);
    setBookingData({
      ...bookingData,
      numberOfTickets,
      totalPrice: numberOfTickets * TICKET_PRICE,
    });
  };

  /** ✅ Validation + soumission */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = [];

    if (!bookingData.date) newErrors.push("Veuillez sélectionner une date de visite");
    else if (new Date(bookingData.date) < today)
      newErrors.push("La date de visite ne peut pas être dans le passé");
    if (bookingData.numberOfTickets < 1)
      newErrors.push("Vous devez réserver au moins 1 billet");

    if (newErrors.length) return setErrors(newErrors);

    console.log("Réservation :", bookingData);
    alert(`Réservation confirmée !\n\nDate: ${bookingData.date}\nBillets: ${bookingData.numberOfTickets}\nTotal: ${bookingData.totalPrice}€`);

    setBookingData({ date: "", numberOfTickets: 1, totalPrice: TICKET_PRICE });
    setSelectedDate(new Date());
  };

  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Réserver vos billets
        </h1>

        {errors.length > 0 && (
          <div className="p-4 bg-red-900/30 border-2 border-red-500 rounded-lg shadow-[0_0_12px_0_rgba(255,0,0,0.3)]">
            <h3 className="text-red-300 font-bold mb-2 flex items-center gap-2">
              ⚠️ Erreurs de validation
            </h3>
            <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="p-6 bg-neutral-700 rounded-lg border border-primary-purple-300 shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <h3 className="text-xl font-bold text-neutral-50 mb-6 pb-2 border-b border-primary-purple-300 flex items-center gap-2">
              <CalendarIcon size={24} className="text-primary-purple-300" />
              Détails de votre réservation
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Calendrier */}
              <div className="flex flex-col gap-2">
                <label className="text-lg text-primary-purple-200 font-semibold">
                  Date de visite
                </label>
                <Calendar
                  onChange={handleCalendarChange}
                  value={selectedDate}
                  minDate={today}
                  locale="fr-FR"
                  className="booking-calendar mx-auto md:mx-0"
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

              {/* Compte Billets + Total */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-lg text-primary-purple-200 font-semibold flex items-center gap-2">
                    <Users size={18} /> Nombre de billets
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => updateTickets(bookingData.numberOfTickets - 1)}
                      disabled={bookingData.numberOfTickets <= 1}
                      className="w-12 h-12 flex items-center justify-center bg-primary-purple-500 text-neutral-50 rounded-full hover:bg-primary-purple-300 disabled:opacity-50 transition-all hover:scale-110 active:scale-95"
                    >
                      <Minus size={20} />
                    </button>

                    <input
                      type="number"
                      value={bookingData.numberOfTickets}
                      onChange={e => updateTickets(parseInt(e.target.value))}
                      min="1"
                      max="50"
                      className="w-24 text-center p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 text-xl font-bold focus:outline-none focus:border-primary-purple-300 focus:ring-2 focus:ring-primary-purple-300"
                    />

                    <button
                      type="button"
                      onClick={() => updateTickets(bookingData.numberOfTickets + 1)}
                      className="w-12 h-12 flex items-center justify-center bg-primary-purple-500 text-neutral-50 rounded-full hover:bg-primary-purple-300 transition-all hover:scale-110 active:scale-95"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <p className="text-center text-sm text-neutral-50">
                    Prix unitaire : <b className="text-primary-purple-200">{TICKET_PRICE}€</b>
                  </p>
                </div>

                <div className="p-6 bg-secondary-500/20 rounded-lg border-2 border-secondary-300 shadow-[0_0_12px_0_rgba(139,255,132,0.5)] text-center">
                  <span className="block text-lg font-bold text-neutral-50">
                    Prix total
                  </span>
                  <span className="text-5xl font-bold text-secondary-200">
                    {bookingData.totalPrice}€
                  </span>
                  <p className="text-sm text-neutral-50/70 mt-1">
                    {bookingData.numberOfTickets} billet{bookingData.numberOfTickets > 1 ? "s" : ""} × {TICKET_PRICE}€
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!bookingData.date}
                  className="w-full p-4 font-bold button_booking text-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmer ma réservation
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="p-4 bg-primary-purple-500/20 rounded-lg border border-primary-purple-300 text-center">
          <p className="text-sm text-neutral-50">
            💀 Préparez-vous à vivre une expérience terrifiante à ZombieLand ! 💀
          </p>
        </div>
      </div>
    </section>
  );
}
