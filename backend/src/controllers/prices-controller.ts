import { Response, Request } from "express";
import { priceSchema, updatePriceSchema, idSchema } from "../schemas";
import { Price } from "../models/association";


export const priceController = {
  
  /**
   * Returns all prices
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res: Response) {
    // On récupère toutes les prices dans l'ordre alphabétique des labels
    const prices = await Price.findAll({
      order: [
        ["label", "ASC"]
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
    // On récupère l'id dans les param de req et le valider avec le schéma
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
  async createOne(req: Request, res: Response) {
    // Validation des données reçues avec Zod
    const validation = priceSchema.safeParse(req.body);

    // Si la validation échoue, on renvoie les erreurs
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    // Si la validation réussit, on récupère les données validées et typées
    const data = validation.data;

    // On crée un nouveau prix
    const price = await Price.create(data);
    
    res.status(201).json(price);
  },

  /**
   * Updates a price by its id
   * @param req 
   * @param res 
   */
  async updateOneById(req: Request, res: Response) {
    // Validation des données reçues avec Zod
    const validation = updatePriceSchema.safeParse(req.body);

    // Si la validation échoue, on renvoie les erreurs
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    // Si la validation réussit, on récupère les données validées et typées
    const data = validation.data;

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
   * Deletes a price by its id
   * @param req 
   * @param res 
   */
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