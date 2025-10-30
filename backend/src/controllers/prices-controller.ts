import { Response, Request } from "express";
import { priceSchema, updatePriceSchema, idSchema } from "../schemas/index.js";
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
      order: [
        ["id", "ASC"]
      ],  
  });
    
    // Si price est vide, on retourne une erreur 404 avec un message d'erreur
    if (!prices || prices.length === 0) return res.status(404).json({ message:"No prices stored in the database"});
    
    res.status(200).json(prices);
  },

  /**
   * Returns a price by its id
   * @param req 
   * @param res 
   */
  async getById(req: Request, res: Response) {
    // On récupère l'id dans les param de req et le parseInt
    const { id } = idSchema.parse(req.params);

    // On récupère le price correspondante à cet id
    const price = await Price.findByPk(id)
    
    // Si price n'existe pas, on retourne une erreur 404 avec un message d'erreur
    if(!price) return res.status(404).json({ message:`No price found with id: ${id}`});

    res.status(200).json(price);
  },
  /**
   * Creates a new price
   * @param req 
   * @param res 
   */
   // Créer un nouveau prix
  async createOne(req: Request, res: Response) {

    // On récupère les informations du body
    const data = priceSchema.parse(req.body);

     // On crée un nouveau prix
    const price = await Price.create(data);
    
    res.status(201).json(price);
  },

  /**
   * Updates a price
   * @param req 
   * @param res 
   */

   // Mettre à jour un price par son id
  async updateOneById(req: Request, res: Response) {
    
    // on récupère les informations à mettre à jour du body
    const data = updatePriceSchema.parse(req.body);

    // on récupère le id du prix à mettre à jour 
    const { id } = idSchema.parse(req.params);

    // on récupère le prix par son id
    const price = await Price.findByPk(id);

      // Si le prix n'existe pas, on retourne une erreur 404 avec un message d'erreur
    if(!price) return res.status(404).json({ message:`No price found with id: ${id}`});
    
    // le prix est mise à jour
    await price.update(data);

    res.status(200).json(price);
  },

  /**
   * deletes a price
   * @param req 
   * @param res 
   */

  // Supprimer un price par son id
  async deleteOneById(req: Request, res: Response) {
    const { id } = idSchema.parse(req.params);

    // on récupère le prix par son id
    const price = await Price.findByPk(id);

    // Si le prix n'existe pas, on retourne une erreur 404 avec un message d'erreur
    if(!price) return res.status(404).json({ message:`No price found with id: ${id}`});

    await price.destroy();

    res.status(204).json();
  }, 
}