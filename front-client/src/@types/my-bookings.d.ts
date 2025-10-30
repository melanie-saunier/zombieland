import { ReactNode } from "react";

/**
 * Type Booking - Structure exacte du backend Sequelize
 * Modèle : backend/src/models/booking.ts
 */
export type Booking = {
  id: number;
  visit_date: string;
  nb_people: number;
  status: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
  bookingPrices?: Array<{
    id: number;
    applied_price: number;
    booking_id: number;
    price_id: number;
    price?: {
      id: number;
      label: string;
      value: number;
    };
  }>;
};

/**
 * Type pour l'affichage frontend
 */
export type ReservationDisplay = {
  id: number;
  bookingDate: string;
  visitDate: string;
  ticketCount: number;
  status: "confirmed" | "past" | "cancelled";
  totalPrice: number;
};

export interface MyBookingCardProps {
  reservation: ReservationDisplay;
  onModify: (reservation: ReservationDisplay) => void;
  onCancel: (reservation: ReservationDisplay) => void;
}

export interface InfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  color?: string;
  highlight?: boolean;
}