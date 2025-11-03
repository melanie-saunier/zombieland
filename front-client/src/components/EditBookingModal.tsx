import { IMyBookingWithTotalPrice } from "@/@types/booking";

interface EditBookingModalProps {
  selectedBooking: IMyBookingWithTotalPrice;
  onClose: () => void;
  handleUpdateBooking: (e: React.FormEvent<HTMLFormElement>) => void;
  errorForm?: string | null;
}


export default function EditBookingModal({
  selectedBooking,
  onClose,
  handleUpdateBooking,
  errorForm,
}: EditBookingModalProps) {

  

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1E1630] text-neutral-50 p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
        <h2 className="text-2xl font-bold mb-4">Modifier la réservation</h2>

        <p className="text-sm text-primary-200 mb-6">
              Réservation du {new Date(selectedBooking.visit_date).toLocaleDateString()}
        </p>
        {errorForm && (
          <p className="text-red-500 text-sm">{errorForm}</p>
        )}
            
        <form
          onSubmit={handleUpdateBooking}
          className="space-y-4"
        >
          <label className="block">
            <span className="text-sm">Nombre de personnes</span>
            <input
              name="nb_people"
              type="number"
              min={1}
              max={15}
              defaultValue={selectedBooking.nb_people}
              className="w-full mt-1 p-2 rounded bg-neutral-800 border border-primary-300"
            />
          </label>
              
          <label className="block">
            <span className="text-sm">Date de visite</span>
            <input
              name="visit_date"
              type="date"
              // split T pour retirer l'heure et TZ ... et juste ave  une date 2025-11-02
              defaultValue={new Date(selectedBooking.visit_date).toISOString().split("T")[0]}
              className="w-full mt-1 p-2 rounded bg-neutral-800 border border-primary-300"
            />
          </label>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600 transition"
            >
            Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary-500 hover:bg-primary-400 transition"
            >
            Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}