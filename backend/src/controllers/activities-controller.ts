import { Response, Request } from "express";
import { sequelize, Activity } from "../models/association";

export const activityController = {
  
  /**
   * Returns all activities with their associated categories and levels
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res: Response) {
    // On récupère toutes les activitiés avec leurs catégories et leurs levels, dans l'ordre alphabétique des nom des activités
    const activities = await Activity.findAll({
      order: [
        ["name", "ASC"]
      ],
      include: [
        { association: "category" },
        { association: "level" }
      ]
    });
    
    // Si activities est vide, on retourne une erreur 404 avec un message d'erreur
    if (!activities || activities.length === 0) return res.status(404).json({ message:"No activities stored in the database"});
    
    res.status(200).json(activities);
  },

  /**
   * Returns an activity by its id, including its category and its level
   * @param req 
   * @param res 
   */
  async getById(req: Request, res: Response) {
    // On récupère l'id dans les param de req et le parseInt
    const id = parseInt(req.params.id, 10);

    // On récupère l'activité correspondante à cet id, avec sa catégorie et son niveau
    const activity = await Activity.findByPk(id, {
      include: [
        { association: "category" },
        { association: "level" }
      ]
    });

    // Si activity est vide, on retourne une erreur 404 avec un message d'erreur
    if(!activity) return res.status(404).json({ message:`No activity found with id: ${id}`});

    res.status(200).json(activity);
  },

  /**
   * Returns the most scary activities (level.value = 3) with their associated categories and levels
   * @param req 
   * @param res 
   */
  async getRandomedScaryActivities(req: Request, res: Response) {
    // Récupération du paramètre 'limit' depuis la query string
    // Exemple : /activities/most-scary?limit=4
    const { limit } = req.query;

    // Conversion de 'limit' en nombre entier
    // Si 'limit' n'est pas fourni ou invalide, on prend 4 par défaut
    const appliedLimit = parseInt(limit as string, 10) || 4;

    const scaryActivities = await Activity.findAll({
      include: [
        { association: "category" },
        { 
          association: "level",
          where: { value: 3 } // filtre pour n'afficher que les activités difficiles
        }
      ], 
      order: sequelize.random(), // mélange aléatoire
      limit: appliedLimit, // limite du nombre de résultats
    });
    
    // Si scaryActivities est vide, on retourne une erreur 404 avec un message d'erreur
    if (!scaryActivities || scaryActivities.length === 0) return res.status(404).json({ message:"No activities stored in the database"});
    
    res.status(200).json(scaryActivities);
    },

}