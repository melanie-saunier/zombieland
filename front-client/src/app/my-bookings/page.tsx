"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import MyBookingCard from "@/components/MyBookingsCard";
import { Booking, ReservationDisplay } from "@/@types/my-bookings";
import { transformBookingToDisplay } from "@/utils/my-bookings";

// ... reste du code identique

// Mock data aligné sur le backend - TODO: Remplacer par fetch /api/bookings
const mockBackendBookings: Booking[] = [
  {
    id: 1,
    visit_date: "2025-11-05",
    nb_people: 3,
    status: true, // active
    user_id: 1,
    created_at: "2025-10-15T10:30:00Z",
    updated_at: "2025-10-15T10:30:00Z",
    bookingPrices: [
      { 
        id: 1, 
        applied_price: 90,
        booking_id: 1,
        price_id: 1,
        price: { id: 1, label: "Tarif unique", value: 30 } 
      }
    ]
  },
  {
    id: 2,
    visit_date: "2025-10-25", // Date passée
    nb_people: 2,
    status: true, // toujours active mais passée
    user_id: 1,
    created_at: "2025-09-20T14:20:00Z",
    updated_at: "2025-09-20T14:20:00Z",
    bookingPrices: [
      { 
        id: 2, 
        applied_price: 60,
        booking_id: 2,
        price_id: 1,
        price: { id: 1, label: "Tarif unique", value: 30 }
      }
    ]
  },
  {
    id: 3,
    visit_date: "2025-11-15",
    nb_people: 4,
    status: true, // active
    user_id: 1,
    created_at: "2025-10-28T09:15:00Z",
    updated_at: "2025-10-28T09:15:00Z",
    bookingPrices: [
      { 
        id: 3, 
        applied_price: 120,
        booking_id: 3,
        price_id: 1,
        price: { id: 1, label: "Tarif unique", value: 30 }
      }
    ]
  },
  {
    id: 4,
    visit_date: "2025-11-30",
    nb_people: 6,
    status: false, // annulée
    user_id: 1,
    created_at: "2025-11-01T16:45:00Z",
    updated_at: "2025-11-02T10:00:00Z",
    bookingPrices: [
      { 
        id: 4, 
        applied_price: 180,
        booking_id: 4,
        price_id: 1,
        price: { id: 1, label: "Tarif unique", value: 30 }
      }
    ]
  },
];

const TICKET_PRICE = 30; // Aligné sur backend: data/seed-db.sql → price.value = 30.00

const formatDate = (dateString: string) => // Fonction pour formater la date
  new Date(dateString).toLocaleDateString("fr-FR", { // On formate la date en français
    day: "numeric", // On affiche le jour
    month: "long", // On affiche le mois
    year: "numeric", // On affiche l'année
  });

export default function MesReservationsPage() {
  // État backend (structure DB) *
  const [backendBookings, setBackendBookings] = useState<Booking[]>(mockBackendBookings); // On crée un état pour les bookings backend
  
  // Transformation pour affichage
  const displayReservations = backendBookings.map(b => transformBookingToDisplay(b, TICKET_PRICE)); // On transforme les bookings backend en bookings affichables

  const [selected, setSelected] = useState<ReservationDisplay | null>(null); // On crée un état pour la réservation sélectionnée
  const [modalType, setModalType] = useState<"modify" | "cancel" | "confirm" | null>(null);
  const [form, setForm] = useState({ visitDate: "", ticketCount: 1 }); // On crée un état pour le formulaire

  const openModify = (res: ReservationDisplay) => {
    setSelected(res); // On sélectionne la réservation
    setForm({ visitDate: res.visitDate, ticketCount: res.ticketCount });
    setModalType("modify"); // On ouvre le modal de modification
  };

  const openCancel = (res: ReservationDisplay) => {
    setSelected(res); // On sélectionne la réservation
    setModalType("cancel"); // On ouvre le modal d'annulation
  };

  const handleModify = (e: React.FormEvent) => {
    e.preventDefault();
    setModalType("confirm"); // On ouvre le modal de confirmation
  };

  const confirmModify = () => {
    if (!selected) return; // Si aucune réservation n'est sélectionnée, on arrête la fonction
    
    // Mise à jour côté backend (PATCH /api/bookings/:id) *
    setBackendBookings(
      backendBookings.map((b) => // On met à jour le booking backend
        b.id === selected.id // Si l'id du booking backend est égal à l'id de la réservation sélectionnée, on met à jour le booking
          ? {
              ...b, // On met à jour le booking backend
              visit_date: form.visitDate,
              nb_people: form.ticketCount, // On met à jour le nombre de personnes
              updated_at: new Date().toISOString(),
              // Recalcul du bookingPrice applied_price *
              bookingPrices: b.bookingPrices?.map(bp => ({
                ...bp, // On met à jour le bookingPrice backend
                applied_price: form.ticketCount * TICKET_PRICE
              })) // On met à jour le bookingPrice backend
            }
          : b // Sinon, on retourne le booking backend
      )
    ); // On met à jour le booking backend
    resetModal();
  }; // On ferme le modal

  const confirmCancel = () => {
    if (!selected) return; // Si aucune réservation n'est sélectionnée, on arrête la fonction
    
    // Mise à jour du status backend (PATCH /api/bookings/:id → status: false) *
    setBackendBookings(
      backendBookings.map((b) => // On met à jour le booking backend
        b.id === selected.id // Si l'id du booking backend est égal à l'id de la réservation sélectionnée, on met à jour le booking
          ? { 
              ...b, // On met à jour le booking backend
              status: false, // Backend: false = cancelled
              updated_at: new Date().toISOString() // On met à jour la date de mise à jour
            }
          : b // Sinon, on retourne le booking backend
      )
    ); // On met à jour le booking backend
    resetModal(); // On ferme le modal
  }; // On ferme le modal

  const resetModal = () => {
    setSelected(null); // On réinitialise la réservation sélectionnée
    setModalType(null);
  }; // On réinitialise le type de modal

  return (
    <div className="bg-radial from-[#961990] to-[#000000] p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Mes Réservations</h1>
          <p className="text-lg text-neutral-50">Gérez mes réservations</p>
        </header>

        {/* Liste des réservations */}
        {displayReservations.length === 0 ? (
          <div className="bg-neutral-700 border border-primary-purple-300 rounded-lg p-8 text-center shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <p className="text-neutral-50 text-lg">Vous n'avez aucune réservation pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayReservations.map((res) => (
              <MyBookingCard key={res.id} reservation={res} onModify={openModify} onCancel={openCancel} />
            ))}
          </div>
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
              label="Nombre de personnes"
              type="number"
              value={String(form.ticketCount)}
              onChange={(v) => setForm({ ...form, ticketCount: parseInt(v) || 1 })}
              min="1"
              max="50"
            />
            <div className="bg-secondary-500/20 border-2 border-secondary-300 rounded-lg p-4 text-center shadow-[0_0_12px_0_rgba(139,255,132,0.5)]">
              <p className="text-sm text-primary-purple-200 mb-1">Nouveau prix total</p>
              <p className="text-3xl font-bold text-secondary-200">{(form.ticketCount * TICKET_PRICE).toFixed(2)}€</p>
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
              <SummaryRow label="Personnes" value={String(form.ticketCount)} />
              <SummaryRow label="Prix total" value={`${(form.ticketCount * TICKET_PRICE).toFixed(2)}€`} highlight />
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
              <SummaryRow label="Personnes" value={String(selected.ticketCount)} />
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
interface InputProps { // Props pour le composant Input du formulaire de modification et d'annulation de réservation (date de visite et nombre de personnes) que l'on garde ici car il n'est pas réutilisé ailleurs.
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

const Input = ({ label, type, value, onChange, ...props }: InputProps) => (
  <div>
    <label className="block text-sm font-semibold text-primary-purple-200 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-neutral-700/50 border border-primary-purple-500 rounded-lg text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-purple-300 transition-all"
      required
      {...props} // On passe les props au composant input
    />
  </div>
);

const SummaryRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between bg-neutral-700/50 border border-primary-purple-500 rounded-lg p-3">
    <span className="text-primary-purple-200">{label}</span>
    <span className={`font-medium ${highlight ? "text-secondary-200 text-lg font-bold" : "text-neutral-50"}`}>{value}</span>
  </div>
);

const ActionButtons = ({ onCancel, onConfirm, confirmLabel, danger = false }: {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  danger?: boolean;
}) => (
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

const Modal = ({ 
  title, 
  icon, 
  borderColor = "border-primary-purple-300", 
  onClose, 
  children 
}: {
  title: string;
  icon?: React.ReactNode;
  borderColor?: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className={`bg-neutral-700 border-2 ${borderColor} rounded-lg shadow-[0_0_30px_0_rgba(180,130,255,0.6)] max-w-md w-full p-6`}>
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