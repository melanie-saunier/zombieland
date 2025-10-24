import { Response, Request } from "express";
import { Category } from "../models/category";

export const categoryController = {
  
  /**
   * Returns all categories with their associated activities
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res: Response) {
    // On récupère toutes les catégories avec leurs activités, dans l'ordre alphabétique des nom des catégories
    const categories = await Category.findAll({
      order: [
        ["name", "ASC"]
      ],
      include: {
        association: "activities",
        through: { attributes: [] }
      }
    });
    
    // Si categories est vide, on retourne une erreur 404 avec un message d'erreur
    if (!categories) return res.status(404).json({ message:"No categories stored in the database"});
    
    res.status(200).json(categories);
  },

  /**
   * Returns a category by its id, including its activities
   * @param req 
   * @param res 
   */
  async getById(req: Request, res: Response) {
    // On récupère l'id dans les param de req
    const {id} = req.params;

    // On récupère la catégorie correspondante à cet id, avec ses activités
    const category = await Category.findByPk(id, {
      include: {
        association: "activities",
        through: { attributes: [] }
      }
    });

    // Si category est vide, on retourne une erreur 404 avec un message d'erreur
    if(!category) return res.status(404).json({ message:`No category found with id: ${id}`});

    res.status(200).json(category);
  },

}