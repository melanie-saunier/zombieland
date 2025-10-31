import { Request, Response } from "express";
import { loginSchema, registerSchema, updateMePasswordSchema, updateMeSchema } from "../schema/auth";
import { User } from "../models/association";
import argon2 from "argon2";
import { Role } from "../models/association";
import { generateAccessToken } from "../utils/jwt";
import { AuthRequest } from "../@types";
import { Op } from "sequelize";

export const authController = {
  // controller pour créer un compte 
  /**
   * Register
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
    
    // On génère notre JWT en incluant le userID et le nom du rôle de l'utilisateur qu'on vient de créer
    const token = generateAccessToken({ userId: userCreated.id, role: roleToSet.name});

    // On place notre token dans un cookie httpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  // TODO: mettre à true en production: en HTTPS
      sameSite: "strict", //protege des attaques CSRF, CORS, fuite de données intersites
      maxAge: 3 * 60 * 60 * 1000, // 3 heures
    }); 

    // Conversion en objet simple
    const user = userCreated.toJSON();
    // Suppression du mot de passe avant d’envoyer la réponse
    delete user.password;

    // Je renvoie les informations de l'utilisateur
    res.json(user);
  },

  /**
   * Login
   * @param req 
   * @param res 
   */
  async login(req: Request, res : Response) {
    const validation = loginSchema.safeParse(req.body);
    // Si la validation échoue :
    // error.issues contient la liste des erreurs détectées par Zod
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    const { email, password } = validation.data;

    // on récupère le user grâce à son mail:
    const userFound = await User.findOne({
      where: {email: email},
      include: [
        {
          association: "role",
          attributes: ["name"], // on ne récupère que le nom du rôle
        }
      ]
    });

    if(!userFound) return res.status(404).json({ error: "Bad credentials" });

    // Puis on vérifie que le MPD correspond avec celui en BDD
    const isValidPassword = await argon2.verify(userFound.password, password);

     // Si les 2 passwords ne correspondent pas, on renvoie une erreur 400
    if(!isValidPassword) return res.status(400).json({ error: "Bad credentials" });
    
    // On définit "roleName" avec le role de notre userFound. Si c'est undefined, ça sera "member" par défaut
    const roleName = userFound.role?.name || "member"; 
    // On génère notre JWT en incluant le userID et le nom du rôle de l'utilisateur qu'on vient de créer (ou "member" par défaut)
    const token = generateAccessToken({ userId: userFound.id, role: roleName});

    // On place notre token dans un cookie httpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  // TODO: mettre à true en production: en HTTPS
      sameSite: "strict",
      maxAge: 3 * 60 * 60 * 1000, // 3 heures
    }); 

    const user = userFound.toJSON();
    // Suppression du mot de passe avant d’envoyer la réponse
    delete user.password;

    res.json(user);
  },

  /**
   * Gets current User
   * @param req 
   * @param res 
   */
  async getCurrentUser(req: AuthRequest, res: Response) {
    // on récupère le user grâce à l'id stocké la request
    const user = await User.findByPk(req.user!.id, {
      attributes: { exclude: ["password"] }, // on enlève le password
      include: [
        {
          association: "role",
          attributes: ["name"],
        }
      ]
    });
    
    if (!user) return res.status(404).json({ error: "User not found" });
  
    res.json(user);
  },
  
  /**
   * Update a user (excluding password updates)
   * @param req 
   * @param res 
   */
  async updateMe (req: AuthRequest, res: Response) {
    const validation = updateMeSchema.safeParse(req.body);
    // Si la validation échoue :
    // error.issues contient la liste des erreurs détectées par Zod
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    const data = validation.data; //data: firstname, lastname, email

    // on récupère l'id du user connecté que l'on a dans le req.user
    const userId = req.user?.id; 
    if(!userId) return res.status(401).json({ error: "Unauthorized" });

    // on récupère le user en bdd grâce à son id 
    const user = await User.findByPk(userId);
    if(!user) return  res.status(404).json({ error: "User not found" });
    // Vérification de l’unicité de l’email
    // On vérifie si un utilisateur existe déjà avec cet email (autre que notre user qui veut modifier ses infos)
    const userWithSameEmail = await User.findOne({
      where: {
        email: data.email, 
        id: { [Op.ne]: user.id } // Op.ne = "not equal", donc on ignore l'utilisateur courant}
        } 
    });
    // Si un compte existe déjà, on renvoie une erreur 400
    if(userWithSameEmail) return res.status(400).json({ error: "An account with this email address already exists." });

    // On applique les modifications validées sur l’utilisateur trouvé
    const userUpdated = await user.update(data);

    // Conversion en objet simple
    const userJson = userUpdated.toJSON();

    // Suppression du mot de passe avant d’envoyer la réponse
    delete userJson.password;

    // Réponse JSON propre
    res.status(200).json(userJson);
  },
  
  /**
   * Update user's password
   * @param req 
   * @param res 
   */
  async updatePassword(req: AuthRequest, res: Response) {
    const validation = updateMePasswordSchema.safeParse(req.body);
    // Si la validation échoue :
    // error.issues contient la liste des erreurs détectées par Zod
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues.map(e => e.message) });

    const data = validation.data; //data: oldpassword, new password et confirmesPassword

    // on récupère l'id du user connecté que l'on a dans le req.user
    const userId = req.user?.id; 
    if(!userId) return res.status(401).json({ error: "Unauthorized" });

    // on récupère le user en bdd grâce à son id 
    const user = await User.findByPk(userId);
    if(!user) return  res.status(404).json({ error: "User not found" });

    const isPasswordValid = await argon2.verify(user.password, data.oldPassword);
    // Si les 2 passwords ne correspondent pas, on renvoie une erreur 400
    if(!isPasswordValid) return res.status(400).json({ message:`Bad credentials`});

    // On hache le nouveau mot de passe
    const hashedNewPassword = await argon2.hash(data.newPassword);

    // on modifie le password en bdd
    const userUpdated = await user.update({ password: hashedNewPassword });

    // Conversion en objet simple
    const userJson = userUpdated.toJSON();

    // Suppression du mot de passe avant d’envoyer la réponse
    delete userJson.password;

    // Réponse JSON propre
    res.status(200).json(userJson);
  },

  /**
   * Log out the user
   * @param req 
   * @param res 
   */
  logout(req: Request, res: Response) {
    // on détruit le cookie qui contient le token
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // TODO: mettre true en prod en HTTPS
      sameSite: "strict",
    });
    res.status(200).json({"message": "Logged out"});
  }
}