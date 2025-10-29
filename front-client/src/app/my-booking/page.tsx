"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Plus, Minus, Users } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

/** Type représentant les données de réservation */
interface BookingData {
  date: string;
  numberOfTickets: number;
  totalPrice: number;
}

/** Type pour la valeur du calendrier */
type Value = Date | [Date | null, Date | null] | null;

/** Composant Input réutilisable */
interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (v: string) => void;
  min?: string | number;
  max?: string | number;
}

function InputField({ label, type, value, onChange, min, max }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg text-primary-purple-200 font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        className="w-full p-3 bg-neutral-700/50 rounded border border-primary-purple-500 text-neutral-50 text-lg font-medium focus:outline-none focus:border-primary-purple-300 focus:ring-2 focus:ring-primary-purple-300"
      />
    </div>
  );
}

export default function MyBookingsPage() {
  const [ticketPrice, setTicketPrice] = useState<number>(45); // Récupéré depuis la BDD
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [errors, setErrors] = useState<string[]>([]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [bookingData, setBookingData] = useState<BookingData>({
    date: "",
    numberOfTickets: 1,
    totalPrice: ticketPrice,
  });

  /** Simulation : récupération du prix en base via Sequelize  */
  useEffect(() => {
    async function fetchTicketPrice() {
      try {
        // Exemple de call API /api/ticket (connectée à Sequelize)
        const res = await fetch("/api/ticket");
        if (res.ok) {
          const data = await res.json();
          setTicketPrice(data.price);
          setBookingData((prev) => ({
            ...prev,
            totalPrice: prev.numberOfTickets * data.price,
          }));
        }
      } catch (err) {
        console.error("Erreur de récupération du prix :", err);
      }
    }
    fetchTicketPrice();
  }, []);

  /** Changement de date dans le calendrier */
  const handleCalendarChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setBookingData((prev) => ({
        ...prev,
        date: value.toISOString().split("T")[0],
      }));
      setErrors([]);
    }
  };

  /** Mise à jour du nombre de billets */
  const updateTickets = (count: number) => {
    const numberOfTickets = Math.min(Math.max(count, 1), 15);
    setBookingData({
      ...bookingData,
      numberOfTickets,
      totalPrice: numberOfTickets * ticketPrice,
    });
  };

    /** Validation et soumission du formulaire */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: string[] = [];
    
        if (!bookingData.date) newErrors.push("Veuillez sélectionner une nouvelle date de visite.");
        else if (new Date(bookingData.date) < today)
          newErrors.push("La date de visite ne peut pas être dans le passé, vous êtes sur le site de ZombieLand, et non pas Retour vers le futur.");
        if (bookingData.numberOfTickets < 1)
          newErrors.push("Vous devez réserver au moins 1 billet.");
    
        if (newErrors.length) {
          setErrors(newErrors);
          return;
        }
    
        console.log("Réservation :", bookingData);
        alert(`Réservation confirmée !\n\nDate: ${bookingData.date}\nBillets: ${bookingData.numberOfTickets}\nTotal: ${bookingData.totalPrice}€`);
    
        setBookingData({ date: "", numberOfTickets: 1, totalPrice: ticketPrice });
        setSelectedDate(new Date());
      };

  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Mes réservations
        </h1>
      </div>
    </section>
  );
}
