import { IMyBookingWithTotalPrice } from "@/@types/booking";
import { InfoItemProps } from "@/@types/my-bookings";
import { formatDate } from "@/utils/mybookingsUtils";
import { Calendar, Users } from "lucide-react";

interface MyBookingProps {
  reservation: IMyBookingWithTotalPrice;
  onEdit: () => void;
  onCancel: () => void;
}


export default function MyBookingsCard({reservation, onEdit, onCancel}: MyBookingProps) {
  const today = new Date();
  const visitDate = new Date(reservation.visit_date);

  let statusLabel = "";
  let statusColor = "";
  // on vérifie le status de la réservation est on affiche une etiquette en fonction de la de visite et de son status
  if (!reservation.status) {
    // Réservation annulée
    statusLabel = "Annulée";
    statusColor = "bg-red-900/30 text-red-400 border-red-500";
  } else if (visitDate < today) {
    // Visite passée
    statusLabel = "Passée";
    statusColor = "bg-neutral-700/50 text-neutral-50/70 border-neutral-700";
  } else {
    // Réservation confirmée
    statusLabel = "Confirmée";
    statusColor = "bg-secondary-500/20 text-secondary-200 border-secondary-300";
  }
  // si le statue est true donc confirmé et que la date est supérieur à today (donc pas encore passée, on peut modifier avec les boutons)
  const displayButton = reservation.status && visitDate >= today;
  
  return (
    <div className="bg-[#201041] border border-primary-300 rounded-lg p-6 shadow-[0_0_12px_0_rgba(180,130,255,0.3)] hover:shadow-[0_0_20px_0_rgba(180,130,255,0.5)] transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Informations */}
        <div className="flex-1 space-y-4">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusColor}`}
          >
            {statusLabel}
          </span>                                    
                                
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <InfoItem
              icon={<Calendar />}
              label="Date de réservation"
              value={formatDate(reservation.created_at)}
              color="text-primary-300"
            />
            <InfoItem
              icon={<Calendar />}
              label="Date de visite"
              value={formatDate(reservation.visit_date)}
              color="text-secondary-200"
            />
            <InfoItem
              icon={<Users />}
              label="Nombre de personnes"
              value={`${reservation.nb_people} personne${reservation.nb_people > 1 ? "s" : ""}`}
            />
            <InfoItem
              icon={<span>€</span>}
              label="Prix total"
              value={`${reservation.total_price.toFixed(2)}€`}
              highlight
            />
          </div>
        </div>

        {displayButton && (
          <div className="flex flex-col gap-3 lg:w-48">
            <button
              className="w-full px-4 py-3 button_activity text-neutral-50 font-bold rounded-lg hover:scale-105 transition-all"
              // quand on clique on passe l'affichage de la modal a true
              onClick={onEdit}
            >
                Modifier
            </button>
            <button
              className={"w-full px-4 py-3 rounded-lg font-bold border transition-all"}
              onClick={onCancel}
            >
                Annuler
            </button>
  
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
  color = "text-primary-200",
  highlight = false,
}: InfoItemProps) => (
  <div className="flex items-start gap-3">
    <div className={`h-5 w-5 mt-0.5 flex items-center justify-center ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-primary-200">{label}</p>
      <p className={`font-medium ${highlight ? "text-secondary-200 text-lg font-bold" : "text-neutral-50"}`}>
        {value}
      </p>
    </div>
  </div>
);