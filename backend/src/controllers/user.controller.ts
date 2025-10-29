import { User } from "../models/user"
import { Response, Request } from "express";
import { idSchema } from "../schema";
import { userSchema } from "../schema/user";
import argon2 from "argon2";

export const userController = {
  /**
   * Returns all users with their associated role names
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res : Response) {
    // on récup les users avec leur rôles et dans l'ordre alphabétique des noms de famille
    const users = await User.findAll({
      order: [
        ["lastname", "ASC"]
      ],
      include: {
        association: "role", 
        attributes: ["name"]
      }
    });
    //si pas de user on retourne une erreur 404
    if(!users || users.length === 0) return res.status(404).json({ message:"No users stored in the database"});
    res.status(200).json(users);
  },
  
  /**
   * Returns a user by its id, including its role name
   * @param req 
   * @param res 
   */
  async getById(req: Request, res : Response) {
    // On récupère l'id dans les param de req et le parseInt
    const { id } = idSchema.parse(req.params);

    const user = await User.findByPk(id, {
      include: {
        association: "role", 
        attributes: ["name"]
      }
    });
    //si pas de user on retourne une erreur 404
    if(!user) return res.status(404).json({ message:`No user found with id: ${id}`});

    res.status(200).json(user);
  },

  /**
   * Create a user
   * @param req 
   * @param res 
   */
  async createUser (req: Request, res : Response) {
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
      // error.issues contient la liste des erreurs
      return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });
    }
    const data = validation.data;

    const userWithSameEmail = await User.findOne({
      where: {email: data.email}
    });
    if(userWithSameEmail) {
      return res.status(400).json({ error: "An account with this email address already exists." });
    }
    //on hash le mot de passe
    const hashedPassword = await argon2.hash(data.password);

    const userCreated = await User.create({
      ...data,
      password: hashedPassword,
    });
    
    res.status(201).json({
      ...userCreated,
      password: undefined
    })
  },

 }