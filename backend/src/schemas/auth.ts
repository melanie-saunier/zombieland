import z from "zod";
// schema de validation de création de compte
export const registerSchema = z.object({
  email: z.email("Le format de l'email n'est pas valide"),
  lastname: z.string().trim().min(1, "Le nom de famille est obligatoire"),
  firstname: z.string().trim().min(1,  "Le prénom est obligatoire"),
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
})
.refine((data) => data.password === data.confirmedPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmedPassword"], // indique où afficher l'erreur
});

export type registerSchemaInput = z.infer<typeof registerSchema>;

// schema de validation pour le login
export const loginSchema = z.object({
  email: z.email("Le format de l'email n'est pas valide"),
  password: z.string(),
})

export type loginSchemaInput = z.infer<typeof loginSchema>;

// schema de validation pour modification de compte (sans mdp)
export const updateMeSchema = registerSchema.omit({
  password: true,
  confirmedPassword: true
});


export const updateMePasswordSchema = z.object({
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

// schema de validation de l'email
export const emailSchema = z.object({
  email: z.email("Le format de l'email n'est pas valide")
});

// schema de validation pour le token lors de la réinitialisation du password
export const tokenParamSchema = z.object({
  token: z
    .string()
    .length(64, "Invalid token length")
    .regex(/^[0-9a-f]+$/, "Token must be hexadecimal"),
});

// schema de validation pour nouveau mdp (réinitialisation)
export const resetPasswordBodySchema = updateMePasswordSchema.omit({
  oldPassword: true,
});