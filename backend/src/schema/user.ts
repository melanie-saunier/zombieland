import z from "zod";

// Schéma d'un utilisateur
export const userSchema = z.object({
  email: z.email(),
  lastname: z.string().trim().min(1),
  firstname: z.string().trim().min(1),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    // check minuscule
    .regex(/^(?=.*[a-z]).*$/, "Le mot de passe doit contenir au moins une lettre minuscule")
    // check majuscule
    .regex(/^(?=.*[A-Z]).*$/, "Le mot de passe doit contenir au moins une lettre majuscule")
    // check chiffre
    .regex(/^(?=.*\d).*$/, "Le mot de passe doit contenir au moins un chiffre")
    // check caractère spécial
    .regex(/^(?=.*[!@#$%^&*]).*$/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmedPassword: z.string(),
  role_id: z.coerce.number().int().positive(),
})
// Vérifie que les deux mots de passe sont identiques
.refine((data) => data.password === data.confirmedPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmedPassword"], // indique où afficher l'erreur
});

// .refine() est une méthode de Zod qui permet d’ajouter une validation personnalisée
// au niveau de tout l’objet, idéale pour comparer plusieurs champs entre eux.
// Le premier paramètre est une fonction qui reçoit les données validées (data)
// et retourne true si la condition est respectée (ici si password === confirmedPassword).
// Le second paramètre est un objet qui définit le message d’erreur à renvoyer
// et la propriété "path" indique sur quel champ (confirmedPassword) rattacher cette erreur.

export type userSchemaInput = z.infer<typeof userSchema>;

// Omit permet de retirer des champs du schéma
// Schéma d'un utilisateur sans le MDP (pour l'update)
export const updateUserSchema = userSchema.omit({
  // Ici je retire le mot de passe
  password: true,
  confirmedPassword: true
});

export type updateUserInput = z.infer<typeof updateUserSchema>;

// Schéma d'un MDP d'un utilisateur (pour l'update du MDP)
export const updateUserPasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    // check minuscule
    .regex(/^(?=.*[a-z]).*$/, "Le mot de passe doit contenir au moins une lettre minuscule")
    // check majuscule
    .regex(/^(?=.*[A-Z]).*$/, "Le mot de passe doit contenir au moins une lettre majuscule")
    // check chiffre
    .regex(/^(?=.*\d).*$/, "Le mot de passe doit contenir au moins un chiffre")
    // check caractère spécial
    .regex(/^(?=.*[!@#$%^&*]).*$/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmedPassword: z.string(),
})
// Vérifie que les deux mots de passe sont identiques
.refine((data) => data.newPassword === data.confirmedPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmedPassword"], // indique où afficher l'erreur
});

export type updateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;