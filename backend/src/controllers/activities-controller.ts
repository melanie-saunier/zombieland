import { Response, Request } from "express";
import { Activity } from "../models/activity";

export const activityController = {
  
  /**
   * Returns all activities with their associated categories and levels
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res: Response) {
    // On récupère toutes les activitiés avec leurs catégories et leurs levels, dans l'ordre alphabétique des nom des catégories
    const activities = await Activity.findAll({
      order: [
        ["name", "ASC"]
      ],
      include: [
        {
          association: "categories",
          through: { attributes: [] }
        },
        {
          association: "levels",
          through: { attributes: [] }
        },
      ]
    });
    
    // Si activities est vide, on retourne une erreur 404 avec un message d'erreur
    if (!activities) return res.status(404).json({ message:"No activities stored in the database"});
    
    res.status(200).json(activities);
  },

  /**
   * Returns an activity by its id, including its category and its level
   * @param req 
   * @param res 
   */
  async getById(req: Request, res: Response) {
    // On récupère l'id dans les param de req
    const {id} = req.params;

    // On récupère l'activité correspondante à cet id, avec sa catégorie et son niveau
    const activity = await Activity.findByPk(id, {
      include: [
        {
          association: "categories",
          through: { attributes: [] }
        },
        {
          association: "levels",
          through: { attributes: [] }
        },
      ]
    });

    // Si activity est vide, on retourne une erreur 404 avec un message d'erreur
    if(!activity) return res.status(404).json({ message:`No activity found with id: ${id}`});

    res.status(200).json(activity);
  },

}