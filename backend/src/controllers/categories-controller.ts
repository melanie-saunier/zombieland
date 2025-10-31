import { Response, Request } from "express";
import { Category } from "../models/association";
import { idSchema } from "../schemas";

export const categoryController = {
  
  /**
   * Returns all categories
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res: Response) {
    // On récupère toutes les catégories dans l'ordre alphabétique des nom des catégories
    const categories = await Category.findAll({
      order: [
        ["name", "ASC"]
      ],
    });
    
    // Si categories est vide, on retourne une erreur 404 avec un message d'erreur
    if (!categories || categories.length === 0) return res.status(404).json({ message:"No categories stored in the database"});
    
    res.status(200).json(categories);
  },

  /**
   * Returns a category by its id
   * @param req 
   * @param res 
   */
  async getById(req: Request, res: Response) {
    // On récupère l'id dans les param de req et le parse avec notre schéma id
    const { id } = idSchema.parse(req.params);

    // On récupère la catégorie correspondante à cet id
    const category = await Category.findByPk(id);

    // Si category est vide, on retourne une erreur 404 avec un message d'erreur
    if(!category) return res.status(404).json({ message:`No category found with id: ${id}`});

    res.status(200).json(category);
  },

}