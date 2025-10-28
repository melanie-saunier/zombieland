"use client";

import { useState } from "react";

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

  // Handler pour le changement de date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData(prev => ({
      ...prev,
      date: e.target.value,
    }));
    setErrors([]);
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

  return (
    <section className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Réserver vos billets
        </h1>
      </div>
    </section>
  );
}