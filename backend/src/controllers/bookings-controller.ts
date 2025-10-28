import { Response, Request } from "express";
import { Booking } from "../models/booking";
import { bookingSchema, updateBookingSchema, idSchema } from "../schemas/index.js";


export const bookingController = {
  
  /**
   * Returns all categories
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res: Response) {
    // On récupère toutes les bookings dans l'ordre du id des bookings
    const bookings = await Booking.findAll({
      order: [
        ["visit_date", "ASC"]
      ],
    });
    
    // Si booking est vide, on retourne une erreur 404 avec un message d'erreur
    if (!bookings || bookings.length === 0) return res.status(404).json({ message:"No bookings stored in the database"});
    
    res.status(200).json(bookings);
  },

  /**
   * Returns a booking by its id
   * @param req 
   * @param res 
   */
  async getById(req: Request, res: Response) {
    // On récupère l'id dans les param de req et le parseInt
    const { id } = idSchema.parse(req.params);

    // On récupère le booking correspondante à cet id
    const booking = await Booking.findByPk(id);

    // Si booking est vide, on retourne une erreur 404 avec un message d'erreur
    if(!booking) return res.status(404).json({ message:`No booking found with id: ${id}`});

    res.status(200).json(booking);
  },

  /**
   * Creates a new booking
   * @param req 
   * @param res 
   */
   // Créer une nouvelle Booking
  async createOne(req: Request, res: Response) {
    const data = bookingSchema.parse(req.body);
    const booking = await Booking.create(data);

    res.status(201).json(booking);
  },

}