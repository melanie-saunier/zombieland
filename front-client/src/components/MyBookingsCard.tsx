"use client";

import { Calendar, Users, Check } from "lucide-react";

/** Type de réservation */
export type Reservation = {
  id: string;
  bookingDate: string;
  visitDate: string;
  ticketCount: number;
  status: "confirmed" | "past" | "cancelled";
  totalPrice: number;
};

interface MyBookingCardProps {
  reservation: Reservation;
  onModify: (reservation: Reservation) => void;
  onCancel: (reservation: Reservation) => void;
}

/** Helpers */
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const statusClasses = {
  confirmed: "bg-secondary-500/20 text-secondary-200 border-secondary-300",
  past: "bg-neutral-700/50 text-neutral-50/70 border-neutral-700",
  cancelled: "bg-red-900/30 text-red-400 border-red-500",
};

const statusLabel = {
  confirmed: "Confirmée",
  past: "Passée",
  cancelled: "Annulée",
};

const canCancel = (visitDate: string) => {
  const diffHrs = (new Date(visitDate).getTime() - Date.now()) / (1000 * 60 * 60);
  return diffHrs >= 48;
};

/** Composant de carte de réservation */
export default function MyBookingCard({ reservation, onModify, onCancel }: MyBookingCardProps) {
  return (
    <div className="bg-[#201041] border border-primary-purple-300 rounded-lg p-6 shadow-[0_0_12px_0_rgba(180,130,255,0.3)] hover:shadow-[0_0_20px_0_rgba(180,130,255,0.5)] transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Informations */}
        <div className="flex-1 space-y-4">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
              statusClasses[reservation.status]
            }`}
          >
            {reservation.status === "confirmed" && <Check className="h-4 w-4" />}
            {statusLabel[reservation.status]}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              icon={<Calendar />}
              label="Date de réservation"
              value={formatDate(reservation.bookingDate)}
              color="text-primary-purple-300"
            />
            <InfoItem
              icon={<Calendar />}
              label="Date de visite"
              value={formatDate(reservation.visitDate)}
              color="text-secondary-200"
            />
            <InfoItem
              icon={<Users />}
              label="Nombre de billets"
              value={`${reservation.ticketCount} billet${reservation.ticketCount > 1 ? "s" : ""}`}
            />
            <InfoItem
              icon={<span>€</span>}
              label="Prix total"
              value={`${reservation.totalPrice}€`}
              highlight
            />
          </div>
        </div>

        {/* Actions */}
        {reservation.status === "confirmed" && (
          <div className="flex flex-col gap-3 lg:w-48">
            <button
              onClick={() => onModify(reservation)}
              className="w-full px-4 py-3 button_activity text-neutral-50 font-bold rounded-lg hover:scale-105 transition-all"
            >
              Modifier
            </button>
            <button
              onClick={() => onCancel(reservation)}
              disabled={!canCancel(reservation.visitDate)}
              className={`w-full px-4 py-3 rounded-lg font-bold border transition-all ${
                canCancel(reservation.visitDate)
                  ? "bg-red-900/30 hover:bg-red-900/50 text-red-400 border-red-500 hover:scale-105"
                  : "bg-neutral-700/50 text-neutral-50/30 border-neutral-700 cursor-not-allowed"
              }`}
            >
              Annuler
            </button>
            {!canCancel(reservation.visitDate) && (
              <p className="text-xs text-primary-purple-200/70 text-center">
                Annulation possible jusqu'à 48h avant
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** Composant utilitaire pour afficher une information */
const InfoItem = ({
  icon,
  label,
  value,
  color = "text-primary-purple-200",
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
  highlight?: boolean;
}) => (
  <div className="flex items-start gap-3">
    <div className={`h-5 w-5 mt-0.5 flex items-center justify-center ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-primary-purple-200">{label}</p>
      <p className={`font-medium ${highlight ? "text-secondary-200 text-lg font-bold" : "text-neutral-50"}`}>
        {value}
      </p>
    </div>
  </div>
);