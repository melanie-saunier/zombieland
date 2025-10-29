"use client";

import { useState } from "react";
import { Calendar, Users, X, AlertCircle, Check } from "lucide-react";

/** Type de réservation */
type MyBookings = {
  id: string;
  bookingDate: string;
  visitDate: string;
  ticketCount: number;
  status: "confirmed" | "past" | "cancelled";
  totalPrice: number;
};

// Mock data - TODO: Remplacer par fetch API
const mockReservations: MyBookings[] = [
  { id: "1", bookingDate: "2025-10-15", visitDate: "2025-11-05", ticketCount: 3, status: "confirmed", totalPrice: 135 },
  { id: "2", bookingDate: "2025-09-20", visitDate: "2025-10-25", ticketCount: 2, status: "past", totalPrice: 90 },
  { id: "3", bookingDate: "2025-10-28", visitDate: "2025-11-15", ticketCount: 4, status: "confirmed", totalPrice: 180 },
];

const TICKET_PRICE = 45;

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

export default function MesReservationsPage() {
  const [reservations, setReservations] = useState<MyBookings[]>(mockReservations);
  const [selected, setSelected] = useState<MyBookings | null>(null);
  const [modalType, setModalType] = useState<"modify" | "cancel" | "confirm" | null>(null);
  const [form, setForm] = useState({ visitDate: "", ticketCount: 1 });

  const openModify = (res: MyBookings) => {
    setSelected(res);
    setForm({ visitDate: res.visitDate, ticketCount: res.ticketCount });
    setModalType("modify");
  };

  const openCancel = (res: MyBookings) => {
    setSelected(res);
    setModalType("cancel");
  };

  const handleModify = (e: React.FormEvent) => {
    e.preventDefault();
    setModalType("confirm");
  };

  const confirmModify = () => {
    if (!selected) return;
    setReservations(
      reservations.map((r) =>
        r.id === selected.id
          ? { ...r, visitDate: form.visitDate, ticketCount: form.ticketCount, totalPrice: form.ticketCount * TICKET_PRICE }
          : r
      )
    );
    resetModal();
  };

  const confirmCancel = () => {
    if (!selected) return;
    setReservations(reservations.map((r) => (r.id === selected.id ? { ...r, status: "cancelled" } : r)));
    resetModal();
  };

  const resetModal = () => {
    setSelected(null);
    setModalType(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Mes Réservations</h1>
          <p className="text-lg text-neutral-700">Gérez vos réservations passées et à venir</p>
        </header>

        {/* Liste des réservations */}
        {reservations.length === 0 ? (
          <div className="bg-neutral-700 border border-primary-purple-300 rounded-lg p-8 text-center shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <p className="text-neutral-50 text-lg">Vous n'avez aucune réservation pour le moment.</p>
          </div>
        ) : (
          reservations.map((res) => (
            <div
              key={res.id}
              className="bg-neutral-700 border border-primary-purple-300 rounded-lg p-6 shadow-[0_0_12px_0_rgba(180,130,255,0.3)] hover:shadow-[0_0_20px_0_rgba(180,130,255,0.5)] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Informations */}
                <div className="flex-1 space-y-4">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusClasses[res.status]}`}
                  >
                    {res.status === "confirmed" && <Check className="h-4 w-4" />}
                    {statusLabel[res.status]}
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Info
                      icon={<Calendar />}
                      label="Date de réservation"
                      value={formatDate(res.bookingDate)}
                      color="text-primary-purple-300"
                    />
                    <Info
                      icon={<Calendar />}
                      label="Date de visite"
                      value={formatDate(res.visitDate)}
                      color="text-secondary-200"
                    />
                    <Info
                      icon={<Users />}
                      label="Nombre de billets"
                      value={`${res.ticketCount} billet${res.ticketCount > 1 ? "s" : ""}`}
                    />
                    <Info icon={<span>€</span>} label="Prix total" value={`${res.totalPrice}€`} highlight />
                  </div>
                </div>

                {/* Actions */}
                {res.status === "confirmed" && (
                  <div className="flex flex-col gap-3 lg:w-48">
                    <button
                      onClick={() => openModify(res)}
                      className="w-full px-4 py-3 button_activity text-neutral-50 font-bold rounded-lg hover:scale-105 transition-all"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => openCancel(res)}
                      disabled={!canCancel(res.visitDate)}
                      className={`w-full px-4 py-3 rounded-lg font-bold border transition-all ${
                        canCancel(res.visitDate)
                          ? "bg-red-900/30 hover:bg-red-900/50 text-red-400 border-red-500 hover:scale-105"
                          : "bg-neutral-700/50 text-neutral-50/30 border-neutral-700 cursor-not-allowed"
                      }`}
                    >
                      Annuler
                    </button>
                    {!canCancel(res.visitDate) && (
                      <p className="text-xs text-primary-purple-200/70 text-center">Annulation possible jusqu'à 48h avant</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Modifier */}
      {modalType === "modify" && selected && (
        <Modal title="Modifier la réservation" onClose={resetModal}>
          <form onSubmit={handleModify} className="space-y-6">
            <Input
              label="Date de visite"
              type="date"
              value={form.visitDate}
              onChange={(v) => setForm({ ...form, visitDate: v })}
              min={new Date().toISOString().split("T")[0]}
            />
            <Input
              label="Nombre de billets"
              type="number"
              value={String(form.ticketCount)}
              onChange={(v) => setForm({ ...form, ticketCount: parseInt(v) || 1 })}
              min="1"
              max="50"
            />
            <div className="bg-secondary-500/20 border-2 border-secondary-300 rounded-lg p-4 text-center shadow-[0_0_12px_0_rgba(139,255,132,0.5)]">
              <p className="text-sm text-primary-purple-200 mb-1">Nouveau prix total</p>
              <p className="text-3xl font-bold text-secondary-200">{form.ticketCount * TICKET_PRICE}€</p>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 button_booking text-neutral-50 font-bold rounded-lg hover:scale-105 transition-all"
            >
              Continuer
            </button>
          </form>
        </Modal>
      )}

      {/* Modal Confirmer */}
      {modalType === "confirm" && selected && (
        <Modal title="Confirmer les modifications" icon={<AlertCircle className="h-8 w-8 text-secondary-200" />} onClose={resetModal}>
          <div className="space-y-4 mb-6">
            <p className="text-neutral-50">Confirmer la modification de votre réservation ?</p>
            <div className="space-y-2">
              <SummaryRow label="Nouvelle date" value={formatDate(form.visitDate)} />
              <SummaryRow label="Billets" value={String(form.ticketCount)} />
              <SummaryRow label="Prix total" value={`${form.ticketCount * TICKET_PRICE}€`} highlight />
            </div>
          </div>
          <ActionButtons onCancel={resetModal} onConfirm={confirmModify} confirmLabel="Confirmer" />
        </Modal>
      )}

      {/* Modal Annuler */}
      {modalType === "cancel" && selected && (
        <Modal title="Confirmer l'annulation" icon={<AlertCircle className="h-8 w-8 text-red-400" />} borderColor="border-red-500" onClose={resetModal}>
          <div className="space-y-4 mb-6">
            <p className="text-neutral-50">Êtes-vous sûr de vouloir annuler cette réservation ?</p>
            <div className="space-y-2">
              <SummaryRow label="Date de visite" value={formatDate(selected.visitDate)} />
              <SummaryRow label="Billets" value={String(selected.ticketCount)} />
            </div>
            <p className="text-sm text-red-400 font-semibold">⚠️ Cette action est irréversible.</p>
          </div>
          <ActionButtons onCancel={resetModal} onConfirm={confirmCancel} confirmLabel="Annuler la réservation" danger />
        </Modal>
      )}
    </div>
  );
}

/** Composants utilitaires */
const Info = ({ icon, label, value, color = "text-primary-purple-200", highlight = false }: any) => (
  <div className="flex items-start gap-3">
    <div className={`h-5 w-5 mt-0.5 flex items-center justify-center ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-primary-purple-200">{label}</p>
      <p className={`font-medium ${highlight ? "text-secondary-200 text-lg font-bold" : "text-neutral-50"}`}>{value}</p>
    </div>
  </div>
);

const Input = ({ 
    label, 
    type, 
    value, 
    onChange, 
    ...props 
  }: { 
    label: string; 
    type: string; 
    value: string; 
    onChange: (value: string) => void; 
    [key: string]: any; 
  }) => (
    <div>
      <label className="block text-sm font-semibold text-primary-purple-200 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-neutral-700/50 border border-primary-purple-500 rounded-lg text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-purple-300 transition-all"
        required
        {...props}
      />
    </div>
  );

const SummaryRow = ({ label, value, highlight = false }: any) => (
  <div className="flex justify-between bg-neutral-700/50 border border-primary-purple-500 rounded-lg p-3">
    <span className="text-primary-purple-200">{label}</span>
    <span className={`font-medium ${highlight ? "text-secondary-200 text-lg font-bold" : "text-neutral-50"}`}>{value}</span>
  </div>
);

const ActionButtons = ({ onCancel, onConfirm, confirmLabel, danger = false }: any) => (
  <div className="flex gap-3">
    <button
      onClick={onCancel}
      className="flex-1 px-6 py-3 bg-neutral-700/50 hover:bg-neutral-700 border border-primary-purple-500 rounded-lg font-medium text-neutral-50 transition-colors"
    >
      Retour
    </button>
    <button
      onClick={onConfirm}
      className={`flex-1 px-6 py-3 font-bold rounded-lg transition-all hover:scale-105 ${
        danger ? "bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-500" : "button_booking text-neutral-50"
      }`}
    >
      {confirmLabel}
    </button>
  </div>
);

const Modal = ({ title, icon, borderColor = "border-primary-purple-300", onClose, children }: any) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div
      className={`bg-neutral-700 border-2 ${borderColor} rounded-lg shadow-[0_0_30px_0_rgba(180,130,255,0.6)] max-w-md w-full p-6`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-2xl font-bold text-primary-purple-300">{title}</h2>
        </div>
        <button onClick={onClose} className="text-primary-purple-200 hover:text-neutral-50 transition-colors">
          <X className="h-6 w-6" />
        </button>
      </div>
      {children}
    </div>
  </div>
);