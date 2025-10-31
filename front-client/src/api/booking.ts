import { IBooking, IBookingInput } from "@/@types/booking";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const bookingApi = {
  createBooking: async (data: IBookingInput): Promise<IBooking | null> => {
    try {
      const res = await axios.post(`${API_URL}/bookings`, data, { withCredentials: true });
      const bookingData = res.data;
      
      if (!bookingData) return null;
      
      const booking: IBooking = {
        visit_date: bookingData.visit_date,
        nb_people: bookingData.nb_people,
        status: bookingData.status,
        user_id: bookingData.user_id,
      };
  
      return booking;
  
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // const message = err.response?.data?.error || "Erreur lors de la création de la réservation";
        // throw new Error(message); // on remonte l'erreur pour le handle
        const message =
          err.response?.data?.message ||
          (Array.isArray(err.response?.data?.errors)
            ? err.response.data.errors.join(", ")
            : "Erreur lors de la création de la réservation");
        throw new Error(message);
      }
      throw new Error("Erreur inconnue");
    }
  },
};