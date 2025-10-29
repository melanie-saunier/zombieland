import { User } from "../models/user"
import { Response, Request } from "express";
import { idSchema } from "../schema";
import { updateUserPasswordSchema, updateUserSchema, userSchema } from "../schema/user";
import argon2 from "argon2";
import { is } from "zod/v4/locales";

export const userController = {
  /**
   * Returns all users with their associated role names
   * @param req 
   * @param res 
   */
  async getAll(req: Request, res : Response) {
    // on récupère les users avec leur rôles (nom) dans l'ordre alphabétique des noms de famille
    const users = await User.findAll({
      order: [
        ["lastname", "ASC"]
      ],
      include: {
        association: "role", 
        attributes: ["name"]
      }
    });

    // Si users est vide, on retourne une erreur 404 avec un message d'erreur
    if(!users || users.length === 0) return res.status(404).json({ message:"No users stored in the database"});
    res.status(200).json(users);
  },
  
  /**
   * Returns a user by its id, including its role name
   * @param req 
   * @param res 
   */
  async getById(req: Request, res : Response) {
    // On récupère l'id dans les param de req et le parse avec notre schéma id
    const { id } = idSchema.parse(req.params);
    
    // On récupère le user correspondant à cet id, avec son rôle (nom)
    const user = await User.findByPk(id, {
      include: {
        association: "role", 
        attributes: ["name"]
      }
    });

    // Si user est vide, on retourne une erreur 404 avec un message d'erreur
    if(!user) return res.status(404).json({ message:`No user found with id: ${id}`});

    res.status(200).json(user);
  },

  /**
   * Create a user
   * @param req 
   * @param res 
   */
  async createUser (req: Request, res : Response) {
    // Validation des données reçues avec Zod
    // La méthode safeParse vérifie que req.body respecte le schéma défini (userSchema)
    // sans lancer d'erreur : elle renvoie un objet { success, data } ou { success, error }
    const validation = userSchema.safeParse(req.body);

    // Si la validation échoue :
    // error.issues contient la liste des erreurs détectées par Zod
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    // Si la validation réussit, on récupère les données validées et typées sans confirmedPassword
    const data = validation.data;
    const { confirmedPassword, ...userData } = data;

    // Vérification de l’unicité de l’email
    // On vérifie si un utilisateur existe déjà avec cet email
    const userWithSameEmail = await User.findOne({
      where: {email: data.email}
    });
    
    // Si un compte existe déjà, on renvoie une erreur 400
    if(userWithSameEmail) return res.status(400).json({ error: "An account with this email address already exists." });
    
    // Sécurisation du mot de passe
    // On chiffre (hash) le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await argon2.hash(data.password);

    // Création du nouvel utilisateur
    // On insère l'utilisateur en base avec le mot de passe haché
    const userCreated = await User.create({
      ...userData,
      password: hashedPassword,
    });
    
    // On renvoie l'utilisateur créé (sans exposer le mot de passe)
    res.status(201).json({
      ...userCreated,
      password: undefined
    })
  },
  
  /**
   * Update an existing user (excluding password updates)
   * @param req 
   * @param res 
   */
  async updateUser(req: Request, res : Response) {
    // On récupère l'id dans les param de req et le parse avec notre schéma id
    const { id } = idSchema.parse(req.params);

    // Validation des données reçues avec Zod
    const validation = updateUserSchema.safeParse(req.body);

    // Si la validation échoue :
    // error.issues contient la liste des erreurs détectées par Zod
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    // Si la validation réussit, on récupère les données validées et typées
    const data = validation.data;
    
    // On vérifie que l’utilisateur existe avant de tenter une mise à jour
    const userFound = await User.findByPk(id);

    // Si aucun utilisateur n’est trouvé, on renvoie une erreur 404
    if(!userFound) return res.status(404).json({ message:`No user found with id: ${id}`});

    // TODO: ajouter la vérification du mail 

    // On applique les modifications validées sur l’utilisateur trouvé
    const userUpdated = await userFound.update(data);

    // On renvoie l’utilisateur mis à jour
    res.json({
      ...userUpdated,
      password: undefined
    });
  },

  /**
   * Delete a user
   * @param req 
   * @param res 
   */
  async deleteUser(req: Request, res : Response) {
    // On récupère l'id dans les param de req et le parse avec notre schéma id
    const { id } = idSchema.parse(req.params);

    // On vérifie que l’utilisateur existe avant de tenter une suppression
    const userFound = await User.findByPk(id);

    // Si aucun utilisateur n’est trouvé, on renvoie une erreur 404
    if(!userFound) return res.status(404).json({ message:`No user found with id: ${id}`});

    // On supprime l’utilisateur trouvé
    await userFound.destroy();

    res.status(204).json();
  },

  /**
   * Update a user's password
   * @param req 
   * @param res 
   */
  async updatePassword(req: Request, res : Response) {
    // On récupère l'id dans les param de req et le parse avec notre schéma id
    const { id } = idSchema.parse(req.params);

    // Validation des données reçues avec Zod : oldpassword, nouveau et confirmation
    const validation = updateUserPasswordSchema.safeParse(req.body);

    // Si la validation échoue :
    // error.issues contient la liste des erreurs détectées par Zod
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    // Si la validation réussit, on récupère les données validées et typées
    const data = validation.data;

    // On vérifie que l’utilisateur existe avant de tenter une mise à jour du mot de passe
    const userFound = await User.findByPk(id);

    // Si aucun utilisateur n’est trouvé, on renvoie une erreur 404
    if(!userFound) return res.status(404).json({ message:`No user found with id: ${id}`});

    // On vérifie que le old password dans data soit identique à celui en BDD avec argon2
    const isPasswordValid = await argon2.verify(userFound.password, data.oldPassword);
    
    // Si les 2 passwords ne correspondent pas, on renvoie une erreur 400
    if(!isPasswordValid) return res.status(400).json({ message:`Bad credentials`});
    
    // On hache le nouveau mot de passe
    const hashedNewPassword = await argon2.hash(data.newPassword);

    // on modifie le password en bdd
    const userUpdated = await userFound.update({ password: hashedNewPassword });

    res.json({
      ...userUpdated,
      password: undefined
    });
  },
 };

