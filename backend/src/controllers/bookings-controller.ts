import { Response, Request } from "express";
import { bookingSchema, updateBookingSchema, idSchema, updateBookingByUserSchema } from "../schemas/";
import { User, Booking, Price, BookingPrice, sequelize } from "../models/association";

export const bookingController = {
  
  /**
   * Returns all categories
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res: Response) {
    // On récupère toutes les bookings dans l'ordre de la date de visite
    const bookings = await Booking.findAll({
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
    // On récupère l'id dans les param de req et le valider avec le schéma
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
    });

    // Si booking est vide, on retourne une erreur 404 avec un message d'erreur
    if(!booking) return res.status(404).json({ message:`No booking found with id: ${id}`});

    res.status(200).json(booking);
  },

  /**
   * Creates a new booking
   * @param req 
   * @param res 
   */
  async createOne(req: Request, res: Response) {
    // Validation des données reçues avec Zod
    const validation = bookingSchema.safeParse(req.body);

    // Si la validation échoue, on renvoie les erreurs
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    // Si la validation réussit, on récupère les données validées et typées
    const data = validation.data;
    
    // Transaction pour garantir la cohérence
    const booking = await sequelize.transaction(async (t) => {

      // On crée un nouveau booking
      const newBooking  = await Booking.create(data, { transaction: t });    

      // Recherche du tarif "Tarif unique"
      const price = await Price.findOne({
        where: { label: "Tarif unique" },
        transaction: t,
      });

      if (!price) return res.status(400).json({ message:"No price found with label: Tarif unique"});

      // Création de la ligne dans la table de liaison
      await BookingPrice.create(
        {
          price_id: price.id,
          booking_id: newBooking.id,
          applied_price: price.value,
        },
        { transaction: t }
      );

      // On retourne la réservation pour la réponse
      return newBooking ;
    });
    
    // La transaction est automatiquement commit si tout s’est bien passé
    // (et rollback automatique en cas d’erreur)
    res.status(201).json(booking);
  },

  /**
   * Updates a booking
   * @param req 
   * @param res 
   */
  async updateOneById(req: Request, res: Response) {
    // Validation des données reçues avec Zod
    const validation = updateBookingSchema.safeParse(req.body);

    // Si la validation échoue, on renvoie les erreurs
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    // Si la validation réussit, on récupère les données validées et typées
    const data = validation.data;

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
   * Allows a user to update visit_date or nb_people only
   * @param req 
   * @param res 
   */
  async updateBookingForUser(req: Request, res: Response) {
    const { id } = idSchema.parse(req.params);
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: `No booking found with id: ${id}` });
    }

    // Validation des données reçues avec Zod
    const validation = updateBookingByUserSchema.safeParse(req.body);

    // Si la validation échoue, on renvoie les erreurs
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    // Si la validation réussit, on récupère les données validées et typées
    const data = validation.data;

    await booking.update({ visit_date: data.visit_date, nb_people: data.nb_people });

    return res.status(200).json(booking);
  },

  /**
   * Deletes a booking
   * @param req 
   * @param res 
   */
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
   * Returns all the bookings made by a user
   * @param req 
   * @param res 
   */
  async getAllBookingsForUser(req: Request, res: Response) {
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
  }, 

  /**
   * Cancels a booking (set status = false)
   * @param req 
   * @param res 
   */
  async cancelBooking(req: Request, res: Response) {
    const { id } = idSchema.parse(req.params);

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: `No booking found with id: ${id}` });
    }
    
    // Vérifier si la date de visite est déjà passée
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ignorer l'heure pour comparer seulement le jour
    const visitDate = new Date(booking.visit_date);
    visitDate.setHours(0, 0, 0, 0);

    if (visitDate < today) {
      return res.status(400).json({ message: "Cannot cancel a booking for a past visit date." });
    }

    // Si le statut est déjà false, inutile d'annuler à nouveau
    if (booking.status === false) {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    // Mettre à jour le statut
    await booking.update({ status: false });

    // le booking updated
    return res.status(200).json(booking);
  }
}