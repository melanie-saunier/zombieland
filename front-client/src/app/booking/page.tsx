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
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function BookingPage() {
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