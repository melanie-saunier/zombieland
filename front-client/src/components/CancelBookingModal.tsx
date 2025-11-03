import { IMyBookingWithTotalPrice } from "@/@types/booking";

interface CancelBookingModalProps {
  selectedBooking: IMyBookingWithTotalPrice;
  onClose: () => void;
  handleCancelBooking: () => void;
  errorForm?: string | null;
}

export default function CancelBookingModal({
  selectedBooking,
  onClose,
  handleCancelBooking,
  errorForm,
}: CancelBookingModalProps) {
  return(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1E1630] text-neutral-50 p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
        <h2 className="text-2xl font-bold mb-4">Annuler la réservation</h2>

        <p className="text-sm text-primary-200 mb-6">
        Êtes-vous sûr de vouloir annuler la réservation du{" "}
          {new Date(selectedBooking.visit_date).toLocaleDateString()} pour{" "}
          {selectedBooking.nb_people} personne(s) ?
        </p>

        {errorForm && (
          <p className="text-red-500 text-sm mb-3">{errorForm}</p>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition"
          >
          Annuler
          </button>
          <button
            type="button"
            onClick={handleCancelBooking}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-400 transition"
          >
          Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}