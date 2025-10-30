import { Request, Response } from "express";
import { registerSchema } from "../schema/auth";
import { User } from "../models/association";
import argon2 from "argon2";
import { Role } from "../models/association";

export const authController = {
  // controller pour créer un compte 
    /**
   * register
   * @param req 
   * @param res 
   */
  async register(req: Request, res : Response) {
    // Validation des données reçues avec Zod
    // La méthode safeParse vérifie que req.body respecte le schéma défini (userSchema)
    // sans lancer d'erreur : elle renvoie un objet { success, data } ou { success, error }
    const validation = registerSchema.safeParse(req.body);
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

    // on récupère le role "member" en BDD pour l'attribuer à l'utilisateur
    const roleToSet = await Role.findOne({
      where: {name: "member"}
    });
    if(!roleToSet) return res.status(404).json({ error: "Role 'member' not found" });
    
    // Création du nouvel utilisateur
    // On insère l'utilisateur en base avec le mot de passe haché
    const userCreated = await User.create({
      ...userData,
      password: hashedPassword,
      role_id: roleToSet.id
    });
    // TODO: JWT +cookie à ajouter


        // Je renvoie les informations
    res.json({
      ...userCreated,
      // Je ne veux pas renvoyer le mot de passe
      // Je le définis à undefined, il ne sera donc pas renvoyer par express
      password: undefined,
    });
  },
}