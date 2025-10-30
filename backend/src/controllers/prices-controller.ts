import { Response, Request } from "express";
import { priceSchema, updatePriceSchema, idSchema } from "../schemas/index.js";
import { User } from "../models/association.js";
import { Price } from '../models/association.js';


export const priceController = {
  
  /**
   * Returns all categories
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res: Response) {
    // On récupère toutes les prices dans l'ordre d'id'
    const prices = await Price.findAll({
      include: [{ 
              association: "bookingPrices",
              attributes: ["applied_price"],
              include: [{
                    association: "price",
                    attributes: ["label", "value"]
                  },]              
               }],
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
    const booking = await Booking.findByPk(id,{
      include: [{ 
              association: "bookingPrices",
              attributes: ["applied_price"],
              include: [{
                    association: "price",
                    attributes: ["label", "value"]
                  },]              
               }],
      order: [
        ["visit_date", "ASC"]
      ],  
  })
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

  /**
   * deletes a booking
   * @param req 
   * @param res 
   */

  // Récuperer toutes les bookings d'un utilisateur
  async getAllBookingsForUser(req: Request, res: Response) {

    // récuperer ET valider l'id de l'utilisateur'
    const { id } = idSchema.parse(req.params);

    // vérifier que l'utilisateur existe
    const userExists = await User.findByPk(id);
    
    if(!userExists) return res.status(404).json({ message: `No user found with id: ${id}`})

    // interroger la bdd pour récuperer l'utilisateur qui porte cet id
    const bookings = await Booking.findAll({
      where: { user_id: id }, // filtrer par l'id de la liste
      include: [{ 
              association: "bookingPrices",
              attributes: ["applied_price"],
              include: [{
                    association: "price",
                    attributes: ["label", "value"]
                  },]              
               }],
      order: [
        ["visit_date", "ASC"]
      ],  
  });

    // existe t'il des bookings pour cette utilisateur ?
    if(!bookings) return res.status(404).json({ message: `The user with the id: ${id} has no bookings`});

    // retourner la liste
    return res.status(200).json(bookings);
  }
}