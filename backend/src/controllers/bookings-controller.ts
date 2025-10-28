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

    // On récupère les informations du body
    const data = bookingSchema.parse(req.body);

     // On crée un nouveau booking
    const booking = await Booking.create(data);
    
    res.status(201).json(booking);
  },

  /**
   * Updates a booking
   * @param req 
   * @param res 
   */

   // Mettre à jour un booking par son id
  async updateOneById(req: Request, res: Response) {
    
    // on récupère les informations à mettre à jour du body
    const data = updateBookingSchema.parse(req.body);

    // on récupère le id du booking à mettre à jour 
    const { id } = idSchema.parse(req.params);

    // on récupère le booking par son id
    const booking = await Booking.findByPk(id);

      // Si le booking n'existe pas, on retourne une erreur 404 avec un message d'erreur
    if(!booking) return res.status(404).json({ message:`No booking found with id: ${id}`});
    
    // le booking est mise à jour
    await booking.update(data);

    res.status(200).json(booking);
  },

  /**
   * deletes a booking
   * @param req 
   * @param res 
   */

  // Supprimer un booking par son id
  async deleteOneById(req: Request, res: Response) {
    const { id } = idSchema.parse(req.params);

    // on récupère le booking par son id
    const booking = await Booking.findByPk(id);

    // Si le booking n'existe pas, on retourne une erreur 404 avec un message d'erreur
    if(!booking) return res.status(404).json({ message:`No booking found with id: ${id}`});

    await booking.destroy();

    res.status(204).json();
  },

  // Récuperer toutes les bookings d'un utilisateur
  async getAllBookingsForUser(req: Request, res: Response) {
    // récuperer ET valider l'id de l'utilisateur'
    const { id } = idSchema.parse(req.params);

    // interroger la bdd pour récuperer l'utilisateur qui porte cet id
    const user = await Booking.findAll({
      where: { user_id: id }, // filtrer par l'id de la liste
      
      order: [
        ["visit_date", "ASC"],
        ["created_at", "DESC"],
      ],
    });

    // est ce que cet utilisateur existe ?
    if(!user) return res.status(404).json({ message:`l'utilisateur n'existe pas`});

    // retourner la liste
    res.json(user);
  }


}