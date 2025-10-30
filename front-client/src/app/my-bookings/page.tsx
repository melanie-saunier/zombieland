// src/app/my-bookings/page.tsx 

"use client";
import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import MyBookingCard from "@/components/MyBookingsCard"; // Composant affichant une carte de réservation
import { Booking, InputProps, ReservationDisplay } from "@/@types/my-bookings";
import { transformBookingToDisplay, formatDate, MAX_TICKETS_PER_BOOKING } from "@/utils/mybookingsUtils";

// Mock data aligné sur le backend
// TODO: Remplacer par fetch /api/bookings
const mockBackendBookings: Booking[] = [
  {
    id: 1,
    visit_date: new Date("2025-11-05"),
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
    visit_date: new Date("2025-10-25"), // Date passée
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
    visit_date: new Date("2025-11-15"),
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
    visit_date: new Date("2025-11-30"),
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

export default function MyBookingsPage() {
  // État backend (structure BDD)
  // Cet état représente les données “brutes” venant du backend.
  // TODO: fetch API
  const [backendBookings, setBackendBookings] = useState<Booking[]>(mockBackendBookings);
  
  // Transformation pour affichage
  // On convertit chaque objet Booking (structure BDD) en un objet plus simple ReservationDisplay,
  // plus adapté à l’affichage (par exemple : formatage des dates, calcul du prix total, etc.)
  const displayReservations = backendBookings.map(b => transformBookingToDisplay(b, TICKET_PRICE)); 

  // Réservation actuellement sélectionnée (pour modifier ou annuler)
  const [selected, setSelected] = useState<ReservationDisplay | null>(null);
  // Type de modal actuellement ouvert (“modify” pour modifier, “cancel” pour annuler, “confirm” pour confirmer la modif)
  const [modalType, setModalType] = useState<"modify" | "cancel" | "confirm" | null>(null);
  // Contenu du formulaire utilisé pour la modification d'une réservation
  const [form, setForm] = useState<{
    visitDate: Date;
    ticketCount: number;
  }>({
    visitDate: new Date(),
    ticketCount: 1,
  });

  // --- Fonctions d’ouverture des modales ---
  const openModify = (res: ReservationDisplay) => {
    setSelected(res);  // On mémorise la réservation sélectionnée
    setForm({ visitDate: res.visitDate, ticketCount: res.ticketCount }); // On pré-remplit le formulaire
    setModalType("modify"); // On ouvre la modale de modification
  };

  const openCancel = (res: ReservationDisplay) => {
    setSelected(res); // On sélectionne la réservation
    setModalType("cancel"); // On ouvre la modale d'annulation
  };

   // --- Gestion de la modification ---
  const handleModify = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setModalType("confirm"); // Passe à l’étape de confirmation
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
            }
          : b // Sinon, on garde la réservation inchangée
      )
    ); 
    // TODO: On met à jour le booking backend
    resetModal(); // On ferme les modales et on réinitialise
  }; 

  // --- Gestion de l’annulation ---
  const confirmCancel = () => {
    if (!selected) return; // Si aucune réservation n'est sélectionnée, on arrête la fonction
    
    // Mise à jour du status backend (PATCH /api/bookings/:id → status: false)
    setBackendBookings(
      backendBookings.map((b) => // On met à jour le booking backend
        b.id === selected.id // Si l'id du booking backend est égal à l'id de la réservation sélectionnée, on met à jour le booking
          ? { 
              ...b, // On met à jour le booking backend
              status: false, // Backend: false = cancelled
            }
          : b // Sinon, on garde la réservation inchangée
      )
    ); 
    // TODO: On met à jour le booking backend
    resetModal(); // On ferme les modales et on réinitialise
  }; 

  // --- Réinitialisation de l’état des modales --
  const resetModal = () => {
    setSelected(null); // On réinitialise la réservation sélectionnée
    setModalType(null); // On réinitialise le type de modal
  }; 

  return (
    <div className="bg-radial from-[#961990] to-[#000000] p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="title text-4xl md:text-5xl font-bold mb-2">Mes Réservations</h1>
          <p className="text-lg text-neutral-50">Gérez mes réservations</p>
        </header>

        {/* Liste des réservations */}
        {displayReservations.length === 0 ? (
          // Cas où l’utilisateur n’a aucune réservation
          <div className="bg-neutral-700 border border-primary-purple-300 rounded-lg p-8 text-center shadow-[0_0_12px_0_rgba(180,130,255,0.3)]">
            <p className="text-neutral-50 text-lg">Vous n'avez aucune réservation pour le moment.</p>
          </div>
        ) : (
          // Cas normal : on affiche les cartes de réservation
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayReservations.map((res) => (
              <MyBookingCard 
                key={res.id} 
                reservation={res} 
                onModify={openModify} 
                onCancel={openCancel} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Modale de modification */}
      {modalType === "modify" && selected && (
        <Modal title="Modifier la réservation" onClose={resetModal}>
          <form onSubmit={handleModify} className="space-y-6">
            {/* Champ date */}
            <fieldset>
              <label className="block text-sm font-semibold text-primary-purple-200 mb-2">
                Date de visite
              </label>
              <input
                type="date"
                value={form.visitDate}
                onChange={(v) => setForm({ ...form, visitDate: v })}
                min={new Date().toISOString().split("T")[0]} // Empêche les dates passées
                className="w-full px-4 py-3 bg-neutral-700/50 border border-primary-purple-500 rounded-lg text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-purple-300 transition-all"
                required
              />
            </fieldset>
            {/* Champ nombre de personnes */}
            <fieldset>
              <label className="block text-sm font-semibold text-primary-purple-200 mb-2">
                Nombre de personnes
              </label>
              <input
                type="number"
                value={String(form.ticketCount)}
                onChange={(v) => setForm({ ...form, ticketCount: parseInt(v) || 1 })}
                min="1"
                max={MAX_TICKETS_PER_BOOKING}
                className="w-full px-4 py-3 bg-neutral-700/50 border border-primary-purple-500 rounded-lg text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-purple-300 transition-all"
                required
              />
            </fieldset>
            {/* Calcul automatique du nouveau prix */}
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
              <SummaryRow label="Nouvelle date" value={form.visitDate} />
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
              <SummaryRow label="Date de visite" value={selected.visitDate} />
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