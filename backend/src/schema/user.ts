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
    // check caractère spécial
    .regex(/^(?=.*[!@#$%^&*]).*$/, "Le mot de passe doit contenir au moins un caractère spécial"),
  role_id: z.coerce.number().int().positive(),
});

export type userSchemaInput = z.infer<typeof userSchema>;

// Omit permet de retirer des champs du schéma
// Schéma d'un utilisateur sans le MDP (pour l'update)
export const updateUserSchema = userSchema.omit({
  // Ici je retire le mot de passe
  password: true
});

export type updateUserInput = z.infer<typeof updateUserSchema>;

// Schéma d'un MDP d'un utilisateur (pour l'update du MDP)
export const updateUserPasswordSchema = userSchema.omit({
  lastname: true,
  firstname: true,
  email: true,
  role_id: true,
});

export type updateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;